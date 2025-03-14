import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export function initSwiper() {

  new Swiper( '.category-swiper', {
    loop: true,
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      450: { slidesPerView: 6 },
      1440: { slidesPerView: 6, spaceBetween: 15 },
      1920: { slidesPerView: 6, spaceBetween: 20 }
    }
  } );

  new Swiper( '.client-swiper', {
    loop: true,
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      450: { slidesPerView: 4 },
      1440: { slidesPerView: 4, spaceBetween: 15 },
      1920: { slidesPerView: 4, spaceBetween: 20 }
    }
  } );

  new Swiper( '.review-quote-swiper', {
    loop: true,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      450: { slidesPerView: 4 },
      1440: { slidesPerView: 4, spaceBetween: 15 },
      1920: { slidesPerView: 4, spaceBetween: 20 }
    }
  } );

  new Swiper( '.review-video-swiper', {
    loop: true,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      450: { slidesPerView: 3 },
      1440: { slidesPerView: 3, spaceBetween: 15 },
      1920: { slidesPerView: 3, spaceBetween: 20 }
    }
  } );

  new Swiper( '.instruction-swiper', {
    loop: true,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      1440: { spaceBetween: 15 },
      1920: { spaceBetween: 20 }
    },
    modules: [ Pagination ],
    pagination: {
      bulletElement: 'button',
      bulletClass: 'swiper-pagination-button',
      bulletActiveClass: 'swiper-pagination-button--active',
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  } );
}