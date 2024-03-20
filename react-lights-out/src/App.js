import React from "react";
import { Board } from "./components/components";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <Board 
          nRows={5} 
          nCols={5} 
          chanceLightStartsOn={0.25} 
        />
      </div>
  );
}

export default App;
