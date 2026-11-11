# Minimalist Dark-Mode Calculator

A sleek, modern, iOS-inspired web calculator built from scratch using pure vanilla HTML, CSS Grid, and JavaScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vanilla JS](https://img.shields.io/badge/built%20with-Vanilla%20JS-F7DF1E.svg)
![CSS3 Grid](https://img.shields.io/badge/layout-CSS%20Grid-1572B6.svg)

---

## ✨ Features

- **iOS-Inspired Aesthetic**: Deep dark theme with modern typography, pill-shaped action buttons, and responsive layout.
- **CSS Grid Layout**: Clean and responsive 4-column keypad using modern grid styling.
- **Safe Math Engine**: Custom computation logic without `eval()`, preventing common calculation bugs and handling division-by-zero gracefully.
- **Floating Point Correction**: Handles JavaScript floating point anomalies (e.g., `0.1 + 0.2 = 0.3`).
- **Event Delegation**: Single event listener on the keypad container for fast and efficient DOM performance.
- **Full Keyboard Support**: Type directly with your keyboard (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`).

---

## 📁 Project Structure

```
calculator/
│
├── index.html     # Semantic structure and accessible display elements
├── style.css      # CSS variables, dark-mode styling, and CSS Grid layout
├── script.js      # State machine, math engine, and event listeners
└── README.md      # Project documentation
```

---

## 🚀 Getting Started

No build tools, bundlers, or package managers required!

1. Clone or download this repository:
   ```bash
   git clone https://github.com/<your-username>/calculator.git
   ```
2. Navigate into the folder:
   ```bash
   cd calculator
   ```
3. Open `index.html` in any modern web browser.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `0` - `9` | Enter numbers |
| `.` | Decimal point |
| `+`, `-`, `*`, `/` | Arithmetic operations |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last digit |
| `Escape` | Clear all (AC) |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

