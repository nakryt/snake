import Phaser from "phaser";

export class Food extends Phaser.GameObjects.Image {
  private total: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "assets/img/coin.png");

    this.setTexture("food");
    this.setPosition(x * 16, y * 16);
    this.setOrigin(0);

    this.total = 0;

    scene.children.add(this);
  }

  getTotal() {
    return this.total;
  }

  eat() {
    this.total++;
  }
}
