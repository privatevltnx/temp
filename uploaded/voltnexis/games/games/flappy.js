const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const birdImg = new Image();
birdImg.src = 'assets/images/bird.png';

let bird = { x: 100, y: 300, dy: 0, size: 20 };
let pipes = [];
let score = 0;

function resetGame() {
  bird = { x: 100, y: 300, dy: 0, size: 20 };
  pipes = [];
  score = 0;
}

function flap() {
  bird.dy = -8;
}

function update() {
  // Bird physics
  bird.dy += 0.4;
  bird.y += bird.dy;
  
  // Spawn pipes
  if (Math.random() < 0.01) {
    let gap = 150;
    let pipeY = Math.random() * (canvas.height - gap - 100) + 50;
    pipes.push({ x: canvas.width, topH: pipeY, botY: pipeY + gap });
  }
  
  // Move pipes
  pipes.forEach(pipe => pipe.x -= 3);
  pipes = pipes.filter(pipe => pipe.x > -50);
  
  // Check collision
  pipes.forEach(pipe => {
    if (bird.x + bird.size > pipe.x && bird.x < pipe.x + 50) {
      if (bird.y < pipe.topH || bird.y + bird.size > pipe.botY) {
        saveScore('flappy', Math.floor(score/100));
        resetGame();
      }
    }
  });
  
  // Check bounds
  if (bird.y < 0 || bird.y > canvas.height) {
    saveScore('flappy', Math.floor(score/100));
    resetGame();
  }
  
  score++;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw bird
  if (birdImg.complete) {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.size, bird.size);
  } else {
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
  }
  
  // Draw pipes
  ctx.fillStyle = '#00ff88';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 50, pipe.topH);
    ctx.fillRect(pipe.x, pipe.botY, 50, canvas.height - pipe.botY);
  });
  
  // Draw score and high score
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + Math.floor(score/100), 10, 30);
  ctx.fillText('High: ' + getHighScore('flappy'), 10, 55);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') flap();
});

canvas.addEventListener('click', flap);
gameLoop();