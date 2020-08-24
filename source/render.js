import { CELL_EMPTY, CELL_SNAKE_HEAD, CELL_EAT } from "./board.js";

export class Render {
  constructor(canvas, board, options) {
    this.board = board;
    this.options = options;

    this.canvas = canvas;
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

  render() {
    const { width, height } = this.cellSize;
    const cellSize = Math.min(width, height);

    this.context.clearRect(0, 0, this.width, this.height);
    this.board.cells.forEach((line, x) => line.forEach((cell, y) => {
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
    }));
  }
}
