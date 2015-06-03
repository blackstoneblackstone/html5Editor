
var Browser = new Object();

Browser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument != 'undefined');
Browser.isIE = window.ActiveXObject ? true : false;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") != - 1);
Browser.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != - 1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera") != - 1);

var Utils = new Object();

Utils.htmlEncode = function(text)
{
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

Utils.trim = function( text )
{
  if (typeof(text) == "string")
  {
    return text.replace(/^\s*|\s*$/g, "");
  }
  else
  {
    return text;
  }
}

Utils.isEmpty = function( val )
{
  switch (typeof(val))
  {
    case 'string':
      return Utils.trim(val).length == 0 ? true : false;
      break;
    case 'number':
      return val == 0;
      break;
    case 'object':
      return val == null;
      break;
    case 'array':
      return val.length == 0;
      break;
    default:
      return true;
  }
}

Utils.isNumber = function(val)
{
  var reg = /^[\d|\.|,]+$/;
  return reg.test(val);
}

Utils.isInt = function(val)
{
  if (val == "")
  {
    return false;
  }
  var reg = /\D+/;
  return !reg.test(val);
}

Utils.isEmail = function( email )
{
  var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;

  return reg1.test( email );
}

Utils.isTel = function ( tel )
{
  var reg = /^[\d|\-|\s|\_]+$/; //只允许使用数字-空格等

  return reg.test( tel );
}

Utils.fixEvent = function(e)
{
  var evt = (typeof e == "undefined") ? window.event : e;
  return evt;
}

Utils.srcElement = function(e)
{
  if (typeof e == "undefined") e = window.event;
  var src = document.all ? e.srcElement : e.target;

  return src;
}

Utils.isTime = function(val)
{
  var reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;

  return reg.test(val);
}

Utils.x = function(e)
{ //当前鼠标X坐标
    return Browser.isIE?event.x + document.documentElement.scrollLeft - 2:e.pageX;
}

Utils.y = function(e)
{ //当前鼠标Y坐标
    return Browser.isIE?event.y + document.documentElement.scrollTop - 2:e.pageY;
}

Utils.request = function(url, item)
{
	var sValue=url.match(new RegExp("[\?\&]"+item+"=([^\&]*)(\&?)","i"));
	return sValue?sValue[1]:sValue;
}

Utils.$ = function(name)
{
    return document.getElementById(name);
}


var listTable = new Object();
/// listTable.url = location.href.lastIndexOf("?") == -1 ? location.href.substring((location.href.lastIndexOf("/")) + 1) : location.href.substring((location.href.lastIndexOf("/")) + 1, location.href.lastIndexOf("?"));  // 如http://my.01w1044.com/index.php?app=cbook&mod=Admin&act=album_list 则url=index
listTable.url = location.href.lastIndexOf("&act") == -1 ? location.href.substring((location.href.lastIndexOf("/")) + 1) : location.href.substring((location.href.lastIndexOf("/")) + 1, location.href.lastIndexOf("&act"));  //index.php?app=cbook&mod=Admin
 listTable.url += "&act=ajaxEditField";

/**
 * 创建一个可编辑区
   validate 验证 2015 add
 */
listTable.edit = function(obj, field, id,validate)
{

  var tag = obj.firstChild.tagName;

  if (typeof(tag) != "undefined" && tag.toLowerCase() == "input")
  {
    return;
  }

  /* 保存原始的内容 */
  var org = obj.innerHTML;
  var val = Browser.isIE ? obj.innerText : obj.textContent;

  /* 创建一个输入框 */
  var txt = document.createElement("INPUT");
  txt.value = (val == 'N/A') ? '' : val;
  txt.style.width = (obj.offsetWidth + 12) + "px" ;

  /* 隐藏对象中的内容，并将输入框加入到对象中 */
  obj.innerHTML = "";
  obj.appendChild(txt);
  txt.focus();

  /* 编辑区输入事件处理函数 */
  txt.onkeypress = function(e)
  {
    var evt = Utils.fixEvent(e);
    var obj = Utils.srcElement(e);

    if (evt.keyCode == 13)
    {
      obj.blur();

      return false;
    }

    if (evt.keyCode == 27)
    {
      obj.parentNode.innerHTML = org;
    }
  }

  /* 编辑区失去焦点的处理函数 */
  txt.onblur = function(e)
  {  var isok=true;
	 if(validate!==''){
		   switch(validate){
			   case 'isInt':
			   if(!Utils.isInt){	
			     isok=false;
			   }			    
			    break;		
			}
			
		  if(!isok){	
		    alert('请输入数字');			
		   return;	
		  }
	 }	  
    if (Utils.trim(txt.value).length > 0)
    {
    	
var object   = new Object();
 object.id    = id;
 object.field = field;
 object.value = encodeURIComponent(Utils.trim(txt.value));
	
    $.ajax( {
    		type : 'POST',
    		url : listTable.url,
    		data : object,
    		success : changeValueResponse,
    		dataType : 'json'
    	});
   
    	obj.innerHTML = Utils.trim(txt.value);
    }
    else
    {
      obj.innerHTML = org;
    }
  }
  
}

function changeValueResponse(result)
{
	switch (result.status) 
	{
	case 0:
		//alert('未更新');
		break;
	case 1:
		//alert('更新成功');
		break;
	default:
		alert('失败');
		break;
	}
}
