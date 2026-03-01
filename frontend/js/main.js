/* ============================================
   LIKYA GUSTO — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ---------- Mobile Nav Toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Menü linkine tıklayınca mobil menü kapansın
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // ---------- Menu Category Filter ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      menuCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---------- Gallery Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ---------- Reservation Form Min Date ----------
  const dateInput = document.getElementById('date');
  const timeSelect = document.getElementById('time');

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // ---------- Dinamik Saat Seçimi (Hafta içi / Hafta sonu) ----------
  function updateTimeOptions() {
    const selectedDate = dateInput.value;
    if (!selectedDate) {
      timeSelect.innerHTML = '<option value="">Önce tarih seçiniz</option>';
      return;
    }

    const date = new Date(selectedDate + 'T00:00:00');
    const dayOfWeek = date.getDay(); // 0 = Pazar, 6 = Cumartesi
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

    // Hafta içi: 11:00 - 01:30 (kapanış 02:00)
    // Hafta sonu: 11:00 - 02:30 (kapanış 03:00)
    const lastHour = isWeekend ? 2 : 1;   // gece son saat
    const lastMinute = isWeekend ? 30 : 30;

    let options = '<option value="">Saat seçiniz</option>';

    // 11:00 - 23:30 arası (normal saatler)
    for (let h = 11; h <= 23; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = String(h).padStart(2, '0');
        const min = String(m).padStart(2, '0');
        options += `<option value="${hour}:${min}">${hour}:${min}</option>`;
      }
    }

    // 00:00 - 01:30 veya 02:30 arası (gece saatleri)
    for (let h = 0; h <= lastHour; h++) {
      const maxMin = (h === lastHour) ? lastMinute : 30;
      for (let m = 0; m <= maxMin; m += 30) {
        const hour = String(h).padStart(2, '0');
        const min = String(m).padStart(2, '0');
        options += `<option value="${hour}:${min}">${hour}:${min}</option>`;
      }
    }

    timeSelect.innerHTML = options;
  }

  dateInput.addEventListener('change', updateTimeOptions);

  // ---------- Reservation Form Submit ----------
  const form = document.getElementById('reservationForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Loading durumu
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-flex';
    submitBtn.disabled = true;

    const formData = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      guests: parseInt(form.guests.value),
      date: form.date.value,
      time: form.time.value,
    };

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showToast(result.message || 'Rezervasyonunuz başarıyla alındı!', 'success');
        form.reset();
        timeSelect.innerHTML = '<option value="">Önce tarih seçiniz</option>';
      } else {
        const errorMsg = Array.isArray(result.message)
          ? result.message[0]
          : result.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
        showToast(errorMsg, 'error');
      }
    } catch (error) {
      showToast('Sunucuya bağlanılamadı. Lütfen tekrar deneyiniz.', 'error');
    } finally {
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
      submitBtn.disabled = false;
    }
  });

  // ---------- Toast Notification ----------
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');

    toast.className = `toast ${type} show`;
    toastMsg.textContent = message;
    toastIcon.className = `toast-icon fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // ---------- Scroll Animations ----------
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.menu-card, .gallery-item, .info-card, .res-info-item, .about-story, .feature').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

});

// CSS animation keyframe (inline)
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
