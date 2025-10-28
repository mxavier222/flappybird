// Board Setup
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Bird setup
let birdWidth = 34; // 17:12 ratio
let birdHeight = 24;
let birdX = boardWidth / 8; // slightly left
let birdY = boardHeight / 2 - birdHeight / 2;
let birdImg;

// Bird physics
let velocityY = 0;
let gravity = 0.4;
let jumpStrength = -8;

// Pipe setup
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth / 2 - pipeWidth / 2; // Center pipes horizontally
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;
let gap = 150; // space between pipes

window.onload = function () {
  // Setup canvas
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  // Load images
  birdImg = new Image();
  birdImg.src = "flappybird.png";

  topPipeImg = new Image();
  topPipeImg.src = "toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "bottompipe.png";

  // When bottom pipe image loads, start game
  bottomPipeImg.onload = function () {
    requestAnimationFrame(update);
  };

  // Listen for spacebar to make bird jump
  document.addEventListener("keydown", moveBird);
};

// Draw the bird
function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

// Draw the pipes
function drawPipes() {
  let centerY = boardHeight / 2;
  let topPipeY = centerY - pipeHeight - gap / 2;
  let bottomPipeY = centerY + gap / 2;

  context.drawImage(topPipeImg, pipeX, topPipeY, pipeWidth, pipeHeight);
  context.drawImage(bottomPipeImg, pipeX, bottomPipeY, pipeWidth, pipeHeight);
}

// Main game loop
function update() {
  // Keeps the game updating
  requestAnimationFrame(update);
  console.log("Game updating...");

  // Clear canvas
  context.clearRect(0, 0, board.width, board.height);

  // Apply gravity
  velocityY += gravity;
  birdY += velocityY;

  // Prevent bird from falling below the canvas
  if (birdY + birdHeight > boardHeight) {
    birdY = boardHeight - birdHeight;
    velocityY = 0;
  }

  // Draw updated scene
  drawPipes();
  drawBird();
}

// Make the bird jump
function moveBird(e) {
  if (e.code === "Space") {
    velocityY = jumpStrength; // Move bird up
  }
}
