const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 200, y: 200 }];
let food = { x: 300, y: 300 };
let dx = 20, dy = 0;
let score = 0;

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  food = { x: 300, y: 300 };
  dx = 20; dy = 0;
  score = 0;
  spawnFood();
}

function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
  food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
}

function update() {
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  
  // Wrap around edges
  if (head.x < 0) head.x = canvas.width - 20;
  if (head.x >= canvas.width) head.x = 0;
  if (head.y < 0) head.y = canvas.height - 20;
  if (head.y >= canvas.height) head.y = 0;
  
  // Check self collision
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    saveScore('snake', score);
    resetGame();
  }
  
  snake.unshift(head);
  
  // Check food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw snake
  ctx.fillStyle = '#00ff88';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 18, 18));
  
  // Draw food
  ctx.fillStyle = '#ff4444';
  ctx.fillRect(food.x, food.y, 18, 18);
  
  // Draw score and high score
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
  ctx.fillText('High: ' + getHighScore('snake'), 10, 55);
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 150);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -20; }
  if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 20; }
  if (e.key === 'ArrowLeft' && dx === 0) { dx = -20; dy = 0; }
  if (e.key === 'ArrowRight' && dx === 0) { dx = 20; dy = 0; }
});

gameLoop();