import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'

// ACTIONS
const CLEAR = "CLEAR";
const SETOPERATOR = "SETOPERATOR";
const CALCULATE = "CALCULATE";
const APPEND = "APPEND";

// TypeScript requires stubs for the functions as well
const initialState = {
    displayValue: "0",
    storedValue: "",
    lastStoredValue: "",
    operator: "",
    readyForNewNumber: true,
    lastAction: CLEAR,
    actionClear: () => {},
    actionCalculate: () => {},
    actionSetOperator: (payload: string) => {},
    actionAppend: (payload: string) => {}
};

// Create context:
export const GlobalContext = createContext(initialState);

// Provider component:
export const GlobalProvider = ({ children }: {children: any}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // global actions (calls to reducer):
    const actionClear = () => {
        dispatch({
            type: CLEAR,
            payload: ''
        })
    }
    
    const actionSetOperator = (payload: string) => {
        dispatch({
            type: SETOPERATOR,
            payload: payload
        })
    }
    
    const actionCalculate = () => {
        dispatch({
            type: CALCULATE,
            payload: ''
        })
    }
    
    const actionAppend = (payload: string) => {
        dispatch({
            type: APPEND,
            payload: payload
        })
    }

    return (<GlobalContext.Provider value={{
        displayValue: state.displayValue,
        lastStoredValue: state.lastStoredValue,
        storedValue: state.storedValue,
        operator: state.operator,
        lastAction: state.lastAction,
        readyForNewNumber: state.readyForNewNumber,
        actionClear,
        actionSetOperator,
        actionCalculate,
        actionAppend
    }}>
        {children}
    </GlobalContext.Provider>);
}