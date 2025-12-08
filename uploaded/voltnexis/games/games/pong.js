const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let paddle = { x: 350, y: 550, w: 100, h: 10 };
let ball = { x: 400, y: 300, dx: 3, dy: 3, size: 10 };
let score = 0;

function resetGame() {
  paddle = { x: 350, y: 550, w: 100, h: 10 };
  ball = { x: 400, y: 300, dx: 3, dy: 3, size: 10 };
  score = 0;
}

function update() {
  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  // Ball collision with walls
  if (ball.x <= 0 || ball.x >= canvas.width - ball.size) ball.dx *= -1;
  if (ball.y <= 0) ball.dy *= -1;
  
  // Ball collision with paddle
  if (ball.y + ball.size >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.w) {
    ball.dy = -Math.abs(ball.dy);
    score++;
    // Increase speed slightly
    ball.dx *= 1.01;
    ball.dy *= 1.01;
  }
  
  // Game over
  if (ball.y > canvas.height) {
    saveScore('pong', score);
    resetGame();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw paddle
  ctx.fillStyle = '#00ff88';
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  
  // Draw ball
  ctx.fillStyle = '#fff';
  ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
  
  // Draw score and high score
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
  ctx.fillText('High: ' + getHighScore('pong'), 10, 55);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && paddle.x > 0) paddle.x -= 20;
  if (e.key === 'ArrowRight' && paddle.x < canvas.width - paddle.w) paddle.x += 20;
});

document.addEventListener('mousemove', e => {
  let rect = canvas.getBoundingClientRect();
  paddle.x = e.clientX - rect.left - paddle.w/2;
  paddle.x = Math.max(0, Math.min(canvas.width - paddle.w, paddle.x));
});

gameLoop();