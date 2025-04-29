// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('#menu');
    const navbarNav = document.querySelector('.navbar-nav');
    
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        navbarNav.classList.toggle('active');
        menuToggle.classList.toggle('bx-x');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar-nav') && !e.target.closest('#menu')) {
            navbarNav.classList.remove('active');
            menuToggle.classList.remove('bx-x');
        }
    });
    
    // Close mobile menu when clicking on a menu item
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarNav.classList.remove('active');
            menuToggle.classList.remove('bx-x');
        });
    });
    
    // Initialize animated background with GIFs
    initAnimatedBackground();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add music button if an audio element exists
    if (document.getElementById("bg-music")) {
        addMusicButton();
    }
    
    // Add animated cursor effect
    document.addEventListener("mousemove", function(e) {
        createCursorEffect(e);
    });
});

// Function to add custom cursor effect
function createCursorEffect(e) {
    let cursorEffect = document.createElement("div");
    cursorEffect.classList.add("custom-cursor");
    document.body.appendChild(cursorEffect);

    cursorEffect.style.left = `${e.pageX}px`;
    cursorEffect.style.top = `${e.pageY}px`;

    setTimeout(() => {
        cursorEffect.remove();
    }, 500);
}

// Function to add music button
function addMusicButton() {
    var audio = document.getElementById("bg-music");
    
    if (!document.getElementById("playButton") && audio) {
        let btn = document.createElement("button");
        btn.innerText = "Play Music";
        btn.id = "playButton";
        btn.style.position = "fixed";
        btn.style.bottom = "20px";
        btn.style.right = "20px";
        btn.style.padding = "10px 20px";
        btn.style.background = "#ff4757";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "5px";
        btn.style.cursor = "pointer";
        btn.style.zIndex = "9999";
        btn.style.boxShadow = "0 4px 15px rgba(255, 71, 87, 0.3)";
        btn.style.transition = "all 0.3s ease";
        
        btn.addEventListener("mouseenter", function() {
            btn.style.background = "#ff6b81";
            btn.style.transform = "translateY(-3px)";
        });
        
        btn.addEventListener("mouseleave", function() {
            btn.style.background = "#ff4757";
            btn.style.transform = "translateY(0)";
        });

        document.body.appendChild(btn);

        btn.addEventListener("click", function() {
            audio.play();
            btn.remove(); // Remove button after playing
        });
    }
}

// Function to initialize animated background with GIFs
function initAnimatedBackground() {
    // Array of GIF paths - replace with your actual paths
    const images = [
        "assets/animasi0.gif",
        "assets/animasi1.gif",
        "assets/animasi2.gif",
        "assets/animasi3.gif",
        "assets/animasi4.gif",
        "assets/animasi5.gif",
        "assets/animasi6.gif",
        "assets/animasi7.gif",
        "assets/animasi8.gif",
        "assets/animasi9.gif",
        "assets/animasi10.gif",
        "assets/animasi11.gif",
        "assets/animasi12.gif"
    ];
    
    // Create or get the background container
    let bgContainer = document.querySelector('.animated-bg');
    if (!bgContainer) {
        bgContainer = document.createElement("div");
        bgContainer.classList.add("animated-bg");
        document.body.appendChild(bgContainer);
    }
    
    // Function to create and add GIF elements
    function createBgElement() {
        let bgImage = document.createElement("img");
        
        // Select a random image from the array
        bgImage.src = images[Math.floor(Math.random() * images.length)];
        
        // Position the image randomly along the width
        bgImage.style.left = Math.random() * window.innerWidth + "px";
        bgImage.style.top = "-60px"; // Start above the viewport
        
        // Set random animation duration for varied movement
        const duration = 15 + Math.random() * 10; // 15-25 seconds
        bgImage.style.animationDuration = duration + "s";
        
        // Add loading and error handling
        bgImage.onload = () => {
            bgContainer.appendChild(bgImage);
            
            // Remove image after animation completes
            setTimeout(() => {
                bgImage.remove();
            }, duration * 1000); // Convert to milliseconds
        };
        
        bgImage.onerror = () => {
            console.error("Failed to load GIF:", bgImage.src);
        };
    }
    
    // Start adding GIFs at intervals
    setInterval(createBgElement, 1500); // Add new GIF every 1.5 seconds
    
    // Add initial GIFs
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createBgElement();
        }, i * 300); // Stagger the initial GIFs
    }
}

// Section animation on scroll
window.onscroll = function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const header = document.querySelector('.navbar');
    const menubar = document.querySelector('#menu');
    const navbar = document.querySelector('.navbar-nav');
    
    // Add sticky class to header
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }
    
    // Animate sections when they come into view
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top > offset && top < offset + height) {
            sec.classList.add('start-animation');
            
            // Highlight active navigation link
            if (id) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
    
    // Parallax effect on scroll
    const scrollPosition = window.scrollY;
    
    // Hero parallax effect
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    }
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.feature-card, .footer-about, .footer-links, .footer-social');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};