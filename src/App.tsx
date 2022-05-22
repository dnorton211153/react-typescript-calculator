import React from 'react';
import './App.css';
import { Calculator } from './components/Calculator'
import { GlobalProvider } from './context/GlobalState'

function App() {
  return (

    <GlobalProvider>
    <div className="App d-flex flex-column justify-content-center align-items-center mt-4">
      <Calculator />
    </div>
    </GlobalProvider>
  );
}

export default App;
