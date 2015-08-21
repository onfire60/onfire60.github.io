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

})(jQuery);