// ==========================================================================
// 1. EVENT DATE CONFIGURATION
// >>> CHANGE YOUR EVENT DATE AND TIME HERE <<<
// Format: 'Month DD, YYYY HH:MM:SS' or 'YYYY-MM-DDTHH:MM:SS'
// ==========================================================================
const EVENT_DATE = new Date('November 15, 2026 10:00:00');

// ==========================================================================
// 2. LIVE COUNTDOWN LOGIC (T-MINUS CALCULATOR)
// ==========================================================================
function updateCountdown() {
  const targetTime = EVENT_DATE.getTime();
  const currentTime = new Date().getTime();
  const timeDifference = targetTime - currentTime;

  const countdownGrid = document.getElementById('countdownGrid');
  const missionStartedMessage = document.getElementById('missionStartedMessage');

  // Check if the event date has been reached or passed (Zero or negative)
  if (timeDifference <= 0) {
    if (countdownGrid) {
      countdownGrid.style.display = 'none';
    }
    if (missionStartedMessage) {
      missionStartedMessage.classList.add('active');
    }
    return;
  }

  // Time calculations in milliseconds:
  // 1 day = 24 hours * 60 mins * 60 secs * 1000 ms = 86,400,000 ms
  // 1 hour = 60 mins * 60 secs * 1000 ms = 3,600,000 ms
  // 1 min = 60 secs * 1000 ms = 60,000 ms
  // 1 sec = 1000 ms
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Helper function to format numbers with a leading zero (e.g. 5 -> "05")
  const formatNumber = (num) => String(num).padStart(2, '0');

  // Select DOM elements for digits
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Update text inside the elements
  if (daysEl) daysEl.textContent = formatNumber(days);
  if (hoursEl) hoursEl.textContent = formatNumber(hours);
  if (minutesEl) minutesEl.textContent = formatNumber(minutes);
  if (secondsEl) secondsEl.textContent = formatNumber(seconds);
}

// Run immediately when page loads so numbers appear instantly
updateCountdown();

// Update every second (1000 milliseconds)
setInterval(updateCountdown, 1000);

// ==========================================================================
// 3. NAVBAR HAMBURGER MENU (MOBILE)
// ==========================================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

if (navToggle && navMenu) {
  const closeNavMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeNavMenu();
    });
  });

  document.addEventListener('click', (event) => {
    const isClickInsideNavbar = event.target instanceof Element && event.target.closest('#navbar');
    if (!isClickInsideNavbar && navMenu.classList.contains('open')) {
      closeNavMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
      closeNavMenu();
      navToggle.focus();
    }
  });
}

// ==========================================================================
// 4. SCROLL ENTRANCE REVEAL (INTERSECTION OBSERVER)
// ==========================================================================
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add('visible');
  });
}
