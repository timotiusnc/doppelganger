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
                var textarea = element.children('.editor-text-area');       //Get textarea object
                textarea.attr('id', 'editor-'+TextAreaCtrl.INSTANCE_CTR);   //Give ID to newly created textarea

                if(!browserDetect.mobileVendor){ //handle Desktop version
                    //Replace original textarea with CodeMirror textarea
                    var cm_instance = CodeMirror.fromTextArea(document.getElementById('editor-' + scope.id), {
                        lineNumbers: true,
                        matchBrackets: true,
                        mode: "text/x-csrc",
                        onKeyEvent: scope.processKeyPress //arg-0: cm_instance; arg-1: keyEvent
                    });
                    cm_instance.setValue(scope.content);
                    scope.instances.push(cm_instance);

                    //Handle textarea height
                    var cm_textarea = $('.CodeMirror-scroll'); //get element instance (indicated with this class name)
                    cm_textarea.bind('click', function(evt){
                        scope.onMouseClick(evt);
                    });
                    if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                        cm_textarea.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
                    }
                    $(window).resize(function() { //Bind and event (window resized)
                        if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                            var contentHeight = $(window).height() - defaultHeight.getOccupiedHeight();
                            cm_textarea.css('height', contentHeight+'px');
                        }
                    });
                }else{ //handle Mobile version
                    //Handle textarea height
                    if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                        textarea.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
                    }
                    $(window).resize(function() { //Bind and event (window resized)
                        if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                            var contentHeight = $(window).height() - defaultHeight.getOccupiedHeight();
                            textarea.css('height', contentHeight+'px');
                        }
                    });

                    //bind keydown event to key processor
                    textarea.bind('keydown', function(event){
                        scope.processKeyPress(textarea, event);
                    });
                }
            }
        }
    });
