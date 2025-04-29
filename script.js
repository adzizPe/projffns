 // Toggle Navbar
 const navbarNav = document.querySelector('.navbar-nav');
 const menuButton = document.querySelector('#menu');
 
 menuButton.addEventListener('click', function() {
     navbarNav.classList.toggle('active');
 });
 
 // Click outside navbar to close
 document.addEventListener('click', function(e) {
     if(!menuButton.contains(e.target) && !navbarNav.contains(e.target)) {
         navbarNav.classList.remove('active');
     }
 });
 
 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
         
         // Close navbar if it's open
         navbarNav.classList.remove('active');
     });
 });