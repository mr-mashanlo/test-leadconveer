export function initHidden() {

  const button = document.querySelector( '.info-container__button' );
  const paragraph = document.querySelector( '.info-container__paragraph' );

  button.addEventListener( 'click', () => {
    
    paragraph.classList.toggle( 'active' );
    
    if ( paragraph.classList.contains( 'active' ) ) {
      button.textContent = 'Скрыть';
    } else {
      button.textContent = 'Читать больше';
    }

  } );

}