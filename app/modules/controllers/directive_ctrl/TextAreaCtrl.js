/* 
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function TextAreaCtrl($scope, eventRecorder, sharedService, browserDetect){
    $scope.instances    = new Array(); //CodeMirror instances

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
        for(i=0,n=$scope.instances.length; i<n; ++i){
            $scope.instances[i].save();
        }
    }

    /**
     * onMouseClick event
     */
    $scope.onMouseClick = function(evt){
        eventRecorder.mouseClickHandler($scope.title, evt);
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
        }
    });

    TextAreaCtrl.INSTANCE_CTR++;
}
TextAreaCtrl.$inject = ['$scope', 'eventRecorder', 'sharedService', 'browserDetect'];
TextAreaCtrl.INSTANCE_CTR = 0;
