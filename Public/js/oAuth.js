/**
   服务器的代码随时可能有新的改进，切勿将此代码下载到本地使用。

   Please DO NOT download this file to your own server
   because it's being changed all the time.
**/

(function () {
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fc2cae4ba21e17c6bfb309990c31639ca' type='text/javascript'%3E%3C/script%3E"));

    function js_url(fname) {
	    var url = "http://b1.rippletek.com/js/";
	    return url + fname;
    }
    window.document.write(
	    '<script type="text/javascript" src="' + js_url("api.js") + '"></script>\n' +
	        '<script type="text/javascript" src="' + js_url("login.js") + '"></script>');
    function poll_api() {
	    if (typeof rptk_apis != "undefined") {
	        rptk_apis.where_am_i();
	        return true;
	    }
	    setTimeout(poll_api, 100);
	    return false;
    }
    poll_api();
})();
