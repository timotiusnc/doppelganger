/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('tabbedPane', function() {
        return {
            controller: TabbedPaneCtrl,
            scope: true,
            templateUrl: 'partials/templates/tabbed_pane.html'
        }
    });
