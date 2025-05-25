document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const header = document.querySelector('header');
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    // Hamburger Menu Toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Scroll Effects
    
    // Header shrink on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
        
        // Scroll reveal animations
        scrollReveal();
    });
    
    // Function to handle scroll reveal animations
    function scrollReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check for elements already in viewport on page load
    scrollReveal();
    
    // Service Cards Animation (already set in CSS with staggered delays)
    // This adds a class to each card in sequence for additional entrance animations
    const cards = document.querySelectorAll('.service-card');
    
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('revealed');
            }, index * 100);
        });
    }, 500);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add shine effect on mousemove for service cards
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.opacity = '1';
                shine.style.transform = `translateX(${x * 100}%) translateY(${y * 100}%)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });
    });
    
    // Custom cursor effect for service cards (optional)
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            card.classList.remove('hovered');
        });
    });
    
    // Preloader Animation (optional)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        });
    }
    
    // AOS-like scroll animations for headings and sections
    function initFadeElements() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        setTimeout(() => {
            fadeElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 300);
    }
    
    // Initialize fade elements
    initFadeElements();
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Counter animation (for stats or numbers)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Initialize counter animation when the element is in view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('counter-wrapper')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const counterWrapper = document.querySelector('.counter-wrapper');
    if (counterWrapper) {
        observer.observe(counterWrapper);
    }
    
    // Mobile detection for different animations
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Apply different animations for mobile and desktop
    if (isMobile) {
        document.body.classList.add('is-mobile');
    } else {
        document.body.classList.add('is-desktop');
    }
});