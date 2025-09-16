// DOM Elements
const themeToggle = document.getElementById('theme-toggle');

const lines = [
  "Your money, your control.",
  "Fast. Secure. Reliable.",
  "Payments made simple.",
  "Banking beyond limits.",
  "SafePay: Security meets speed.",
  "One app, endless possibilities.",
  "Smarter payments, smarter you.",
  "Because every transaction matters.",
  "The future of digital payments.",
  "Send. Spend. Save. Safely."
];



// Theme Toggle Functionality
function initThemeToggle() {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Reset navbar background to use CSS variables
        const navbar = document.querySelector('.navbar');
        navbar.style.background = '';
        navbar.style.boxShadow = '';
        
        // Add animation effect
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (!link.classList.contains('acive')) {
                link.childNodes[0].classList.add('active');
            } 
            // Remove 'acive' class from other links
            navLinks.forEach(l => {
                console.log(l);
                if ( l && l !== link) {
                    l.childNodes[0].classList.remove('active');
                }
            });
            
            const targetId = link.getAttribute('href');
            console.log(targetId);
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 50; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .hero-content, .hero-image, .cta-content, .cta-actions, .trusted-line-container, .footer-content, .footer-actions, .footer-links');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

//for typing text effect
const typingElement = document.querySelector(".typing-text");
let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // typing speed in ms
let erasingSpeed = 50; // erasing speed in ms
let delayBetweenLines = 1500; // pause before erasing

function typeEffect() {
  const currentLine = lines[lineIndex];

  if (!isDeleting && charIndex <= currentLine.length) {
    typingElement.textContent = currentLine.substring(0, charIndex++);
    setTimeout(typeEffect, typingSpeed);
  } else if (isDeleting && charIndex >= 0) {
    typingElement.textContent = currentLine.substring(0, charIndex--);
    setTimeout(typeEffect, erasingSpeed);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenLines);
    } else {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      setTimeout(typeEffect, typingSpeed);
    }
  }
}


// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.15; // Adjust the multiplier for speed
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
}


// Button Click Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    console.log(buttons);
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}




// Initialize all functionality
function init() {
    initThemeToggle();
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffect();
    typeEffect();
    initButtonEffects();

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
    .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    }

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}