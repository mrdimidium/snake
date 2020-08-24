import { randomNumber, randomOf } from "./utils.js";

export const DIRECTION_UP = -1;
export const DIRECTION_DOWN = 1;
export const DIRECTION_LEFT = -2;
export const DIRECTION_RIGHT = 2;

export class Snake {
  constructor(options) {
    this.options = options;

    this.direction = randomOf([
      DIRECTION_UP, DIRECTION_DOWN,
      DIRECTION_LEFT, DIRECTION_RIGHT,
    ]);

    this.cells = [
      {
        x: randomNumber(0, options.boardSize - 1),
        y: randomNumber(0, options.boardSize - 1),
      },
    ];
  }

  get head() {
    return this.cells[0];
  }

  isSlammed() {
    const [head, ...cells] = this.cells;

    return !!cells.slice(1).find(({ x, y }) => head.x === x && head.y === y);
  }

  changeDirection(direction) {
    if (this.direction + direction === 0) {
      return;
    }

    this.direction = direction;
  }

  add() {
    this.cells.push({
      x: this.cells[this.cells.length - 1].x,
      y: this.cells[this.cells.length - 1].y
    });
  }

  step() {
    const { boardSize } = this.options;

    this.cells = [Object.assign({}, this.cells[0]), ...this.cells];
    this.cells.pop();

    const head = this.cells[0];
    switch (this.direction) {
      case DIRECTION_LEFT:
        head.x -= 1;
        break;

      case DIRECTION_RIGHT:
        head.x += 1;
        break;

      case DIRECTION_UP:
        head.y += 1;
        break;

      case DIRECTION_DOWN:
        head.y -= 1;
        break;
    }

    if (head.x >= boardSize) head.x = 0
    if (head.x < 0) head.x = boardSize - 1;

    if (head.y >= boardSize) head.y = 0
    if (head.y < 0) head.y = boardSize - 1;
  }
}