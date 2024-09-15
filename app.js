var result = document.querySelector("#result");

const btnClear = document.querySelector(".btn-clear");
const btnDelete = document.querySelector(".btn-delete");
const btnDecimal = document.querySelector("#btn-decimal");
const btnDivision = document.querySelector("#btn-division");

const btnSeven = document.querySelector("#btn-seven");
const btnEight = document.querySelector("#btn-eight");
const btnNine = document.querySelector("#btn-nine");
const btnMultiply = document.querySelector("#btn-multiply");

const btnFour = document.querySelector("#btn-four");
const btnFive = document.querySelector("#btn-five");
const btnSix = document.querySelector("#btn-six");
const btnSubtract = document.querySelector("#btn-subtract");

const btnOne = document.querySelector("#btn-one");
const btnTwo = document.querySelector("#btn-two");
const btnThree = document.querySelector("#btn-three");
const btnAdd = document.querySelector("#btn-add");

const btnDoubleZero = document.querySelector("#btn-double-zero");
const btnZero = document.querySelector("#btn-zero");
const btnEquals = document.querySelector("#btn-equals");

const keyToButtonMap = {
  0: btnZero,
  "00": btnDoubleZero,
  1: btnOne,
  2: btnTwo,
  3: btnThree,
  4: btnFour,
  5: btnFive,
  6: btnSix,
  7: btnSeven,
  8: btnEight,
  9: btnNine,
  "+": btnAdd,
  "-": btnSubtract,
  "*": btnMultiply,
  "/": btnDivision,
  ".": btnDecimal,
  Enter: btnEquals,
};

window.addEventListener("keydown", function (e) {
  if (result.innerText === "Hata") {
    result.innerText = "";
  }
  if (e.key === "Backspace") {
    e.preventDefault();
    removeLastChar();
  } else if (e.key === "Enter") {
    e.preventDefault();
    evaluateResult();
  } else if (keyToButtonMap.hasOwnProperty(e.key)) {
    e.preventDefault();
    keyToButtonMap[e.key].click();
  }
});

btnEquals.addEventListener("click", evaluateResult);

document.querySelectorAll(".btn-number, .btn-operator").forEach((button) => {
  button.addEventListener("click", (e) => {
    let lastChar = result.innerText.slice(-1);
    let value = e.target.textContent;

    if (result.innerText === "Hata") {
      result.innerText = "";
    } else if (
      ["+", "-", "*", "/", ".", ""].includes(value) &&
      ["+", "-", "*", "/", ".", ""].includes(lastChar)
    ) {
    } else if (value === "=") {
      evaluateResult();
    } else if (value === "AC") {
      result.innerText = "";
    } else if (value === "DE") {
      removeLastChar();
    } else {
      result.innerText += value;
    }
  });
});

function removeLastChar() {
  result.innerText = result.innerText.slice(0, -1);
}

function evaluateResult() {
  let operation = result.innerText.replace(/,/g, ".");

  try {
    const resultValue = new Function("return " + operation)();
    result.innerText = resultValue.toString().replace(/\./g, ",");
  } catch (e) {
    result.innerText = "Hata";
    console.error("Hatalı işlem:", e);
  }
}
