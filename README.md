<div align="center">
  <img src="https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Llama_Vision-0466C8?style=for-the-badge&logo=meta&logoColor=white" alt="Llama Vision API" />
</div>

<h1 align="center">CGPA Calc</h1>

<p align="center">
  <strong>A premium, AI-powered academic performance calculator featuring image-based automated extraction and dynamic real-time grading logic.</strong>
</p>

---

## 🚀 Overview

**CGPA Calc** is a visually stunning, static web application designed to simplify academic grade tracking. By leveraging the power of advanced Vision-Language Models (VLMs), students can instantly process their marksheets rather than manually computing complex weightages and credit ratios. 

Built with an emphasis on **zero-dependency deployment** and premium UI/UX, the application runs entirely in the browser using Vanilla JavaScript and communicates directly with the Groq API.

## ✨ Key Features

- **🧠 Automated VLM Extraction:** Harnesses the `llama-4-scout-17b-16e-instruct` Vision model via the Groq API to scan uploaded images, intelligently parse "Weightage" tables, and aggregate final score components.
- **⚡ Real-time Computation Engine:** Instantly calculates total accumulated credits, total grade points, and the minimum expected CGPA as inputs change.
- **🎨 Premium Dark-Mode UI:** Features a modern glassmorphic aesthetic, custom CSS custom properties (variables) for scalable theming, and smooth micro-animations.
- **🚥 Dynamic Grade Badges:** Employs real-time logic to assign visually distinct, color-coded gradient badges (O, A+, A, B+, B, C, D, F) based on standard academic brackets.
- **⌨️ Manual Override:** Full support for manual data entry and correction, ensuring flexibility if the AI extraction misses an edge case.

## 🛠️ Architecture & Tech Stack

This project strictly adheres to a **zero-build-step architecture**, making it incredibly lightweight and perfect for static hosting environments (like GitHub Pages or Vercel).

* **DOM Manipulation:** Vanilla JavaScript (ES6+)
* **Styling:** Pure CSS3 (Flexbox, Grid, CSS Variables, Animations)
* **Markup:** HTML5
* **AI Integration:** Fetch API interfacing with `api.groq.com`

## ⚙️ Local Development

Getting the project running locally requires zero installation or package managers:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ritik0102-bit/CGPA-Calculator.git
   cd CGPA-Calculator
   ```

2. **Serve the application:**
   You can run this directly by opening `index.html` in your browser. Alternatively, for a better development experience, use a local server:
   * **VS Code:** Install and run the "Live Server" extension.
   * **Python:** Run `python -m http.server 5500`
   * **Node:** Run `npx serve .`

3. **Configure the AI Provider (Optional):**
   To utilize the automated image extraction feature, you must provide a valid API key for Groq in the source code where the fetch requests are constructed.

## 📊 Grading Standard

The calculation engine maps percentage marks to grade points using the following logic:

| Marks Range | Grade | Points |
| :--- | :---: | :---: |
| 90 - 100 | **O** | 10 |
| 80 - 89 | **A+** | 9 |
| 70 - 79 | **A** | 8 |
| 60 - 69 | **B+** | 7 |
| 50 - 59 | **B** | 6 |
| 45 - 49 | **C** | 5 |
| 40 - 44 | **D** | 4 |
| Below 40 | **F** | 0 |

> **Note:** The final CGPA is a minimum guaranteed calculation. Due to statistical relative grading curves applied post-semester, actual CGPA may scale higher.

---
<div align="center">
  <i>Designed and developed by Ritik.</i><br>
  <a href="https://github.com/Ritik0102-bit">GitHub</a> • <a href="https://www.linkedin.com/in/ritik--rana/">LinkedIn</a>
</div>
