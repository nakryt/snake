import Phaser from "phaser";

import { Food } from "../objects/Food";
import { Snake } from "../objects/Snake";

export class GameScene extends Phaser.Scene {
  private snake?: Snake;
  private food?: Food;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("body", "assets/img/player.png");
    this.load.image("food", "assets/img/coin.png");
  }

  create() {
    this.snake = new Snake(this, 8, 8);
    this.food = new Food(this, 3, 4);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number) {
    if (!this.snake?.getIsAlive()) {
      this.scene.start("MenuScene", { score: this.food?.getTotal() });
    }

    this.cursors?.left.isDown && this.snake?.headLeft();
    this.cursors?.right.isDown && this.snake?.headRight();
    this.cursors?.up.isDown && this.snake?.headUp();
    this.cursors?.down.isDown && this.snake?.headDown();

    if (
      this.snake?.update(time) &&
      this.food &&
      this.snake?.collideWithFood(this.food)
    ) {
      this.repositionFood();
    }
  }

  repositionFood() {
    const testGrid: boolean[][] = [];
    for (let y = 0; y < 38; y++) {
      testGrid[y] = [];
      for (let x = 0; x < 50; x++) {
        testGrid[y][x] = true;
      }
    }

    this.snake?.updateGrid(testGrid);

    const validLocations = [];

    for (let y = 0; y < 38; y++) {
      for (let x = 0; x < 50; x++) {
        if (testGrid[y][x]) {
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      const pos = Phaser.Math.RND.pick(validLocations);
      this.food?.setPosition(pos.x * 16, pos.y * 16);
      return true;
    } else {
      return false;
    }
  }
}
