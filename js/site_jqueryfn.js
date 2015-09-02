//================================
// Custom Jquery Functions
//================================
(function ($) {

  //Check if element exists function
  jQuery.fn.doesExist = function(){
    return jQuery(this).length > 0;
  };

  //Check if element exists function
  jQuery.fn.notExist = function(){
    return jQuery(this).length <= 0;
  };

  jQuery.fn.equalHeight = function(container){
    if( $(container).doesExist() ) {
      var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = [],
        el,
        topPosition = 0;
      $(container).each(function() {

        el = $(this);
        el.height('auto');
        topPosition = el.position().top;
        var currentDiv = 0;

        if (currentRowStart != topPosition) {
          for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
          }
          rowDivs.length = 0; // empty the array
          currentRowStart = topPosition;
          currentTallest = el.height();
          rowDivs.push(el);
         } else {
          rowDivs.push(el);
          currentTallest = (currentTallest < el.height()) ? (el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
      });
    }
  };

  //Fluid Youtube and vimeo embeds
  jQuery.fn.fluidYTandVimeo = function() {
    var iframes = document.getElementsByTagName( 'iframe' );
    for ( var i = 0; i < iframes.length; i++ ) {
      var iframe = iframes[i],
          players = /www.youtube.com|player.vimeo.com/;
      /*
      * If the RegExp pattern exists within the current iframe
      */
      if ( iframe.src.search( players ) > 0 ) {
        /*
        * Calculate the video ratio based on the iframe's w/h dimensions
        */
        var videoRatio        = ( iframe.height / iframe.width ) * 100;
        /*
        * Replace the iframe's dimensions and position
        * the iframe absolute, this is the trick to emulate
        * the video ratio
        */
        iframe.style.position = 'absolute';
        iframe.style.top      = '0';
        iframe.style.left     = '0';
        iframe.width          = '100%';
        iframe.height         = '100%';
        /*
        * Wrap the iframe in a new <div> which uses a
        * dynamically fetched padding-top property based
        * on the video's w/h dimensions
        */
        var wrap              = document.createElement( 'div' );
        wrap.className        = 'fluid-vids';
        wrap.style.width      = '100%';
        wrap.style.position   = 'relative';
        wrap.style.paddingTop = videoRatio + '%';
        /*
        * Add the iframe inside our newly created <div>
        */
        var iframeParent      = iframe.parentNode;
        iframeParent.insertBefore( wrap, iframe );
        wrap.appendChild( iframe );
      }
    }
  };

  //Make Anchor links smooth scroll
  jQuery.fn.anchorScrollTo = function() {
    $('.wysiwyg a[href*=#], .slow-scroll').on('click', function(event) {
      var headerHeight = 5;
      var timing = 1000;
      if ($('#admin-menu').doesExist()) {
        headerHeight = headerHeight + $('#admin-menu').height();
      }
      event.preventDefault();

      if ($(this.hash).doesExist()) {
        $('html,body').animate({scrollTop:$(this.hash).offset().top - headerHeight}, timing);
      } else if ($([name*=''+this.hash.replace("#", "")+''])) {
        $('html,body').animate({scrollTop:$("[name*="+this.hash.replace("#", "")+"]").offset().top - headerHeight}, timing);
      }
    });
  };

  //Featured Work Image Scroller
  jQuery.fn.featuredWorkScrollerSetVars = function() {
    slideHeight = $('.featured-work-large .featured-images .featured-image').outerHeight();
    slideWidth = $('.featured-work-large .featured-images .featured-image').outerWidth();
    $('.featured-work-large .featured-images').height(slideHeight);
    $('.featured-work-large .featured-texts').height(slideHeight * 0.28);
  };
  jQuery.fn.featuredWorkScroller = function() { 
    var countImages = slideImages.length - 1,
        currentImage = 0;

    //Set slide indexes
    $(this).featuredWorkScrollerIdent(slideImages);
    $(this).featuredWorkScrollerIdent(slideTexts);
    $(this).featuredWorkScrollerIdent(controlBtns);

    //Set the sliders initial state
    slideImages.css({'left': '-100%'});
    slideTexts.css({'bottom': '-100%'});
    slideImages.eq(0).css({'left': '0'}).addClass('cur-slide');
    if(slideTextsVisible === true) {
      slideTexts.eq(0).css({'bottom': '0'}).addClass('cur-slide');
    }
    controlBtns.eq(0).addClass('cur-slide');

    //Set Interval for slide change
    var slideChangeInterval = setInterval(function() {
      var nextImage = currentImage + 1;
      if (nextImage > countImages) {
        nextImage = 0;
      }
      $(this).featuredWorkScrollerAnimate(currentImage, nextImage);
      if (currentImage == countImages) {
        currentImage = 0;
      } else {
        currentImage = currentImage + 1;
      }
    }, 10 * 1000); // every 10 seconds

    $('.featued-image-controls .control-button').on('click', function(event) {
      clearInterval(slideChangeInterval);
      clickIndex = $(this).attr('slide-index');
      currentIndex = $('.featured-work-large .controls-list .control-button.cur-slide').attr('slide-index');
      //console.log('click: '+clickIndex+' || cur: '+currentIndex);
      $(this).featuredWorkScrollerAnimate(currentIndex, clickIndex);
    });
    $('.close-pop-button').on('click', function(event) {
      slideTexts.css({'bottom': '-100%'});
      slideTextsVisible = false;
      $('.bring-back-txt-pops').css({ 'visibility': 'visible' });
    });
    $('.bring-back-txt-pops').on('click', function(event) {
      slideTextsVisible = true;
      $('.featured-work-large .featured-texts .featured-text.cur-slide').css({'bottom': '0'});
      $('.bring-back-txt-pops').css({ 'visibility': 'hidden' });
    });
  };
  jQuery.fn.featuredWorkScrollerIdent = function(items) {
    items.each(function( index ) {
      $(this).attr('slide-index', index);
    });
  };
  jQuery.fn.featuredWorkScrollerAnimate = function(outslide, inslide) {
    if (outslide != inslide) {
      //Animate Slides
      slideImages.removeClass('cur-slide');
      slideImages.eq(outslide).animate({ 'left': "100%" }, slidespeed, function() {
        slideImages.eq(outslide).css({ 'left': '-100%' });
      });
      slideImages.eq(inslide).animate({ 'left': "0" }, slidespeed, function() {
        //Nothing
      });
      slideImages.eq(inslide).addClass('cur-slide');
      //Animate Texts 
      slideTexts.removeClass('cur-slide');
      if(slideTextsVisible === true) {
        slideTexts.eq(outslide).animate({ bottom: "-100%" }, textsspeed);
        slideTexts.eq(inslide).animate({ bottom: "0" }, textsspeed);
      }
      slideTexts.eq(inslide).addClass('cur-slide');
      //Remove/Add Class to control buttons   
      controlBtns.removeClass('cur-slide');
      controlBtns.eq(inslide).addClass('cur-slide');
    }
  };

})(jQuery);