/* 
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function TextAreaCtrl($scope, sharedService, browserDetect, element){
    $scope.instances = []; //CodeMirror instances

    /**
     * Start timer (if not started); Dispatch keyEvent into eventRecorder
     */
    $scope.processKeyPress = function(element, keyEvent){ //GANTI DENGAN LANGSUNG PANGGIL service eventRecorder
        sharedService.prepForBroadcast(sharedService.START_TIMER, null);
        sharedService.prepForBroadcast(sharedService.KEYPRESS_ACTION, keyEvent);
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
        sharedService.prepForBroadcast(sharedService.MOUSECLICK_ACTION, evt);
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
TextAreaCtrl.$inject = ['$scope', 'sharedService', 'browserDetect'];
TextAreaCtrl.INSTANCE_CTR = 0;
