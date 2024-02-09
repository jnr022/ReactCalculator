import React, {
useState,
useEffect } from
"https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);

  const handleButtonClick = e => {
    const value = typeof e === "string" ? e : e.target.value;
    const lastChar = input.charAt(input.length - 1);

    if (
    input.length === 0 && ["+", "*", "/"].includes(value) ||
    ["+", "-", "*", "/"].includes(lastChar) &&
    ["+", "-", "*", "/"].includes(value) ||
    lastChar === "." && value === "." ||
    lastChar === "." && ["+", "-", "*", "/"].includes(value) ||
    ["+", "-", "*", "/"].includes(lastChar) && value === ".")
    {
      return;
    }

    setInput(prevInput => prevInput + value);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    const keyPressed = event.key;
    const keyCode = event.keyCode;
    const validKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    ".",
    "=",
    "Enter",
    "Escape"];

    if (
    validKeys.includes(keyPressed) ||
    validKeys.includes(keyCode.toString()))
    {
      event.preventDefault();
      if (keyPressed === "Enter" || keyCode === 13) {
        if (input.trim() !== "") {
          handleCalculate();
        }
      } else if (keyPressed === "Escape" || keyCode === 46 || keyCode === 8) {
        handleClear();
      } else {
        handleButtonClick(keyPressed);
      }
    }
  };

  const handleCalculate = () => {
    let newResult;
    if (
    !input.trim() ||
    ["+", "-", "*", "/"].includes(input.charAt(input.length - 1)))
    {
      return;
    }
    try {
      newResult = eval(input);
      setResult(newResult);
    } catch (e) {
      newResult = "Invalid expression";
      setResult(newResult);
    }
    setHistory(prevHistory => [
    ...prevHistory.slice(-1),
    { input, result: newResult }]);

    setInput("");
  };

  const handleDecimal = e => {
    const value = e.target.value;

    // Check if input already contains a decimal point
    if (!input.includes(".")) {
      setInput(prevInput => prevInput + value);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(0);
    setHistory([]);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "calculator" }, /*#__PURE__*/
    React.createElement("h3", null, "Calculator"), /*#__PURE__*/
    React.createElement("div", { className: "calculator-box" }, /*#__PURE__*/
    React.createElement("div", { id: "display" }, /*#__PURE__*/
    React.createElement(History, { historyValue: history }), /*#__PURE__*/
    React.createElement(Output, { resultValue: input || result })), /*#__PURE__*/

    React.createElement(Buttons, {
      id: "buttons",
      numbers: handleButtonClick,
      operators: handleButtonClick,
      decimal: handleDecimal,
      clear: handleClear,
      handleCalculate: handleCalculate }))));




}

const Buttons = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "buttons" }, /*#__PURE__*/
    React.createElement("button", { id: "clear", value: "AC", className: "jumbo", onClick: props.clear }, "AC"), /*#__PURE__*/


    React.createElement("button", { id: "divide", value: "/", onClick: props.operators }, "/"), /*#__PURE__*/


    React.createElement("button", { id: "multiply", value: "*", onClick: props.operators }, "x"), /*#__PURE__*/


    React.createElement("button", { id: "seven", value: "7", onClick: props.numbers }, "7"), /*#__PURE__*/


    React.createElement("button", { id: "eight", value: "8", onClick: props.numbers }, "8"), /*#__PURE__*/


    React.createElement("button", { id: "nine", value: "9", onClick: props.numbers }, "9"), /*#__PURE__*/


    React.createElement("button", { id: "subtract", value: "-", onClick: props.operators }, "-"), /*#__PURE__*/


    React.createElement("button", { id: "four", value: "4", onClick: props.numbers }, "4"), /*#__PURE__*/


    React.createElement("button", { id: "five", value: "5", onClick: props.numbers }, "5"), /*#__PURE__*/


    React.createElement("button", { id: "six", value: "6", onClick: props.numbers }, "6"), /*#__PURE__*/


    React.createElement("button", { id: "add", value: "+", onClick: props.operators }, "+"), /*#__PURE__*/


    React.createElement("button", { id: "one", value: "1", onClick: props.numbers }, "1"), /*#__PURE__*/


    React.createElement("button", { id: "two", value: "2", onClick: props.numbers }, "2"), /*#__PURE__*/


    React.createElement("button", { id: "three", value: "3", onClick: props.numbers }, "3"), /*#__PURE__*/


    React.createElement("button", { id: "equals", value: "=", onClick: props.handleCalculate }, "="), /*#__PURE__*/



    React.createElement("button", { id: "zero", value: "0", className: "jumbo", onClick: props.numbers }, "0"), /*#__PURE__*/



    React.createElement("button", { id: "decimal", value: ".", onClick: props.decimal }, ".")));




};

const History = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "history" },
    props.historyValue.map((item, index) => /*#__PURE__*/
    React.createElement("div", { key: index }, `${item.input} = ${item.result}`))));



};

const Output = props => {
  return /*#__PURE__*/React.createElement("div", { id: "output" }, props.resultValue);
};

ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById("root"));