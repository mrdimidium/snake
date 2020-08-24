import { Snake } from "./snake.js";
import { Render } from "./render.js";
import { randomNumber } from "./utils.js";

export class Game {
  constructor(canvas, options, onEnd) {
    this.options = options;
    this.onEnd = onEnd;

    this.snake = new Snake(options)
    this.render = new Render(canvas, options);

    const step = () => {
      this.step();

      if (!this.isEnd)
        setTimeout(() => window.requestAnimationFrame(step), this.options.speed);
    };

    this.setEat();
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
      this.setEat();
    }

    this.render.render(this.snake, this.eat);
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

  isBoardFull() {
    return !!(this.snake.cells.length === this.options.boardSize ** 2)
  }

  checkEaten() {
    if (
      this.snake.head.x === this.eat.x &&
      this.snake.head.y === this.eat.y 
    ) {
      return true;
    }
  }

  changeDirection(direction) {
    this.snake.changeDirection(direction);
  }
};

