'use strict';

/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

angular.module('codeEdit.directives').
    directive('codeEditTextArea', function(){
        return {
            replace: true,
            templateUrl: 'partials/textarea.html',
            link: function(scope, element, attrs){
                element.css('font-family', 'monospace');
                element.css('height', ($(window).height() - scope.header_footer)+'px');
                $(window).resize(function() { //Bind and event (window resized)
                    var contentHeight = $(window).height() - scope.header_footer;
                    element.css('height', contentHeight+'px');
                });

                element.bind('keydown', function(event){
                    if ( event.keyCode == 9 ) { // Fake TAB
						event.preventDefault();

						var start = element.prop('selectionStart');
						var end = element.prop('selectionEnd');

						element.val(element.val().substring(0, start) + '\t' + element.val().substring(end, element.val().length));

						element.prop('selectionStart', start + 1);
                        element.prop('selectionEnd', start + 1);
						element.focus();
					}
                });
            }
        }
    });
