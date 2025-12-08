class ClockApp {
    constructor() {
        this.currentMode = 'clock';
        this.timerInterval = null;
        this.stopwatchInterval = null;
        this.timerTime = 0;
        this.stopwatchTime = 0;
        this.timerRunning = false;
        this.stopwatchRunning = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startClock();
        this.updateDisplay();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMode(e.target.dataset.mode);
            });
        });

        // Timer controls
        document.getElementById('timer-start').addEventListener('click', () => this.startTimer());
        document.getElementById('timer-pause').addEventListener('click', () => this.pauseTimer());
        document.getElementById('timer-reset').addEventListener('click', () => this.resetTimer());

        // Stopwatch controls
        document.getElementById('stopwatch-start').addEventListener('click', () => this.startStopwatch());
        document.getElementById('stopwatch-pause').addEventListener('click', () => this.pauseStopwatch());
        document.getElementById('stopwatch-reset').addEventListener('click', () => this.resetStopwatch());

        // Background options
        document.querySelectorAll('.bg-option').forEach(option => {
            option.addEventListener('click', (e) => {
                if (e.target.dataset.bg) {
                    this.changeBackground(e.target.dataset.bg);
                } else if (e.target.dataset.img) {
                    this.setImageBackground(e.target.dataset.img);
                }
            });
        });

        // File upload
        document.getElementById('bg-upload').addEventListener('change', (e) => {
            this.uploadBackground(e.target.files[0]);
        });

        // Size slider
        document.getElementById('size-slider').addEventListener('input', (e) => {
            this.resizeContainer(e.target.value);
        });
    }

    switchMode(mode) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        // Update containers
        document.querySelectorAll('.mode-container').forEach(container => container.classList.remove('active'));
        document.getElementById(`${mode}-mode`).classList.add('active');

        this.currentMode = mode;
    }

    startClock() {
        setInterval(() => {
            if (this.currentMode === 'clock') {
                this.updateClock();
            }
        }, 1000);
        this.updateClock();
    }

    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        document.getElementById('clock-display').textContent = timeString;
        document.getElementById('date-display').textContent = dateString;
    }

    startTimer() {
        if (!this.timerRunning) {
            if (this.timerTime === 0) {
                const hours = parseInt(document.getElementById('timer-hours').value) || 0;
                const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
                const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
                this.timerTime = hours * 3600 + minutes * 60 + seconds;
            }

            if (this.timerTime > 0) {
                this.timerRunning = true;
                this.timerInterval = setInterval(() => {
                    this.timerTime--;
                    this.updateTimerDisplay();
                    
                    if (this.timerTime <= 0) {
                        this.pauseTimer();
                        alert('Timer finished!');
                    }
                }, 1000);
            }
        }
    }

    pauseTimer() {
        this.timerRunning = false;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.timerTime = 0;
        this.updateTimerDisplay();
        document.getElementById('timer-hours').value = 0;
        document.getElementById('timer-minutes').value = 0;
        document.getElementById('timer-seconds').value = 0;
    }

    updateTimerDisplay() {
        const hours = Math.floor(this.timerTime / 3600);
        const minutes = Math.floor((this.timerTime % 3600) / 60);
        const seconds = this.timerTime % 60;
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = timeString;
    }

    startStopwatch() {
        if (!this.stopwatchRunning) {
            this.stopwatchRunning = true;
            this.stopwatchInterval = setInterval(() => {
                this.stopwatchTime++;
                this.updateStopwatchDisplay();
            }, 1000);
        }
    }

    pauseStopwatch() {
        this.stopwatchRunning = false;
        if (this.stopwatchInterval) {
            clearInterval(this.stopwatchInterval);
            this.stopwatchInterval = null;
        }
    }

    resetStopwatch() {
        this.pauseStopwatch();
        this.stopwatchTime = 0;
        this.updateStopwatchDisplay();
    }

    updateStopwatchDisplay() {
        const hours = Math.floor(this.stopwatchTime / 3600);
        const minutes = Math.floor((this.stopwatchTime % 3600) / 60);
        const seconds = this.stopwatchTime % 60;
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('stopwatch-display').textContent = timeString;
    }

    updateDisplay() {
        this.updateTimerDisplay();
        this.updateStopwatchDisplay();
    }

    changeBackground(theme) {
        document.body.style.backgroundImage = '';
        document.body.className = `bg-${theme}`;
        localStorage.setItem('clockBackground', theme);
        localStorage.removeItem('clockBackgroundImage');
    }

    setImageBackground(imagePath) {
        document.body.style.backgroundImage = `url(${imagePath})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.className = '';
        localStorage.setItem('clockBackgroundImage', imagePath);
        localStorage.removeItem('clockBackground');
    }

    uploadBackground(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.body.style.backgroundImage = `url(${e.target.result})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.className = '';
                localStorage.setItem('clockBackgroundImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    resizeContainer(size) {
        const container = document.querySelector('.container');
        container.style.width = `${size}vw`;
        container.style.height = `${size}vh`;
        localStorage.setItem('clockSize', size);
    }

    loadSavedSettings() {
        const savedTheme = localStorage.getItem('clockBackground');
        const savedImage = localStorage.getItem('clockBackgroundImage');
        const savedSize = localStorage.getItem('clockSize');
        
        if (savedImage) {
            document.body.style.backgroundImage = `url(${savedImage})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
        } else if (savedTheme) {
            this.changeBackground(savedTheme);
        }
        
        if (savedSize) {
            document.getElementById('size-slider').value = savedSize;
            this.resizeContainer(savedSize);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new ClockApp();
    app.loadSavedSettings();
});