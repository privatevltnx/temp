# 🦖 Chrome Dino Replacement: Offline Game Hub

## Features
- ✅ 6 Endless mini-games
- ✅ High score system with localStorage
- ✅ Fullscreen game mode
- ✅ Sound effects
- ✅ Responsive design

## Games Included
1. **🦖 Dino Run** - Jump over obstacles (Space/Click)
2. **🐦 Flappy** - Navigate through pipes (Space/Click)
3. **🏓 Pong** - Keep the ball alive (Arrow keys/Mouse)
4. **🐍 Snake** - Classic snake game (Arrow keys)
5. **🚗 Car Dodge** - Avoid traffic (Arrow keys)
6. **📦 Block Stack** - Stack blocks precisely (Space/Click)

## Assets Needed

### Images (Optional - games work with basic shapes)
Create these sprites in `assets/images/`:
- `dino.png` (40x40) - Green dinosaur sprite
- `car.png` (50x80) - Blue car sprite  
- `bird.png` (20x20) - Yellow bird sprite
- `block.png` (200x50) - Red block sprite
- `obstacle.png` (20x20) - Red obstacle sprite
- `pipe.png` (50x400) - Green pipe sprite

### Sounds (Auto-generated with Web Audio API)
- Jump sound - High pitch beep
- Score sound - Rising tone
- Game over sound - Descending tone

## How to Add Real Assets

1. **Images**: Replace basic rectangles with sprites
```javascript
// Instead of: ctx.fillRect(x, y, w, h);
// Use: ctx.drawImage(spriteImage, x, y, w, h);
```

2. **Sounds**: Replace Web Audio with actual files
```javascript
// Instead of: sounds.jump();
// Use: new Audio('assets/sounds/jump.mp3').play();
```

## File Structure
```
my-game-hub/
├── index.html          # Main hub
├── style.css           # Styles
├── games/              # Game files
│   ├── dino.js
│   ├── flappy.js
│   ├── pong.js
│   ├── snake.js
│   ├── dodge.js
│   └── stack.js
└── assets/             # Game assets
    ├── images/         # Sprite images
    ├── sounds/         # Sound effects
    ├── sounds.js       # Web Audio system
    └── sprite-generator.html # Tool to create sprites
```

## Controls
- **Dino/Flappy/Stack**: Space or Click
- **Snake**: Arrow keys
- **Car Dodge**: Left/Right arrows
- **Pong**: Arrow keys or Mouse

## High Scores
- Automatically saved to localStorage
- View all scores with "🏆 High Scores" button
- Displayed in each game

## Browser Compatibility
- Works in all modern browsers
- No external dependencies
- Fully offline capable