/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('codeEdit.services').
    factory('lxConnector', function(){
        var lxConnector = {};
        var timer;

        lxConnector.getResult = function(clientid, clienttoken, id){
            console.log('getResult');
            $.ajax({
                type: 'POST',
                url: 'http://167.205.32.27/lz/services/grading/detail?clientid=' + clientid + '&clienttoken=' + clienttoken + '&id=' + id,
                success: function(data){
                    var res = eval('(' + data + ')');
                    console.log(res);
                    lxConnector.stopGetResult();
                }
            });
        }

        lxConnector.submit = function(fileNames, fileContents, clientid){
            var data = {
                GradeRequest: {
                    submitter_id: 'timmy',
                    evaluationset_id: 5,
                    mode: 1,
                    source_file: 'tes_timmy.zip'
                }
            };

            data.files = new Array();
            for(i=0; i<fileNames.length; ++i){
                data.files[i] = {
                    name : fileNames[i].tabTitle,
                    content: fileContents[i]
                }
            }
            console.log(data);

            $.ajax({
                type: 'POST',
                url: 'http://167.205.32.27/lz/services/grading/compile?clientid=100&clienttoken=100&flat=1',
                data: data,
                success: function(data){
                    console.log(data);
                    timer = setInterval(function(){lxConnector.getResult(100, 100, 1)}, 1000); //pooling getResult per 1 sec until get the result
                }
            });

            /*var oMyForm = new FormData();

            oMyForm.append("GradeRequest[submitter_id]", "timmy");
            oMyForm.append("GradeRequest[evaluationset_id]", 5);
            oMyForm.append("GradeRequest[mode]", 1);
            oMyForm.append("GradeRequest[source_file]", "tes_timmy.zip");

            console.log('length = ' + fileNames.length);
            for(i=0; i<fileNames.length; ++i){
                console.log(fileNames[i].tabTitle, files[i]);
                oMyForm.append("files", "tes_timmy.zip");
            }*/
            //oMyForm.append("GradeRequest[source_file_json]", "asu.zip");

            /*var zip = new JSZip();
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
            oMyForm.append("GradeRequest[file]", oBlob.getBlob("application/zip"));*/

            var oReq = new XMLHttpRequest();
            oReq.open("POST", "http://167.205.32.27/lz/services/grading/compile?clientid=100&clienttoken=100", true);
            //oReq.send(oMyForm);

            /*oReq.onreadystatechange=function(){
                if (oReq.readyState==4 && oReq.status==200){
                    var res = eval('(' + oReq.responseText + ')');
                    console.log(res.reason + "#" + res.success + "#" + res.request_id);
                    timer = setInterval(this.getResult(100, 100, 1),1000); //pooling getResult per 1 sec until get the result
                }
            }*/
        }

        lxConnector.stopGetResult = function(){
            console.log('clearing interval');
            clearInterval(timer);
        }

        return lxConnector;
    });
