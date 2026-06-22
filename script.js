// --- API Configuration ---
// Replace with your actual free Llama API credentials
const LLAMA_API_KEY = "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"; 
// Example URL if using an OpenAI-compatible endpoint (like Groq)
const API_URL = "https://api.groq.com/openai/v1/chat/completions"; 

// --- DOM Elements ---
const marksheetInput = document.getElementById('marksheetInput');
const processBtn = document.getElementById('processBtn');
const manualStartBtn = document.getElementById('manualStartBtn');
const loadingStatus = document.getElementById('loadingStatus');
const calculatorSection = document.getElementById('calculatorSection');
const subjectsBody = document.getElementById('subjectsBody');
const addRowBtn = document.getElementById('addRowBtn');

// --- Event Listeners ---
processBtn.addEventListener('click', handleImageUpload);
manualStartBtn.addEventListener('click', () => {
    calculatorSection.classList.remove('hidden');
    if (subjectsBody.children.length === 0) {
        addSubjectRow("", "", "");
    }
});
addRowBtn.addEventListener('click', () => addSubjectRow("", "", ""));
subjectsBody.addEventListener('input', calculateCGPA);

// --- Core Functions ---

async function handleImageUpload() {
    const file = marksheetInput.files[0];
    if (!file) {
        alert("Please select a marksheet image first.");
        return;
    }

    // Update UI state
    loadingStatus.classList.remove('hidden');
    processBtn.disabled = true;

    try {
        const base64Image = await convertFileToBase64(file);
        const extractedData = await extractDataWithLlama(base64Image);
        
        // Clear old rows
        subjectsBody.innerHTML = ''; 
        
        // Populate table with extracted data
        if (extractedData && extractedData.length > 0) {
            extractedData.forEach(item => {
                let finalMarks = 0;
                if (item.weightages && Array.isArray(item.weightages)) {
                    finalMarks = item.weightages.reduce((sum, w) => sum + (parseFloat(w) || 0), 0);
                } else if (item.marks !== undefined) {
                    finalMarks = item.marks; // fallback if AI ignored instructions
                }
                addSubjectRow(item.subject || "", finalMarks || "", "");
            });
            calculatorSection.classList.remove('hidden');
            calculateCGPA();
        } else {
            alert("No data could be extracted. Please add subjects manually.");
            calculatorSection.classList.remove('hidden');
        }

    } catch (error) {
        console.error("Extraction Failed:", error);
        alert("There was an error communicating with the AI. Check your console and API key.");
        calculatorSection.classList.remove('hidden'); // Show table anyway so you can do it manually
    } finally {
        loadingStatus.classList.add('hidden');
        processBtn.disabled = false;
    }
}

function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); 
        reader.onerror = error => reject(error);
    });
}

async function extractDataWithLlama(base64Image) {
    const payload = {
        model: "meta-llama/llama-4-scout-17b-16e-instruct", // Updated to a currently active Groq Vision model
        temperature: 0.1,
        messages: [
            {
                role: "system",
                content: "You are a data extraction bot. You must return ONLY a raw JSON array. Do not wrap the JSON in markdown blocks like ```json."
            },
            {
                role: "user",
                content: [
                    { 
                        type: "text", 
                        text: `Extract the subjects and their weightage components from the marksheet.

CRITICAL INSTRUCTION:
DO NOT DO ANY MATH. Do not calculate the final marks.
For each subject, find the "Weightage" column.
In the "Weightage" column, you will see fractions like "23/25", "45/50", "14/20".
Extract ONLY the FIRST number (the obtained weightage, before the slash) for every component in that subject.
Ignore the "Marks" column completely (e.g. ignore 89/100). Only look at the "Weightage" column.

Return a JSON array of objects. Each object must have exactly two keys:
1. 'subject' (string)
2. 'weightages' (array of numbers) - this is the list of the obtained weightages you extracted.

Example:
[
  { "subject": "COMPUTER ORGANIZATION", "weightages": [0, 23, 45, 14] },
  { "subject": "PROGRAMMING IN JAVA", "weightages": [5, 47, 45] }
]` 
                    },
                    { 
                        type: "image_url", 
                        image_url: { url: `data:image/jpeg;base64,${base64Image}` } 
                    }
                ]
            }
        ]
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${LLAMA_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    let rawText = data.choices[0].message.content.trim();
    
    // Safety fallback: strip markdown if the LLM ignores instructions
    if (rawText.startsWith("```json")) {
        rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    }

    return JSON.parse(rawText);
}

function addSubjectRow(subject, marks, credits) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="subject-input" value="${subject}" placeholder="e.g., Data Structures"></td>
        <td><input type="number" class="marks-input" value="${marks}" min="0" max="100" placeholder="Marks"></td>
        <td><input type="number" class="credits-input" value="${credits}" min="1" placeholder="Credits"></td>
        <td style="text-align: center;"><div class="grade-badge">-</div></td>
        <td style="text-align: center;"><button class="delete-icon-btn" onclick="this.closest('tr').remove(); calculateCGPA();" title="Delete Subject">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button></td>
    `;
    subjectsBody.appendChild(tr);
}

function getGradeStr(marks) {
    const m = parseFloat(marks);
    if (isNaN(m)) return '-';
    if (m >= 90) return 'O';
    if (m >= 80) return 'A+';
    if (m >= 70) return 'A';
    if (m >= 60) return 'B+';
    if (m >= 50) return 'B';
    if (m >= 45) return 'C';
    if (m >= 40) return 'D';
    return 'F';
}

function getPointer(marks) {
    const m = parseFloat(marks);
    if (isNaN(m)) return 0;
    if (m >= 90) return 10;
    if (m >= 80) return 9;
    if (m >= 70) return 8;
    if (m >= 60) return 7;
    if (m >= 50) return 6;
    if (m >= 45) return 5;
    if (m >= 40) return 4;
    return 0; // Fail
}

function calculateCGPA() {
    const rows = document.querySelectorAll('#subjectsBody tr');
    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(row => {
        const marks = row.querySelector('.marks-input').value;
        const creditsInput = row.querySelector('.credits-input').value;
        const credits = parseFloat(creditsInput) || 0;
        
        const pointer = getPointer(marks);
        const gradeStr = getGradeStr(marks);
        
        const gradeBadge = row.querySelector('.grade-badge');
        if (gradeBadge) {
            gradeBadge.innerText = gradeStr;
            // Optionally remove any old grade classes
            gradeBadge.className = 'grade-badge'; 
            if (gradeStr !== '-') {
                gradeBadge.classList.add(`grade-${gradeStr.replace('+','-plus').toLowerCase()}`);
            }
        }
        
        totalPoints += (pointer * credits);
        totalCredits += credits;
    });

    document.getElementById('totalCredits').innerText = totalCredits;
    document.getElementById('totalPoints').innerText = totalPoints;
    
    const finalCgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    document.getElementById('finalCgpa').innerText = finalCgpa;
}
