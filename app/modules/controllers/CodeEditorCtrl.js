function CodeEditorCtrl($scope, $window) {
    $scope.dummy = "tes";
    $window.document.title = 'Doppel';
}
CodeEditorCtrl.$inject = ['$scope', '$window'];