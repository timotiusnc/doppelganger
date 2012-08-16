/*
 * KeyDownEvent controller
 * Intercept all keydown event
 */

function ResultDialogCtrl($scope, fileHandler, sharedService){
    $('#resultDialogModal').on('shown', function () { //When the modal shown
        //initialize variable
        $scope.keyPressCtr      = 0;
        $scope.totalChar        = 0;
        $scope.directionCtr     = 0;
        $scope.mouseClickCtr    = 0;
        $scope.backSpaceCtr     = 0;
        $scope.compilationCtr   = 0;
        $scope.duration         = 0;

        $scope.kebersihan_cara_pikir= 0;
        $scope.akurasi_pengetikan   = 0;

        //sum up the variable
        for(var fileName in fileHandler.files){
            //console.log(fileHandler.files[fileName]);
            fileHandler.saveFile(fileName);

            $scope.keyPressCtr      += fileHandler.files[fileName].keypress_ctr;
            $scope.directionCtr     += fileHandler.files[fileName].dir_ctr;
            $scope.mouseClickCtr    += fileHandler.files[fileName].mouseclick_ctr;
            $scope.backSpaceCtr     += fileHandler.files[fileName].backspace_ctr;
            $scope.duration         += fileHandler.files[fileName].duration;
            if(fileHandler.files[fileName].content){
                $scope.totalChar        += fileHandler.files[fileName].content.length;
            }

            //console.log($scope.totalChar, $scope.keyPressCtr);
        }

        //calculate
        $scope.kebersihan_cara_pikir= ($scope.totalChar/$scope.keyPressCtr)*100;
        $scope.akurasi_pengetikan   = (($scope.backSpaceCtr + $scope.mouseClickCtr + $scope.directionCtr)/$scope.keyPressCtr)*100;

        //round up to 2 numbers behind comma
        $scope.kebersihan_cara_pikir= Math.round($scope.kebersihan_cara_pikir*100)/100;
        $scope.akurasi_pengetikan   = Math.round($scope.akurasi_pengetikan*100)/100;

        //$scope.$apply();
    });

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.SEND_CODINGRESULT){
            var param = sharedService.param;

            $scope.keyPressCtr      = param.keyPressCtr;
            $scope.directionCtr     = param.directionCtr;
            $scope.mouseClickCtr    = param.mouseClickCtr;
            $scope.backSpaceCtr     = param.backSpaceCtr;
            $scope.compilationCtr   = param.compilationCtr;
            $scope.duration         = param.duration;

            //Get total code characters
            sharedService.prepForBroadcast(sharedService.REQUEST_CODE_TEXT, null);
        }else if(sharedService.message == sharedService.CODE_TEXT_RESPONSE){
            var codes           = sharedService.param;
            var codes_length    = 0;

            for(i=0,n=codes.length; i<n; ++i){
                codes_length += codes[i].length;
            }
            $scope.totalChar = codes_length;

            //calculate
            $scope.jumlah_ketikan       = ($scope.totalChar/$scope.keyPressCtr)*100;
            $scope.akurasi_pengetikan   = (($scope.backSpaceCtr + $scope.mouseClickCtr + $scope.directionCtr)/$scope.keyPressCtr)*100;

            //round up to 2 numbers behind comma
            $scope.jumlah_ketikan       = Math.round($scope.jumlah_ketikan*100)/100;
            $scope.akurasi_pengetikan   = Math.round($scope.akurasi_pengetikan*100)/100;
        }
    });
}
ResultDialogCtrl.$inject = ['$scope', 'fileHandler', 'sharedService'];
