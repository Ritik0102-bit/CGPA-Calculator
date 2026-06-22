# LPU CGPA Calc

A premium, visually stunning web application designed for students to easily calculate their CGPA. You can either manually enter your marks or upload a screenshot of your marksheet to have an AI automatically extract and calculate your grades!

## ✨ Features

- **AI Marksheet Extraction:** Upload an image of your marksheet, and the application will use the Google Gemini 1.5 Flash Vision model to intelligently extract your subjects and obtained marks.
- **Manual Entry:** Prefer typing? Add subjects manually and instantly see your grades calculate as you type.
- **Real-Time CGPA Calculation:** Instantly calculates total credits, total grade points, and your minimum expected CGPA.
- **Dynamic Grade Badges:** Features beautiful, color-coded grade badges (O, A+, A, B+, B, C, D, F) that update automatically.
- **Premium UI/UX:** Built with a modern, fully responsive dark-mode aesthetic featuring glassmorphism, glowing gradients, and smooth micro-animations.
- **Grade Reference Table:** A handy, built-in reference table showing the standard mark ranges, grades, and point values.

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript. No build step required!
- **AI Integration:** Google Gemini API (`gemini-1.5-flash`) for fast, accurate image-to-text processing.

## 🚀 How to Use (Local Setup)

Because this application uses standard static files, setup is incredibly easy:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ritik0102-bit/CGPA-Calculator.git
   ```
2. **Open the project:**
   Simply open the `index.html` file in any modern web browser, or use a tool like VS Code's "Live Server" extension to run it locally.
3. **Configure API (If needed):**
   The application communicates directly with Google's Gemini API for the image extraction feature. Ensure you provide a valid API key when prompted in the application or by modifying the source code.

## 📝 Important Note
The calculated CGPA is the **minimum** CGPA based on standard grading tables. Due to relative grading curves commonly applied in universities, your actual final CGPA may be higher.

---
*Designed & Developed by [Ritik](https://github.com/Ritik0102-bit)*
