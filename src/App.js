import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <Board nrows={9} ncols={6} chanceLightStartsOn={0.8} />
    </div>
  );
}

export default App;
