document.addEventListener('DOMContentLoaded', function () {
  // Function to load initial activity list from json
  function loadActivityList() {
    const list = document.querySelector('.activity-list');
    fetch('./../data/activities.json')
      .then((response) => response.json())
      .then((json) => {
        return json.map((item) => {
          const card = document.createElement('a');
          card.classList.add('activity-card');
          const article = document.createElement('article');
          //  image
          const image = document.createElement('img');
          image.setAttribute('src', item.img);
          image.setAttribute('alt', item.alt);
          // main contents
          const container = document.createElement('div');
          container.classList.add('activity-name');
          const name = document.createElement('h3');
          name.textContent = item.name;
          const tag = document.createElement('p');
          tag.classList.add('tag');
          tag.textContent = item.tag;
          container.appendChild(name);
          container.appendChild(tag);
          // Also save some other information - hidden on main page
          const hidden = document.createElement('div');
          hidden.classList.add('hidden');
          const description = document.createElement('p');
          description.classList.add('activity-description');
          description.textContent = item.description;
          const date = document.createElement('p');
          date.classList.add('activity-date');
          date.textContent = item.date;
          const time = document.createElement('p');
          time.classList.add('activity-time');
          time.textContent = item.time;
          hidden.appendChild(description);
          hidden.appendChild(date);
          hidden.appendChild(time);
          article.appendChild(hidden);
          // append all the information
          article.appendChild(image);
          article.appendChild(container);
          card.appendChild(article);
          // add it to the DOM list
          // list.appendChild(card);
          return card;
        });
      })
      .then((cards) => {
        return cards.forEach((card) => {
          list.appendChild(card);
        });
      })
      .then((response) => {
        setupShowActivityDetail();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Function to handle clicking an activity card
  // This needs to be called after the content is dynamically added
  function setupShowActivityDetail() {
    const activities = document.querySelectorAll('.activity-card');
    activities.forEach((activity) => {
      activity.addEventListener('click', (e) => {
        e.preventDefault();
        // Extract the values
        const name = e.target.querySelector('.activity-name h3')?.textContent;
        const tag = e.target.querySelector('.activity-name .tag')?.textContent;
        const description = e.target.querySelector(
          '.activity-description'
        )?.textContent;
        const date = e.target.querySelector('.activity-date')?.textContent;
        const time = e.target.querySelector('.activity-time')?.textContent;
        const image = e.target.querySelector('img')?.getAttribute('src');
        const alt = e.target.querySelector('img')?.getAttribute('alt');
        console.log(name, tag, image, date, time, description);

        // Update the values
        const nameDOM = document.querySelector('.a-detail-name');
        const tagDOM = document.querySelector('.a-detail-tag');
        const imageDOM = document.querySelector('.a-detail-image');
        const descDOM = document.querySelector('.a-detail-desc');
        const dateDOM = document.querySelector('.a-detail-date');
        const timeDOM = document.querySelector('.a-detail-time');
        nameDOM.textContent = name;
        tagDOM.textContent = tag;
        imageDOM.setAttribute('src', image);
        imageDOM.setAttribute('alt', alt);
        descDOM.textContent = description;
        dateDOM.textContent = date;
        timeDOM.textContent = time;

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
  loadActivityList();
  // setupShowActivityDetail();
});
