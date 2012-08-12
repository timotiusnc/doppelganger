/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('resultDialog', function(){
        return {
            replace: true,
            templateUrl: 'partials/templates/dialog/result_dialog.html',
            transclude: false,
            controller: ResultDialogCtrl
        }
    });
