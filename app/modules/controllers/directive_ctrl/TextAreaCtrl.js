/* 
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function TextAreaCtrl($scope, eventRecorder, sharedService, browserDetect){
    $scope.instances = new Array(); //CodeMirror instances

    /**
     * Start timer (if not started); Dispatch keyEvent into eventRecorder
     */
    $scope.processKeyPress = function(element, keyEvent){ //GANTI DENGAN LANGSUNG PANGGIL service eventRecorder
        console.log($scope.instances[0].getOption('mode'));
        eventRecorder.keyPressHandler(keyEvent);
    }

    /**
     * Save CodeMirror's code into original textarea
     */
    $scope.saveCodeMirrorText = function(){
        for(i=0,n=$scope.instances.length; i<n; ++i){
            $scope.instances[i].save();
        }
    }

    /**
     * onMouseClick event
     */
    $scope.onMouseClick = function(evt){
        eventRecorder.mouseClickHandler();
    }

    /**
     * broadcast handling
     */
    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.REQUEST_CODE_TEXT){
            var retval = [];

            //if Desktop OS used, tell TextAreaCtrl to transfer code from CodeMirror to original textarea
            if(!browserDetect.mobileVendor){
                $scope.saveCodeMirrorText();
            }

            //Get textarea contents
            for(i=1; i<=TextAreaCtrl.INSTANCE_CTR; ++i){
                retval[i-1] = $("#untitled-" + i).val();
            }

            sharedService.prepForBroadcast(sharedService.CODE_TEXT_RESPONSE, retval);
        }else if(sharedService.message == sharedService.REQUEST_SAVE_FILE_AS){
            //if Desktop OS used, tell TextAreaCtrl to transfer code from CodeMirror to original textarea
            if(!browserDetect.mobileVendor){
                $scope.saveCodeMirrorText();
            }
        }
    });

    $scope.id = TextAreaCtrl.INSTANCE_CTR;
    TextAreaCtrl.INSTANCE_CTR++;
}
TextAreaCtrl.$inject = ['$scope', 'eventRecorder', 'sharedService', 'browserDetect'];
TextAreaCtrl.INSTANCE_CTR = 0;
