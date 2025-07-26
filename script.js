document.addEventListener('DOMContentLoaded', function() {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Initialize the shrine
    initializeShrine();
    
    // Start the poetry animation sequence
    startPoetryAnimation();
    
    // Only create heavy effects on desktop
    if (!isMobile) {
        // Create ambient particles
        createParticles();
        
        // Create floating ashes
        createFloatingAshes();
        
        // Initialize mystic canvas
        initMysticCanvas();
        
        // Add audio ambiance
        addAudioAmbiance();
    }
    
    // Add interactive effects
    addInteractiveEffects();
});

function initializeShrine() {
    // Preload the symbol image
    const symbol = document.getElementById('wolfSymbol');
    symbol.addEventListener('load', function() {
        console.log('Wolf symbol loaded successfully');
    });
    
    symbol.addEventListener('error', function() {
        console.warn('Symbol image not found. Please ensure symbol.png is in the same directory.');
        // Create a fallback symbol
        createFallbackSymbol();
    });
}

function createFallbackSymbol() {
    const symbolContainer = document.querySelector('.symbol-container');
    const fallbackSymbol = document.createElement('div');
    fallbackSymbol.className = 'fallback-symbol';
    fallbackSymbol.innerHTML = '🐺';
    fallbackSymbol.style.cssText = `
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 120px;
        filter: drop-shadow(0 0 20px rgba(139, 0, 0, 0.8));
        opacity: 0.7;
    `;
    symbolContainer.appendChild(fallbackSymbol);
}

function startPoetryAnimation() {
    const lines = [
        'line1', 'line2', 'line3', 'line4', 'line5', 
        'line6', 'line7', 'line8', 'line9', 'line10', 
        'line11', 'finalLine'
    ];
    
    let currentIndex = 0;
    
    function animateNextLine() {
        if (currentIndex < lines.length) {
            const lineElement = document.getElementById(lines[currentIndex]);
            if (lineElement) {
                // Add a slight delay for dramatic effect
                setTimeout(() => {
                    lineElement.classList.add('visible');
                    
                    // Add subtle glow effect
                    if (lines[currentIndex] === 'finalLine') {
                        addFinalLineGlow(lineElement);
                    }
                    
                    // Add mystical effect to each line
                    addMysticalEffect(lineElement);
                    
                    currentIndex++;
                    animateNextLine();
                }, 300);
            }
        }
    }
    
    // Start the animation sequence after the title has appeared
    setTimeout(() => {
        animateNextLine();
    }, 4000); // Wait for title animation to complete
}

function addMysticalEffect(element) {
    // Create a subtle ripple effect around the text
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.2) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: mysticalRipple 2s ease-out forwards;
        pointer-events: none;
        z-index: -1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Add the ripple animation
    if (!document.querySelector('#mysticalRippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'mysticalRippleAnimation';
        style.textContent = `
            @keyframes mysticalRipple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 2000);
}

function addFinalLineGlow(element) {
    // Add extra glow effect for the final line
    element.style.animation = 'finalLineGlow 3s ease-in-out infinite';
    
    // Add the keyframe animation dynamically
    if (!document.querySelector('#finalLineGlow')) {
        const style = document.createElement('style');
        style.id = 'finalLineGlow';
        style.textContent = `
            @keyframes finalLineGlow {
                0%, 100% {
                    text-shadow: 0 0 15px rgba(139, 0, 0, 0.6);
                }
                50% {
                    text-shadow: 0 0 25px rgba(139, 0, 0, 0.9),
                                0 0 35px rgba(139, 0, 0, 0.4);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 8; // Reduced from 15
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Continuously create new particles
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 4000); // Increased from 3000
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Random animation duration and delay
    const duration = 6 + Math.random() * 4;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

function addInteractiveEffects() {
    // Add mouse movement effect to the symbol (desktop only)
    const symbol = document.getElementById('wolfSymbol');
    const fallbackSymbol = document.querySelector('.fallback-symbol');
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Subtle parallax effect on the symbol
            if (symbol) {
                symbol.style.transform = `scale(1) translate(${x * 5}px, ${y * 5}px)`;
            }
            if (fallbackSymbol) {
                fallbackSymbol.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
            }
        });
    }
    
    // Add click effect to the symbol
    const symbolContainer = document.querySelector('.symbol-container');
    symbolContainer.addEventListener('click', function() {
        createRippleEffect(e);
    });
    
    // Add mystic button effects
    const mysticButton = document.getElementById('mysticButton');
    if (mysticButton) {
        mysticButton.addEventListener('mouseenter', function() {
            createButtonParticles(this);
        });
        
        mysticButton.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'translateY(-1px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Create special click effect
            createButtonClickEffect(e);
        });
    }
    
    // Add keyboard interaction
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            // Restart the poetry animation
            restartPoetryAnimation();
        }
    });
    
    // Add touch support for mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        // Swipe up to restart
        if (diff > 50) {
            restartPoetryAnimation();
        }
    });
}

function createRippleEffect(event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(139, 0, 0, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // Add ripple keyframe animation
    if (!document.querySelector('#rippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'rippleAnimation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const symbolContainer = document.querySelector('.symbol-container');
    symbolContainer.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function restartPoetryAnimation() {
    // Reset all lines
    const lines = document.querySelectorAll('.poem-line');
    lines.forEach(line => {
        line.classList.remove('visible');
    });
    
    // Restart the animation
    setTimeout(() => {
        startPoetryAnimation();
    }, 1000);
}

// Add smooth scroll behavior for better UX
// Removed wheel event prevention to allow normal scrolling

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate particle positions if needed
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
    });
});

// Button particle effects
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const particleCount = 4; // Reduced from 8
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'button-particle';
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: rgba(255, 0, 0, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            animation: buttonParticleFloat 1s ease-out forwards;
        `;
        
        // Add keyframe animation
        if (!document.querySelector('#buttonParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'buttonParticleAnimation';
            style.textContent = `
                @keyframes buttonParticleFloat {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

function createButtonClickEffect(event) {
    const ripple = document.createElement('div');
    ripple.className = 'button-ripple';
    ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.4) 0%, transparent 70%);
        transform: scale(0);
        animation: buttonRipple 0.8s ease-out;
        pointer-events: none;
        z-index: 1000;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        width: 0;
        height: 0;
    `;
    
    // Add ripple keyframe animation
    if (!document.querySelector('#buttonRippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'buttonRippleAnimation';
        style.textContent = `
            @keyframes buttonRipple {
                to {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 800);
}

// Create floating ashes effect
function createFloatingAshes() {
    const ashesContainer = document.querySelector('.floating-ashes');
    const ashCount = 12; // Reduced from 20
    
    for (let i = 0; i < ashCount; i++) {
        createAshParticle(ashesContainer);
    }
    
    // Continuously create new ash particles
    setInterval(() => {
        if (ashesContainer.children.length < ashCount) {
            createAshParticle(ashesContainer);
        }
    }, 3000); // Increased from 2000
}

function createAshParticle(container) {
    const ash = document.createElement('div');
    ash.className = 'ash-particle';
    
    const x = Math.random() * window.innerWidth;
    const duration = 8 + Math.random() * 4;
    const delay = Math.random() * 2;
    
    ash.style.cssText = `
        left: ${x}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(ash);
    
    setTimeout(() => {
        if (ash.parentNode) {
            ash.parentNode.removeChild(ash);
        }
    }, (duration + delay) * 1000);
}

// Initialize mystic canvas with WebGL effects
function initMysticCanvas() {
    const canvas = document.getElementById('mysticCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    const particleCount = 15; // Further reduced for better performance
    
    class MysticParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3; // Slower movement
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 1.5 + 0.5; // Smaller particles
            this.opacity = Math.random() * 0.3 + 0.1;
            this.life = Math.random() * 80 + 40;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            
            if (this.life <= 0) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.life = Math.random() * 80 + 40;
            }
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
            ctx.shadowColor = 'rgba(255, 0, 0, 0.6)';
            ctx.shadowBlur = 5; // Reduced blur
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new MysticParticle());
    }
    
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections (simplified)
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) + 
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 80) { // Reduced connection distance
                    ctx.save();
                    ctx.globalAlpha = (80 - distance) / 80 * 0.1;
                    ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
                    ctx.lineWidth = 1; // Thinner lines
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animate();
    });
}

// Add subtle audio ambiance
function addAudioAmbiance() {
    // Create audio context for ambient sounds
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create subtle ambient tone
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(55, audioContext.currentTime); // Low A
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start();
        
        // Fade out after 10 seconds
        setTimeout(() => {
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);
        }, 7000);
    }
}

// Optimized loading screen effect
window.addEventListener('load', function() {
    // Remove loading effect for faster perceived performance
    document.body.style.opacity = '1';
});

// Add performance monitoring
window.addEventListener('load', function() {
    // Check if page is taking too long to load
    setTimeout(() => {
        const loadingElements = document.querySelectorAll('.ambient-glow, .breathing-light, .ethereal-mist, .mystic-veil');
        if (loadingElements.length > 0) {
            loadingElements.forEach(el => {
                el.style.animation = 'none';
                el.style.opacity = '0.2';
            });
        }
    }, 5000); // If still loading after 5 seconds, disable heavy animations
}); 