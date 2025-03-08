// Navigation and Scroll Logic 
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // Initialize typing animation
    initTypeWriter();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Enhanced Lightbox functionality
    initLightbox();
});

// TypeWriter Animation for the text below name
function initTypeWriter() {
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            // Current index of word
            const current = this.wordIndex % this.words.length;
            // Get full text of current word
            const fullTxt = this.words[current];

            // Check if deleting
            if(this.isDeleting) {
                // Remove char
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                // Add char
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            // Insert txt into element
            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span><span class="typed-cursor">|</span>`;

            // Initial Type Speed
            let typeSpeed = 100;

            if(this.isDeleting) {
                typeSpeed /= 2;
            }

            // If word is complete
            if(!this.isDeleting && this.txt === fullTxt) {
                // Make pause at end
                typeSpeed = this.wait;
                // Set delete to true
                this.isDeleting = true;
            } else if(this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                // Move to next word
                this.wordIndex++;
                // Pause before start typing
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }
}

// Enhanced Lightbox for Gallery Images
function initLightbox() {
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            // Create the lightbox content with close button and img
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt || 'Gallery image'}" class="lightbox-img">
                    <p class="lightbox-caption">${img.dataset.caption || ''}</p>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Prevent page scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Add active class after a small delay for transition effect
            setTimeout(() => lightbox.classList.add('active'), 10);
            
            // Close lightbox when clicking the close button or outside the image
            lightbox.addEventListener('click', e => {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', function escPress(e) {
                if (e.key === 'Escape') {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = 'auto';
                    }, 300);
                    document.removeEventListener('keydown', escPress);
                }
            });
        });
    });
}

// Initialize smooth scrolling
function initSmoothScroll() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Smooth scroll with requestAnimationFrame for better performance
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 100;
                const startTime = performance.now();
                const duration = 1000;
                
                function step(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easeInOutCubic = progress < 0.5 
                        ? 4 * progress * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + (targetPosition - startPosition) * easeInOutCubic);
                    
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }
                
                requestAnimationFrame(step);
            }
        });
    });
}

// Initialize scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('section > .container').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrollPos * 0.4}px`;
        });
    }
}
