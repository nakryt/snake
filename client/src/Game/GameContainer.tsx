import React, { Component } from "react";
import Game from "./Game";
import { useStateValue } from "../context/StateProvider";
import { Redirect } from "react-router-dom";

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

const GameContainerWrapper = () => {
  const {
    state: { user },
  } = useStateValue();
  if (!user.id) return <Redirect to="/" />;
  return <GameContainer />;
};

export default GameContainerWrapper;
