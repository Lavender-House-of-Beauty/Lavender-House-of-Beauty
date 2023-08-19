window.onscroll = function () {
  let header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolling');
  } else {
    header.classList.remove('scrolling');
  }
};

let swiper = new Swiper('.services-swiper', {
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
