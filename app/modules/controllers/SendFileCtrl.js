/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function SendFileCtrl($scope){
    $scope.send_file = function(){
        console.log('SendFileCtrl');
    }
}
SendFileCtrl.$inject = ['$scope'];
