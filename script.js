// Countdown to November 16th
function updateCountdown() {
    const anniversaryDate = new Date();
    anniversaryDate.setMonth(10); // November (0-indexed)
    anniversaryDate.setDate(16);
    anniversaryDate.setHours(0, 0, 0, 0);
    
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Set anniversary date for current year or next year
    anniversaryDate.setFullYear(currentYear);
    if (anniversaryDate < now) {
        anniversaryDate.setFullYear(currentYear + 1);
    }
    
    const timeDiff = anniversaryDate - now;
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Interactive hearts functionality
let loveCount = 0;
const hearts = ['❤️', '💕', '💖', '💗', '💝', '💓', '💞', '💘'];

document.querySelectorAll('.clickable-heart').forEach(heart => {
    heart.addEventListener('click', function(e) {
        loveCount++;
        document.getElementById('loveCount').textContent = loveCount;
        
        // Create floating heart animation
        createFloatingHeart(e.pageX, e.pageY);
        
        // Change heart emoji randomly
        this.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Add pulse animation
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'heartbeat 0.5s ease-in-out';
        }, 10);
    });
});

// Create floating heart at cursor position
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    // Add custom animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Create background floating hearts
function createBackgroundHearts() {
    const container = document.getElementById('floatingHearts');
    const heartEmojis = ['❤️', '💕', '💖', '💗'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
        container.appendChild(heart);
    }
}

// Memory card interactions
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', function() {
        // Create sparkle effect
        createSparkles(this);
        
        // Add special animation
        this.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// Create sparkle effect
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '⭐', '💫'];
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        // Add sparkle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes sparkle {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.5) rotate(180deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('style[data-sparkle]')) {
            style.setAttribute('data-sparkle', 'true');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add hover sound effect (visual feedback since we can't play actual sounds)
document.querySelectorAll('.memory-card, .clickable-heart, .wish-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Special message on anniversary day
function checkAnniversaryDay() {
    const today = new Date();
    const isAnniversary = today.getMonth() === 10 && today.getDate() === 16; // November 16th
    
    if (isAnniversary) {
        showAnniversaryMessage();
    }
}

function showAnniversaryMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: specialMessage 0.5s ease-out;
        ">
            <h2 style="font-size: 2.5rem; margin-bottom: 20px;">🎉 Happy Anniversary! 🎉</h2>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">Today is our special day!</p>
            <p style="font-size: 1rem;">I love you more than words can express!</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                margin-top: 20px;
                padding: 10px 20px;
                background: white;
                color: #f5576c;
                border: none;
                border-radius: 25px;
                font-size: 1rem;
                cursor: pointer;
                font-weight: 600;
            ">Thank You My Love 💕</button>
        </div>
    `;
    
    // Add background overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(message);
    
    overlay.addEventListener('click', function() {
        overlay.remove();
        message.remove();
    });
}

// Add special message animation
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes specialMessage {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(messageStyle);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundHearts();
    checkAnniversaryDay();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard interaction for fun
document.addEventListener('keypress', function(e) {
    if (e.key === 'h' || e.key === 'H') {
        // Create heart rain when 'h' is pressed
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 100);
        }
    }
});

// Add wish item interactions
document.querySelectorAll('.wish-item').forEach((wish, index) => {
    wish.addEventListener('click', function() {
        // Create a special effect for each wish
        const colors = ['#f093fb', '#f5576c', '#667eea', '#764ba2', '#fcb69f'];
        this.style.background = colors[index % colors.length];
        createSparkles(this);
    });
});

// Valentine section special effects
document.addEventListener('DOMContentLoaded', function() {
    const valentineSection = document.querySelector('.valentine-section');
    if (valentineSection) {
        // Add floating rose petals effect
        setInterval(() => {
            if (Math.random() > 0.7) {
                createRosePetal();
            }
        }, 3000);
    }
});

function createRosePetal() {
    const petal = document.createElement('div');
    petal.innerHTML = '🌹';
    petal.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * window.innerWidth}px;
        font-size: ${Math.random() * 20 + 20}px;
        pointer-events: none;
        z-index: 1000;
        animation: petalFall ${Math.random() * 3 + 5}s linear forwards;
        opacity: 0.8;
    `;
    
    // Add petal falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes petalFall {
            to {
                transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('style[data-petal]')) {
        style.setAttribute('data-petal', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 8000);
}
