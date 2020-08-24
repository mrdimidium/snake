import { Game } from "./game.js";
import { throttle } from "./utils.js";
import { DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT } from "./snake.js";

const canvas = document.getElementById("board");

const options = {
  speed: 250,
  boardSize: 25,
};

const game = new Game(canvas, options, (win) => {
  alert(win ? "You win!" : "You lost :-(");
});

document.addEventListener("keyup", throttle((event) => {
  switch (event.code) {
    case "KeyW":
    case "ArrowUp":
      game.changeDirection(DIRECTION_UP);
      break;

    case "KeyS":
    case "ArrowDown":
      game.changeDirection(DIRECTION_DOWN);
      break;

    case "KeyA":
    case "ArrowLeft":
      game.changeDirection(DIRECTION_LEFT);
      break;

    case "KeyD":
    case "ArrowRight":
      game.changeDirection(DIRECTION_RIGHT);
      break;
  }
}, options.speed));
