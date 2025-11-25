// Board Setup
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Bird Setup
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let velocityY = 0;
let gravity = 0.4;
let jumpStrength = -8;

let gameState = "RUNNING";

//  Pipe Setup
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeGap = 150;
let pipeSpeed = -1;
let topPipeImg;
let bottomPipeImg;
let frame = 0;

// Load Game
window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // Load bird image
  birdImg = new Image();
  birdImg.src = "./flappybird.png";

  // Load pipes
  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  birdImg.onload = function () {
    requestAnimationFrame(update);
  };

  // Input listeners
  document.addEventListener("keydown", handleInput);
  document.addEventListener("click", handleInput);
};

//  Update Loop
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  if (gameState === "RUNNING") {
    velocityY += gravity;
    birdY += velocityY;

    if (birdY + birdHeight >= boardHeight) {
      birdY = boardHeight - birdHeight;
      gameOver();
    } else if (birdY <= 0) {
      birdY = 0;
      gameOver();
    }

    //  Move and draw pipes
    for (let i = 0; i < pipeArray.length; i++) {
      let pipe = pipeArray[i];
      pipe.x += pipeSpeed;
      context.drawImage(pipe.img, pipe.x, pipe.y, pipeWidth, pipeHeight);
      console.log(pipe.type);
      if (
        birdX < pipe.x + pipeWidth && // bird left  < pipe right
        birdX + birdWidth > pipe.x && // bird right > pipe left
        birdY < pipe.y + pipeHeight && // bird top   < pipe bottom
        birdY + birdHeight > pipe.y // bird bottom> pipe top
      ) {
        console.log(
          "collision",
          birdX < pipe.x + pipeWidth, // bird left  < pipe right
          birdX + birdWidth > pipe.x, // bird right > pipe left
          birdY < pipe.y + pipeHeight, // bird top   < pipe bottom
          birdY + birdHeight > pipe.y // bird bottom> pipe top
        );
        gameOver();
      }
    }

    // Spawn new pipes every 90 frames
    if (frame % 90 === 0) {
      spawnPipe();
    }

    frame++;
  }

  // Draw bird
  drawBird();

  // Draw Game Over message
  if (gameState === "GAME_OVER") {
    drawGameOver();
  }
}
function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

//  Spawn Pipe
function spawnPipe() {
  let randomPipeY = -pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let topPipe = {
    img: topPipeImg,
    x: boardWidth,
    y: randomPipeY,
    type: "top",
  };
  let bottomPipe = {
    img: bottomPipeImg,
    x: boardWidth,
    y: randomPipeY + pipeHeight + pipeGap,
    type: "bottom",
  };
  pipeArray.push(topPipe);
  pipeArray.push(bottomPipe);
}

//  Handle Input
function handleInput(e) {
  if (gameState === "RUNNING") {
    if (e.code === "Space" || e.type === "click") {
      velocityY = jumpStrength;
    }
  } else if (gameState === "GAME_OVER") {
    if (e.code === "KeyR" || e.type === "click") {
      restartGame();
    }
  }
}

// Game Over
function gameOver() {
  gameState = "GAME_OVER";
  velocityY = 0;
}

// Restart Game
function restartGame() {
  birdY = boardHeight / 2;
  velocityY = 0;
  pipeArray = [];
  frame = 0;
  gameState = "RUNNING";
}

// Draw Game Over
function drawGameOver() {
  context.fillStyle = "red";
  context.font = "28px Courier";
  context.fillText("GAME OVER", 90, boardHeight / 2);
  context.font = "18px Courier";
  context.fillStyle = "black";
  context.fillText("Press R or Click to Restart", 50, boardHeight / 2 + 40);
}
