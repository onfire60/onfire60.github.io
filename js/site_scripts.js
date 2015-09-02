(function ($) {

//==============================================================================
// Run when document is ready ==================================================
//==============================================================================
  $(document).ready(function() {
    //~~~~~~~~~~~~~~~~~~~~
    // All Function Calls
    //~~~~~~~~~~~~~~~~~~~~
      // Framework Functions
      // Makes all youtube / vimeo videos fluid width
      $(this).fluidYTandVimeo();
      // Make all anchors smooth scroll
      $(this).anchorScrollTo();
  });



//==============================================================================
// Run On window Resize ========================================================
//==============================================================================
  $(window).resize(function(){
    //~~~~~~~~~~~~~~~~~~~~
    // All Function Calls
    //~~~~~~~~~~~~~~~~~~~~
    //Sets the featured work scroller vars
    $(this).featuredWorkScrollerSetVars();
    // Sets Elements in the same row to have equal heights
    $(this).equalHeight('.equalheight');
  });



//==============================================================================
// Run after everything has loaded =============================================
//==============================================================================
  $(window).load(function() {
    //~~~~~~~~~~~~~~~~~~~~
    // All Function Calls
    //~~~~~~~~~~~~~~~~~~~~
    //Sets the featured work vars and runs the scroller
    $(this).featuredWorkScrollerSetVars();
    $(this).featuredWorkScroller();
    // Sets Elements in the same row to have equal heights
    $(this).equalHeight('.equalheight');
  });



//==============================================================================
// Run On window Scroll ========================================================
//==============================================================================
  $(window).scroll(function() {
    //~~~~~~~~~~~~~~~~~~~~
    // All Function Calls
    //~~~~~~~~~~~~~~~~~~~~

  });



//==============================================================================
// After Ajax Completes ========================================================
//==============================================================================
  $( document ).ajaxComplete(function() {
    //~~~~~~~~~~~~~~~~~~~~
    // All Function Calls
    //~~~~~~~~~~~~~~~~~~~~
    // Sets Elements in the same row to have equal heights
    $(this).equalHeight('.equalheight');

    //Makes all youtube / vimeo videos fluid width
    $(this).fluidYTandVimeo();

  });


})(jQuery);
