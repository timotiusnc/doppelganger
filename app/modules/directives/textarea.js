/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('codeEditTextArea', function(defaultHeight){
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

                var editor = CodeMirror.fromTextArea(document.getElementById('editor-' + scope.id), {
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: "text/x-csrc",
                    onKeyEvent: scope.processKeyPress
                });

                //console.log(editor.getTextArea());

                var cm_textarea = $('.CodeMirror-scroll');

                cm_textarea.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
                $(window).resize(function() { //Bind and event (window resized)
                    var contentHeight = $(window).height() - defaultHeight.getOccupiedHeight();
                    cm_textarea.css('height', contentHeight+'px');
                });

                cm_textarea.css('width', ($(window).width() - 40)+'px');
                $(window).resize(function() { //Bind and event (window resized)
                    cm_textarea.css('width', ($(window).width() - 40)+'px');
                });

                /*textarea.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
                $(window).resize(function() { //Bind and event (window resized)
                    var contentHeight = $(window).height() - defaultHeight.getOccupiedHeight();
                    textarea.css('height', contentHeight+'px');
                });

                textarea.css('width', ($(window).width() - 40)+'px');
                $(window).resize(function() { //Bind and event (window resized)
                    textarea.css('width', ($(window).width() - 40)+'px');
                });

                textarea.bind('keydown', function(event){
                    scope.processKeyPress(textarea, event);
                });*/
            }
        }
    });
