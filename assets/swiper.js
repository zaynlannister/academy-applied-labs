import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const swiper = new Swiper(".testimonials-swiper", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  mousewheel: true,
  keyboard: true,
});

const blogSwiper = new Swiper(".blog-swiper", {
  slidesPerView: 3,
  pagination: {
    el: ".blog-swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
    },
    770: {
      slidesPerView: 2,
    },
    1120: {
      slidesPerView: 3,
    },
  },
});
