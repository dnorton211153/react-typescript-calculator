import React, {useContext, MouseEvent} from 'react';
import { GlobalContext } from '../context/GlobalState';


export const Calculator = () => {

  // Use the global context:
  const {displayValue,lastAction,storedValue,operator,actionClear,actionSetOperator,actionAppend,actionCalculate} = useContext(GlobalContext);
  
  // Helper functions to wrap around the actionFunctions:
  const append = (e: MouseEvent) => {
        let target = e.target as HTMLTextAreaElement;
        actionAppend(target.innerText)
  }

  const setOperator = (e: MouseEvent) => {
    if (lastAction !== 'SETOPERATOR') {
        if (storedValue !== '' && operator !== '') calculate();
    }
    let target = e.target as HTMLTextAreaElement;
    actionSetOperator(target.innerText);
  }

  const calculate = () => {
      actionCalculate();
  }

  return (
    <div id="drum-machine" style={{width: 300}}>
    <div className="col mt-5 container">
      <div className="row topRow">
        <div className="display col-9" id="display">
          {displayValue}
        </div>
        <div onClick={actionClear} className="key-pad-clear col-2" id="clear">
          c
        </div>
      </div>


      <div className="row">
        <div onClick={append} className="key-pad col-3" id="seven">
          7
        </div>
        <div onClick={append} className="key-pad col-3" id="eight">
          8
        </div>
        <div onClick={append} className="key-pad col-3" id="nine">
          9
        </div>
        <div onClick={setOperator} className="key-pad col-3" id="add">
          +  
        </div>
      </div>
      <div className="row">
        <div onClick={append} className="key-pad col-3" id="four">
          4
        </div>
        <div onClick={append} className="key-pad col-3" id="five">
          5
        </div>
        <div onClick={append} className="key-pad col-3" id="six">
          6
        </div>
        <div onClick={setOperator} className="key-pad col-3" id="subtract">
          -  
        </div>
      </div>
      <div className="row">
        <div onClick={append} className="key-pad col-3" id="one">
          1
        </div>
        <div onClick={append} className="key-pad col-3" id="two">
          2
        </div>
        <div onClick={append} className="key-pad col-3" id="three">
          3
        </div>
        <div onClick={setOperator} className="key-pad col-3" id="multiply">
          *  
        </div>
      </div>
      <div className="row">
        <div onClick={append} className="key-pad col-3" id="zero">
          0
        </div>
        <div onClick={append} className="key-pad col-3" id="decimal">
          .
        </div>
        <div onClick={calculate} className="key-pad col-3" id="equals">
          =
        </div>
        <div onClick={setOperator} className="key-pad col-3" id="divide">
          /  
        </div>
      </div>
    </div>
  </div>
  )
}
