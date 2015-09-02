//=======================
// Global Variables
//=======================

//Featured Slider Global Vars
var slideHeight = 50;
var slideWidth = 50;
var slidespeed = 2000;
var textsspeed = 1500;
var slideImages = $('.featured-work-large .featured-images .featured-image');
var slideTexts = $('.featured-work-large .featured-texts .featured-text');
var controlBtns = $('.featured-work-large .controls-list .control-button');
var slideTextsVisible = true;

Cufon.replace('.cufon-txt-1', {color: '-linear-gradient(#e5e5e5, #999999)'});
Cufon.now();

(function ($) {

    // Avoid `console` errors in browsers that lack a console.
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }


})(jQuery);
