import Phaser from "phaser";
import { Food } from "./Food";

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export class Snake extends Phaser.Physics.Arcade.Sprite {
  private objectBody: Phaser.GameObjects.Group;
  private head: Phaser.Geom.Point;
  private headPosition: Phaser.Geom.Point;
  private tail: Phaser.Geom.Point;

  private speed: number;
  private moveTime: number;
  private isAlive: boolean;

  private heading: Direction;
  private direction: Direction;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "assets/img/player.png");

    this.objectBody = this.scene.add.group();
    this.headPosition = new Phaser.Geom.Point(x, y);
    this.head = this.objectBody.create(x * 16, y * 16, "body");
    // @ts-ignore
    this.head.setOrigin(0);
    this.tail = new Phaser.Geom.Point(x, y);

    this.isAlive = true;
    this.speed = 100;
    this.moveTime = 0;

    this.heading = Direction.RIGHT;
    this.direction = Direction.RIGHT;
  }

  create() {}

  update(time: number) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  headLeft() {
    if (this.direction === Direction.UP || this.direction === Direction.DOWN) {
      this.heading = Direction.LEFT;
    }
  }

  headRight() {
    if (this.direction === Direction.UP || this.direction === Direction.DOWN) {
      this.heading = Direction.RIGHT;
    }
  }

  headUp() {
    if (
      this.direction === Direction.LEFT ||
      this.direction === Direction.RIGHT
    ) {
      this.heading = Direction.UP;
    }
  }

  headDown() {
    if (
      this.direction === Direction.LEFT ||
      this.direction === Direction.RIGHT
    ) {
      this.heading = Direction.DOWN;
    }
  }

  move(time: number) {
    const headPositionHandler = (headPos: number, max: number): number => {
      return Phaser.Math.Wrap(headPos, 0, max);
    };
    const position = {
      [Direction.LEFT]: headPositionHandler(this.headPosition.x - 1, 50),
      [Direction.RIGHT]: headPositionHandler(this.headPosition.x + 1, 50),
      [Direction.UP]: headPositionHandler(this.headPosition.y - 1, 38),
      [Direction.DOWN]: headPositionHandler(this.headPosition.y + 1, 38),
    };

    if (this.heading === Direction.LEFT || this.heading === Direction.RIGHT) {
      this.headPosition.x = position[this.heading];
    } else {
      this.headPosition.y = position[this.heading];
    }

    this.direction = this.heading;

    // Mistake tail in the end of function
    Phaser.Actions.ShiftPosition(
      this.objectBody.getChildren(),
      this.headPosition.x * 16,
      this.headPosition.y * 16,
      1
    );

    const hitBody = Phaser.Actions.GetFirst(
      this.objectBody.getChildren(),
      { x: this.head.x, y: this.head.y },
      1
    );

    if (hitBody) {
      this.isAlive = false;
      return false;
    } else {
      this.moveTime = time + this.speed;
      return true;
    }
  }

  grow() {
    const newPart = this.objectBody.create(
      this.tail.x + 16,
      this.tail.y + 16,
      "body"
    );
    newPart.setOrigin(0);
  }

  collideWithFood(food: Food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();
      food.eat();

      if (this.speed > 20) {
        this.speed -= 2;
      }
      return true;
    }
    return false;
  }

  getIsAlive() {
    return this.isAlive;
  }
}
