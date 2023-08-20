window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolling', window.scrollY > 0);
});

new Swiper('.services-swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: {
    el: '.services-swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    576: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  },
});
