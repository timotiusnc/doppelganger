/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('codeEditTextArea', ['header_footer', function(header_footer){
        return {
            replace: true,
            templateUrl: 'partials/templates/textarea.html',
            transclude: false,
            scope: true,
            controller: KeyDownCtrl,
            link: function(scope, element, attrs){
                console.log('editor-'+KeyDownCtrl.INSTANCE_CTR);
                var textarea = element.children('.editor-text-area');
                textarea.attr('id', 'editor-'+KeyDownCtrl.INSTANCE_CTR);

                /*var editor = CodeMirror.fromTextArea(document.getElementById('editor-' + scope.id), {
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: "text/x-csrc",
                    onKeyEvent: scope.processKeyPress
                });

                scope.log('editor ' + editor.getTextArea());*/

                //textarea.css('width', ($(window).width() + 'px'));
                textarea.css('height', ($(window).height() - header_footer)+'px');
                $(window).resize(function() { //Bind and event (window resized)
                    var contentHeight = $(window).height() - header_footer;
                    textarea.css('height', contentHeight+'px');
                });

                textarea.bind('keydown', function(event){
                    scope.processKeyPress(textarea, event);
                });
            }
        }
    }]);
