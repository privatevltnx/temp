// Clean, Professional JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load partials
    loadPartials();
    
    // Initialize essential features
    initScrollAnimations();
    initStaggerAnimations();
    initChat();
    initCurrencySwitcher();
    initPerformanceOptimizations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
});

// Load HTML partials
async function loadPartials() {
    const partials = [
        { selector: '#header-placeholder', file: 'partials/header.html' },
        { selector: '#footer-placeholder', file: 'partials/footer.html' },
        { selector: '#cta-strip-placeholder', file: 'partials/cta-strip.html' }
    ];

    for (const partial of partials) {
        try {
            const response = await fetch(partial.file);
            if (response.ok) {
                const html = await response.text();
                const element = document.querySelector(partial.selector);
                if (element) {
                    element.innerHTML = html;
                }
            }
        } catch (error) {
            console.log('Partial not found:', partial.file);
        }
    }
}

// Clean Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Simple smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Simple button interactions
function initButtonInteractions() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('btn-scale');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('btn-scale');
        });
    });
}

// Removed interactive backgrounds for better performance

// Removed cursor trail for better performance and accessibility

// Stagger Animations
function initStaggerAnimations() {
    document.querySelectorAll('.stagger-animation').forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Chat functionality
function initChat() {
    window.openChat = function() {
        // Create floating chat window
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <h3>Chat with us!</h3>
                <button onclick="closeChat()" class="chat-close">×</button>
            </div>
            <div class="chat-body">
                <p>Hi! How can we help you build your premium website?</p>
            </div>
        `;
        
        chatWindow.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: morphIn 0.5s ease-out;
        `;
        
        document.body.appendChild(chatWindow);
    };
    
    window.closeChat = function() {
        const chatWindow = document.querySelector('.chat-window');
        if (chatWindow) {
            chatWindow.style.animation = 'morphIn 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(chatWindow);
            }, 300);
        }
    };
}

// Currency switcher with smooth transitions
function initCurrencySwitcher() {
    const currencyButtons = document.querySelectorAll('.currency-btn');
    const priceElements = document.querySelectorAll('[data-price-inr]');
    
    currencyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currency = btn.dataset.currency;
            
            // Animate price changes
            priceElements.forEach(element => {
                element.style.transform = 'scale(0.8)';
                element.style.opacity = '0.5';
                
                setTimeout(() => {
                    switchCurrency(currency);
                    element.style.transform = 'scale(1)';
                    element.style.opacity = '1';
                }, 150);
            });
            
            // Update active button
            currencyButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchCurrency(currency) {
    const priceElements = document.querySelectorAll('[data-price-inr]');
    const rates = { INR: 1, USD: 0.012, EUR: 0.011 };
    const symbols = { INR: '₹', USD: '$', EUR: '€' };
    
    priceElements.forEach(element => {
        const inrPrice = parseInt(element.dataset.priceInr);
        const convertedPrice = Math.round(inrPrice * rates[currency]);
        const formattedPrice = new Intl.NumberFormat().format(convertedPrice);
        element.textContent = `${symbols[currency]}${formattedPrice}`;
    });
}

// Enhanced form utilities
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            input.style.animation = 'shake 0.5s ease-in-out';
            isValid = false;
        } else {
            input.classList.remove('error');
            input.style.animation = '';
        }
    });
    
    return isValid;
}

// Enhanced storage utilities
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        showToast('Progress saved!', 'success');
    } catch (error) {
        console.error('Storage error:', error);
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Storage retrieval error:', error);
        return null;
    }
}

// Smooth scroll with easing
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: morphIn 0.5s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Performance monitoring with visual feedback
function trackPageLoad() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Show performance badge
        if (loadTime < 2000) {
            setTimeout(() => {
                showToast(`⚡ Blazing fast! Loaded in ${(loadTime/1000).toFixed(1)}s`, 'success');
            }, 1000);
        }
    });
}

// Initialize performance tracking
trackPageLoad();