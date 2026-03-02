/* ===== Scroll Reveal (Intersection Observer) ===== */
(function () {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));

  /* ===== Count-Up Animation for Hero Stats ===== */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statAnimated = false;

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statAnimated) {
          statAnimated = true;
          animateStats();
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statObserver.observe(heroStats);

  function animateStats() {
    statNumbers.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(target * eased);

        el.textContent = prefix + current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  /* ===== Chart Bar Animation ===== */
  const chartBars = document.querySelectorAll('.chart-bar');

  const chartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const heightPercent = bar.dataset.height;
          const fill = bar.querySelector('.bar-fill');
          // Set the bar container height based on data-height percentage
          bar.style.height = heightPercent * 2.5 + 'px';
          // Trigger animation after a tiny delay
          setTimeout(() => {
            bar.classList.add('animated');
          }, 100);
          chartObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  chartBars.forEach((bar) => chartObserver.observe(bar));

  /* ===== Side Nav Active State ===== */
  const sections = document.querySelectorAll('section[id]');
  const navDots = document.querySelectorAll('.nav-dot');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navDots.forEach((dot) => {
            dot.classList.toggle('active', dot.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((sec) => navObserver.observe(sec));

  /* ===== Smooth Scroll for Nav Dots ===== */
  navDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(dot.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  /* ===== Image Lightbox ===== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  // Attach click to all clickable images (timeline + award)
  const clickableImages = document.querySelectorAll(
    '.timeline-images img, .award-images img'
  );

  clickableImages.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ===== Video Modal ===== */
  const videoModal = document.getElementById('video-modal');
  const videoPlayer = document.getElementById('video-player');
  const videoSource = document.getElementById('video-source');

  document.querySelectorAll('.timeline-video-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.video;
      videoSource.src = src;
      videoPlayer.load();
      videoModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeVideoModal() {
    videoModal.classList.remove('open');
    videoPlayer.pause();
    document.body.style.overflow = '';
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal || e.target.classList.contains('video-modal-close')) {
      closeVideoModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) {
      closeVideoModal();
    }
  });
})();
