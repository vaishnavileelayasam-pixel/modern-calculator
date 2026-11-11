/**
 * ==============================================================================
 * MINIMALIST CALCULATOR - JAVASCRIPT LOGIC
 * ==============================================================================
 * This script manages the calculator's state, handles user interactions
 * (both button clicks and keyboard presses), and executes mathematical calculations safely.
 */

// ==============================================================================
// 1. STATE MANAGEMENT
// The "State" represents the current condition of our application at any given moment.
// ==============================================================================
let currentOperand = "0";    // The number currently shown on screen (string format)
let previousOperand = "";   // The number entered before an operator was selected
let currentOperation = null; // The arithmetic operator currently selected (+, −, ×, ÷)
let shouldResetScreen = false; // Flag: true when a new number should replace current text

// ==============================================================================
// 2. DOM ELEMENT REFERENCES
// Grabbing HTML elements so JavaScript can read from or write to them.
// ==============================================================================
const currentOperandText = document.getElementById("currentOperand");
const previousOperandText = document.getElementById("previousOperand");
const keypad = document.getElementById("keypad");

// ==============================================================================
// 3. CORE CALCULATOR FUNCTIONS
// ==============================================================================

/**
 * Appends a digit or decimal point to the current number on screen.
 * @param {string} number - The digit ("0"-"9") or "." clicked by the user
 */
function appendNumber(number) {
  // If we just calculated a result or selected an operator, start a fresh number
  if (shouldResetScreen) {
    currentOperand = "";
    shouldResetScreen = false;
  }

  // Edge case: If current display is "0" and user types another digit (not "."), replace the "0"
  if (currentOperand === "0" && number !== ".") {
    currentOperand = number;
    return;
  }

  // Edge case: Prevent entering multiple decimal points (e.g., "5.4.2" is invalid)
  if (number === "." && currentOperand.includes(".")) {
    return;
  }

  // Edge case: Prevent exceeding max digits to avoid overflowing display
  if (currentOperand.length >= 12) {
    return;
  }

  // Append digit to our string
  currentOperand += number;
}

/**
 * Handles arithmetic operator selection (+, −, ×, ÷).
 * @param {string} operator - The chosen math operator
 */
function chooseOperation(operator) {
  // If user hasn't typed anything and hits an operator, do nothing
  if (currentOperand === "" && previousOperand === "") return;

  // If user changes their mind and clicks another operator without typing a new number
  if (currentOperand === "" && previousOperand !== "") {
    currentOperation = operator;
    updateDisplay();
    return;
  }

  // If we already had a previous number waiting, calculate the intermediate result first
  if (previousOperand !== "") {
    calculate();
  }

  // Store the current operation and move current number to previousOperand
  currentOperation = operator;
  previousOperand = currentOperand;
  shouldResetScreen = true;
}

/**
 * Performs the actual arithmetic calculation between previousOperand and currentOperand.
 */
function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // If either number is invalid (e.g. user pressed "=" with no second number), abort
  if (isNaN(prev) || isNaN(current)) return;

  switch (currentOperation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
    case "−":
      computation = prev - current;
      break;
    case "×":
    case "*":
      computation = prev * current;
      break;
    case "÷":
    case "/":
      // Edge case: Division by zero is mathematically undefined
      if (current === 0) {
        alert("Cannot divide by zero!");
        clearAll();
        updateDisplay();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  // Fix JavaScript floating point quirks (e.g., 0.1 + 0.2 = 0.30000000000000004)
  // We round to a maximum of 10 decimal places to keep results clean
  computation = Math.round(computation * 1e10) / 1e10;

  // Set the result as the current operand and clear previous operand
  currentOperand = computation.toString();
  currentOperation = null;
  previousOperand = "";
  shouldResetScreen = true;
}

/**
 * Resets the entire calculator state back to its initial blank condition (All Clear / AC).
 */
function clearAll() {
  currentOperand = "0";
  previousOperand = "";
  currentOperation = null;
  shouldResetScreen = false;
}

/**
 * Toggles the sign between positive and negative (±).
 */
function toggleSign() {
  if (currentOperand === "0" || currentOperand === "") return;
  
  if (currentOperand.startsWith("-")) {
    currentOperand = currentOperand.slice(1);
  } else {
    currentOperand = "-" + currentOperand;
  }
}

/**
 * Converts current number to its percentage value (divides by 100).
 */
function applyPercentage() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  
  currentOperand = (current / 100).toString();
}

/**
 * Deletes the last character typed (backspace functionality).
 */
function deleteLastDigit() {
  if (shouldResetScreen) return;
  
  if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith("-"))) {
    currentOperand = "0";
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
}

// ==============================================================================
// 4. DISPLAY FORMATTING
// Formats numbers with readable thousands separators (e.g., 12,345.67)
// ==============================================================================
function formatDisplayNumber(number) {
  if (!number) return "";
  
  const stringNumber = number.toString();
  const [integerPart, decimalPart] = stringNumber.split(".");
  
  const formattedInteger = isNaN(parseFloat(integerPart))
    ? ""
    : parseFloat(integerPart).toLocaleString("en-US");

  // If there's a decimal part (or user just typed the "."), keep it intact
  if (decimalPart != null) {
    return `${formattedInteger}.${decimalPart}`;
  }
  
  return formattedInteger;
}

/**
 * Synchronizes the JavaScript state with the HTML display on screen.
 */
function updateDisplay() {
  currentOperandText.innerText = formatDisplayNumber(currentOperand) || "0";

  if (currentOperation != null) {
    previousOperandText.innerText = `${formatDisplayNumber(previousOperand)} ${currentOperation}`;
  } else {
    previousOperandText.innerText = "";
  }
}

// ==============================================================================
// 5. EVENT LISTENERS
// We use "Event Delegation" on the keypad container instead of attaching 19 listeners!
// ==============================================================================
keypad.addEventListener("click", (event) => {
  // Find closest button element clicked
  const button = event.target.closest("button");
  if (!button) return; // Ignore clicks in gaps between buttons

  // 1. Number button clicked
  if (button.dataset.number !== undefined) {
    appendNumber(button.dataset.number);
    updateDisplay();
    return;
  }

  // 2. Operator button clicked (+, −, ×, ÷)
  if (button.dataset.operator !== undefined) {
    chooseOperation(button.dataset.operator);
    updateDisplay();
    return;
  }

  // 3. Action button clicked (AC, ±, %, =)
  const action = button.dataset.action;
  switch (action) {
    case "clear":
      clearAll();
      break;
    case "toggle-sign":
      toggleSign();
      break;
    case "percent":
      applyPercentage();
      break;
    case "calculate":
      calculate();
      break;
  }
  updateDisplay();
});

// ==============================================================================
// 6. KEYBOARD ACCESSIBILITY SUPPORT (BONUS)
// Allows users to type using their physical computer keyboard.
// ==============================================================================
window.addEventListener("keydown", (event) => {
  const key = event.key;

  // Numbers 0-9 and decimal point
  if ((key >= "0" && key <= "9") || key === ".") {
    appendNumber(key);
    updateDisplay();
  }
  // Operators
  else if (key === "+") {
    chooseOperation("+");
    updateDisplay();
  } else if (key === "-") {
    chooseOperation("-");
    updateDisplay();
  } else if (key === "*") {
    chooseOperation("×");
    updateDisplay();
  } else if (key === "/") {
    event.preventDefault(); // Prevents browser "Quick Find" shortcut
    chooseOperation("÷");
    updateDisplay();
  }
  // Enter or Equal to calculate
  else if (key === "Enter" || key === "=") {
    event.preventDefault(); // Prevents default form submit or button click
    calculate();
    updateDisplay();
  }
  // Backspace to delete
  else if (key === "Backspace") {
    deleteLastDigit();
    updateDisplay();
  }
  // Escape to Clear All
  else if (key === "Escape") {
    clearAll();
    updateDisplay();
  }
});

