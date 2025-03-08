// Navigation and Scroll Logic
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

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


    // Add before form submission code
// Lightbox functionality
document.querySelectorAll('.gallery-image').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <img src="${img.dataset.full}" 
           alt="${img.alt}" 
           class="lightbox-img">
      <div class="lightbox-close">×</div>
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.remove();
    });
  });
});

// Update animation targets
const animateOnScroll = function() {
  const animation_elements = document.querySelectorAll(
    '.timeline-item, .project-card, .leadership-item, .gallery-card'
  );
  // Keep existing animation logic
};

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Please fill out all fields';
            return;
        }
        
        // Email validation
        if (!validateEmail(email)) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Please enter a valid email address';
            return;
        }
                formStatus.textContent = 'Sending...';
        
        setTimeout(() => {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Your message has been sent successfully!';
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }, 1500);
    });

    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Add animation on scroll
    const animateOnScroll = function() {
        const animation_elements = document.querySelectorAll('.timeline-item, .project-card, .leadership-item');
        
        animation_elements.forEach(element => {
            const element_position = element.getBoundingClientRect().top;
            const screen_position = window.innerHeight;
            
            if(element_position < screen_position - 100) {
                element.classList.add('appear');
            }
        });
    }
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .timeline-item, .project-card, .leadership-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .timeline-item.appear, .project-card.appear, .leadership-item.appear {
            opacity: 1;
            transform: translateY(0);
        }
        .project-card:nth-child(2), .timeline-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        .project-card:nth-child(3), .timeline-item:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
    
    // Initial animation check
    animateOnScroll();
    
    // Scroll event for animations
    window.addEventListener('scroll', animateOnScroll);

    // Typed.js effect for hero section (if you want to add this library)
    // This is commented out because it requires the Typed.js library
    // If you want to use it, add the library via CDN in your HTML and uncomment this code
    /*
    if(typeof Typed !== 'undefined') {
        let typed = new Typed('.typed-text', {
            strings: ["Statistics Student", "Data Scientist", "Problem Solver"],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 1500,
            loop: true
        });
    }
    */
});

document.addEventListener("DOMContentLoaded", function () {
    const words = ["Data Scientist", "Programmer", "Journalist"];
    let wordIndex = 0;
    let letterIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenWords = 1500;
    const typedText = document.getElementById("typed-text");

    function type() {
        if (letterIndex < words[wordIndex].length) {
            typedText.textContent += words[wordIndex].charAt(letterIndex);
            letterIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenWords);
        }
    }

    function erase() {
        if (letterIndex > 0) {
            typedText.textContent = words[wordIndex].substring(0, letterIndex - 1);
            letterIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingSpeed);
        }
    }

    setTimeout(type, 500);
});
// Navigation and Scroll Logic
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

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


    // Add before form submission code
// Lightbox functionality
document.querySelectorAll('.gallery-image').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <img src="${img.dataset.full}" 
           alt="${img.alt}" 
           class="lightbox-img">
      <div class="lightbox-close">×</div>
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.remove();
    });
  });
});

// Update animation targets
const animateOnScroll = function() {
  const animation_elements = document.querySelectorAll(
    '.timeline-item, .project-card, .leadership-item, .gallery-card'
  );
  // Keep existing animation logic
};

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Please fill out all fields';
            return;
        }
        
        // Email validation
        if (!validateEmail(email)) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Please enter a valid email address';
            return;
        }
                formStatus.textContent = 'Sending...';
        
        setTimeout(() => {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Your message has been sent successfully!';
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }, 1500);
    });

    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Add animation on scroll
    const animateOnScroll = function() {
        const animation_elements = document.querySelectorAll('.timeline-item, .project-card, .leadership-item');
        
        animation_elements.forEach(element => {
            const element_position = element.getBoundingClientRect().top;
            const screen_position = window.innerHeight;
            
            if(element_position < screen_position - 100) {
                element.classList.add('appear');
            }
        });
    }
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .timeline-item, .project-card, .leadership-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .timeline-item.appear, .project-card.appear, .leadership-item.appear {
            opacity: 1;
            transform: translateY(0);
        }
        .project-card:nth-child(2), .timeline-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        .project-card:nth-child(3), .timeline-item:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
    
    // Initial animation check
    animateOnScroll();
    
    // Scroll event for animations
    window.addEventListener('scroll', animateOnScroll);

    // Typed.js effect for hero section (if you want to add this library)
    // This is commented out because it requires the Typed.js library
    // If you want to use it, add the library via CDN in your HTML and uncomment this code
    /*
    if(typeof Typed !== 'undefined') {
        let typed = new Typed('.typed-text', {
            strings: ["Statistics Student", "Data Scientist", "Problem Solver"],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 1500,
            loop: true
        });
    }
    */
});

document.addEventListener("DOMContentLoaded", function () {
    const words = ["Data Scientist", "Programmer", "Journalist"];
    let wordIndex = 0;
    let letterIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenWords = 1500;
    const typedText = document.getElementById("typed-text");

    function type() {
        if (letterIndex < words[wordIndex].length) {
            typedText.textContent += words[wordIndex].charAt(letterIndex);
            letterIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenWords);
        }
    }

    function erase() {
        if (letterIndex > 0) {
            typedText.textContent = words[wordIndex].substring(0, letterIndex - 1);
            letterIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingSpeed);
        }
    }

    setTimeout(type, 500);
});
