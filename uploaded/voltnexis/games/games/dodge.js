const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const carImg = new Image();
carImg.src = 'assets/images/car.png';

let car = { x: 375, y: 500, w: 50, h: 80 };
let enemies = [];
let score = 0;
let speed = 2;

function resetGame() {
  car = { x: 375, y: 500, w: 50, h: 80 };
  enemies = [];
  score = 0;
  speed = 2;
}

function update() {
  // Spawn enemies
  if (Math.random() < 0.02) {
    enemies.push({ 
      x: Math.random() * (canvas.width - 50), 
      y: -80, 
      w: 50, 
      h: 80 
    });
  }
  
  // Move enemies
  enemies.forEach(enemy => enemy.y += speed);
  enemies = enemies.filter(enemy => enemy.y < canvas.height);
  
  // Check collision
  enemies.forEach(enemy => {
    if (car.x < enemy.x + enemy.w && car.x + car.w > enemy.x && 
        car.y < enemy.y + enemy.h && car.y + car.h > enemy.y) {
      saveScore('dodge', Math.floor(score/10));
      resetGame();
    }
  });
  
  score++;
  speed += 0.001;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw road
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  for (let i = 0; i < canvas.height; i += 40) {
    ctx.fillRect(canvas.width/2 - 2, i, 4, 20);
  }
  
  // Draw car
  if (carImg.complete) {
    ctx.drawImage(carImg, car.x, car.y, car.w, car.h);
  } else {
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(car.x, car.y, car.w, car.h);
  }
  
  // Draw enemies
  enemies.forEach(enemy => {
    if (carImg.complete) {
      ctx.drawImage(carImg, enemy.x, enemy.y, enemy.w, enemy.h);
    } else {
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    }
  });
  
  // Draw score and high score
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + Math.floor(score/10), 10, 30);
  ctx.fillText('High: ' + getHighScore('dodge'), 10, 55);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && car.x > 0) car.x -= 20;
  if (e.key === 'ArrowRight' && car.x < canvas.width - car.w) car.x += 20;
});

gameLoop();