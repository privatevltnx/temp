const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let blocks = [{ x: 300, y: 550, w: 200, h: 50 }];
let currentBlock = { x: 0, y: 500, w: 200, h: 50, dx: 3 };
let score = 0;
let gameOver = false;

function resetGame() {
  blocks = [{ x: 300, y: 550, w: 200, h: 50 }];
  currentBlock = { x: 0, y: 500, w: 200, h: 50, dx: 3 };
  score = 0;
  gameOver = false;
}

function update() {
  if (gameOver) return;
  
  currentBlock.x += currentBlock.dx;
  if (currentBlock.x <= 0 || currentBlock.x + currentBlock.w >= canvas.width) {
    currentBlock.dx *= -1;
  }
}

function dropBlock() {
  if (gameOver) return;
  
  let lastBlock = blocks[blocks.length - 1];
  let overlap = Math.max(0, Math.min(currentBlock.x + currentBlock.w, lastBlock.x + lastBlock.w) - 
                         Math.max(currentBlock.x, lastBlock.x));
  
  if (overlap === 0) {
    gameOver = true;
    saveScore('stack', score);
    setTimeout(() => resetGame(), 1000);
    return;
  }
  
  currentBlock.w = overlap;
  currentBlock.x = Math.max(currentBlock.x, lastBlock.x);
  currentBlock.y = lastBlock.y - 50;
  
  blocks.push({...currentBlock});
  score++;
  
  currentBlock = { 
    x: 0, 
    y: currentBlock.y - 50, 
    w: overlap, 
    h: 50, 
    dx: 3 + score * 0.2 
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw blocks
  ctx.fillStyle = '#00ff88';
  blocks.forEach(block => ctx.fillRect(block.x, block.y, block.w, block.h));
  
  // Draw current block
  if (!gameOver) {
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(currentBlock.x, currentBlock.y, currentBlock.w, currentBlock.h);
  }
  
  // Draw score and high score
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
  ctx.fillText('High: ' + getHighScore('stack'), 10, 55);
  
  if (gameOver) {
    ctx.font = '40px Arial';
    ctx.fillText('Game Over!', canvas.width/2 - 100, canvas.height/2);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') dropBlock();
});

canvas.addEventListener('click', dropBlock);
gameLoop();