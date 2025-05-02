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
// function addMusicButton() {
//     var audio = document.getElementById("bg-music");
    
//     if (!document.getElementById("playButton") && audio) {
//         let btn = document.createElement("button");
//         btn.innerText = "Play Music";
//         btn.id = "playButton";
//         btn.style.position = "fixed";
//         btn.style.bottom = "20px";
//         btn.style.right = "20px";
//         btn.style.padding = "10px 20px";
//         btn.style.background = "#ff4757";
//         btn.style.color = "#fff";
//         btn.style.border = "none";
//         btn.style.borderRadius = "5px";
//         btn.style.cursor = "pointer";
//         btn.style.zIndex = "9999";
//         btn.style.boxShadow = "0 4px 15px rgba(255, 71, 87, 0.3)";
//         btn.style.transition = "all 0.3s ease";
        
//         btn.addEventListener("mouseenter", function() {
//             btn.style.background = "#ff6b81";
//             btn.style.transform = "translateY(-3px)";
//         });
        
//         btn.addEventListener("mouseleave", function() {
//             btn.style.background = "#ff4757";
//             btn.style.transform = "translateY(0)";
//         });

//         document.body.appendChild(btn);

//         btn.addEventListener("click", function() {
//             audio.play();
//             btn.remove(); // Remove button after playing
//         });
//     }
// }

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
// JavaScript untuk mengelola section iklan

document.addEventListener('DOMContentLoaded', function() {
    // Mengatur video placeholders agar bisa diklik
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
      placeholder.addEventListener('click', function() {
        const parent = this.parentElement;
        const videoSrc = this.getAttribute('data-video-src') || 'path/to/default-video.mp4';
        
        // Buat elemen video baru
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.src = videoSrc;
        video.poster = this.querySelector('img').src;
        video.className = 'ad-video';
        
        // Ganti placeholder dengan video asli
        parent.replaceChild(video, this);
      });
    });
    
    // Fungsi untuk rotasi iklan (jika diperlukan)
    function rotateAds() {
      const adSlots = document.querySelectorAll('.ad-slot');
      adSlots.forEach(slot => {
        // Contoh logika untuk rotasi iklan berdasarkan waktu atau event
        // Ini bisa diimplementasikan sesuai kebutuhan
      });
    }
    
    // Contoh mengambil data iklan dari API (bisa disesuaikan)
    async function fetchAds() {
      try {
        // Contoh: const response = await fetch('/api/ads');
        // const ads = await response.json();
        // Kemudian tempatkan iklan ke slot yang sesuai
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    }
    
    // Contoh fungsi untuk admin untuk menambah iklan (untuk implementasi di panel admin)
    function createAdPlaceholder(config) {
      // Contoh config: {type: 'image', src: 'image.jpg', link: 'https://...', sponsor: 'Nama'}
      const adSlot = document.createElement('div');
      adSlot.className = 'ad-slot';
      adSlot.setAttribute('data-size', config.size || 'medium');
      
      // Buat struktur iklan
      const adContent = document.createElement('div');
      adContent.className = 'ad-content';
      
      if (config.type === 'video') {
        const placeholder = document.createElement('div');
        placeholder.className = 'video-placeholder';
        placeholder.setAttribute('data-video-src', config.src);
        
        const thumbnail = document.createElement('img');
        thumbnail.src = config.thumbnail || config.src.replace('.mp4', '-thumb.jpg');
        thumbnail.alt = config.sponsor + ' Video';
        
        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        playIcon.innerHTML = '<i class="fas fa-play-circle"></i>';
        
        placeholder.appendChild(thumbnail);
        placeholder.appendChild(playIcon);
        adContent.appendChild(placeholder);
      } else {
        // Default: image
        const img = document.createElement('img');
        img.src = config.src;
        img.alt = config.sponsor + ' Advertisement';
        adContent.appendChild(img);
      }
      
      // Info iklan
      const adInfo = document.createElement('div');
      adInfo.className = 'ad-info';
      
      const sponsor = document.createElement('span');
      sponsor.className = 'ad-sponsor';
      sponsor.textContent = config.sponsor;
      
      const cta = document.createElement('a');
      cta.className = 'ad-cta';
      cta.href = config.link || '#';
      cta.textContent = config.ctaText || 'Info';
      
      adInfo.appendChild(sponsor);
      adInfo.appendChild(cta);
      
      // Rangkai semuanya
      adSlot.appendChild(adContent);
      adSlot.appendChild(adInfo);
      
      return adSlot;
    }
    
    // Contoh penggunaan:
    // const newAd = createAdPlaceholder({
    //   type: 'image',
    //   src: 'path/to/ad.jpg',
    //   sponsor: 'Sponsor Baru',
    //   link: 'https://example.com',
    //   ctaText: 'Kunjungi',
    //   size: 'medium'
    // });
    // document.querySelector('.ad-grid').appendChild(newAd);
    
    // Fungsi untuk analitik iklan (contoh sederhana)
    function trackAdClick(adElement, sponsorName) {
      adElement.addEventListener('click', function() {
        console.log(`Ad click tracked: ${sponsorName}`);
        // Disini bisa ditambahkan kode untuk tracking analytics
        // Misalnya: gtag('event', 'ad_click', {'sponsor': sponsorName});
      });
    }
    
    // Tracking untuk semua iklan yang ada
    document.querySelectorAll('.ad-slot').forEach(ad => {
      const sponsor = ad.querySelector('.ad-sponsor').textContent;
      trackAdClick(ad.querySelector('.ad-cta'), sponsor);
    });
  });