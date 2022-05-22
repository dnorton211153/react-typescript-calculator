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

export default (
  state: {
    storedValue: string;
    displayValue: string;
    readyForNewNumber: boolean;
    operator: string;
    lastStoredValue: string;
    lastAction: string;
  },
  { type, payload }: {type: any, payload: any}
) => {
  switch (type) {
    case CLEAR:
      return { ...state, ...payload };

    case SETOPERATOR:
      return {
        ...state,
        operator: payload,
        lastStoredValue: state.storedValue,
        storedValue: state.displayValue,
        readyForNewNumber: true,
        lastAction: SETOPERATOR,
      };

    case APPEND:
      if (state.displayValue.includes(".") && payload == ".") return state;
      if (state.displayValue.slice(0, 1) == "0" && payload == "0") return state;

      if (state.readyForNewNumber) {
        return {
          ...state,
          displayValue: payload,
          readyForNewNumber: false,
          lastAction: APPEND,
        };
      } else {
        return {
          ...state,
          displayValue: (state.displayValue += payload),
          lastAction: APPEND,
        };
      }

    case CALCULATE:
      if (state.operator != "") {
        var newTotal;

        switch (state.operator) {
          case ADD:
            newTotal = Number(state.storedValue) + Number(payload);
            break;
          case SUBTRACT:
            newTotal = Number(state.storedValue) - Number(payload);
            break;
          case MULTIPY:
            newTotal = Number(state.storedValue) * Number(payload);
            break;
          case DIVIDE:
            newTotal = Number(state.storedValue) / Number(payload);
            break;
        }

        return {
          ...state,
          displayValue: String(newTotal),
          lastStoredValue: state.storedValue,
          storedValue: String(newTotal),
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
