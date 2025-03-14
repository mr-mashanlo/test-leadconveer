export function initHamburger() {

  const hamburgers = document.querySelectorAll( '.hamburger' );
  const nav = document.querySelector( '.header-nav' );

  hamburgers.forEach( hamburger => {
    hamburger.closest( 'button' ).addEventListener( 'click', () => {
      nav.classList.toggle( 'header-nav--active' );
    } );
  } );

}