import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const swiperConfigs = [
  {
    selector: '.gallery-swiper',
    slideClass: 'gallery-swiper-slide',
    wrapperClass: 'gallery-swiper-wrapper',
  },
  {
    selector: '.reviews-swiper',
    slideClass: 'reviews-swiper-slide',
    wrapperClass: 'reviews-swiper-wrapper',
    navigation: {
      nextEl: '.reviews-nav .custom-next',
      prevEl: '.reviews-nav .custom-prev',
    },
  },
];

const swiperInstances = {};

function initSwipers() {
  const screenWidth = window.innerWidth;

  swiperConfigs.forEach(config => {
    const container = document.querySelector(config.selector);
    if (!container) return;

    const id = config.selector;

    // Destroy existing swiper
    if (swiperInstances[id]) {
      swiperInstances[id].destroy(true, true);
      delete swiperInstances[id];
    }

    const isSmallScreen = screenWidth <= 375;

    const commonSettings = {
      slidesPerView: 'auto',
      spaceBetween: 50,
      loop: true,
      centeredSlides: true,
      slideClass: config.slideClass,
      wrapperClass: config.wrapperClass,
      direction: 'horizontal',
      on: {
        slideChangeTransitionEnd: () => scaleSlides(container, config.slideClass),
        init: () => scaleSlides(container, config.slideClass),
      },
    };

    if (config.selector === '.gallery-swiper') {
      if (isSmallScreen) {
        const swiper = new Swiper(container, commonSettings);
        swiperInstances[id] = swiper;
      }
    }

    else if (config.selector === '.reviews-swiper') {
      if (isSmallScreen) {
        const swiper = new Swiper(container, {
          ...commonSettings,
          modules: [Navigation],
          navigation: config.navigation,
        });
        swiperInstances[id] = swiper;
      } else {
        const slidesPerView = screenWidth < 1439 ? 1.7 : 6;
        const swiper = new Swiper(container, {
          modules: [Navigation],
          slidesPerView,
          spaceBetween: 10,
          loop: true,
          slideClass: config.slideClass,
          wrapperClass: config.wrapperClass,
          direction: 'horizontal',
          navigation: config.navigation,
        });
        swiperInstances[id] = swiper;
      }
    }
  });
}

// Utility to highlight the center slide
function scaleSlides(container, slideClass) {
  const slides = container.querySelectorAll(`.${slideClass}`);
  slides.forEach(slide => slide.classList.remove('is-center'));

  const activeSlide = container.querySelector(`.${slideClass}.swiper-slide-active`);
  if (activeSlide) activeSlide.classList.add('is-center');
}

// Init on page load
document.addEventListener('DOMContentLoaded', initSwipers);

// Re-init on resize (with debounce)
window.addEventListener('resize', () => {
  clearTimeout(window._swiperResizeTimeout);
  window._swiperResizeTimeout = setTimeout(initSwipers, 300);
});