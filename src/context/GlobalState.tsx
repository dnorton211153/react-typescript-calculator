import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'

// ACTIONS
const CLEAR = "CLEAR";
const SETOPERATOR = "SETOPERATOR";
const CALCULATE = "CALCULATE";
const APPEND = "APPEND";

// Initial state (customers would need to be loaded from the DB source)

const initialState = {
    displayValue: "0",
    storedValue: "",
    lastStoredValue: "",
    operator: "",
    readyForNewNumber: true,
    lastAction: CLEAR,
    actionClear: () => {},
    actionSetOperator: (payload: any) => {},
    actionCalculate: (payload: any) => {},
    actionAppend: (payload: any) => {}
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
            payload: {
                displayValue: "0",
                storedValue: "",
                lastStoredValue: "",
                operator: "",
                readyForNewNumber: true,
                lastAction: CLEAR, 
            }
        })
    }
    
    const actionSetOperator = (payload: any) => {
        dispatch({
            type: SETOPERATOR,
            payload: payload
        })
    }
    
    const actionCalculate = (payload: any) => {
        dispatch({
            type: CALCULATE,
            payload: payload
        })
    }
    
    const actionAppend = (payload: any) => {
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