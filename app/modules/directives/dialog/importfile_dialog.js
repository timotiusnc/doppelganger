/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('importFileDialog', function(){
        return {
            replace: true,
            templateUrl: 'partials/templates/dialog/importfile_dialog.html',
            transclude: false,
            controller: FileImporterCtrl,
            link: function(scope, elm, attrs) {
                elm.bind('change', scope.handleFileSelect);
                document.getElementById("drop_zone").addEventListener("dragover", scope.handleDragOver, false);
                document.getElementById("drop_zone").addEventListener("drop", scope.handleFileSelectFromDrop, false);
            }
        }
    });
