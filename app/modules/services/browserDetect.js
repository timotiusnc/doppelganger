angular.module('codeEdit.services').
    factory('browserDetect', function($rootScope){
    //from http://www.quirksmode.org/js/detect.html
    var browserDetect = {
        init: function () {
            /**
             * @name Browser Name
             * @field browser
             */
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";

            /**
             * @name Browser version
             * @field version
             */
            this.version = this.searchVersion(navigator.userAgent)
                || this.searchVersion(navigator.appVersion)
                || "an unknown version";

            /**
             * @name Operating System
             * @field OS
             */
            this.OS = this.searchString(this.dataOS) || "an unknown OS";

            /**
             * @name Mobile Vendor (Android/iPhone/etc, "" if not a mobile device)
             * @field mobileVendor
             */
            this.mobileVendor = this.searchString(this.dataMobileOS) || "";

            /**
             * @name fileAPISupport compatibility
             * @field fileAPISupport
             */
            this.fileAPISupport = function(){
                var retval = '0000'.split('');
                window.File ? retval[0] = '1' : retval[0] = '0';
                window.FileReader ? retval[1] = '1' : retval[1] = '0';
                window.FileList ? retval[2] = '1' : retval[2] = '0';
                window.Blob ? retval[3] = '1' : retval[3] = '0';
                return retval;
            }
        },
        
        searchString: function (data) {
            for (var i=0;i<data.length;i++)	{
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            { 	string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {		// for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            { 		// for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ],
        dataOS : [
            {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iPhone/iPod"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }
        ],
        dataMobileOS: [
            {
                string: navigator.userAgent,
                subString: "Windows Phone",
                identity: "Windows Phone"
            },
            {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iPhone"
            },
            {
                string: navigator.userAgent,
                subString: "iPod",
                identity: "iPod"
            },
            {
                string: navigator.userAgent,
                subString: "Android",
                identity: "Android"
            },
            {
                string: navigator.userAgent,
                subString: "Webkit",
                identity: "Webkit"
            },
            {
                string: navigator.userAgent,
                subString: "Series60",
                identity: "Series60"
            },
            {
                string: navigator.userAgent,
                subString: "Symbian",
                identity: "Symbian"
            },
            {
                string: navigator.userAgent,
                subString: "Windows CE",
                identity: "Windows CE"
            },
            {
                string: navigator.userAgent,
                subString: "BlackBerry",
                identity: "BlackBerry"
            }
        ]
    };
    browserDetect.init();

    return browserDetect;
});
