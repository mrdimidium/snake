import { createArray } from "./utils.js";

export const CELL_EMPTY = 0;
export const CELL_SNAKE = 1;
export const CELL_SNAKE_HEAD = 2;
export const CELL_EAT = 3;

export class Render {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.options = options;

    this.context = canvas.getContext("2d");

    const { offsetWidth: width, offsetHeight: height } = this.canvas;

    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;

    this.cellSize = {
      width: width / options.boardSize,
      height: height / options.boardSize,
    };

    // Init styling
    this.context.fillStyle = "white";
  }

  render(snake, eat) {
    this.context.clearRect(0, 0, this.width, this.height);

    this.renderCell(eat.x, eat.y, CELL_EAT)
    this.renderCell(snake.head.x, snake.head.y, CELL_SNAKE_HEAD)

    snake.cells.slice(1).forEach(({ x, y }) => {
      this.renderCell(x, y, CELL_SNAKE);
    });
  }

  renderCell(y, x, cell) {
    const { width, height } = this.cellSize;
    const cellSize = Math.min(width, height);

    if (cell === CELL_EMPTY) return;

    this.context.beginPath();

    const startX = x * height;
    const startY = y * width;
    const borderWidth = cellSize * 0.1;

    if (cell === CELL_EAT) {
      this.context.arc(
        startY + width / 2,
        startX + height / 2,
        (cellSize / 2) - borderWidth,
        0, 360
      );
      this.context.fill();

      return;
    }

    this.context.fillRect(
      startY + borderWidth, startX + borderWidth,
      width - borderWidth * 2, height - borderWidth * 2
    );

    if (cell === CELL_SNAKE_HEAD) {
      const eyeWidth = width * 0.3;
      const eyeHeight = height * 0.3;

      this.context.clearRect(
        startY + (width - eyeWidth) / 2,
        startX + (height - eyeHeight) / 2,
        eyeWidth,
        eyeHeight
      );
    }
  }
}
