import React, {
  useState,
  useEffect
} from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);

  const handleButtonClick = (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    const lastChar = input.charAt(input.length - 1);

    if (
      (input.length === 0 && ["+", "*", "/"].includes(value)) ||
      (["+", "-", "*", "/"].includes(lastChar) &&
        ["+", "-", "*", "/"].includes(value)) ||
      (lastChar === "." && value === ".") ||
      (lastChar === "." && ["+", "-", "*", "/"].includes(value)) ||
      (["+", "-", "*", "/"].includes(lastChar) && value === ".")
    ) {
      return;
    }

    setInput((prevInput) => prevInput + value);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
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
      "Escape"
    ];
    if (
      validKeys.includes(keyPressed) ||
      validKeys.includes(keyCode.toString())
    ) {
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
      ["+", "-", "*", "/"].includes(input.charAt(input.length - 1))
    ) {
      return;
    }
    try {
      newResult = eval(input);
      setResult(newResult);
    } catch (e) {
      newResult = "Invalid expression";
      setResult(newResult);
    }
    setHistory((prevHistory) => [
      ...prevHistory.slice(-1),
      { input, result: newResult }
    ]);
    setInput("");
  };

  const handleDecimal = (e) => {
    const value = e.target.value;

    // Check if input already contains a decimal point
    if (!input.includes(".")) {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(0);
    setHistory([]);
  };

  return (
    <div className="calculator">
      <h3>Calculator</h3>
      <div className="calculator-box">
        <div id="display">
          <History historyValue={history} />
          <Output resultValue={input || result} />
        </div>
        <Buttons
          id="buttons"
          numbers={handleButtonClick}
          operators={handleButtonClick}
          decimal={handleDecimal}
          clear={handleClear}
          handleCalculate={handleCalculate}
        />
      </div>
    </div>
  );
}

const Buttons = (props) => {
  return (
    <div className="buttons">
      <button id="clear" value="AC" className="jumbo" onClick={props.clear}>
        AC
      </button>
      <button id="divide" value="/" onClick={props.operators}>
        /
      </button>
      <button id="multiply" value="*" onClick={props.operators}>
        x
      </button>
      <button id="seven" value="7" onClick={props.numbers}>
        7
      </button>
      <button id="eight" value="8" onClick={props.numbers}>
        8
      </button>
      <button id="nine" value="9" onClick={props.numbers}>
        9
      </button>
      <button id="subtract" value="-" onClick={props.operators}>
        -
      </button>
      <button id="four" value="4" onClick={props.numbers}>
        4
      </button>
      <button id="five" value="5" onClick={props.numbers}>
        5
      </button>
      <button id="six" value="6" onClick={props.numbers}>
        6
      </button>
      <button id="add" value="+" onClick={props.operators}>
        +
      </button>
      <button id="one" value="1" onClick={props.numbers}>
        1
      </button>
      <button id="two" value="2" onClick={props.numbers}>
        2
      </button>
      <button id="three" value="3" onClick={props.numbers}>
        3
      </button>
      <button id="equals" value="=" onClick={props.handleCalculate}>
        =
      </button>

      <button id="zero" value="0" className="jumbo" onClick={props.numbers}>
        0
      </button>

      <button id="decimal" value="." onClick={props.decimal}>
        .
      </button>
    </div>
  );
};

const History = (props) => {
  return (
    <div id="history">
      {props.historyValue.map((item, index) => (
        <div key={index}>{`${item.input} = ${item.result}`}</div>
      ))}
    </div>
  );
};

const Output = (props) => {
  return <div id="output">{props.resultValue}</div>;
};

ReactDOM.render(<Calculator />, document.getElementById("root"));
