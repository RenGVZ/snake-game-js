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
let score = 0;
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
createFood();
main();

function main() {
  // if (didEndGame()) return;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
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
  const didCollide = snake.forEach(part => {
    snake[0] === snake[part]
    });
  if (didCollide) {
    alert('failed');
  }
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    score += 10;
    document.getElementById('score').innerText = score;
    createFood();
  } else { 
    snake.pop();
  };
}
// returns true if the conditions to end the game were met, false if otherwise
function didEndGame() {
  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x 
      && snake[i].y === snake[0].y
    if (didCollide) return true }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x < canvas.width - 10;
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

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'darkred';
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
};