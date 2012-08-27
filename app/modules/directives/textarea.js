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

                //bind keydown and keypress event to key processor (do it here so automatic testing could be done)
                textarea.bind('keydown', function(event){
                    scope.processKeyPress(textarea, event);
                });
                textarea.bind('keypress', function(event){
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
                    var cm_element = $('.CodeMirror-scroll');
                    cm_element.bind('click', function(evt){
                        scope.onMouseClick(evt);
                    });

                    var tab_panes = $('.tab-pane'); //get all tab panes element
                    //select last tab_panes (newest one), then get last textarea. (First textarea is the original, second is the codemirror textarea)
                    var cm_textarea = tab_panes[tab_panes.length-1].getElementsByTagName('textarea')[1];
                    jQuery(cm_textarea).bind('paste', function(evt){
                        scope.onPasteEvent(evt);
                    });

                    //Handle textarea height
                    if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                        cm_element.css('height', ($(window).height() - defaultHeight.getOccupiedHeight())+'px');
                    }
                    $(window).resize(function() { //Bind and event (window resized)
                        if($(window).height() > defaultHeight.MINIMUM_HEIGHT){
                            var contentHeight = $(window).height() - defaultHeight.getOccupiedHeight();
                            cm_element.css('height', contentHeight+'px');
                        }
                    });

                    if(scope.content.indexOf("animation_testing") != -1){
                        scope.content = scope.content.replace("/*animation_testing*/", "");
                        scope.content = scope.content.replace("(*animation_testing*)", "");
                        scope.content = scope.content.replace(";animation_testing", "");
                        scope.animateTyping(cm_instance, textarea, scope.content, 50);
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
