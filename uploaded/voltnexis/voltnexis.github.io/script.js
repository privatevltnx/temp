// Service redirection URLs
const serviceUrls = {
    'eshop': 'https://voltnexis.github.io/shop',
    'web2app': 'https://voltnexis.github.io/web2app',
    'builds': 'https://voltnexis.github.io/builds',
    'wallpapers': 'https://voltnexis.github.io/wallpapers',
    'timer': 'https://voltnexis.github.io/timer',
    'qoutes': 'https://voltnexis.github.io/qoutes',
    'doconvert': 'https://voltnexis.github.io/doconvert',
    'songs': 'https://voltnexis.github.io/songs',
    'imgtool': 'https://voltnexis.github.io/imgtool',
    'webcreator': 'https://voltnexis.github.io/webcreator',
    'codexaura': 'https://voltnexis.github.io/codexaura',
    'apps': 'https://voltnexis.github.io/apps',
    'servetracko': 'https://voltnexis.github.io/servetracko',
    'watchearn': 'https://voltnexis.github.io/watchandearn',
    'fixmitra': 'https://voltnexis.github.io/fixmitra',
    'fixmitra-hub': 'https://voltnexis.github.io/provider.fixmitra',
    'clock': 'https://voltnexis.github.io/clock',
    'learner': 'https://voltnexis.github.io/learner',
    'learn': 'https://voltnexis.github.io/learn',
    'pureparent': 'https://voltnexis.github.io/pureparent',
    'downloader': 'https://voltnexis.github.io/downloader',
    'tools': 'https://voltnexis.github.io/tools',
    'wandermatch': 'https://voltnexis.github.io/wandermatch',
    'themes': 'https://voltnexis.github.io/themes'
};

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 2000);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX * 0.1;
    followerY += distY * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Mobile Menu Toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Redirect function with animation
function redirectTo(service) {
    const url = serviceUrls[service];
    if (url) {
        // Add click animation
        const clickedCard = event.currentTarget;
        clickedCard.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            window.open(url, '_blank');
            clickedCard.style.transform = '';
        }, 150);
    } else {
        showNotification('Service coming soon!');
    }
}

// Smooth scrolling functions
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(99, 102, 241, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to elements
    const animateElements = document.querySelectorAll('.service-card, .feature, .section-header');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Particle animation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.opacity = Math.random();
    
    document.querySelector('.hero-bg').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.service-card, .btn-primary, .btn-secondary, .feature');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, var(--primary), var(--secondary));
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Performance optimization
let ticking = false;

function updateOnScroll() {
    // Parallax effect for hero section
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});
