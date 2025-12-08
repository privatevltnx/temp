class VisualNovel {
    constructor() {
        this.currentScene = 0;
        this.currentDialog = 0;
        this.gameState = { playerName: 'Player', completedRoutes: [] };
        this.relationships = { anna: 0, alex: 0, sam: 0 };
        this.init();
    }

    init() {
        this.setupAgeVerification();
        this.setupEventListeners();
        this.loadGameData();
    }

    setupAgeVerification() {
        const confirmBtn = document.getElementById('confirmAge');
        const denyBtn = document.getElementById('denyAge');
        
        confirmBtn.addEventListener('click', () => {
            document.getElementById('ageModal').classList.add('hidden');
            document.getElementById('gameContainer').classList.remove('hidden');
            this.startGame();
        });
        
        denyBtn.addEventListener('click', () => {
            window.close();
        });
    }

    setupEventListeners() {
        document.getElementById('nextBtn').addEventListener('click', () => this.nextDialog());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveGame());
        document.getElementById('loadBtn').addEventListener('click', () => this.loadGame());
        document.getElementById('settingsBtn').addEventListener('click', () => this.toggleRelationships());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') this.nextDialog();
        });
    }

    startGame() {
        this.displayScene();
        this.updateRelationships();
    }

    displayScene() {
        const scene = this.gameData.scenes[this.currentScene];
        if (!scene) {
            this.showEnding();
            return;
        }

        const dialog = scene.dialogs[this.currentDialog];
        if (!dialog) {
            this.nextScene();
            return;
        }

        document.getElementById('background').style.background = scene.background;
        this.updateCharacters(scene.characters);
        document.getElementById('speakerName').textContent = dialog.speaker || '';
        
        this.typeText(dialog.text);

        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML = '';
        
        if (dialog.choices) {
            dialog.choices.forEach((choice) => {
                if (!choice.condition || this.checkCondition(choice.condition)) {
                    const btn = document.createElement('button');
                    btn.className = 'choice-btn';
                    btn.textContent = choice.text;
                    btn.addEventListener('click', () => this.makeChoice(choice));
                    choicesDiv.appendChild(btn);
                }
            });
            document.getElementById('nextBtn').style.display = 'none';
        } else {
            document.getElementById('nextBtn').style.display = 'flex';
        }
    }

    typeText(text) {
        const element = document.getElementById('dialogText');
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(timer);
        }, 30);
    }

    updateCharacters(characters) {
        const container = document.getElementById('characters');
        container.innerHTML = '';
        
        if (characters) {
            characters.forEach((char, index) => {
                const div = document.createElement('div');
                div.className = 'character';
                div.textContent = char.name;
                div.style.left = `${100 + index * 300}px`;
                div.style.background = char.mood === 'happy' ? 'rgba(76, 205, 196, 0.3)' : 
                                     char.mood === 'sad' ? 'rgba(255, 107, 107, 0.3)' : 
                                     'rgba(255, 255, 255, 0.1)';
                container.appendChild(div);
            });
        }
    }

    makeChoice(choice) {
        if (choice.relationship) {
            this.relationships[choice.relationship.character] += choice.relationship.change;
            this.relationships[choice.relationship.character] = Math.max(0, Math.min(100, this.relationships[choice.relationship.character]));
        }
        
        if (choice.setState) {
            Object.assign(this.gameState, choice.setState);
        }
        
        if (choice.nextScene !== undefined) {
            this.currentScene = choice.nextScene;
            this.currentDialog = 0;
        } else {
            this.currentDialog++;
        }
        
        this.updateRelationships();
        this.displayScene();
    }

    nextDialog() {
        this.currentDialog++;
        this.displayScene();
    }

    nextScene() {
        this.currentScene++;
        this.currentDialog = 0;
        this.displayScene();
    }

    checkCondition(condition) {
        if (condition.relationship) {
            return this.relationships[condition.relationship.character] >= condition.relationship.min;
        }
        return true;
    }

    showEnding() {
        const highestRel = Object.entries(this.relationships).reduce((a, b) => a[1] > b[1] ? a : b);
        const endingText = this.getEndingText(highestRel[0], highestRel[1]);
        
        document.getElementById('speakerName').textContent = 'Ending';
        document.getElementById('dialogText').textContent = endingText;
        document.getElementById('choices').innerHTML = '<button class="choice-btn" onclick="location.reload()">Play Again</button>';
        document.getElementById('nextBtn').style.display = 'none';
    }

    getEndingText(character, score) {
        if (score >= 80) {
            return `You and ${character.charAt(0).toUpperCase() + character.slice(1)} have formed a deep, meaningful connection. Your relationship blossoms into something beautiful and lasting.`;
        } else if (score >= 50) {
            return `You and ${character.charAt(0).toUpperCase() + character.slice(1)} have grown closer, but there's still more to explore in your relationship.`;
        } else {
            return 'You decide to focus on yourself for now, having learned valuable lessons about relationships and personal growth.';
        }
    }

    updateRelationships() {
        const panel = document.getElementById('relationshipList');
        panel.innerHTML = '';
        
        Object.entries(this.relationships).forEach(([name, value]) => {
            const div = document.createElement('div');
            div.className = 'relationship-item';
            div.innerHTML = `
                <div class="relationship-name">${name.charAt(0).toUpperCase() + name.slice(1)} (${value})</div>
                <div class="relationship-bar">
                    <div class="relationship-fill" style="width: ${value}%"></div>
                </div>
            `;
            panel.appendChild(div);
        });
    }

    toggleRelationships() {
        const panel = document.getElementById('relationshipPanel');
        panel.classList.toggle('hidden');
    }

    saveGame() {
        const saveData = {
            currentScene: this.currentScene,
            currentDialog: this.currentDialog,
            relationships: this.relationships,
            gameState: this.gameState
        };
        localStorage.setItem('midnightEncounters_save', JSON.stringify(saveData));
        alert('Game saved!');
    }

    loadGame() {
        const saveData = localStorage.getItem('midnightEncounters_save');
        if (saveData) {
            const data = JSON.parse(saveData);
            this.currentScene = data.currentScene;
            this.currentDialog = data.currentDialog;
            this.relationships = data.relationships;
            this.gameState = data.gameState;
            this.displayScene();
            this.updateRelationships();
            alert('Game loaded!');
        } else {
            alert('No save file found!');
        }
    }

    loadGameData() {
        this.gameData = {
            scenes: [
                {
                    background: 'linear-gradient(135deg, #2c3e50, #34495e)',
                    characters: [],
                    dialogs: [
                        { speaker: 'Narrator', text: 'Welcome to Midnight Encounters. You are about to embark on a journey of romance and self-discovery.' },
                        { speaker: 'Narrator', text: 'Your choices will shape your relationships and determine your path through this story.' },
                        { speaker: 'Narrator', text: 'It\'s a warm summer evening, and you\'ve decided to visit the local coffee shop that just opened downtown.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #8B4513, #D2691E)',
                    characters: [{ name: 'Anna', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Narrator', text: 'As you enter the cozy cafe, you notice a woman sitting alone by the window, reading a book.' },
                        { speaker: 'Anna', text: 'Oh! Excuse me, is this seat taken?' },
                        {
                            speaker: 'Anna',
                            text: 'I\'m Anna. I haven\'t seen you around here before.',
                            choices: [
                                { text: 'I\'m new in town. Nice to meet you, Anna.', relationship: { character: 'anna', change: 10 }, nextScene: 2 },
                                { text: 'Just passing through. Mind if I sit?', relationship: { character: 'anna', change: 5 }, nextScene: 3 }
                            ]
                        }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
                    characters: [{ name: 'Anna', mood: 'happy' }],
                    dialogs: [
                        { speaker: 'Anna', text: 'A new face! How exciting. What brings you to our little town?' },
                        { speaker: 'Anna', text: 'I work at the local bookstore. If you\'re looking for recommendations, I\'d be happy to help.' },
                        {
                            speaker: 'Anna',
                            text: 'Would you like to grab dinner sometime? I know all the best places.',
                            choices: [
                                { text: 'I\'d love that. When are you free?', relationship: { character: 'anna', change: 15 }, nextScene: 4 },
                                { text: 'Maybe. I\'ll think about it.', relationship: { character: 'anna', change: 5 }, nextScene: 5 }
                            ]
                        }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
                    characters: [{ name: 'Anna', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Anna', text: 'Of course, no pressure. I understand being cautious in a new place.' },
                        { speaker: 'Anna', text: 'Well, if you change your mind, you know where to find me.' },
                        { speaker: 'Narrator', text: 'You spend a pleasant hour chatting before parting ways.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                    characters: [{ name: 'Anna', mood: 'happy' }],
                    dialogs: [
                        { speaker: 'Anna', text: 'Wonderful! How about tomorrow evening? There\'s this amazing Italian place downtown.' },
                        { speaker: 'Anna', text: 'I\'ll pick you up at seven. This is going to be fun!' },
                        { speaker: 'Narrator', text: 'You exchange numbers and make plans for your first date.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
                    characters: [{ name: 'Anna', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Anna', text: 'I understand. Take your time to think about it.' },
                        { speaker: 'Narrator', text: 'You finish your coffee and head home, wondering what might have been.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
                    characters: [{ name: 'Alex', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Narrator', text: 'The next day, you decide to explore the town park.' },
                        { speaker: 'Alex', text: 'Hey there! You look lost. Need some directions?' },
                        {
                            speaker: 'Alex',
                            text: 'I\'m Alex. I come here every morning for my run. You must be new around here.',
                            choices: [
                                { text: 'Yes, I just moved here. I\'m still getting my bearings.', relationship: { character: 'alex', change: 10 }, nextScene: 7 },
                                { text: 'Just exploring. Nice to meet you.', relationship: { character: 'alex', change: 5 }, nextScene: 8 }
                            ]
                        }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #00b894, #00cec9)',
                    characters: [{ name: 'Alex', mood: 'happy' }],
                    dialogs: [
                        { speaker: 'Alex', text: 'Moving to a new place can be overwhelming. I\'d be happy to show you around!' },
                        { speaker: 'Alex', text: 'There\'s a great hiking trail just outside town. Perfect for clearing your head.' },
                        {
                            speaker: 'Alex',
                            text: 'Want to check it out this weekend?',
                            choices: [
                                { text: 'That sounds perfect! I love hiking.', relationship: { character: 'alex', change: 15 }, nextScene: 9 },
                                { text: 'I\'m not much of a hiker, but thanks.', relationship: { character: 'alex', change: 0 }, nextScene: 10 }
                            ]
                        }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #fdcb6e, #e17055)',
                    characters: [{ name: 'Alex', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Alex', text: 'Cool! Well, if you ever want a running partner or need recommendations, just let me know.' },
                        { speaker: 'Narrator', text: 'You chat for a few more minutes before Alex continues their run.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #fd79a8, #fdcb6e)',
                    characters: [{ name: 'Alex', mood: 'happy' }],
                    dialogs: [
                        { speaker: 'Alex', text: 'Awesome! It\'s a date then. Well, not a date-date, but you know what I mean!' },
                        { speaker: 'Alex', text: 'Meet me here Saturday morning at 8? We\'ll make a day of it.' },
                        { speaker: 'Narrator', text: 'You\'re looking forward to your hiking adventure with Alex.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)',
                    characters: [{ name: 'Alex', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Alex', text: 'No worries! There are plenty of other things to do around here.' },
                        { speaker: 'Narrator', text: 'You part ways, but you sense there might be other opportunities to connect.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #e17055, #2d3436)',
                    characters: [{ name: 'Sam', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Narrator', text: 'That evening, you decide to check out the local art gallery opening.' },
                        { speaker: 'Sam', text: 'Interesting choice. Most people gravitate toward the more obvious pieces.' },
                        {
                            speaker: 'Sam',
                            text: 'I\'m Sam. I\'m actually the artist behind this particular piece.',
                            choices: [
                                { text: 'It\'s beautiful. What inspired you to create this?', relationship: { character: 'sam', change: 15 }, nextScene: 12 },
                                { text: 'Oh, I was just browsing. Nice work though.', relationship: { character: 'sam', change: 5 }, nextScene: 13 }
                            ]
                        }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #fd79a8, #fdcb6e)',
                    characters: [{ name: 'Sam', mood: 'happy' }],
                    dialogs: [
                        { speaker: 'Sam', text: 'Thank you for asking! This piece represents the complexity of human emotions in relationships.' },
                        { speaker: 'Sam', text: 'I find that most people are afraid to explore the deeper aspects of connection.' },
                        {
                            speaker: 'Sam',
                            text: 'Would you like to discuss it over coffee sometime? I\'d love to hear your perspective.',
                            choices: [
                                { text: 'I\'d be fascinated to learn more about your art.', relationship: { character: 'sam', change: 20 }, nextScene: 14 },
                                { text: 'Maybe. I\'m still new to appreciating art.', relationship: { character: 'sam', change: 10 }, nextScene: 15 }
                            ]
                        }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
                    characters: [{ name: 'Sam', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Sam', text: 'I appreciate the honesty. Art isn\'t for everyone.' },
                        { speaker: 'Narrator', text: 'You continue browsing the gallery, occasionally catching Sam\'s thoughtful gaze.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #00b894, #00cec9)',
                    characters: [{ name: 'Sam', mood: 'happy' }],
                    dialogs: [
                        { speaker: 'Sam', text: 'Excellent! I know a quiet place where we can talk without distractions.' },
                        { speaker: 'Sam', text: 'How about tomorrow afternoon? I\'ll bring some of my sketches to show you.' },
                        { speaker: 'Narrator', text: 'You\'re intrigued by Sam\'s artistic passion and depth.' }
                    ]
                },
                {
                    background: 'linear-gradient(135deg, #fdcb6e, #e17055)',
                    characters: [{ name: 'Sam', mood: 'neutral' }],
                    dialogs: [
                        { speaker: 'Sam', text: 'That\'s perfectly fine. Art appreciation is a journey, not a destination.' },
                        { speaker: 'Narrator', text: 'You spend the rest of the evening exploring the gallery together.' }
                    ]
                }
            ]
        };
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VisualNovel();
});