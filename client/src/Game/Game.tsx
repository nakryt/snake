import Phaser from "phaser";

import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";

const scene = [MenuScene, GameScene];

type GameConfig = Phaser.Types.Core.GameConfig;

export default class Game extends Phaser.Game {
  constructor() {
    const config: GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#333",
      scene: scene,
      parent: "GameContainer",
    };

    super(config);
  }
}
