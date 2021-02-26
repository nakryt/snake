import Phaser from "phaser";
import { setResult } from "../../api/resultAPI";

interface MenuData {
  score?: number;
}

export class MenuScene extends Phaser.Scene {
  private title?: Phaser.GameObjects.Text;
  private button?: Phaser.GameObjects.Text;
  private score?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "MenuScene" });
  }

  init(data: MenuData) {
    if (data.score) {
      this.score = this.add
        .text(400, 400, "Score:", {
          fontSize: "32px",
          fontFamily: "'Geostar Fill', cursive",
        })
        .setOrigin(0)
        .setText(`High scores: ${data.score}`);
      setResult(data.score);
    }
  }

  create() {
    const graphics = this.add.graphics();
    graphics.strokeRect(130, 110, 550, 125);
    graphics.lineStyle(2, 0xffffff, 1);

    this.title = this.add
      .text(140, 100, "Snake", {
        fontSize: "128px",
        fontFamily: "'Geostar Fill', cursive",
        color: "#fff",
      })
      .setOrigin(0);
    this.button = this.add.text(140, 400, "Start", {
      fontSize: "32px",
      fontFamily: "'Geostar Fill', cursive",
      color: "#fff",
    });
    this.button.setInteractive({ useHandCursor: true });
    this.button.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}
