document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        // Change icon
        const icon = this.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Section observer for active nav link
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav items
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Get the corresponding nav link and add active class
                const id = entry.target.getAttribute('id');
                const correspondingNavItem = document.querySelector(`.nav-link[href="#${id}"]`);
                
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
                
                // Set the section as active
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Scroll down button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('#links').offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }
});
// Add this to your existing JavaScript

// Enhanced scroll effects
let lastScrollPosition = 0;

window.addEventListener('scroll', function() {
    const currentScrollPosition = window.scrollY;
    const homeSection = document.querySelector('#home');
    const profileContainer = document.querySelector('.profile-container');
    
    if (homeSection && profileContainer) {
        // Hide profile when scrolling up
        if (currentScrollPosition > lastScrollPosition) {
            // Scrolling down
            profileContainer.style.opacity = '1';
            profileContainer.style.transform = 'translateY(0)';
        } else {
            // Scrolling up
            if (currentScrollPosition > 100) {
                profileContainer.style.opacity = '0';
                profileContainer.style.transform = 'translateY(-20px)';
            } else {
                profileContainer.style.opacity = '1';
                profileContainer.style.transform = 'translateY(0)';
            }
        }
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Initialize profile container
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.style.transition = 'all 0.4s ease-out';
    }
});
