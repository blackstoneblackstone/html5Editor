<?php
/**
 * Created by PhpStorm.
 * User: cony
 * Date: 14-3-7
 * Time: 上午10:15
 */
/**
 * 获取默认图片
 * @param $str
 * @return bool|mixed
 */
function get_default_img($str){
    if(!$str)return false;
    $str_arr=explode(',',$str);
    $map['id']=$str_arr[0];
    return M('images')->where($map)->getField('savepath');
}
function utf2gb($strInput) {
	if(strpos( $_SERVER['SERVER_NAME'],'naurai.net')!==false){
		return $strInput;
	}else{
		return iconv('utf-8','gb2312',$strInput); 
	}
}

function get_scene_ad($jsonstrtemp,$_scene_list2,$isPreview=false){
	if($_scene_list2[0]['hideeqad']!=1 && !$isPreview){
		$adPageinfo=M('scenepagesys')->where("sceneid_bigint=1100")->order('pagecurrentnum_int asc')->find();
		if($adPageinfo){ 
			$search=array('\u573a\u666f\u540d\u79f0','shadow.png');
			$replace=array($_scene_list2[0]['scenename_varchar'],$_scene_list2[0]['thumbnail_varchar']);	
			
			//if($_scene_list2[0]['lastpageid']){
			
			//}
			$adPageinfo["properties_text"]=$adPageinfo["properties_text"]?$adPageinfo["properties_text"]:'null';
			
			$adPageinfo["content_text"]=str_replace($search,$replace,$adPageinfo["content_text"]);
			
			$jsonstrtemp = $jsonstrtemp .'{"id": '.$adPageinfo["pageid_bigint"].',"sceneId": '.$adPageinfo["sceneid_bigint"].',"num": '.$adPageinfo["pagecurrentnum_int"].',
				"name": null,"properties":'.$adPageinfo["properties_text"].',"elements": '.$adPageinfo["content_text"].',"scene": null},';
			
		}
	}
	return $jsonstrtemp;	
}

function getUsreJsonStr($userinfo){
	$property='null';
			$mytplid=M('mytpl')->where('userid_int='.session('userid'))->getField('id');
 			if($mytplid){
				$property='{\"myTplId\":'.$mytplid.'}';
 			}
	$field=C('REG_FIELD')? C('REG_FIELD'):'email_varchar';	
	$role_str=$userinfo['role'] ? ',"role":'.$userinfo['role'] :',"role":0';
	if($userinfo['headimg']){
				$img = json_encode($userinfo["headimg"]);
				
			}else{
				$img = "null";
			}
	$userinfo["xd"]=$userinfo["xd"] ? intval($userinfo["xd"]):0;
	$userinfo["sex"]=$userinfo["sex"] ? intval($userinfo["sex"]):0;
	$userinfo["type"]=$userinfo["type"]? intval($userinfo["type"]):1;
	$userInfoStr='"id":'.session('userid').',"loginName":"'.$userinfo[$field].'","xd":'.$userinfo["xd"].$role_str.',"sex":'
		.$userinfo["sex"].',"phone":'.json_encode($userinfo["phone"]).',"tel":'
		.json_encode($userinfo["tel"]).',"qq":'.json_encode($userinfo["qq"]).',"headImg":'
		.$img.',"idNum":null,"idPhoto":null,"regTime":1425093623000,"extType":0,"property":"'
		.$property.'","companyId":null,"deptName":null,"deptId":0,"name":'.json_encode($userinfo["uname"]).',"email":"'.$userinfo["email_varchar"].'","type":'.$userinfo["type"].',"status":'.$userinfo["status_int"].',"relType":null,"companyTplId":null,"roleIdList":['.$userinfo["level_int"].']';
	return $userInfoStr;
}

/**
 * 获取图片集
 * @param $str
 * @return bool|mixed
 */
function get_img_array($str){
    if(!$str)return false;
    $str_arr=@explode(',',$str);
    $map['id']=array('in',$str_arr);
    return M('images')->where($map)->field('savepath')->select();
}

/**
 * 分类面包屑导航
 * @param $cid
 * @param bool $flag
 * @return string
 */
function conist_nav($cid,$flag=false){
    $cat = new \Org\Util\Category('Category', array('cid', 'pid', 'name', 'fullname'));
    $arr=$cat->getPath($cid);
    $str='<a href='.__APP__.'>'.L('T_HOME').'</a>>';
    if(is_array($arr))
    foreach($arr as $v){
        $str.=$v['name'].'>';
    }
    if($flag)$str=substr($str,0,-1);
    return $str;
}


