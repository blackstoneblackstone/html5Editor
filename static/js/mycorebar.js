function openTheBar(callBack,title,width,height,mt){
	if(!title)title = '';
	if(!width)width = 800;
	if(!height)height = 400;
	if(!mt)mt = 200;
	var theContanHeight = height - 35;
	var contant = 
	"<div class='theBar' align='center' style=\"filter:alpha(opacity=0);opacity:0;background-image:url('static/img/util/screenback.png');top:0px;left:0px;position:absolute;width:100%;height:100%;z-index:50000;\">"+
  	"	<div id='theBarDrag' style='width:"+width+"px;height:"+height+"px;top:"+mt+"px;border:5px solid white;background-color:white;'>"+
  	"		<div style='width:100%;height:35px;background-color:white;'>"+
  	"		<table id='myBarTop' style='width:95%;height:35px;cursor:move;'>"+
  	"		<tr>"+
  	"			<td style='color:#555555;font-family:微软雅黑;font-size:18px;'>&nbsp;"+title+"</td>"+
  	"			<td width='16' valign='top' style='cursor:pointer;' onclick='closeTheBar()'><img src='static/img/util/close.png'></td>"+
  	"		</tr>"+
  	"		</table>"+
  	"		</div>"+
  	"		<div id='theBarContant' style='width:100%;height:"+theContanHeight+"px;overflow-y:auto;color:#333333;'>"+
	"		</div>"+
  	"	</div>"+
  	"</div>";
	$("body").append(contant);
	$( "#theBarDrag").draggable({containment:"parent",handle:"#myBarTop"});
	if(callBack)callBack($('#theBarContant'));
	$(".theBar").animate({opacity:1},400);
}
function closeTheBar(){
	$(".theBar").animate({opacity:0},400,null,function(){
		$(".shouldGetBiigerImgBigger").remove();
		$(this).remove();
	});
}
function alertm(text){
	openTheBar(function(con){con.html("<p>"+text+"</p>");},'提示',200,100);
}
function openM(open){
	if(!open){
		var contant = "<div class='MBBar' align='center' style=\"background-image:url('static/img/util/screenback.png');top:0px;left:0px;position:absolute;width:100%;height:100%;z-index:50000;\">"+
		"<table style='width:100%;height:100%;'><tr><td align='center'><img src='static/img/util/loading_circle.gif'></td></tr></table>"+
		"</div>";
		$("body").append(contant);
	}else{
		$('.MBBar').remove();
	}
}
function openU(open){
	if(!open){
		$('.MBBarU').css("display","");
		if($('.MBBarU').length==0){
			var contant = "<div class='MBBarU' align='center' style=\"background-image:url('static/img/util/screenback.png');top:0px;left:0px;position:absolute;width:100%;height:100%;z-index:50000;\">"+
			"<table style='width:100%;height:100%;'><tr><td align='center'><div id='myQueue'></div></td></tr></table>"+
			"</div>";
			$("body").append(contant);
		}
	}else{
		$('.MBBarU').css("display","none");
	}
}
$(document).ready(function(){
	var contant = "<div class='MBBarU' align='center' style=\"background-image:url('static/img/util/screenback.png');top:0px;left:0px;position:absolute;width:100%;height:100%;z-index:50000;display:none;z-index:90000;\">"+
	"<table style='width:100%;height:100%;'><tr><td align='center'><div id='myQueue'></div></td></tr></table>"+
	"</div>";
	$("body").append(contant);
});