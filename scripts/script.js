document.addEventListener('DOMContentLoaded', function () {
  // Function to handle navbar toggle
  function setupNavbarToggle() {
    const nav = document.querySelector('nav');
    const btn = document.getElementById('menu-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        nav.classList.toggle('show');
      });

      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
      });
    }
  }

  function setupEventPageNavigation() {
    const eventPage = document.getElementsByClassName('event-header');
    if (eventPage && eventPage.length > 0) {
      const eventMenuBtn = document.querySelectorAll('nav li a');
      eventMenuBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          document.body.classList.toggle('show');
          const href = e.target.getAttribute('href');
          const section = document.getElementById(href.substring(1));
          const padding = 8;
          const navbar = document.querySelector('.event-header .nav-bar');
          window.scrollTo({
            top: section?.offsetTop - navbar?.offsetHeight - padding || 0,
            behavior: 'smooth',
          });
        });
      });
    }
  }

  // Initial setup based on page content
  setupNavbarToggle();
  setupEventPageNavigation();
});
