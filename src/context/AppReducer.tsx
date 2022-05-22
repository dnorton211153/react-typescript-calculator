import NP from 'number-precision'

// ACTIONS
const CLEAR = "CLEAR";
const SETOPERATOR = "SETOPERATOR";
const CALCULATE = "CALCULATE";
const APPEND = "APPEND";

// OPERATORS
const ADD = "+";
const SUBTRACT = "-";
const MULTIPY = "*";
const DIVIDE = "/";


const AppReducer = (
  state: {
    storedValue: string;
    displayValue: string;
    readyForNewNumber: boolean;
    operator: string;
    lastStoredValue: string;
    lastAction: string;
  },
  { type, payload }: { type: string; payload: string }
) => {
  switch (type) {
    case CLEAR:
      return {
        ...state,
        displayValue: "0",
        storedValue: "",
        lastStoredValue: "",
        operator: "",
        readyForNewNumber: true,
        lastAction: CLEAR,
      };

    case SETOPERATOR:
      return {
        ...state,
        operator: payload,
        lastStoredValue: state.storedValue,
        storedValue: state.displayValue,
        readyForNewNumber: true,
        lastAction: SETOPERATOR
      };

    case APPEND:
      if (state.displayValue.includes(".") && payload === ".") return state;
      if (state.displayValue.slice(0, 1) === "0" && payload === "0")
        return state;

      if (state.readyForNewNumber) {
        return {
          ...state,
          displayValue: payload,
          readyForNewNumber: false,
          lastAction: APPEND,
        };
      } else {

        let newDisplayValue = state.displayValue + payload;
        return {
          ...state,
          displayValue: newDisplayValue,
          lastAction: APPEND,
        };
      }

    case CALCULATE:
      if (state.operator !== "") {
        var newTotal = 0;

        switch (state.operator) {
          case ADD:
            newTotal = Number(state.storedValue) + Number(state.displayValue);
            break;
          case SUBTRACT:
            newTotal = Number(state.storedValue) - Number(state.displayValue);
            break;
          case MULTIPY:
            newTotal = Number(state.storedValue) * Number(state.displayValue);
            break;
          case DIVIDE:
            newTotal = Number(state.storedValue) / Number(state.displayValue);
            break;
        }

        return {
          ...state,
          displayValue: String(NP.strip(newTotal)),
          lastStoredValue: state.storedValue,
          storedValue: String(NP.strip(newTotal)),
          operator: "",
          lastAction: CALCULATE,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default AppReducer;