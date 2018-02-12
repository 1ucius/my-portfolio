;"use strict"

let burgerClickArea = document.getElementById( 'click-area' ),
    burger          = document.getElementById( 'burger' ),
    list            = document.getElementById( 'list' ),
    listItems       = document.getElementsByClassName( 'menu__item' ),
    aboutMeLink     = document.querySelector( '.about-me-link' );

burgerClickArea.onclick = function() {         

    if( !burger.classList.contains( 'burger_active') ) {
        setTimeout(function() {
            restyleMenu();
        }, 270);
        burger.classList.toggle( 'burger_active' );
    } else {
        restyleMenu(true);
        setTimeout(function() {
            burger.classList.toggle( 'burger_active' );
       }, 170);
    }

}

aboutMeLink.onclick = function() {
    secAbout.classList.add('about_active');
    restyleMenu(true);
    setTimeout(function() {
        burger.classList.toggle( 'burger_active' );
   }, 170);
}

function restyleMenu(visible) {

    if ( visible ) {

        let i = listItems.length - 1;
        let timer = setInterval( function() {
            
            if( i >= 0 ) {
                listItems[i].classList.toggle( 'menu__item_visible' );
                i--;
            } else {
                clearInterval(timer);
            }

        }, 800/listItems.length );

    } else {

        let i = 0;
        let timer = setInterval( function() {

            if( i < listItems.length ) {
                listItems[i].classList.toggle( 'menu__item_visible' );
                i++;
            } else {
                clearInterval(timer);
            }

        }, 500/listItems.length );

    }

}