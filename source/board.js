import { createArray, randomNumber } from "./utils.js";

export const CELL_EMPTY = 0;
export const CELL_SNAKE = 1;
export const CELL_SNAKE_HEAD = 2;
export const CELL_EAT = 3;

export class Board {
  constructor(snake, options) {
    this.snake = snake;
    this.options = options;

    this.setEat();
  }

  setEat() {
    this.eat = {
      x: randomNumber(0, this.options.boardSize - 1),
      y: randomNumber(0, this.options.boardSize - 1),
    };

    if (
      this.snake.cells.find(({ x, y }) => this.eat.x === x && this.eat.y === y)
    ) {
      return this.setEat();
    }
  }

  get cells() {
    const { boardSize: size } = this.options;

    const board = this.snake.cells.slice(1).reduce((board, { x, y }) => {
      board[y][x] = CELL_SNAKE;
      return board;
    }, createArray(size, () => createArray(size, CELL_EMPTY)))

    board[this.snake.head.y][this.snake.head.x] = CELL_SNAKE_HEAD;
    board[this.eat.y][this.eat.x] = CELL_EAT;

    return board.reverse();
  }
}