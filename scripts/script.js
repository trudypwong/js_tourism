document.addEventListener('DOMContentLoaded', function () {
  // Function to load initial activity list from json
  function loadActivityList() {}

  // Function to handle clicking an activity card
  function setupShowActivityDetail() {
    const activities = document.querySelectorAll('.activity-card');
    activities.forEach((activity) => {
      activity.addEventListener('click', (e) => {
        e.preventDefault();
        // Extract the values
        const name = e.target.querySelector('.activity-name h3')?.textContent;
        const tag = e.target.querySelector('.activity-name .tag')?.textContent;
        const image = e.target.querySelector('img')?.getAttribute('src');

        console.log(name);
        console.log(tag);
        console.log(image);
        // Update the values
        const nameDOM = document.querySelector('.a-detail-name');
        const tagDOM = document.querySelector('.a-detail-tag');
        const imageDOM = document.querySelector('.a-detail-image');
        nameDOM.textContent = name;
        tagDOM.textContent = tag;
        imageDOM.setAttribute('src', image);

        // Show the popup
        const detailContainer = document.querySelector('.detail-content');
        detailContainer.classList.remove('hidden');
        detailContainer.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('inside');
        });
        // Close popup
        const closePopup = document.querySelector('.detail-close');
        closePopup.addEventListener('click', (e) => {
          e.preventDefault();
          detailContainer.classList.add('hidden');
        });
        console.log(detailContainer);
      });
    });
  }

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

  // Function for anchor links
  function setupEventPageNavigation() {
    const eventPage = document.getElementsByClassName('event-header');
    if (eventPage && eventPage.length > 0) {
      const eventMenuBtn = document.querySelectorAll('nav li a');
      eventMenuBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const nav = document.querySelector('nav');
          nav.classList.toggle('show');
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
  setupShowActivityDetail();
  loadActivityList();
});
