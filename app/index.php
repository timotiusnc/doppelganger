<!DOCTYPE html>
<html lang="en" ng-app="codeEdit">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>CodeEdit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Source Code Editor to help beginners learn how to code with best practice programming">
        <meta name="author" content="Timotius Nugroho Chandra - Institut Teknologi Bandung">

        <!-- styles -->
        <!--<link rel="stylesheet" type="text/css" href="lib/jquery/css/smoothness/jquery-ui-1.8.16.custom.css">-->
        <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
		<link rel="stylesheet" type="text/css" href="css/content.css"/>
        <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap-responsive.css">
        <link rel="stylesheet" type="text/css" href="lib/jquery.alerts-1.1/jquery.alerts.css">
        <link rel="stylesheet" type="text/css" href="lib/codemirror/lib/codemirror.css">
    </head>
    <body ng-controller="MainCtrl">
        <!--<div code-edit-navbar></div>-->

        <div id="container">
            <div id="content">
                <div ng-view></div>
            </div>

            <!--<footer>
                <div code-edit-footer></div>
                <span id="footer_text">&copy; 2012 CodeEdit two-sub-app Team</span>
            </footer>-->
        </div>

        <div send-file-dialog></div>
        <div file-importer-dialog></div>
        <div result-dialog></div>
        <div compile-dialog
             item-title-attr="tabTitle">
        </div>
        
        <!-- jQuery -->
        <script type="text/javascript" src="lib/jquery/js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="lib/jquery/js/jquery-ui-1.8.21.custom.min.js"></script>

        <!-- angular -->
        <!--<script src="http://code.angularjs.org/1.0.0/angular-1.0.0.js"></script>-->
        <script type="text/javascript" src="lib/angular/angular.js"></script>
        <script type="text/javascript" src="lib/angular/angular-resource.js"></script>
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/services.js"></script>
        <script type="text/javascript" src="js/controllers.js"></script>
        <script type="text/javascript" src="js/filters.js"></script>
        <script type="text/javascript" src="js/directives.js"></script>

        <!-- controllers -->
        <script type="text/javascript" src="modules/controllers/EditorCtrl.js"></script>
        <script type="text/javascript" src="modules/controllers/TextAreaCtrl.js"></script>
        <script type="text/javascript" src="modules/controllers/CompileCtrl.js"></script>
        <script type="text/javascript" src="modules/controllers/SendFileCtrl.js"></script>
        <script type="text/javascript" src="modules/controllers/FileImporterCtrl.js"></script>
        <script type="text/javascript" src="modules/controllers/ResultDialogCtrl.js"></script>
        <script type="text/javascript" src="modules/controllers/FooterCtrl.js"></script>

        <!-- services -->
        <script type="text/javascript" src="modules/services/sharedService.js"></script>
        <script type="text/javascript" src="modules/services/lxConnector.js"></script>
        <script type="text/javascript" src="modules/services/defaultHeight.js"></script>
        <script type="text/javascript" src="modules/services/browserDetect.js"></script>
        <script type="text/javascript" src="modules/services/eventRecorder.js"></script>

        <!-- directives -->
        <script type="text/javascript" src="modules/directives/footer.js"></script>
        <script type="text/javascript" src="modules/directives/tabbedpane.js"></script>
        <script type="text/javascript" src="modules/directives/textarea.js"></script>
        <script type="text/javascript" src="modules/directives/keypress.js"></script>
        <script type="text/javascript" src="modules/directives/navbar.js"></script>
        <script type="text/javascript" src="modules/directives/navbar_codemessaging.js"></script>
        
        <script type="text/javascript" src="modules/directives/dialog/compile_dialog.js"></script>
        <script type="text/javascript" src="modules/directives/dialog/sendfile_dialog.js"></script>
        <script type="text/javascript" src="modules/directives/dialog/result_dialog.js"></script>
        <script type="text/javascript" src="modules/directives/dialog/file_importer_dialog.js"></script>

		<!--Bootstrap-->
        <script type="text/javascript" src="lib/bootstrap/js/bootstrap.js"></script>

        <!-- jQuery alert 1.1 -->
        <script type="text/javascript" src="lib/jquery.alerts-1.1/jquery.alerts.js"></script>

        <!-- FileSaver -->
        <script type="text/javascript" src="lib/filesaver/filesaver.js"></script>

        <!--Code Mirror -->
        <script type="text/javascript" src="lib/codemirror/lib/codemirror.js"></script>
        <script type="text/javascript" src="lib/codemirror/mode/clike/clike.js"></script>

        <!-- JSZip -->
        <script type="text/javascript" src="lib/jszip/jszip.js"></script>

        <script type="text/javascript" src="js/script.js"></script>
    </body>
</html>
