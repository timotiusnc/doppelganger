/* 
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function TextAreaCtrl($scope, sharedService, browserDetect, element){
    //$scope.log('ctr from ctrl = ' + KeyDownCtrl.INSTANCE_CTR);
    $scope.backSpaceCtr = 0;
    $scope.tesAttr = 0;
    $scope.editors = []; //CodeMirror instances

    $scope.processKeyPress = function(element, keyEvent){
        //We need to call $apply here because we make change (call this processKeyPress method)
        //from outside the angular (we call it from codeEditTextArea directive)

        //keyEvent for mobile version only
        if(browserDetect.mobileVendor){
            if (keyEvent.keyCode == 9 ) { //Detect TAB key
                keyEvent.preventDefault();

                var start = element.prop('selectionStart');
                var end = element.prop('selectionEnd');

                element.val(element.val().substring(0, start) + '\t' + element.val().substring(end, element.val().length));

                element.prop('selectionStart', start + 1);
                element.prop('selectionEnd', start + 1);
                element.focus();
                $scope.$apply();
            }
        }

        //keyEvent for both version
        if (keyEvent.keyCode == 8){
            $scope.backSpaceCtr++;
            $scope.$apply(); //Apply the change to force 2-way data-binding to work
        } else {
            //$scope.log(keyEvent.keyCode);
        }
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.SAVE_CODE){ //Save CodeMirror's code into original textarea
            for(i=0,n=$scope.editors.length; i<n; ++i){
                $scope.editors[i].save();
            }
        }
    });
    
    TextAreaCtrl.INSTANCE_CTR++;
    $scope.id = TextAreaCtrl.INSTANCE_CTR;
}
TextAreaCtrl.$inject = ['$scope', 'sharedService', 'browserDetect'];
TextAreaCtrl.INSTANCE_CTR = 0;
