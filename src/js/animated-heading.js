;'use strict'

function showHeading() {
    let headingActive = document.querySelector( '.slide_active .heading' );
    let i = 0;

    setInterval(function() {

        if( i < headingActive.children.length ) {

            headingActive.children[i].classList.toggle( 'visible' );
            i++;

        } else {
            return false;
        }

    }, 800/headingActive.children.length );
    
}

function hideHeading() {

    let heading = document.querySelector( '.slide_active .heading' );

    for(let i = 0; i < heading.children.length; i++ ) {
        heading.children[i].classList.toggle( 'visible' );
    }

}