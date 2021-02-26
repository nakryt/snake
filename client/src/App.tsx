import React from "react";
import "./App.scss";
import Game from "./Game";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { StateProvider } from "./context/StateProvider";
import reducer, { initialState } from "./context/reducer";
import Results from "./components/Results/Results";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="app">
      <p
        className="visually-hidden"
        style={{ fontFamily: "'Geostar Fill', cursive" }}
      >
        font loader
      </p>
      <Header />
      <Route path="/game" component={Game} />
      <Route path="/results" component={Results} />
      <Route path="/" exact component={Login} />
    </div>
  );
}

const AppContainer = () => {
  return (
    <StateProvider reducer={reducer} initialState={initialState}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  );
};

export default AppContainer;
