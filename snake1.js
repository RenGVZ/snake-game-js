const GAME_SPEED = 100;
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
  {x: 100, y: 150},
  {x: 90, y: 150},
  {x: 80, y: 150},
  {x: 70, y: 150},
  {x: 60, y: 150},
]
// User score
let score = 0;
// horizontal velocity
let foodX;

let foodY;

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

createFood();
main();

function main() {
  if (didEndGame()) {
    document.querySelector('h1').innerText = "You lost";
    return
  }
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    // call 'main' function over and over again
    main();
  }, GAME_SPEED);
}

document.addEventListener('keydown', changeDirection)

/**
       * Advances the snake by changing the x-coordinates of its parts
       * according to the horizontal velocity and the y-coordinates of its parts
       * according to the vertical veolocity
*/
function advanceSnake() {
  const head = { 
    x: snake[0].x + dx, 
    y: snake[0].y + dy 
  };
  snake.unshift(head)
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    // increase score
    score += 10;
    // display score
    document.getElementById('score').innerText = score;
    // generate new food location
    createFood();
  } else { 
    // remove last part of the snake's body
    snake.pop();
  };
}
// returns true if the conditions to end the game were met, false if otherwise
function didEndGame() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true
    }
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
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
  const keyPressed = event.keyCode; 
  const goingUp = dy === -10; const goingDown = dy === 10; 
  const goingRight = dx === 10; const goingLeft = dx === -10;
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

// generate a random food placement function
function randomTen(min, max) {
  return Math.round((Math.random() * (max-min) + 10) / 10) * 10;
}

// clear canvas function
function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND;
  ctx.strokeStyle = CANVAS_BORDER;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function createFood() {
  foodX = randomTen(0, canvas.width - 10);
  foodY = randomTen(0, canvas.height - 10);
  snake.forEach(function isFoodOnSnake(part) {
    const foodIsOnSnake = part.x == foodX && part.y == foodY;
    if (foodIsOnSnake) {
      createFood();
    }
  });
}
// draw food on the canvas
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'darkred';
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
};