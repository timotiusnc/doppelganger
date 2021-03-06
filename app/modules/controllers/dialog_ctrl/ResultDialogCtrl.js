/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function ResultDialogCtrl($scope, fileHandler, sharedService){
    $('#resultDialogModal').on('shown', function () { //When the modal shown
        //initialize variable
        $scope.duration         = 0;
        $scope.backSpaceCtr     = 0;
        $scope.directionCtr     = 0;
        $scope.keyPressCtr      = 0;
        $scope.mouseClickCtr    = 0;
        $scope.saveCtr          = 0;
        $scope.compilationCtr   = 0;
        $scope.executionCtr     = 0;
        $scope.copypasteCtr     = 0;
        
        $scope.totalChar        = 0;
        $scope.kebersihan_cara_pikir= 0;
        $scope.akurasi_pengetikan   = 0;

        //sum up the variable
        for(var fileName in fileHandler.files){
            //console.log(fileHandler.files[fileName]);
            fileHandler.saveFile(fileName);

            $scope.duration         += fileHandler.files[fileName].duration;
            $scope.backSpaceCtr     += fileHandler.files[fileName].backspace_ctr;
            $scope.directionCtr     += fileHandler.files[fileName].dir_ctr;
            $scope.keyPressCtr      += fileHandler.files[fileName].keypress_ctr;
            $scope.mouseClickCtr    += fileHandler.files[fileName].mouseclick_ctr;
            $scope.saveCtr          += fileHandler.files[fileName].save_ctr;
            $scope.compilationCtr   += fileHandler.files[fileName].compile_ctr;
            $scope.executionCtr     += fileHandler.files[fileName].execute_ctr;
            $scope.copypasteCtr     += fileHandler.files[fileName].copypaste_ctr;
            if(fileHandler.files[fileName].content){
                $scope.totalChar        += fileHandler.files[fileName].content.length;
            }

            //console.log($scope.totalChar, $scope.keyPressCtr);
        }

        //calculate
        $scope.kebersihan_cara_pikir= ($scope.totalChar/$scope.keyPressCtr)*100;
        $scope.akurasi_pengetikan   = ( ($scope.keyPressCtr - ($scope.backSpaceCtr + $scope.mouseClickCtr + $scope.directionCtr)) / $scope.keyPressCtr)*100;

        //round up to 2 numbers behind comma
        $scope.kebersihan_cara_pikir= Math.round($scope.kebersihan_cara_pikir*100)/100;
        $scope.akurasi_pengetikan   = Math.round($scope.akurasi_pengetikan*100)/100;

        //$scope.$apply();
    });

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        
    });
}
ResultDialogCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
