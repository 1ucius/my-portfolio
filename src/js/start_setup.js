;'use strict'

let styles = document.getElementById('responsive-styles'),
    href;

(function setup() {

    window.onload = function() {

        let userBrowser;
    
        if (navigator.userAgent.search(/Safari/) > 0) {userBrowser = 'Safari'};
        if (navigator.userAgent.search(/Firefox/) > 0) {userBrowser = 'MozillaFirefox'};
        if (navigator.userAgent.search(/MSIE/) > 0 || navigator.userAgent.search(/NET CLR /) > 0) {userBrowser = 'Internet Explorer'};
        if (navigator.userAgent.search(/Chrome/) > 0) {userBrowser = 'Google Chrome'};
        if (navigator.userAgent.search(/YaBrowser/) > 0) {userBrowser = 'Яндекс браузер'};
        if (navigator.userAgent.search(/OPR/) > 0) {userBrowser = 'Opera'};
        if (navigator.userAgent.search(/Konqueror/) > 0) {userBrowser = 'Konqueror'};
        if (navigator.userAgent.search(/Iceweasel/) > 0) {userBrowser = 'Debian Iceweasel'};
        if (navigator.userAgent.search(/SeaMonkey/) > 0) {userBrowser = 'SeaMonkey'};
        if (navigator.userAgent.search(/Edge/) > 0) {userBrowser = 'Edge'};
    
        if( ( userBrowser === 'Internet Explorer' || userBrowser === 'Edge' ) && ( userBrowser != 'MozillaFirefox' || userBrowser != 'Opera' ) ) { 
    
            let content = document.getElementsByClassName( 'slide__content-column' );
            for( let i = 0; i < content.length; i++) {
                content[i].classList.add( 'slide__content-column_no-bg-blend' );
            }
    
        }
    
    }

    window.onresize = changeHref;

    changeHref();

})()

function changeHref() {

    let viewportWidth = window.innerWidth;

    if( viewportWidth <= 767 && href != 'css/styles_max_767.css' ) { 

        styles.href = 'css/styles_max_767.css';
        href = 'css/styles_max_767.css';
        slider.onmousemove = null;
        resetParallax();

    } else if( viewportWidth >= 768 && viewportWidth <= 1023 && href != 'css/styles_min_768.css' ) { 

        styles.href = 'css/styles_min_768.css';
        href = 'css/styles_min_768.css';
        slider.onmousemove = null;
        resetParallax();

    } else if( viewportWidth >= 1024 && href != 'css/styles_min_1024.css' ) { 

        styles.href = 'css/styles_min_1024.css';
        href = 'css/styles_min_1024.css';
        slider.onmousemove = parallax;

    }

}