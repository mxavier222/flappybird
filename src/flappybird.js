// Board setup
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Bird setup
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

// Physics variables
let velocityY = 0; // Bird’s vertical speed
let gravity = 0.4; 
let jumpStrength = -8; 

let isRunning = true;

// Load game
window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // Load bird image
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () {
    requestAnimationFrame(update);
  };

  // Input listeners
  document.addEventListener("keydown", handleInput);
  document.addEventListener("click", handleInput);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  if (isRunning) {
    birdY = Math.min(Math.max(birdY + velocityY, 0), boardHeight - birdHeight);
    velocityY += gravity;

    if (birdY === boardHeight - birdHeight || birdY === 0) {
      gameOver();
    }
  }

  drawBird();

  if (!isRunning) {
    drawGameOver();
  }
}

// Draw bird
function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

function handleInput(e) {
  if (isRunning) {

    if (e.code === "Space" || e.type === "click") {
      velocityY = jumpStrength; 

    }
  } else {
    if (e.code === "KeyR" || e.type === "click") {
      restartGame();
    }
  }
}

function gameOver() {
  isRunning = false;
  velocityY = 0;
}

function restartGame() {
  birdY = boardHeight / 2;
  velocityY = 0;
  isRunning = true;
}

// Display Game Over message
function drawGameOver() {
  context.fillStyle = "red";
  context.font = "28px Courier";
  context.fillText("GAME OVER", 90, boardHeight / 2);
  context.font = "18px Courier";
  context.fillStyle = "black";
  context.fillText("Press R or Click to Restart", 50, boardHeight / 2 + 40);
}
