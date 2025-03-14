import '@justinribeiro/lite-youtube';

import { initAccordion } from './accordion.js';
import { initHamburger } from './hamburger.js';
import { initHidden } from './hidden.js';
import { initMicroModal } from './micromodal.js';
import { initSwiper } from './swiper.js';

window.addEventListener( 'load', () => {

  initHamburger();
  initSwiper();
  initAccordion();
  initMicroModal();
  initHidden();

} );