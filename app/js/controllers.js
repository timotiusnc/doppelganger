'use strict';

/* Controllers */


function MyCtrl1($scope, LZ) {
    $scope.submission = new LZ();
    $scope.submission.GradeRequest = {
        "evaluationset_id": "5",
        "mode": "1",
        "source_file": "",
        "file": ""
    }

    $scope.submission.$compile();
}
MyCtrl1.$inject = ['$scope', 'LZ'];

function MyCtrl2($scope) {
    
}
MyCtrl2.$inject = [];

/*$http({
        method: 'POST',
        url: 'http://167.205.32.27/lz/services/grading/compile',
        data: {
            asu: 'tes',
            tes: 'asu'
        }
    });*/
