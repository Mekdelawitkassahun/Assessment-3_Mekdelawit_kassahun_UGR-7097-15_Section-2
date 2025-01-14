document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = "";

  const updateDisplay = () => {
    display.textContent = currentInput || "0";
  };

  const handleInput = (input) => {
    if (!isNaN(input)) {
      // Append numbers
      currentInput += input;
    } else if (input === ".") {
      // Allow only one decimal point per number
      const lastPart = currentInput.split(/[\+\-\×÷]/).pop();
      if (!lastPart.includes(".")) {
        if (lastPart === "") {
          // If starting a new number, prepend 0 before dot
          currentInput += "0.";
        } else {
          currentInput += input;
        }
      }
    } else if ("+-×÷".includes(input)) {
      // Prevent consecutive operators
      if ("+-×÷".includes(currentInput.slice(-1))) return;
      currentInput += input;
    } else if (input === "Enter") {
      // Calculate the result
      calculate();
    } else if (input === "Backspace") {
      // Remove the last character
      currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
  };

  const calculate = () => {
    try {
      // Replace ÷ and × with / and * for evaluation
      const sanitizedInput = currentInput
        .replace(/÷/g, "/")
        .replace(/×/g, "*");
      currentInput = eval(sanitizedInput).toString();
    } catch (e) {
      currentInput = "Error";
    }
    updateDisplay();
  };

  const clearCalculator = () => {
    currentInput = "";
    updateDisplay();
  };

  // Button Click Handlers
  document.querySelectorAll(".number").forEach((button) =>
    button.addEventListener("click", (e) => handleInput(e.target.textContent))
  );

  document.querySelectorAll(".operator").forEach((button) =>
    button.addEventListener("click", (e) => handleInput(e.target.textContent))
  );

  document.querySelector(".equal").addEventListener("click", calculate);

  document.querySelector(".clear").addEventListener("click", clearCalculator);

  // Keyboard Support
  document.addEventListener("keydown", (e) => {
    const validKeys = "0123456789+-*/.EnterBackspace";
    const keyMap = {
      "/": "÷",
      "*": "×",
    };
    if (validKeys.includes(e.key)) {
      handleInput(keyMap[e.key] || e.key);
    }
  });

  updateDisplay();
});
