/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('codeMessagingNavbar', function(){
        return {
            replace: true,
            controller: NavbarMessagingCtrl,
            templateUrl: 'partials/templates/navbar_codemessaging.html',
            transclude: false,
            scope: true
        }
    });
