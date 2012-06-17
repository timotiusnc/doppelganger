<!DOCTYPE html>
<html lang="en" ng-app="codeEdit">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>CodeEdit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Source Code Editor to help beginners learn how to code with best practice programming">
        <meta name="author" content="Timotius Nugroho Chandra - Institut Teknologi Bandung">

        <!-- styles -->
        <link rel="stylesheet" type="text/css" href="lib/jquery/css/smoothness/jquery-ui-1.8.16.custom.css">
        <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap-responsive.css">
        <link rel="stylesheet" type="text/css" href="lib/codemirror/lib/codemirror.css">
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
		<link rel="stylesheet" type="text/css" href="css/content.css"/>
    </head>
    <body>
        <div class="navbar navbar-fixed-top" id="asu">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#/view1">CodeEdit</a>
                    <div class="nav-collapse">
                        <ul class="nav">
                            <li><a href="#/view1">Home</a></li>
                            <li><a href="#/view2">View 2</a></li>
                            <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Satu</a></li>
                                    <li><a href="#">Dua</a></li>
                                    <li><a href="#">Tiga</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div id="container">
            <div id="content">
                <div ng-view></div>
            </div>

            <footer>
                <hr style="margin:5px"/>
                CodeEdit v<span app-version="kampret"></span><br/>
                Timotius Nugroho Chandra - Institut Teknologi Bandung &copy; 2012
            </footer>
        </div>

        <!-- jQuery -->
        <script type="text/javascript" src="lib/jquery/js/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="lib/jquery/js/jquery-ui-1.8.21.custom.min.js"></script>

        <!-- angular -->
        <script type="text/javascript" src="lib/angular/angular.js"></script>
        <script type="text/javascript" src="lib/angular/angular-resource.js"></script>
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/services.js"></script>
        <script type="text/javascript" src="js/controllers.js"></script>
        <script type="text/javascript" src="js/filters.js"></script>
        <script type="text/javascript" src="js/directives.js"></script>

        <!-- controllers -->
        <script type="text/javascript" src="modules/controllers/KeyDownCtrl.js"></script>

        <!-- directives -->
        <script type="text/javascript" src="modules/directives/textarea.js"></script>
        <script type="text/javascript" src="modules/directives/keypress.js"></script>

		<!--Bootstrap-->
        <script type="text/javascript" src="lib/bootstrap/js/bootstrap.js"></script>

        <!--Code Mirror -->
        <script type="text/javascript" src="lib/codemirror/lib/codemirror.js"></script>
        <script type="text/javascript" src="lib/codemirror/mode/clike/clike.js"></script>

        <!-- JSZip -->
        <script type="text/javascript" src="lib/jszip/jszip.js"></script>

        <script type="text/javascript" src="js/script.js"></script>
    </body>
</html>
