/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('codeEdit.services').
    factory('lxConnector', function(sharedService){
        var timeout_constant = 5;
        var getResultCtr = 0;
        var lxConnector = {};
        var timer;

        lxConnector.getResult = function(clientid, clienttoken, id){
            console.log('getResult');
            ++getResultCtr;

            $.ajax({
                type: 'POST',
                url: 'http://167.205.32.27/lz/services/grading/detail?clientid=' + clientid + '&clienttoken=' + clienttoken + '&id=' + id,
                success: function(data){
                    var res = eval('(' + data + ')'); //example in js/ResultExample
                    sharedService.prepForBroadcast(sharedService.RESULT_RECEIVED, res);
                    if(res.detail.status == 2 || res.detail.status == 3){
                        sharedService.prepForBroadcast(sharedService.CODE_GRADED, res.detail.report);
                        lxConnector.stopGetResult();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var errMsg = "Error " + errorThrown.code + " " + errorThrown.message
                    sharedService.prepForBroadcast(sharedService.CODE_GRADED, errMsg);
                }
            });

            if(getResultCtr >= timeout_constant){
                lxConnector.stopGetResult();
                sharedService.prepForBroadcast(sharedService.CODE_GRADED, 'Error: Connection timed out');
            }
        }

        lxConnector.submit = function(files){
            var data = {
                GradeRequest: {
                    submitter_id: 'DoppelGanger',
                    evaluationset_id: 3,
                    mode: 1,
                    source_file: 'DoppelGanger.zip'
                }
            };

            data.files = new Array();
            for(i=0,n=files.length; i<n; ++i){
                data.files[i] = {
                    name : files[i].fileName,
                    content: files[i].content
                }
            }
            console.log(data);

            $.ajax({
                type: 'POST',
                url: 'http://167.205.32.27/lz/services/grading/compile?clientid=100&clienttoken=100&flat=1',
                data: data,
                success: function(data){
                    console.log(data); //example: {"reason":"Ok","success":true,"request_id":"114"} 
                    var res = eval('(' + data + ')');
                    timer = setInterval(function(){lxConnector.getResult(100, 100, res.request_id)}, 1000); //pooling getResult per 1 sec until get the result
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var errMsg = "Error " + errorThrown.code + " " + errorThrown.message
                    sharedService.prepForBroadcast(sharedService.CODE_GRADED, errMsg);
                }
            });
        }

        lxConnector.stopGetResult = function(){
            console.log('clearing interval');
            clearInterval(timer);
        }

        return lxConnector;
    });
