/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('codeEditTextArea', function(){
        return {
            replace: true,
            templateUrl: 'partials/templates/textarea.html',
            transclude: false,
            scope: true,
            controller: KeyDownCtrl,
            link: function(scope, element, attrs){
                var textarea = element.children('.editor-text-area');
                textarea.attr('id', 'editor-'+KeyDownCtrl.INSTANCE_CTR);

                var editor = CodeMirror.fromTextArea(document.getElementById('editor-' + scope.id), {
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: "text/x-csrc",
                    onKeyEvent: scope.processKeyPress
                });

                scope.log('editor ' + editor.getTextArea());
                /*var new_textarea = $(editor.);
                new_textarea.css('height', ($(window).height() - scope.header_footer)+'px');
                $(window).resize(function() { //Bind and event (window resized)
                    var contentHeight = $(window).height() - scope.header_footer;
                    new_textarea.css('height', contentHeight+'px');
                    scope.log(new_textarea.css('height'));
                });*/

                /*textarea.bind('keydown', function(event){
                    scope.processKeyPress(textarea, event);
                });*/
            }
        }
    });
