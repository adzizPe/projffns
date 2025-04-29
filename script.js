  // Navbar Toggle
  const menuToggle = document.querySelector('#menu');
  const navbar = document.querySelector('.navbar-nav');

  menuToggle.addEventListener('click', function(e) {
      navbar.classList.toggle('active');
      e.preventDefault();
  });

  // Close navbar when clicking outside
  document.addEventListener('click', function(e) {
      if(!menuToggle.contains(e.target) && !navbar.contains(e.target)) {
          navbar.classList.remove('active');
      }
  });

  // Game Tabs
  const gameTabs = document.querySelectorAll('.game-tab');
  const gameContents = document.querySelectorAll('.game-content');

  gameTabs.forEach(tab => {
      tab.addEventListener('click', () => {
          // Remove active class from all tabs
          gameTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Hide all content
          gameContents.forEach(content => {
              content.classList.remove('active');
          });
          
          // Show corresponding content
          const gameId = tab.getAttribute('data-game');
          document.getElementById(`${gameId}-content`).classList.add('active');
      });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          if(this.getAttribute('href') !== '#') {
              e.preventDefault();
              
              document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
              });
              
              navbar.classList.remove('active');
          }
      });
  });
  
  // Animation on scroll
  window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if(window.scrollY > 100) {
          navbar.style.padding = '0.3rem 7%';
          navbar.style.background = 'rgba(8, 9, 22, 0.95)';
      } else {
          navbar.style.padding = '0.5rem 7%';
          navbar.style.background = 'rgba(8, 9, 22, 0.9)';
      }
  });