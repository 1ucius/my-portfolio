;"use strict"

let slider                  = document.getElementById('slider'),
    slides                  = document.getElementsByClassName('slide'),
    dots                    = document.getElementsByClassName('navigation-item'),
    wrapper                 = document.getElementById('wrapper'),
    btnDown                 = document.getElementById('button-godown'),
    btnMore                 = document.getElementsByClassName( 'more-button' ),
    secAbout                = document.querySelector('.about'),
    secAboutClose           = document.querySelector('.about .close'),
    colored                 = secAbout.querySelectorAll('.colored'),
    filter                  = document.querySelector( '.slider .filter' ),
    backgrounds             = document.getElementsByClassName( 'slide__content-column' ),
    currentSlide            = 0,
    slidesAmount            = slides.length,
    sliderAnimationDuration = 1000*parseFloat( window.getComputedStyle(wrapper).getPropertyValue('transition-duration') ) || 800,
    touched                 = false,
    counter                 = 0,
    touchSensitivity        = 4,
    initPos,
    curPos;

function hasEvent( e, el ) {
    return ( 'on' + e ) in el;
}

( function startSetup() {

    showHeading();

    setupNavigationEvents();

    for ( let i = 0; i < dots.length; i++ ) {

        dots[i].onclick = function() {

            wrapper.style.transitionDuration = sliderAnimationDuration + 'ms';
            let top           = parseFloat( wrapper.style.getPropertyValue('top') );
            let link          = this.firstElementChild.href.split('#')[1];
            let offset        = Math.round( document.querySelector('[ name =  ' + link + ' ]' ).offsetTop/window.innerHeight );
            let offsetDelta   = offset - Math.abs(top/100);
            currentSlide     += offsetDelta;
            wrapper.style.top = top - offsetDelta*100 + 'vh';
            reStyle();

        }

    }

    hasEvent('touchstart', wrapper) ? 
        wrapper.ontouchstart = function(e) { touched = true; initPos = e.touches[0].pageY; }
        : wrapper.onpointerdown = function(e) { touched = true; initPos = e.clientY; };
    
    hasEvent('touchend', wrapper) ? 
        wrapper.ontouchend = function() { touched = false; initPos = null; }
        : wrapper.onpointerup = function() { touched = false; initPos = null; };

    for( let i = 0; i < btnMore.length; i++ ) {

        btnMore[i].onmouseover = function() {
            filter.classList.add( 'filter_light' );
        }

        btnMore[i].onmouseleave = function() {
            filter.classList.remove( 'filter_light' );
        }

    }

    btnAbout.onclick = function() {
        secAbout.classList.add('about_active');
    }
    
    secAboutClose.onclick = function() {
        secAbout.classList.remove('about_active');
    }

} )()

function setupNavigationEvents() {

    wrapper.addEventListener ? wrapper.addEventListener('wheel', onWheel, false) : '';

    btnDown.onclick = function() { 

        if ( wrapper.removeEventListener ) {                  
            wrapper.removeEventListener("wheel", onWheel, false);
        } 
        btnDown.onclick = null; 
        listener(1); 
        
    };

    hasEvent('touchmove', wrapper) ?
        wrapper.ontouchmove = detectScrollDirection 
        : wrapper.onpointermove = detectScrollDirection;

}

function detectScrollDirection(e) {

    if ( touched ) {

        e = e || window.event;
        counter ++;
        let delta;

        if( e.type === 'touchmove' && counter >= touchSensitivity ) {

            counter = 0;

            if ( wrapper.removeEventListener ) {
                wrapper.ontouchmove = function(e) { curPos = initPos = e.touches[0].pageY; };
            }

            let curPos = e.touches[0].pageY;
            curPos - initPos > 0 ? delta = -1 : delta = 1;
            listener( delta );
            return; 

        }

        if( e.type === 'pointermove' && counter >= touchSensitivity ) {

            counter = 0;
            if ( wrapper.removeEventListener ) {
                wrapper.onpointermove = function(e) { curPos = initPos = e.clientY };
            }

            let curPos = e.clientY;
            curPos - initPos > 0 ? delta = -1 : delta = 1;
            listener( delta );

        }

    }

}

function onWheel(e) {

    e = e || window.event;
    if ( wrapper.removeEventListener ) {
        wrapper.removeEventListener("wheel", onWheel, false);
    } 
    
    let delta;    
    delta = e.deltaY || e.detail || e.wheelDelta;
    delta != e.wheelDelta ?
        delta < 0 ? delta = -1 : delta = 1
        : delta < 0 ? delta = 1 : delta = -1

    listener( delta );
    
}

function listener( delta ) {

    wrapper.style.transitionDuration = '0s';

    if ( currentSlide === 0 && delta < 0 ) {

        currentSlide = slidesAmount - 1;
        wrapper.style.top = - 100 + 'vh';
        wrapper.insertBefore( wrapper.lastElementChild, wrapper.firstElementChild );
        setTimeout( function() { 
            animateWrapper( false, true, delta );
            reStyle(0);
        }, 20);
        return;

    }

    if ( currentSlide === slidesAmount - 1 && delta > 0 ) {

        currentSlide = 0;
        wrapper.style.top = -100*( slidesAmount - 2 ) + 'vh';
        wrapper.appendChild(wrapper.firstElementChild);
        setTimeout( function() { 
            animateWrapper( true, false, delta );
            reStyle(slidesAmount - 1);
        }, 20);
        return;

    }

    currentSlide += delta;
    reStyle();
    setTimeout( function() { animateWrapper( false, false, delta ) }, 20);

}

function animateWrapper(append, insert, delta) {

    setTimeout( setupNavigationEvents, sliderAnimationDuration + 20 );
    wrapper.style.transitionDuration = sliderAnimationDuration + 'ms';
    
    if( insert ) {

        wrapper.style.top = 0 + 'vh';
        setTimeout( function() {

            wrapper.style.transitionDuration = '0s';
            for(let i = 0; i < slidesAmount - 1; i++ ) {
                let top = parseFloat( wrapper.style.getPropertyValue('top') );
                wrapper.insertBefore(wrapper.lastElementChild, wrapper.firstElementChild);
                wrapper.style.top = top + 100*delta + 'vh';
            }
        
        }, sliderAnimationDuration );
        return;

    }

    if( append ) {

        wrapper.style.top = -100*( slidesAmount - 1 ) + 'vh';
        setTimeout( function() {

            wrapper.style.transitionDuration = '0s';
            for(let i = 0; i < slidesAmount - 1; i++ ) {
                let top = parseFloat( wrapper.style.getPropertyValue('top') );
                wrapper.appendChild(wrapper.firstElementChild);
                wrapper.style.top = top + 100*delta + 'vh';
            }
            
        }, sliderAnimationDuration );
        return;

    }

    let top = parseFloat( wrapper.style.getPropertyValue('top') );
    wrapper.style.top = top - 100*delta + 'vh';

}

function reStyle(slideToStyle) {    

    hideHeading();

    let color;
    slideToStyle != null ?
        color = backgrounds[slideToStyle].getAttribute( 'data-color' )
        : color = backgrounds[currentSlide].getAttribute( 'data-color' );

    document.querySelector( '.slide_active .slide__content-column' ).style.backgroundColor = color;
    document.querySelector( '.slide_active' ).classList.remove( 'slide_active' );
    document.querySelector('.navigation-item_active').classList.remove( 'navigation-item_active' );
    dots[currentSlide].classList.add('navigation-item_active');

    secAbout.querySelector( '.photo-holder' ).style.backgroundColor = color;
    for(let i = 0; i < colored.length; i++ ) {
        colored[i].style.color = color;
    }

    if (slideToStyle != null) { 

        slides[slideToStyle].classList.add( 'slide_active' );
        backgrounds[slideToStyle].style.backgroundColor = color; 
        burger.style.backgroundColor = color; 
        showHeading();
        
        return; 
    
    }

    slides[currentSlide].classList.add( 'slide_active' );
    backgrounds[currentSlide].style.backgroundColor = color;    
    burger.style.backgroundColor = color;
    showHeading();
}