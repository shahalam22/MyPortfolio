// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor (desktop only)
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    // Only enable custom cursor on desktop
    if (window.innerWidth > 767 && !('ontouchstart' in window)) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
            cursorFollower.style.display = 'block';
        });
    } else {
        // Hide custom cursor on mobile/touch devices
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }

    // Typing animation
    const typingTexts = [
        'const developer = {',
        '  name: "Shah Alam Abir",',
        '  role: "Software Engineer",',
        '  focus: ["Web Dev", "AI/ML"],',
        '  passion: "Innovation"',
        '}'
    ];
    
    const typingElement = document.getElementById('typing-text');
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    
    function type() {
        const currentText = typingTexts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typeDelay = 50;
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typeDelay = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentText.length) {
            typeDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        }
        
        setTimeout(type, typeDelay);
    }
    
    type();

    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const body = document.body;
    
    // Debug: Check if elements exist
    console.log('Nav toggle element:', navToggle);
    console.log('Nav links container:', navLinksContainer);
    console.log('Screen width:', window.innerWidth);
    
    function toggleMobileMenu() {
        if (!navLinksContainer || !navToggle) {
            console.error('Navigation elements not found');
            return;
        }
        
        navLinksContainer.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('nav-open');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Only add event listener if elements exist
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', toggleMobileMenu);
    } else {
        console.error('Mobile navigation elements not found in DOM');
    }
    
    // Close mobile menu when clicking on nav links
    const navLinksMobile = document.querySelectorAll('.nav-link');
    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinksContainer.classList.contains('active') && 
            !navToggle.contains(e.target) && 
            !navLinksContainer.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767 && navLinksContainer.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Ensure hamburger menu is visible on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 767) {
            navToggle.style.display = 'flex';
            navToggle.style.zIndex = '1002';
        } else {
            navToggle.style.display = 'none';
            if (navLinksContainer.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }
    
    // Force show hamburger menu on very small screens
    function forceShowHamburger() {
        if (window.innerWidth <= 480) {
            navToggle.style.setProperty('display', 'flex', 'important');
            navToggle.style.setProperty('z-index', '1002', 'important');
            console.log('Hamburger forced for screen width:', window.innerWidth);
        }
    }
    
    // Check screen size on load and resize
    checkScreenSize();
    forceShowHamburger();
    
    window.addEventListener('resize', () => {
        checkScreenSize();
        forceShowHamburger();
    });
    
    // Additional check after DOM is fully loaded
    setTimeout(() => {
        checkScreenSize();
        forceShowHamburger();
    }, 100);

    // Parallax effect for hero background (desktop only for performance)
    if (window.innerWidth > 767 && !('ontouchstart' in window)) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const codeRain = document.querySelector('.code-rain');
            if (codeRain) {
                codeRain.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .contact-item, .skill-category');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateObserver.observe(el);
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        card.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create mailto link
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:bsse1439@iit.du.ac.bd?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent!';
        submitButton.style.background = 'var(--accent-color)';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // Terminal typing effect
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const terminalText = terminalBody.innerHTML;
        terminalBody.innerHTML = '';
        
        let terminalIndex = 0;
        function typeTerminal() {
            if (terminalIndex < terminalText.length) {
                terminalBody.innerHTML = terminalText.substring(0, terminalIndex + 1) + '<span class="cursor-blink">|</span>';
                terminalIndex++;
                setTimeout(typeTerminal, 50);
            } else {
                terminalBody.innerHTML = terminalText;
            }
        }
        
        // Start typing when terminal comes into view
        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeTerminal, 500);
                    terminalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        terminalObserver.observe(terminalBody);
    }

    // Add floating particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--accent-color);
            pointer-events: none;
            z-index: -1;
            border-radius: 50%;
            opacity: 0.5;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 3000 + 2000;
        const animation = particle.animate([
            { transform: 'translateY(0px)', opacity: 0.5 },
            { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        });
        
        animation.addEventListener('finish', () => {
            particle.remove();
        });
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);

    // Navbar scroll effect (optimized for mobile)
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let navbarTicking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Only hide navbar on mobile when scrolling down significantly
        const isMobile = window.innerWidth <= 767;
        if (!isMobile || !navLinksContainer.classList.contains('active')) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
        navbarTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!navbarTicking) {
            requestAnimationFrame(updateNavbar);
            navbarTicking = true;
        }
    });

    // Logo click interaction
    const navBrand = document.querySelector('.nav-brand');
    
    if (navBrand) {
        navBrand.addEventListener('click', () => {
            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add pulse effect to text
            navBrand.style.animation = 'logoPulse 0.6s ease-out';
            setTimeout(() => {
                navBrand.style.animation = '';
            }, 600);
        });
    }

    // Add glitch effect to hero title on hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            heroTitle.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        heroTitle.addEventListener('animationend', () => {
            heroTitle.style.animation = '';
        });
    }

    // Skills hover animation
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.background = 'rgba(0, 255, 136, 0.2)';
            skill.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.style.background = '';
            skill.style.transform = '';
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    @keyframes logoPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); text-shadow: 0 0 20px rgba(0, 255, 136, 0.8); }
        100% { transform: scale(1); }
    }
    
    .cursor-blink {
        animation: blink 1s infinite;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            border-top: 1px solid var(--border-color);
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
        
        .cursor,
        .cursor-follower {
            display: none;
        }
        
        body.nav-open {
            overflow: hidden;
        }
        
        .nav-toggle span {
            transition: all 0.3s ease;
        }
        
        .nav-toggle.active span:first-child {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:last-child {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Force display hamburger on smaller screens */
        @media (max-width: 767px) {
            .nav-toggle {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            .nav-links {
                display: flex !important;
            }
        }
        
        /* Extra force for very small screens */
        @media (max-width: 480px) {
            .nav-toggle {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                z-index: 1002 !important;
            }
            
            .nav-links {
                display: flex !important;
                position: fixed !important;
            }
        }
        
        /* Touch optimization */
        @media (hover: none) and (pointer: coarse) {
            .btn:hover,
            .social-link:hover,
            .nav-link:hover,
            .project-card:hover,
            .achievement-card:hover,
            .skill-category:hover {
                transform: none;
            }
            
            .btn:active,
            .social-link:active {
                transform: scale(0.95);
            }
        }
        
        /* Improve tap targets for mobile */
        @media (max-width: 767px) {
            .btn,
            .social-link,
            .nav-link {
                min-height: 44px;
                min-width: 44px;
            }
        }
    }
`;
document.head.appendChild(style);