/* 
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function TextAreaCtrl($scope, eventRecorder, sharedService, browserDetect){
    $scope.cm_instance    = null;//CodeMirror instance

    /**
     * Start timer (if not started); Dispatch keyEvent into eventRecorder
     */
    $scope.processKeyPress = function(element, keyEvent){
        eventRecorder.keyPressHandler($scope.title, keyEvent);
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

    $scope.animateTyping = function(cm_instance, textarea, content, interval){
        if(!content){ //if no content, skip it, otherwise all manually typed chars will be deleted
            return;
        }

        var timer = null;
        var from = 0, to = 1;
        var tempContent = '';

        timer = setInterval(function(){$scope.animateTyping.animate()}, interval);

        $scope.animateTyping.animate = function(){
            tempContent = content.substring(from, to);
            ++to;

            textarea.simulateKeyDown(tempContent);
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
                var lang    = sharedService.param.lang;
                var idx     = sharedService.param.idx;
                console.log(lang, idx, $scope.instances.length);
                switch(lang){
                    case "Pascal":
                        $scope.instances[idx].setOption("mode", "text/x-pascal");
                        break;
                    case "C/C++":
                        $scope.instances[idx].setOption("mode", "text/x-csrc");
                        break;
                    case "LISP":
                        $scope.instances[idx].setOption("mode", "text/x-diff");
                        break;
                }
            }
        }
    });

    TextAreaCtrl.INSTANCE_CTR++;
}
TextAreaCtrl.$inject = ['$scope', 'eventRecorder', 'sharedService', 'browserDetect'];
TextAreaCtrl.INSTANCE_CTR = 0;
