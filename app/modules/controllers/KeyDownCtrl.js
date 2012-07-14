/* 
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function KeyDownCtrl($scope, element){
    //$scope.log('ctr from ctrl = ' + KeyDownCtrl.INSTANCE_CTR);
    $scope.backSpaceCtr = 0;
    $scope.tesAttr = 0;

    $scope.processKeyPress = function(element, keyEvent){
        //We need to call $apply here because we make change (call this processKeyPress method)
        //frm outside the angular (we call it from codeEditTextArea directive)
        if (keyEvent.keyCode == 9 ) { // Fake TAB key
            keyEvent.preventDefault();

            var start = element.prop('selectionStart');
            var end = element.prop('selectionEnd');

            element.val(element.val().substring(0, start) + '\t' + element.val().substring(end, element.val().length));

            element.prop('selectionStart', start + 1);
            element.prop('selectionEnd', start + 1);
            element.focus();
            $scope.$apply();
        } else if (keyEvent.keyCode == 8){
            $scope.backSpaceCtr++;
            $scope.$apply(); //Apply the change to force 2-way data-binding to work
        } else {
            //$scope.log(keyEvent.keyCode);
        }
    }
    KeyDownCtrl.INSTANCE_CTR++;
    $scope.id = KeyDownCtrl.INSTANCE_CTR;
}
KeyDownCtrl.$inject = ['$scope'];
KeyDownCtrl.INSTANCE_CTR = 0;
