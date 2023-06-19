import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import { makeSnowflake } from './snow';

function App() {
  useEffect(() => {
    const interval = setInterval(makeSnowflake, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
