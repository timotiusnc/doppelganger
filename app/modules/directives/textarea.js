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
                title: '=',
                content: '='
            },
            controller: TextAreaCtrl,
            link: function(scope, element, attrs){
                console.log(scope.title);
                var textarea = element.children('.editor-text-area');       //Get textarea object
                textarea.attr('id', scope.title);   //Give ID to newly created textarea
                textarea.attr('name', scope.title);   //Give ID to newly created textarea

                //bind keydown event to key processor (do it here so automatic testing could be done)
                textarea.bind('keydown', function(event){
                    scope.processKeyPress(textarea, event);
                });

                if(!browserDetect.mobileVendor){ //handle Desktop version
                    //Replace original textarea with CodeMirror textarea
                    var cm_instance = CodeMirror.fromTextArea(document.getElementById(scope.title), {
                        lineNumbers: true,
                        matchBrackets: true,
                        mode: "text/x-pascal", //text/x-csrc
                        onKeyEvent: scope.processKeyPress   //arg[0]: cm_instance; arg[1]: keyEvent
                    });

                    scope.cm_instance = cm_instance;      //Push instances into instances array in TextAreaCtrl

                    //get element instance (indicated with CodeMirror-scroll class name); bind its mouse click event
                    var cm_textarea = $('.CodeMirror-scroll');
                    cm_textarea.bind('click', function(evt){
                        scope.onMouseClick(evt);
                    });

                    //Handle textarea height
                    if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                        cm_textarea.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
                    }
                    $(window).resize(function() { //Bind and event (window resized)
                        if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                            var contentHeight = $(window).height() - defaultHeight.getOccupiedHeight();
                            cm_textarea.css('height', contentHeight+'px');
                        }
                    });

                    if(scope.content.indexOf("/*animation_testing*/") != -1){
                        scope.content = scope.content.replace("/*animation_testing*/", "");
                        scope.animateTyping(cm_instance, textarea, scope.content, 100);
                    }else{
                        cm_instance.setValue(scope.content);    //Set original value
                    }
                }else{ //handle Mobile version
                    //Handle textarea height
                    textarea.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
                    $(window).resize(function() { //Bind and event (window resized)
                        var contentHeight = $(window).height() - defaultHeight.getOccupiedHeight();
                        textarea.css('height', contentHeight+'px');
                    });
                }
            }
        }
    });
