import { randomNumber, randomOf } from "./utils.js";

export const DIRECTION_UP = -1;
export const DIRECTION_DOWN = 1;
export const DIRECTION_LEFT = -2;
export const DIRECTION_RIGHT = 2;

export class Snake {
  constructor(options) {
    this.options = options;

    this.direction = randomOf([
      DIRECTION_UP,
      DIRECTION_DOWN,
      DIRECTION_LEFT,
      DIRECTION_RIGHT,
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
    const tail = this.cells[this.cells.length - 1];

    this.cells.push({ ...tail });
  }

  step() {
    this.cells = [{ ...this.cells[0] }, ...this.cells.slice(0, this.cells.length - 1)];

    const [head] = this.cells;
    if (this.direction === DIRECTION_LEFT)
      head.x = this.normalize(head.x - 1);

    if (this.direction === DIRECTION_RIGHT)
      head.x = this.normalize(head.x + 1);

    if (this.direction === DIRECTION_UP)
      head.y = this.normalize(head.y - 1);

    if (this.direction === DIRECTION_DOWN)
      head.y = this.normalize(head.y + 1);    
  }

  normalize(data) {
    if (data >= this.options.boardSize) return 0;
    if (data < 0) return this.options.boardSize - 1;

    return data;
  }
}