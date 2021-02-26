import React from "react";
import "./App.scss";
import Game from "./Game";

function App() {
  return (
    <div className="app">
      <p
        className="visually-hidden"
        style={{ fontFamily: "'Geostar Fill', cursive" }}
      >
        font loader
      </p>
      <Game />
    </div>
  );
}

export default App;
