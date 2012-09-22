/* 
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function TextAreaCtrl($scope, eventRecorder, sharedService, browserDetect, element){
    $scope.cm_instance    = null;//CodeMirror instance

    /**
     * Start timer (if not started); Dispatch keyEvent into eventRecorder
     */
    $scope.processKeyPress = function(element, keyEvent){
        eventRecorder.keyPressHandler($scope.title, keyEvent);

        if(browserDetect.mobileVendor){
            if (keyEvent.keyCode == 9 ) { //Detect TAB key
                keyEvent.preventDefault();

                var start = element.prop('selectionStart');
                var end = element.prop('selectionEnd');

                element.val(element.val().substring(0, start) + '\t' + element.val().substring(end, element.val().length));
            }
        }
    }

    /**
     * Save CodeMirror's code into original textarea
     */
    $scope.saveCodeMirrorText = function(){
        $scope.cm_instance.save();
    }

    /**
     * onMouseClick event
     */
    $scope.onMouseClick = function(evt){
        eventRecorder.mouseClickHandler($scope.title, evt);
    }

    $scope.onPasteEvent = function(evt){
        eventRecorder.pasteHandler($scope.title, evt);
    }

    $scope.animateTyping = function(cm_instance, textarea, content, interval){
        if(!content){ //if no content, skip it, otherwise all manually typed chars will be deleted
            return;
        }

        var timer = null;
        var from = 0, to = 1;
        var tempContent = '';
        var ctr = 0;

        timer = setInterval(function(){$scope.animateTyping.animate()}, interval);

        $scope.animateTyping.animate = function(){
            ++ctr;
            tempContent = content.substring(from, to);
            ++to;

            textarea.simulateKeyPress(tempContent);
            cm_instance.setValue(tempContent);

            if(to === content.length+1){
                $scope.animateTyping.stopAnimate();
            }
        }

        $scope.animateTyping.stopAnimate = function(){
            clearInterval(timer);
        }
    }

    /**
     * broadcast handling
     */
    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.REQUEST_SAVE_EDITOR){
            //if Desktop OS used, tell TextAreaCtrl to transfer code from CodeMirror to original textarea
            if(!browserDetect.mobileVendor){
                $scope.saveCodeMirrorText();
            }
        }else if(sharedService.message == sharedService.REQUEST_MODE_CHANGE){
            if(!browserDetect.mobileVendor){
                var lang        = sharedService.param.tabLang;
                var tabTitle    = sharedService.param.tabTitle;
                if($scope.title == tabTitle){
                    switch(lang){
                        case "Pascal":
                            $scope.cm_instance.setOption("mode", "text/x-pascal");
                            break;
                        case "C/C++":
                            $scope.cm_instance.setOption("mode", "text/x-csrc");
                            break;
                        case "LISP":
                            $scope.cm_instance.setOption("mode", "text/x-lisp");
                            break;
                            //Tambahkan kasus bahasa baru disini
                    }
                }
            }
        }
    });

    TextAreaCtrl.INSTANCE_CTR++;
}
TextAreaCtrl.$inject = ['$scope', 'eventRecorder', 'sharedService', 'browserDetect'];
TextAreaCtrl.INSTANCE_CTR = 0;
