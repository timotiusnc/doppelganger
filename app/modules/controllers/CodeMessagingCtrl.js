function CodeMessagingCtrl($scope, fileHandler, lxConnector) {
    $scope.files = null;
    $scope.selectDeselectStr = 'Select All';

    /**
     * @name compileBtnClick
     * @methodOf CodeMessagingCtrl#
     */
    $scope.compileBtnClick = function(){
        var files = new Array();
        for(var key in $scope.files){
            if($scope.files[key].checked){
                files.push($scope.files[key]);
            }
        }

        lxConnector.submit(files);
    }

    $scope.executeBtnClick = function(){
        console.log('execute');
    }

    $scope.initializeFile = function(){
        $scope.files = fileHandler.listFilesOnLocalStorage();

        for(var key in $scope.files){
            $scope.files[key].checked = false; //initialize check state to false
        }
    }

    $scope.selectDeselect = function(){
        var selectDeselectVar = null;

        if($scope.selectDeselectStr === 'Select All'){
            $scope.selectDeselectStr = 'Deselect All';
            selectDeselectVar = true;
        }else{
            $scope.selectDeselectStr = 'Select All';
            selectDeselectVar = false;
        }

        for(var key in $scope.files){
            $scope.files[key].checked = selectDeselectVar;
        }
    }

    $scope.initializeFile();
}
CodeMessagingCtrl.$inject = ['$scope', 'fileHandler', 'lxConnector'];

/**
 * <p>Partial view 2</p>

<button class="btn btn-primary">Primary</button>
<button class="btn btn-navbar">Navbar</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-inverse">Inverse</button>

<p>
    Showing of 'interpolate' filter:
    {{ 'Current version is v%VERSION%.' | interpolate }}
</p>
 */