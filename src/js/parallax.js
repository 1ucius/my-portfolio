;'use strict'

var contentColumns     = document.getElementsByClassName( 'slide__content' ),
    slideActive        = document.querySelector( '.slide_active' ),
    navigation         = document.querySelector( '.navigation' ),
    btnAbout           = document.getElementById( 'button-about' ),
    parallaxMeasure    = 150,
    parallaxCenterX    = window.innerWidth/2,
    parallaxCenterY    = window.innerHeight/2,
    parallaxObj        = document.getElementsByClassName( 'parallax' );

function parallax(e) {

    let animatedContent = contentColumns[currentSlide];

    let shift = 'translate(' + Math.round( (parallaxCenterX - e.clientX)/parallaxMeasure ) + 'px'  + ', ' + Math.round( (parallaxCenterY - e.clientY)/parallaxMeasure ) + 'px)';
    
    animatedContent.style.transform = shift;
    btnAbout.style.transform = shift;
    btnDown.style.transform = shift;
    navigation.style.transform = shift;

}

function resetParallax() {

    for(let i = 0; i < parallaxObj.length; i++ ) {
        parallaxObj[i].style.transform = 'translate( 0px, 0px )';
    }

}