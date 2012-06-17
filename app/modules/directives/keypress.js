/**
 * Bind an event to the 'return' keypress
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('uiKeypress', function(){
        return {
        controller: KeyDownCtrl,
        link: function(scope, elm, attrs) {
            var params = scope.$eval( '[' + attrs.uiKeypress + ']' );
            params[1] = params[1] || angular.noop();
            elm.bind('keydown', function(event){
                scope.processKeyPress(elm, event);
            });
        }
    }
});