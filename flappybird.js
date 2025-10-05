// Board setup
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
  birdImg.src = "src/flappybird.png";

  topPipeImg = new Image();
  topPipeImg.src = "src/toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "src/bottompipe.png";

  // When all are loaded, draw
  bottomPipeImg.onload = function () {
    drawScene();
  };
};

function drawScene() {
  context.clearRect(0, 0, boardWidth, boardHeight);

  // Draw bird
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);

  // Center the pipe pair vertically
  let centerY = boardHeight / 2; // from top
  let topPipeY = centerY - pipeHeight - gap / 2;
  let bottomPipeY = centerY + gap / 2; //  just below center

  // Draw top pipe
  context.drawImage(topPipeImg, pipeX, topPipeY, pipeWidth, pipeHeight);

  // Draw bottom pipe
  context.drawImage(bottomPipeImg, pipeX, bottomPipeY, pipeWidth, pipeHeight);
}
