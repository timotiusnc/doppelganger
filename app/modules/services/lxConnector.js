/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('codeEdit.services').
    factory('lxConnector', function(sharedService){
        var lxConnector = {};

        //constant
        var timeout_constant     = 20;
        var client_id            = 100;

        //attrib
        var getResultCtr = 0;
        var queue_id = -1;
        var timer;

        //public static final
        lxConnector.client_token         = '1';
        lxConnector.mw_address           = '167.205.32.27';

        lxConnector.getResultManual = function(){
            console.log('queue_id', queue_id);
            lxConnector.getResult(client_id, lxConnector.client_token, queue_id);
        }

        lxConnector.getResult = function(clientid, clienttoken, id){
            if(id == -1){
                alert('Queue ID is not valid');
                return;
            }
            console.log('getResult');
            ++getResultCtr;

            $.ajax({ //Send POST to Oddysseus' getResult service
                type: 'POST',
                url: 'http://' + lxConnector.mw_address + '/lz/services/grading/detail?clienttoken=' + clienttoken + '&id=' + id,
                success: function(data){
                    var res = eval('(' + data + ')'); //example in js/ResultExample
                    //console.log('graded', res);
                    if(res.detail.status == 2 || res.detail.status == 3){
                        sharedService.prepForBroadcast(sharedService.CODE_GRADED, res.detail.report);
                        lxConnector.stopGetResult();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var errMsg = "Error " + errorThrown.code + " " + errorThrown.message
                    console.log('err', errMsg);
                    sharedService.prepForBroadcast(sharedService.CODE_GRADED, errMsg);
                }
            });

            if(getResultCtr >= timeout_constant){
                lxConnector.stopGetResult();
                sharedService.prepForBroadcast(sharedService.CODE_GRADED, 'Error: Connection timed out');
            }
        }

        lxConnector.submit = function(service, files, input_contents, eval_id){
            var data = { //Build the data parameter
                GradeRequest: {
                    submitter_id: 'DoppelGanger',
                    evaluationset_id: files.length <= 1 ? 2 : 1,
                    mode: 1,
                    source_file: 'DoppelGanger.zip'
                }
            };
            data.input = input_contents;

            /*compile (pasti tak ada input, jadi minimal 1)
                <=1 -> eval_id 2 else 
            execute (pasti ada input, jadi minimal 2 files)
                <= 2 -> eval_id 2 else 1

             (service == "compile") ? (files.length <= 1 ? 2 : 1) : (files.length <= 2 ? 2 : 1),*/

            data.files = new Array();
            for(i=0,n=files.length; i<n; ++i){
                data.files[i] = {
                    name: files[i].fileName,
                    content: files[i].content
                }
            }
            console.log('data sent', data);

            getResultCtr = 0; //reset get result counter
            $.ajax({ //Send POST to Oddysseus' compile service
                type: 'POST',
                url: 'http://' + lxConnector.mw_address + '/lz/services/grading/' + service + '?&clienttoken=' + lxConnector.client_token + '&flat=1',
                data: data,
                success: function(data){
                    console.log('response', data); //example: {"reason":"Ok","success":true,"request_id":"114"}
                    var res = eval('(' + data + ')');
                    queue_id = res.request_id;
                    sharedService.prepForBroadcast(sharedService.RESULT_RECEIVED, queue_id); //Tell the user that the request has been received
                    timer = setInterval(function(){lxConnector.getResult(client_id, lxConnector.client_token, res.request_id)}, 1000); //pooling getResult per 1 sec until get the result
                },
                error: function(jqXHR, textStatus, errorThrown){
                    var errCode     = errorThrown.code;
                    var errMsg      = errorThrown.message;

                    if(!errCode)    {errCode = "";}
                    if(!errMsg)     {errMsg = "connection could not be established"}
                    var errResult   = "Error " + errCode + " " + errMsg;

                    sharedService.prepForBroadcast(sharedService.CODE_GRADED, errResult);
                }
            });
        }

        lxConnector.stopGetResult = function(){
            console.log('clearing interval');
            clearInterval(timer);
        }

        return lxConnector;
    });
