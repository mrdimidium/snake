import { Snake } from "./snake.js";
import { Board } from "./board.js";
import { Render } from "./render.js";

export class Game {
  constructor(canvas, options, onEnd) {
    this.options = options;
    this.onEnd = onEnd;

    this.snake = new Snake(options)
    this.board = new Board(this.snake, options);
    this.render = new Render(canvas, this.board, options);

    const step = () => {
      this.step();

      if (!this.isEnd)
        setTimeout(() => window.requestAnimationFrame(step), this.options.speed);
    };

    window.requestAnimationFrame(step);
  }

  step() {
    this.snake.step();

    if (this.isBoardFull()) {
      this.onEnd(true);
      this.isEnd = true;
      return;
    }

    if (this.snake.isSlammed()) {
      this.onEnd();
      this.isEnd = true;
      return;
    }

    if (this.checkEaten()) {
      this.snake.add();
      this.board.setEat();
    }

    this.render.render();
  }

  isBoardFull() {
    return !!(this.snake.cells.length === this.options.boardSize ** 2)
  }

  checkEaten() {
    if (
      this.snake.head.x === this.board.eat.x &&
      this.snake.head.y === this.board.eat.y 
    ) {
      return true;
    }
  }

  changeDirection(direction) {
    this.snake.changeDirection(direction);
  }
};

