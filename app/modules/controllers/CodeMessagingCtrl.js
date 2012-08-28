function CodeMessagingCtrl($scope, $window, fileHandler, lxConnector, sharedService) {
    $scope.files = null;
    $scope.selectDeselectStr = 'Select All';
    $window.document.title = 'Ganger';

    $scope.initializeFile = function(){
        $scope.files = fileHandler.listFilesOnLocalStorage();
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

    $scope.compile = function(eval_id){
        var files = new Array();
        for(var key in $scope.files){
            if($scope.files[key].checked){
                files.push(fileHandler.getFileFromLocalStorage(key));
            }
        }

        lxConnector.submit('compile', files, eval_id);
    }

    $scope.execute = function(eval_id, input_contents){
        var files = new Array();
        for(var key in $scope.files){
            if($scope.files[key].checked){
                files.push(fileHandler.getFileFromLocalStorage(key));
            }
        }
        /*files.push({ //make input file
            fileName: 'input',
            content: input_contents
        });*/

        lxConnector.submit('execute', files, input_contents, eval_id);
    }

    $scope.$on(sharedService.HANDLE_BROADCAST, function(){
        if(sharedService.message == sharedService.ASK_TO_COMPILE){
            $scope.compile(sharedService.param);
        }else if(sharedService.message == sharedService.ASK_TO_EXECUTE){
            sharedService.prepForBroadcast(sharedService.ASK_FOR_INPUT_FILE, sharedService.param);
        }else if(sharedService.message == sharedService.RESPONSE_FOR_INPUT_FILE){
            $scope.execute(sharedService.param.eval_id, sharedService.param.input);
        }
    });

    $scope.initializeFile(true);
}
CodeMessagingCtrl.$inject = ['$scope', '$window', 'fileHandler', 'lxConnector', 'sharedService'];

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