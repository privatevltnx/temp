// Mobile Navigation Toggle
function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-overlay');
    
    nav.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Navigation for both desktop and mobile
function initNavigation() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => switchCategory(btn.dataset.category));
    });
    
    document.querySelectorAll('.mobile-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchCategory(btn.dataset.category);
            toggleMobileNav(); // Close nav after selection
        });
    });
    
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.category-content');
            parent.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            parent.querySelectorAll('.tool-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tool).classList.add('active');
        });
    });
}

function switchCategory(category) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.category-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-category="${category}"].category-btn`)?.classList.add('active');
    
    document.querySelectorAll('.mobile-category-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-category="${category}"].mobile-category-btn`)?.classList.add('active');
    
    document.getElementById(category).classList.add('active');
}

initNavigation();

// Utilities
function loadImage(file) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(file);
    });
}

function downloadCanvas(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
}

function copyText(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1500);
}

// Image Tools
let currentImg = null;

document.getElementById('resize-input').addEventListener('change', async (e) => {
    if (e.target.files[0]) {
        currentImg = await loadImage(e.target.files[0]);
        const canvas = document.getElementById('resize-canvas');
        canvas.width = currentImg.width;
        canvas.height = currentImg.height;
        canvas.getContext('2d').drawImage(currentImg, 0, 0);
        document.getElementById('download-resize').style.display = 'block';
    }
});

function resizeImage() {
    if (!currentImg) return;
    const canvas = document.getElementById('resize-canvas');
    const ctx = canvas.getContext('2d');
    const w = parseInt(document.getElementById('width').value) || currentImg.width;
    const h = parseInt(document.getElementById('height').value) || currentImg.height;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(currentImg, 0, 0, w, h);
}

function cropImage() {
    if (!currentImg) return;
    const canvas = document.getElementById('resize-canvas');
    const ctx = canvas.getContext('2d');
    const x = parseInt(document.getElementById('crop-x').value) || 0;
    const y = parseInt(document.getElementById('crop-y').value) || 0;
    const w = parseInt(document.getElementById('crop-w').value) || 400;
    const h = parseInt(document.getElementById('crop-h').value) || 300;
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(currentImg, x, y, w, h, 0, 0, w, h);
}

function rotateImage() {
    if (!currentImg) return;
    const canvas = document.getElementById('resize-canvas');
    const ctx = canvas.getContext('2d');
    const angle = (document.getElementById('rotate').value * Math.PI) / 180;
    const cos = Math.abs(Math.cos(angle));
    const sin = Math.abs(Math.sin(angle));
    const newW = currentImg.width * cos + currentImg.height * sin;
    const newH = currentImg.width * sin + currentImg.height * cos;
    canvas.width = newW;
    canvas.height = newH;
    ctx.translate(newW / 2, newH / 2);
    ctx.rotate(angle);
    ctx.drawImage(currentImg, -currentImg.width / 2, -currentImg.height / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

document.getElementById('compress-input').addEventListener('change', (e) => {
    if (e.target.files[0]) {
        const file = e.target.files[0];
        document.getElementById('original-img').src = URL.createObjectURL(file);
        document.getElementById('original-size').textContent = `${(file.size / 1024).toFixed(2)} KB`;
    }
});

async function compressImage() {
    const file = document.getElementById('compress-input').files[0];
    if (!file) return;
    const img = await loadImage(file);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const quality = parseFloat(document.getElementById('quality').value);
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    document.getElementById('compressed-img').src = dataUrl;
    const size = Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 3/4);
    document.getElementById('compressed-size').textContent = `${(size / 1024).toFixed(2)} KB`;
    
    // Add download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Compressed';
    downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.download = 'compressed-image.jpg';
        link.href = dataUrl;
        link.click();
    };
    document.getElementById('compressed-size').parentNode.appendChild(downloadBtn);
}

function convertToBase64() {
    const file = document.getElementById('base64-input').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => document.getElementById('base64-output').value = reader.result;
    reader.readAsDataURL(file);
}

async function generateMeme() {
    const file = document.getElementById('meme-input').files[0];
    if (!file) return;
    const img = await loadImage(file);
    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const fontSize = Math.max(20, img.width / 20);
    ctx.font = `bold ${fontSize}px Impact, Arial`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 15;
    ctx.textAlign = 'center';
    
    const topText = document.getElementById('top-text').value.toUpperCase();
    const bottomText = document.getElementById('bottom-text').value.toUpperCase();
    
    if (topText) {
        ctx.fillText(topText, img.width / 2, fontSize + 10);
        ctx.strokeText(topText, img.width / 2, fontSize + 10);
    }
    if (bottomText) {
        ctx.fillText(bottomText, img.width / 2, img.height - 20);
        ctx.strokeText(bottomText, img.width / 2, img.height - 20);
    }
    
    document.getElementById('download-meme').style.display = 'block';
}

async function generateASCII() {
    const file = document.getElementById('ascii-input').files[0];
    if (!file) return;
    const img = await loadImage(file);
    const width = parseInt(document.getElementById('ascii-width').value);
    const height = Math.floor((img.height / img.width) * width * 0.5);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const chars = '@%#*+=-:. ';
    let ascii = '';
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const brightness = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
            ascii += chars[charIndex];
        }
        ascii += '\n';
    }
    document.getElementById('ascii-output').textContent = ascii;
    document.getElementById('copy-ascii').style.display = 'block';
}

let pdfBlob = null;

async function imagesToPDF() {
    const files = document.getElementById('images-input').files;
    if (files.length === 0) return;
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    for (let i = 0; i < files.length; i++) {
        const img = await loadImage(files[i]);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Maintain aspect ratio and quality
        const pageWidth = 210;
        const pageHeight = 297;
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;
        
        let width, height;
        if (imgRatio > pageRatio) {
            width = pageWidth - 20;
            height = width / imgRatio;
        } else {
            height = pageHeight - 20;
            width = height * imgRatio;
        }
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        if (i > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 10, 10, width, height);
    }
    
    pdfBlob = pdf.output('blob');
    document.getElementById('download-pdf').style.display = 'block';
}

function downloadPDF() {
    if (!pdfBlob) return;
    const link = document.createElement('a');
    link.download = 'images.pdf';
    link.href = URL.createObjectURL(pdfBlob);
    link.click();
}

async function removeBG() {
    const file = document.getElementById('bg-input').files[0];
    if (!file) return;
    const img = await loadImage(file);
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const threshold = parseInt(document.getElementById('threshold').value);
    
    // Get corner pixels as background reference
    const corners = [
        [0, 0], [img.width-1, 0], [0, img.height-1], [img.width-1, img.height-1]
    ];
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Check if pixel is similar to white/light background
        const brightness = (r + g + b) / 3;
        const isLight = brightness > threshold;
        const isWhitish = r > threshold && g > threshold && b > threshold;
        
        if (isLight || isWhitish) {
            data[i + 3] = 0; // Make transparent
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    document.getElementById('download-bg').style.display = 'block';
}

// Audio Tools
let audioContext, audioBuffer, mediaRecorder, recordedChunks = [];

document.getElementById('audio-input').addEventListener('change', async (e) => {
    if (e.target.files[0]) {
        const file = e.target.files[0];
        const arrayBuffer = await file.arrayBuffer();
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        document.getElementById('audio-player').src = URL.createObjectURL(file);
    }
});

function cutAudio() {
    if (!audioBuffer) return;
    const start = parseFloat(document.getElementById('start-time').value) || 0;
    const end = parseFloat(document.getElementById('end-time').value) || audioBuffer.duration;
    const startSample = Math.floor(start * audioBuffer.sampleRate);
    const endSample = Math.floor(end * audioBuffer.sampleRate);
    const length = endSample - startSample;
    const newBuffer = audioContext.createBuffer(audioBuffer.numberOfChannels, length, audioBuffer.sampleRate);
    
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        const newChannelData = newBuffer.getChannelData(channel);
        for (let i = 0; i < length; i++) {
            newChannelData[i] = channelData[startSample + i];
        }
    }
    
    const offlineContext = new OfflineAudioContext(newBuffer.numberOfChannels, newBuffer.length, newBuffer.sampleRate);
    const source = offlineContext.createBufferSource();
    source.buffer = newBuffer;
    source.connect(offlineContext.destination);
    source.start();
    
    offlineContext.startRendering().then(renderedBuffer => {
        const wav = audioBufferToWav(renderedBuffer);
        const blob = new Blob([wav], { type: 'audio/wav' });
        document.getElementById('audio-player').src = URL.createObjectURL(blob);
        document.getElementById('download-audio').style.display = 'block';
        document.getElementById('download-audio').onclick = () => {
            const link = document.createElement('a');
            link.download = 'cut-audio.wav';
            link.href = URL.createObjectURL(blob);
            link.click();
        };
    });
}

function audioBufferToWav(buffer) {
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);
    const channelData = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < length; i++) {
        view.setInt16(offset, channelData[i] * 0x7FFF, true);
        offset += 2;
    }
    return arrayBuffer;
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const format = document.getElementById('audio-format').value;
        mediaRecorder = new MediaRecorder(stream, { mimeType: format });
        recordedChunks = [];
        
        mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: format });
            document.getElementById('recorded-audio').src = URL.createObjectURL(blob);
            document.getElementById('download-rec').style.display = 'block';
            document.getElementById('download-rec').onclick = () => {
                const link = document.createElement('a');
                link.download = `recording.${format.split('/')[1]}`;
                link.href = URL.createObjectURL(blob);
                link.click();
            };
        };
        
        mediaRecorder.start();
        document.getElementById('start-rec').disabled = true;
        document.getElementById('stop-rec').disabled = false;
    } catch (err) {
        alert('Microphone access denied or not available');
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        document.getElementById('start-rec').disabled = false;
        document.getElementById('stop-rec').disabled = true;
    }
}

// TTS
const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    voices = synth.getVoices();
    const select = document.getElementById('voice-select');
    select.innerHTML = '';
    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        select.appendChild(option);
    });
}

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
} else {
    loadVoices();
}

document.getElementById('rate').addEventListener('input', (e) => {
    document.getElementById('rate-val').textContent = e.target.value;
});

function speakText() {
    const text = document.getElementById('tts-text').value;
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[document.getElementById('voice-select').value]) {
        utterance.voice = voices[document.getElementById('voice-select').value];
    }
    utterance.rate = parseFloat(document.getElementById('rate').value);
    synth.speak(utterance);
}

function stopSpeaking() {
    synth.cancel();
}

// Video Tools - Show FFmpeg.wasm needed message
function extractAudio() {
    document.getElementById('video-progress').innerHTML = '<div style="padding:20px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;color:#dc2626;">⚠️ FFmpeg.wasm integration needed for video processing</div>';
}

function resizeVideo() {
    document.getElementById('video-resize-progress').innerHTML = '<div style="padding:20px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;color:#dc2626;">⚠️ FFmpeg.wasm integration needed for video processing</div>';
}

function makeGIF() {
    document.getElementById('gif-progress').innerHTML = '<div style="padding:20px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;color:#dc2626;">⚠️ FFmpeg.wasm integration needed for video processing</div>';
}

// File Tools
document.getElementById('word-text').addEventListener('input', (e) => {
    const text = e.target.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const lines = text.split('\n').length;
    document.getElementById('word-count-val').textContent = words;
    document.getElementById('char-count-val').textContent = chars;
    document.getElementById('line-count-val').textContent = lines;
});

function convertCase(type) {
    const text = document.getElementById('case-text').value;
    let result = '';
    switch (type) {
        case 'upper': result = text.toUpperCase(); break;
        case 'lower': result = text.toLowerCase(); break;
        case 'title': result = text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); break;
        case 'sentence': result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(); break;
    }
    document.getElementById('case-output').value = result;
}

function removeLineBreaks() {
    const text = document.getElementById('clean-text').value;
    document.getElementById('clean-output').value = text.replace(/\n/g, ' ');
}

function removeExtraSpaces() {
    const text = document.getElementById('clean-text').value;
    document.getElementById('clean-output').value = text.replace(/\s+/g, ' ');
}

function trimWhitespace() {
    const text = document.getElementById('clean-text').value;
    document.getElementById('clean-output').value = text.trim();
}

function mergePDFs() {
    alert('PDF merge functionality requires pdf-lib integration for advanced features');
}

function splitPDF() {
    alert('PDF split functionality requires pdf-lib integration for advanced features');
}

// Web Tools
function generateQR() {
    const text = document.getElementById('qr-text').value;
    if (!text) return;
    const output = document.getElementById('qr-output');
    output.innerHTML = '';
    
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(text, { width: 256, margin: 2 }, (err, canvas) => {
            if (!err) {
                output.appendChild(canvas);
                // Add download button
                const downloadBtn = document.createElement('button');
                downloadBtn.textContent = 'Download QR Code';
                downloadBtn.style.marginTop = '10px';
                downloadBtn.onclick = () => {
                    const link = document.createElement('a');
                    link.download = 'qrcode.png';
                    link.href = canvas.toDataURL();
                    link.click();
                };
                output.appendChild(downloadBtn);
            }
        });
    } else {
        output.innerHTML = '<div style="padding:20px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;color:#dc2626;">QR Code library not loaded</div>';
    }
}

function formatJSON() {
    try {
        const json = JSON.parse(document.getElementById('json-input').value);
        document.getElementById('json-output').value = JSON.stringify(json, null, 2);
        document.getElementById('json-error').textContent = '';
    } catch (e) {
        document.getElementById('json-error').textContent = 'Invalid JSON: ' + e.message;
    }
}

function minifyJSON() {
    try {
        const json = JSON.parse(document.getElementById('json-input').value);
        document.getElementById('json-output').value = JSON.stringify(json);
        document.getElementById('json-error').textContent = '';
    } catch (e) {
        document.getElementById('json-error').textContent = 'Invalid JSON: ' + e.message;
    }
}

function validateJSON() {
    try {
        JSON.parse(document.getElementById('json-input').value);
        document.getElementById('json-error').textContent = 'Valid JSON ✓';
        document.getElementById('json-error').style.color = 'green';
    } catch (e) {
        document.getElementById('json-error').textContent = 'Invalid JSON: ' + e.message;
        document.getElementById('json-error').style.color = 'red';
    }
}

function testRegex() {
    const pattern = document.getElementById('regex-pattern').value;
    const flags = document.getElementById('regex-flags').value;
    const text = document.getElementById('regex-text').value;
    try {
        const regex = new RegExp(pattern, flags);
        const matches = [...text.matchAll(regex)];
        document.getElementById('regex-results').textContent = matches.length > 0 ? 
            `Found ${matches.length} matches:\n${matches.map((m, i) => `${i + 1}: ${m[0]}`).join('\n')}` :
            'No matches found';
    } catch (e) {
        document.getElementById('regex-results').textContent = 'Invalid regex: ' + e.message;
    }
}

function encodeBase64Text() {
    const text = document.getElementById('base64-text-input').value;
    document.getElementById('base64-text-output').value = btoa(text);
}

function decodeBase64Text() {
    try {
        const text = document.getElementById('base64-text-input').value;
        document.getElementById('base64-text-output').value = atob(text);
    } catch (e) {
        document.getElementById('base64-text-output').value = 'Invalid Base64';
    }
}

// Fun Tools
function generatePassword() {
    const upper = document.getElementById('include-upper').checked;
    const lower = document.getElementById('include-lower').checked;
    const numbers = document.getElementById('include-numbers').checked;
    const symbols = document.getElementById('include-symbols').checked;
    const length = parseInt(document.getElementById('password-length').value);
    
    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!chars) {
        alert('Please select at least one character type');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('password-output').value = password;
}

function generateUsername() {
    const style = document.getElementById('username-style').value;
    const adjectives = ['Cool', 'Fast', 'Smart', 'Bright', 'Swift', 'Bold', 'Wild', 'Free'];
    const nouns = ['Tiger', 'Eagle', 'Wolf', 'Lion', 'Hawk', 'Bear', 'Fox', 'Shark'];
    const tech = ['Code', 'Byte', 'Pixel', 'Data', 'Cyber', 'Tech', 'Digital', 'Binary'];
    
    let username = '';
    switch (style) {
        case 'adjective-noun':
            username = adjectives[Math.floor(Math.random() * adjectives.length)] + 
                      nouns[Math.floor(Math.random() * nouns.length)] + 
                      Math.floor(Math.random() * 1000);
            break;
        case 'tech':
            username = tech[Math.floor(Math.random() * tech.length)] + 
                      Math.floor(Math.random() * 10000);
            break;
        case 'random':
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 8; i++) {
                username += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            break;
    }
    document.getElementById('username-output').value = username;
}

document.getElementById('color-input').addEventListener('input', (e) => {
    const hex = e.target.value;
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    
    // Simple HSL conversion
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const l = (max + min) / 2;
    const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    let h = 0;
    if (max !== min) {
        switch (max) {
            case r/255: h = (g/255 - b/255) / (max - min) + (g < b ? 6 : 0); break;
            case g/255: h = (b/255 - r/255) / (max - min) + 2; break;
            case b/255: h = (r/255 - g/255) / (max - min) + 4; break;
        }
        h /= 6;
    }
    
    document.getElementById('hex-value').textContent = hex;
    document.getElementById('rgb-value').textContent = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('hsl-value').textContent = `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
});

function generateGradient() {
    const start = document.getElementById('gradient-start').value;
    const end = document.getElementById('gradient-end').value;
    const direction = document.getElementById('gradient-direction').value;
    const css = `linear-gradient(${direction}, ${start}, ${end})`;
    
    document.getElementById('gradient-preview').style.background = css;
    document.getElementById('gradient-css').value = `background: ${css};`;
}

// Drawing Pad
const drawingCanvas = document.getElementById('drawing-canvas');
const drawingCtx = drawingCanvas.getContext('2d');
let isDrawing = false;

drawingCanvas.addEventListener('mousedown', startDrawing);
drawingCanvas.addEventListener('mousemove', draw);
drawingCanvas.addEventListener('mouseup', stopDrawing);
drawingCanvas.addEventListener('mouseout', stopDrawing);

// Touch events for mobile
drawingCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    drawingCanvas.dispatchEvent(mouseEvent);
});

drawingCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    drawingCanvas.dispatchEvent(mouseEvent);
});

drawingCanvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    drawingCanvas.dispatchEvent(mouseEvent);
});

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = drawingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    drawingCtx.lineWidth = document.getElementById('brush-size').value;
    drawingCtx.lineCap = 'round';
    drawingCtx.strokeStyle = document.getElementById('brush-color').value;
    
    drawingCtx.lineTo(x, y);
    drawingCtx.stroke();
    drawingCtx.beginPath();
    drawingCtx.moveTo(x, y);
}

function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        drawingCtx.beginPath();
    }
}

function clearCanvas() {
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}