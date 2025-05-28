// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.getElementById('indicators');
const contactForm = document.getElementById('contactForm');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load based on hash or scroll position
function setActiveNavLinkOnLoad() {
    const hash = window.location.hash;
    
    if (hash) {
        // If there's a hash in the URL, set that link as active
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    } else {
        // Otherwise use scroll position
        setActiveNavLink();
    }
}

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLinkOnLoad);

// Scroll to hash section on page load
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Create indicators
function createIndicators() {
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicators.appendChild(indicator);
    }
}

// Go to specific slide
function goToSlide(slideIndex) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.indicator')[currentSlide].classList.remove('active');
    
    currentSlide = slideIndex;
    
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.indicator')[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex);
}

// Previous slide
function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
}

// Event listeners for carousel
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play carousel
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause auto-play on hover
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

// Initialize carousel
createIndicators();

// Lightbox functionality
function openLightbox(imageSrc, imageAlt) {
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add click event to carousel images
slides.forEach(slide => {
    const img = slide.querySelector('img');
    img.addEventListener('click', () => {
        openLightbox(img.src, img.alt);
    });
});

// Close lightbox events
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.achievement-card, .vision-item, .about-text, .about-image, .connect-content, .social-btn');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
            
            // Add a special animation class for cards
            if (element.classList.contains('achievement-card') || element.classList.contains('vision-item')) {
                element.classList.add('card-animate');
            }
            
            // Add a special animation for social buttons
            if (element.classList.contains('social-btn')) {
                element.classList.add('btn-animate');
            }
        }
    });
}

// Simple function to ensure all sections are visible
function makeAllSectionsVisible() {
    // Make achievement cards visible
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Make vision items visible
    document.querySelectorAll('.vision-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
    });
    
    // Make connect elements visible
    document.querySelectorAll('.connect-content, .social-btn').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
}

// Run on page load
window.addEventListener('load', makeAllSectionsVisible);

// Also run after a short delay to ensure everything is visible
setTimeout(makeAllSectionsVisible, 500);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Force active link check on load
    setTimeout(() => {
        setActiveNavLink();
        setActiveNavLinkOnLoad();
    }, 300);
    
    // Make achievement cards visible immediately
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card) => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    
    // Make vision items visible immediately
    const visionItems = document.querySelectorAll('.vision-item');
    visionItems.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
    });
    
    // Set up social buttons animation
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach((btn, index) => {
        btn.classList.add('animate-on-scroll');
        btn.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Trigger initial animations
    setTimeout(animateOnScroll, 100);
    
    // Force connect section content to be visible immediately
    const connectSection = document.getElementById('connect');
    if (connectSection) {
        // Make connect content visible
        const connectContent = connectSection.querySelector('.connect-content');
        if (connectContent) {
            connectContent.style.opacity = '1';
            connectContent.style.transform = 'none';
            connectContent.classList.add('visible');
        }
        
        // Make social buttons visible
        const socialBtns = connectSection.querySelectorAll('.social-btn');
        socialBtns.forEach((btn, index) => {
            btn.style.opacity = '1';
            btn.style.transform = 'none';
            btn.classList.add('visible', 'btn-animate');
        });
        
        // Make connect message visible
        const connectMessage = connectSection.querySelector('.connect-message');
        if (connectMessage) {
            connectMessage.style.opacity = '1';
            connectMessage.style.transform = 'none';
        }
    }
});

// Manually trigger animations on page load
window.addEventListener('load', () => {
    // Trigger animations for all sections
    animateOnScroll();
    
    // Force check active navigation
    setActiveNavLink();
});

// Parallax effect for vision section
function parallaxEffect() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxBg.style.transform = `translateY(${rate}px)`;
    }
}

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add scroll event listeners
window.addEventListener('scroll', throttle(parallaxEffect, 10));
window.addEventListener('scroll', throttle(animateOnScroll, 100));

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch/swipe support for carousel
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Preload images for better performance
function preloadImages() {
    const images = [
        '/placeholder.svg?height=1080&width=1920',
        '/placeholder.svg?height=400&width=350',
        '/placeholder.svg?height=400&width=600',
        '/placeholder.svg?height=800&width=1920'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    setActiveNavLink();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduced-motion');
}