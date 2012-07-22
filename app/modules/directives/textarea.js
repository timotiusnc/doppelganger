/**
 * Directive for codeEdit text area
 * @param keyCode {number} The number keycode to watch (ex: 13 is the return key)
 * @param callback {function} The callback function to fire upon keypress. Takes an 'event' param
 **/

'use strict';

angular.module('codeEdit.directives').
    directive('codeEditTextArea', function(defaultHeight, browserDetect){
        return {
            replace: true,
            templateUrl: 'partials/templates/textarea.html',
            transclude: false,
            scope: {
                content: '='
            },
            controller: TextAreaCtrl,
            link: function(scope, element, attrs){
                console.log('editor-'+TextAreaCtrl.INSTANCE_CTR);
                var textarea = element.children('.editor-text-area');
                textarea.attr('id', 'editor-'+TextAreaCtrl.INSTANCE_CTR);

                if(!browserDetect.mobileVendor){
                    var editor = CodeMirror.fromTextArea(document.getElementById('editor-' + scope.id), {
                        lineNumbers: true,
                        matchBrackets: true,
                        mode: "text/x-csrc",
                        onKeyEvent: scope.processKeyPress
                    });
                    editor.setValue(scope.content);
                    scope.editors.push(editor);

                    var cm_textarea = $('.CodeMirror-scroll'); //get element instance (indicated with this class)

                    if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                        cm_textarea.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
                    }
                    $(window).resize(function() { //Bind and event (window resized)
                        if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                            var contentHeight = $(window).height() - defaultHeight.getOccupiedHeight();
                            cm_textarea.css('height', contentHeight+'px');
                        }
                    });
                }else{
                    textarea.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
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
                    });
                }
            }
        }
    });
