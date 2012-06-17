'use strict';

/* Controllers */


function MyCtrl1($scope, $http, LZ) {
    $scope.submission = new LZ();
    $scope.submission.grade_request = {
        "evaluationset_id": "5",
        "mode": "1",
        "source_file": "",
        "file": ""
    }
    //$scope.submission.$compile();

    $scope.tes = function(){
        $http({
            method: 'POST',
            url: 'http://167.205.32.27/lz/services/grading/compile?clientid=100&clienttoken=100',
            data: {
                asu: 'tes',
                tes: 'asu'
            },
            //headers: {'Content-Type': 'multipart/form-data'},
            transformRequest: function(data, headersGetter){
                $scope.log('dataT = ' + data.asu);
                $scope.log('headersGetter = ' + headersGetter);
            }
        }).success(function(data){
            //$scope.log('data = ' + data);
            });
    }

    //$scope.tes();

    $scope.asu = function(){
        $.post("http://167.205.32.27/lz/services/grading/compile?clientid=100&clienttoken=100",
        {
            GradeRequest : {
                    submitter_id : "Timotius NC",
                    evaluationset_id : 9,
                    mode : 1,
                    source_file : "a.cpp"
            }
        }
        );
    }
    //$scope.asu();

    $scope.coba = function post_to_url(path, params, method) {
        method = method || "post"; // Set method to post by default, if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }

    $scope.ziptest = function(){
        var zip = new JSZip();
        $scope.log('zip = ' + zip);
        zip.file("hello1.txt", "Hello First World\n");
        zip.file("hello2.txt", "Hello Second World\n");
        var content = zip.generate();

        var params = new Array();
        params["GradeRequest[submitter_id]"] = "Timotius Nugroho Chandra";
        params["GradeRequest[evaluationset_id]"] = 5;
        params["GradeRequest[mode]"] = 1;
        params["GradeRequest[source_file]"] = "";
        params["GradeRequest[file]"] = "data:application/zip;base64,"+content;
        //$scope.coba('http://167.205.32.27/lz/services/grading/compile?clientid=100&clienttoken=100', params, 'POST');
    }

    $scope.fdata = function(){
        var oMyForm = new FormData();

        oMyForm.append("GradeRequest[submitter_id]", "atob_tanpa_filename");
        oMyForm.append("GradeRequest[evaluationset_id]", 5);
        oMyForm.append("GradeRequest[mode]", 1);
        oMyForm.append("GradeRequest[source_file]", "asu.zip");

        var zip = new JSZip();
        zip.file("hello1.txt", "Hello First World\n");
        zip.file("hello2.txt", "Hello Second World\n");
        var content = zip.generate();

        var oBlob = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)();

        var raw = atob(content);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        oBlob.append(uInt8Array.buffer); // the body of the new file...
        oMyForm.append("GradeRequest[file]", oBlob.getBlob("application/zip"));

        //location.href="data:application/zip;base64,"+content;

        var oReq = new XMLHttpRequest();
        oReq.open("POST", "http://167.205.32.27/lz/services/grading/compile?clientid=100&clienttoken=100");
        oReq.send(oMyForm);
    }
    $scope.fdata();
}
MyCtrl1.$inject = ['$scope', '$http', 'LZ'];

function MyCtrl2($scope) {
    $scope.tes = 'asoe';
    $scope.changeTes = function(){
        $scope.tes = 'bukan asoe';
    }
}
MyCtrl2.$inject = ['$scope'];

/*$http({
        method: 'POST',
        url: 'http://167.205.32.27/lz/services/grading/compile',
        data: {
            asu: 'tes',
            tes: 'asu'
        }
    });*/
