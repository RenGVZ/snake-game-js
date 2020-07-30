const CANVAS_BACKGROUND = 'white';
const CANVAS_BORDER = 'green';
const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER = 'darkgreen';

// initialize snake
let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150},
]
// horizontal velocity
let dx = 10;
// vertical velocity
let dy = 0;

// get the canvas element
let canvas = document.getElementById('gameCanvas');
// return a 2 dimansional drawing context
let ctx = canvas.getContext("2d");
// select color to fill the canvas
ctx.fillStyle = CANVAS_BACKGROUND;
// select color to fill the border of the canvas
ctx.strokeStyle = CANVAS_BORDER;
// draw a 'filled' rectangle to cover the entire canvas
ctx.fillRect(0, 0, canvas.width, canvas.height);
// draw a bvorder around the entire canvas
ctx.strokeRect(0, 0, canvas.width, canvas.height);

/**
       * Advances the snake by changing the x-coordinates of its parts
       * according to the horizontal velocity and the y-coordinates of its parts
       * according to the vertical veolocity
*/
// move to the right
// advanceSnake();
// change vertical velocity to 0
// dx = 0;
// change horizontal velocity to 10
// dy = -10;
// move 1 step up
// advanceSnake();
// draw snake on the canvas
// drawSnake();

main();

function main() {
  setTimeout(function onTick() {
    clearCanvas();
    advanceSnake();
    drawSnake();
    // call 'main' function over and over again
    main();
  }, 100);
}

document.addEventListener('keydown', changeDirection)

function advanceSnake() {
  const head = { 
    x: snake[0].x + dx, 
    y: snake[0].y + dy 
  };
  snake.unshift(head)
  snake.pop()
}

// display the snake on the canvas, this is a function to draw a rectangle for each pair of coordinates
function drawSnakePart(snakePart) {
  ctx.fillStyle = SNAKE_COLOR;
  ctx.strokeStyle = SNAKE_BORDER;
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function changeDirection(event) {
  const LEFT_KEY = 37; const RIGHT_KEY  = 39;
  const UP_KEY = 38; const DOWN_KEY = 40;
  const keyPressed = event.keyCode; const goingUp = dy === -10;
  const goingDown = dy === 10; const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

// clear canvas function
function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND;
  ctx.strokeStyle = CANVAS_BORDER;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
