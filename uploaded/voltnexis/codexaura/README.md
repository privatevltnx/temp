# CodeXaurA - AI Coding Assistant

## Quick Start

### For Windows Users:
1. Double-click `server.bat` to start the local server
2. Your browser will automatically open to `http://localhost:8000`

### For Other Systems:
1. Open terminal in this folder
2. Run: `python server.py`
3. Open browser to `http://localhost:8000`

## Important Notes

- **Don't open index.html directly** - this causes CORS errors
- **Always use the local server** for proper functionality
- The app needs server environment to communicate with the AI backend

## Features

- Mobile-responsive design
- VSCode-like syntax highlighting for multiple languages
- Real-time code highlighting with copy functionality
- User authentication with Google OAuth
- Chat history management
- Incognito mode for temporary chats

## Troubleshooting

If you see CORS errors:
1. Make sure you're using the server (server.bat or server.py)
2. Don't open the HTML file directly in browser
3. Check that port 8000 is available