import React, { Component } from "react";
import Game from "./Game";

class GameContainer extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.state = {
      game: null,
    };
  }

  componentDidMount() {
    this.setState({ game: new Game() });
  }

  componentDidUpdate() {
    return false;
  }

  componentUnmount() {
    this.setState({ game: null });
  }

  render() {
    return <div className="GameContainer" id="GameContainer" />;
  }
}

export default GameContainer;
