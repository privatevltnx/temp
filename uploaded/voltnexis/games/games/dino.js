const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const dinoImg = new Image();
dinoImg.src = 'assets/images/dino.png';
const obstacleImg = new Image();
obstacleImg.src = 'assets/images/obstacle.png';

let dino = { x: 50, y: 500, w: 40, h: 40, dy: 0, grounded: true };
let obstacles = [];
let score = 0;
let gameSpeed = 2;

function resetGame() {
  dino = { x: 50, y: 500, w: 40, h: 40, dy: 0, grounded: true };
  obstacles = [];
  score = 0;
  gameSpeed = 2;
}

function jump() {
  if (dino.grounded) {
    dino.dy = -12;
    dino.grounded = false;
  }
}

function update() {
  // Dino physics
  dino.dy += 0.5;
  dino.y += dino.dy;
  if (dino.y >= 500) {
    dino.y = 500;
    dino.grounded = true;
    dino.dy = 0;
  }

  // Spawn obstacles
  if (Math.random() < 0.01) {
    obstacles.push({ x: 800, y: 520, w: 20, h: 20 });
  }

  // Move obstacles
  obstacles.forEach(obs => obs.x -= gameSpeed);
  obstacles = obstacles.filter(obs => obs.x > -obs.w);

  // Check collision
  obstacles.forEach(obs => {
    if (dino.x < obs.x + obs.w && dino.x + dino.w > obs.x && 
        dino.y < obs.y + obs.h && dino.y + dino.h > obs.y) {
      saveScore('dino', Math.floor(score/10));
      resetGame();
    }
  });

  score++;
  gameSpeed += 0.001;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw ground
  ctx.fillStyle = '#00ff88';
  ctx.fillRect(0, 540, canvas.width, 60);
  
  // Draw dino
  if (dinoImg.complete) {
    ctx.drawImage(dinoImg, dino.x, dino.y, dino.w, dino.h);
  } else {
    ctx.fillStyle = '#fff';
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
  }
  
  // Draw obstacles
  obstacles.forEach(obs => {
    if (obstacleImg.complete) {
      ctx.drawImage(obstacleImg, obs.x, obs.y, obs.w, obs.h);
    } else {
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
    }
  });
  
  // Draw score and high score
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + Math.floor(score/10), 10, 30);
  ctx.fillText('High: ' + getHighScore('dino'), 10, 55);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') jump();
});

canvas.addEventListener('click', jump);
gameLoop();