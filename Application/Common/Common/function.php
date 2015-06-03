<?php
/**
 @auth e.wesambo.com
 @time 2015-5-7
*/
function virifylocal(){
	 define('VIRIFY',   true); 	
	define('HTML_VESION',   'index3_1'); 	
}
function aboutaa(){
	virifylocal();
}
function getRemoteInfo($mydomain,$string=array()){
	 
}

 
function checkAllow_nums(){
	$_scene = M('scene');
	$where['userid_int']  = intval(session('userid'));
	$where['delete_int'] =0;
	$count = $_scene->where($where)->count();
	
	$allowNum=M('users')->where($where)->getField('allow_nums');
	
	if($count>=$allowNum){
		echo '{"success":true,"code":1006,"msg":'.$allowNum.',"obj":null,"map":null,"list":null}';
		exit;
	}	
	return true;
}
//scenetype_int
function checkRole($scenetype_int){
 
	$cateInfo= M('cate')->where("value='$scenetype_int'")->find(); 
	
	$rank=$cateInfo['rank'];
 	$where['userid_int']  = intval(session('userid'));
	$where['delete_int'] =0;
	$role=M('users')->where($where)->getField('role');
 	if($rank>$role){
		echo '{"success":true,"code":1005,"msg":"你的级别不够，不可使用'.$cateInfo['title'].'的模板","obj":null,"map":null,"list":null}';
		exit;
	}	
	return true;
	
}
function getSceneRole($scenetype_int){
	
	$cateInfo= M('cate')->where("value='$scenetype_int'")->find(); 
	
	$rank=$cateInfo['rank'];
	 
	 
	return intval($rank);
	
}
/**
		 * 获取随机字符串
		 * @param number $length
		 * @return string
		 */
function createNonceStr($length = 16) {
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	$str = "";
	for ($i = 0; $i < $length; $i++) {
		$str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
	}
	return $str;
}


function getBiztype($k){
	$array=upfilesClass();
	$array2=upfilesClass(0);
	foreach($array2 as $i =>$v){
		$array[$i]=$v;	
	}
	 
	return $array[$k];
}
function upfilesClass($type=1){
	if($type==1){
		return array( 106=> '图标',107=>'动画' ,105=>'节日', 103=>'风格', 102=>'企业',101=>'行业',104=>'个人');

	}elseif($type==2){
		return array();

	}else{
		return array(203=>'风格', 205=>'节日', 202=>'企业', 201=>'行业', 204=>'个人');

		}
}
 
// 写日志
function addlog($loginname = "System",$type = "orderpay",$comment = "") {
	$MLog = M("adminlog");	// 实例化模型类
	// 构建写入的数据数组
	$dataslog["loginname"] = $loginname;
	$dataslog["type"] = $type;
	$dataslog["ip"] = get_client_ip();	
	$dataslog["comment"] = $comment;	
	// 写入数据
	$MLog->add($dataslog);
}

function checkproductid($pid) {
	// 产品id(1.照片书 2.明信片 3.台历 4.照片墙)
	//$arrpid= array(999,000);
	$arrpid= array(1,2,3,4);
	return intval(in_array(intval($pid), $arrpid, true));
}

function getshipmoney($kd) {
	// 产品id(1.照片书 2.明信片 3.台历 4.照片墙)
	$smoney = 0;
	if($kd == "yuantong" )
	{
		$smoney = 10;
	}elseif($kd == "shentong")
	{
		$smoney = 10;
	}elseif($kd == "shunfeng")
	{
		$smoney = 20;
	}elseif($kd == "ems")
	{
		$smoney = 25;
	}
	return $smoney;
}

function getproductname($pid) {
	// 产品id(1.照片书 2.明信片 3.台历 4.照片墙)
	$pname = "";
	if($pid == 1 )
	{
		$pname = "照片书";
	}elseif($pid == 2)
	{
		$pname = "明信片";
	}elseif($pid == 3)
	{
		$pname = "台历";
	}elseif($pid == 4)
	{
		$pname = "照片墙";
	}
	return $pname;
}

function getproductunit($pid) {
	// 产品id(1.照片书 2.明信片 3.台历 4.照片墙)
	$pname = "";
	if($pid == 1 )
	{
		$pname = "本";
	}elseif($pid == 2)
	{
		$pname = "张";
	}elseif($pid == 3)
	{
		$pname = "本";
	}elseif($pid == 4)
	{
		$pname = "张";
	}
	return $pname;
}

function getsizename($pid,$size) {
	$sizename = "";
	if($pid==1){
		if($size =="1190A")
		{
			$sizename = "190*130mm";
		}
		elseif($size =="1210A")
		{
			$sizename = "210*210mm";
		}
		elseif($size =="1280A")
		{
			$sizename = "280*280mm";
		}
	}elseif($pid==2){
		$sizename = "标准尺寸";
	}elseif($pid==3){
		$sizename = "标准尺寸";
	}elseif($pid==4){
		$sizename = "标准尺寸";
	}

	return $sizename;
}



function getbindname($pid,$bind) {
	$bindname = "";
	if($pid==1){
		if($bind =="101bind")
		{
			$bindname = "精装";
		}
		elseif($bind =="102bind")
		{
			$bindname = "简装";
		}
	}elseif($pid==2){
		$bindname = "无";
	}elseif($pid==3){
		$bindname = "环装";
	}elseif($pid==4){
		$bindname = "无";
	}

	return $bindname;
}


function covertproductprice($pid,$qtynum,$size,$bind,$templateprice=0) {
	/* 
	1.照片书
	2.明信片
	3.台历
	4.照片墙)
	*/
	$price = 0;
	if($pid==1){
		if($size =="1190A")
		{
			$price = 39;
		}
		elseif($size =="1210A")
		{
			if($bind=="101bind"){
				$price = 109;
			}else
			{
				$price = 79;
			}
		}
		elseif($size =="1280A")
		{
			$price = 159;
		}
	}elseif($pid==2){
		$price = 10;
	}elseif($pid==3){
		$price = 20;
	}elseif($pid==4){
		$price = 999;
	}


	return $price+$templateprice;
}

function covertsizecode($pid,$size) {
	/* 
	1.照片书  1190: 190*130--DM, 1210: 210*210--DM, 1280: 280*280--DM,
	2.明信片
	3.台历
	4.照片墙)
	*/
	$sizecode = "";
	if($pid==1){
		if($size =="1190")
		{
			$sizecode = "1190A";
		}
		elseif($size =="1210")
		{
			$sizecode = "1210A";
		}
		elseif($size =="1280")
		{
			$sizecode = "1280A";
		}
	}elseif($pid==2){
		$sizecode = "2SIZE";
	}elseif($pid==3){
		$sizecode = "3SIZE";
	}elseif($pid==4){
		$sizecode = "4SIZE";
	}

	return $sizecode;
}

function covertbindingcode($pid,$bind) {
	/* 
	1.照片书 
	2.明信片
	3.台历
	4.照片墙)
	*/
	$bindcode = "";


	if($pid==1){
		if($bind =="101")
		{
			$bindcode = "101bind";
		}
		elseif($bind =="102")
		{
			$bindcode = "102bind";
		}
	}elseif($pid==2){
		$bindcode = "2bind";
	}elseif($pid==3){
		$bindcode = "3bind";
	}elseif($pid==4){
		$bindcode = "4bind";
	}


	return $bindcode;
}






/**
  +----------------------------------------------------------
 * 原样输出print_r的内容
  +----------------------------------------------------------
 * @param string    $content   待print_r的内容
  +----------------------------------------------------------
 */
function pre($content) {
    echo "<pre>";
    print_r($content);
    echo "</pre>";
}

/**
 * 验证验证码
 * @param $code
 * @param string $id
 * @return bool
 */
function check_verify($code, $id = ''){
    $verify = new \Think\Verify();
    return $verify->check($code, $id);
}

/**
 * 快速文件数据读取和保存 针对简单类型数据 字符串、数组
 * @param string $name 缓存名称
 * @param mixed $value 缓存值
 * @param string $path 缓存路径
 * @return mixed
 */
function set_config($name, $value='', $path=DATA_PATH) {
    static $_cache  = array();
    $filename       = $path . $name . '.php';
    if ('' !== $value) {
        if (is_null($value)) {
            // 删除缓存
            return false !== strpos($name,'*')?array_map("unlink", glob($filename)):unlink($filename);
        } else {
            // 缓存数据
            $dir            =   dirname($filename);
            // 目录不存在则创建
            if (!is_dir($dir))
                mkdir($dir,0755,true);
            $_cache[$name]  =   $value;
            return file_put_contents($filename, strip_whitespace("<?php\treturn " . var_export($value, true) . ";?>"));
        }
    }
    if (isset($_cache[$name]))
        return $_cache[$name];
    // 获取缓存数据
    if (is_file($filename)) {
        $value          =   include $filename;
        $_cache[$name]  =   $value;
    } else {
        $value          =   false;
    }
    return $value;
}

/**
  +----------------------------------------------------------
 * 加密密码
  +----------------------------------------------------------
 * @param string    $data   待加密字符串
  +----------------------------------------------------------
 * @return string 返回加密后的字符串
 */
function encrypt($data) {
    return md5(C("AUTH_CODE") . md5($data));
}

function getcookieid() {
	if(trim(cookie("cartuuid")) != "")
	{
		return cookie("cartuuid");
	}
	else
	{
		$md5cookie = md5(get_client_ip() . "+" . randCode(8,0));
		cookie("cartuuid",$md5cookie);
		return $md5cookie;
	}
}

/**
  +----------------------------------------------------------
 * 将一个字符串转换成数组，支持中文
  +----------------------------------------------------------
 * @param string    $string   待转换成数组的字符串
  +----------------------------------------------------------
 * @return string   转换后的数组
  +----------------------------------------------------------
 */
function strToArray($string) {
    $strlen = mb_strlen($string);
    while ($strlen) {
        $array[] = mb_substr($string, 0, 1, "utf8");
        $string = mb_substr($string, 1, $strlen, "utf8");
        $strlen = mb_strlen($string);
    }
    return $array;
}

/**
  +----------------------------------------------------------
 * 生成随机字符串
  +----------------------------------------------------------
 * @param int       $length  要生成的随机字符串长度
 * @param string    $type    随机码类型：0，数字+大写字母；1，数字；2，小写字母；3，大写字母；4，特殊字符；-1，数字+大小写字母+特殊字符
  +----------------------------------------------------------
 * @return string
  +----------------------------------------------------------
 */
function randCode($length = 5, $type = 0) {
    $arr = array(1 => "0123456789", 2 => "abcdefghijklmnopqrstuvwxyz", 3 => "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4 => "~@#$%^&*(){}[]|");
    $code='';
    if ($type == 0) {
        array_pop($arr);
        $string = implode("", $arr);
    } else if ($type == "-1") {
        $string = implode("", $arr);
    } else {
        $string = $arr[$type];
    }
    $count = strlen($string) - 1;
    for ($i = 0; $i < $length; $i++) {
        $str[$i] = $string[rand(0, $count)];
        $code .= $str[$i];
    }
    return $code;
}

function randorderno($length = 10, $type = 0) {
    $arr = array(1 => "3425678934567892345678934567892", 2 => "ABCDEFGHJKLMNPQRSTUVWXY");
    $code='';
    if ($type == 0) {
        array_pop($arr);
        $string = implode("", $arr);
    } else if ($type == "-1") {
        $string = implode("", $arr);
    } else {
        $string = $arr[$type];
    }
    $count = strlen($string) - 1;
    for ($i = 0; $i < $length; $i++) {
        $str[$i] = $string[rand(0, $count)];
        $code .= $str[$i];
    }
    return $code;
}

/**
  +-----------------------------------------------------------------------------------------
 * 删除目录及目录下所有文件或删除指定文件
  +-----------------------------------------------------------------------------------------
 * @param str $path   待删除目录路径
 * @param int $delDir 是否删除目录，1或true删除目录，0或false则只删除文件保留目录（包含子目录）
  +-----------------------------------------------------------------------------------------
 * @return bool 返回删除状态
  +-----------------------------------------------------------------------------------------
 */
function delDirAndFile($path, $delDir = FALSE) {
    $handle = opendir($path);
    if ($handle) {
        while (false !== ( $item = readdir($handle) )) {
            if ($item != "." && $item != "..")
                is_dir("$path/$item") ? delDirAndFile("$path/$item", $delDir) : unlink("$path/$item");
        }
        closedir($handle);
        if ($delDir)
            return rmdir($path);
    }else {
        if (file_exists($path)) {
            return unlink($path);
        } else {
            return FALSE;
        }
    }
}

/**
  +----------------------------------------------------------
 * 将一个字符串部分字符用*替代隐藏
  +----------------------------------------------------------
 * @param string    $string   待转换的字符串
 * @param int       $bengin   起始位置，从0开始计数，当$type=4时，表示左侧保留长度
 * @param int       $len      需要转换成*的字符个数，当$type=4时，表示右侧保留长度
 * @param int       $type     转换类型：0，从左向右隐藏；1，从右向左隐藏；2，从指定字符位置分割前由右向左隐藏；3，从指定字符位置分割后由左向右隐藏；4，保留首末指定字符串
 * @param string    $glue     分割符
  +----------------------------------------------------------
 * @return string   处理后的字符串
  +----------------------------------------------------------
 */
function hideStr($string, $bengin = 0, $len = 4, $type = 0, $glue = "@") {
    if (empty($string))
        return false;
    $array = array();
    if ($type == 0 || $type == 1 || $type == 4) {
        $strlen = $length = mb_strlen($string);
        while ($strlen) {
            $array[] = mb_substr($string, 0, 1, "utf8");
            $string = mb_substr($string, 1, $strlen, "utf8");
            $strlen = mb_strlen($string);
        }
    }
    switch ($type) {
        case 1:
            $array = array_reverse($array);
            for ($i = $bengin; $i < ($bengin + $len); $i++) {
                if (isset($array[$i]))
                    $array[$i] = "*";
            }
            $string = implode("", array_reverse($array));
            break;
        case 2:
            $array = explode($glue, $string);
            $array[0] = hideStr($array[0], $bengin, $len, 1);
            $string = implode($glue, $array);
            break;
        case 3:
            $array = explode($glue, $string);
            $array[1] = hideStr($array[1], $bengin, $len, 0);
            $string = implode($glue, $array);
            break;
        case 4:
            $left = $bengin;
            $right = $len;
            $tem = array();
            for ($i = 0; $i < ($length - $right); $i++) {
                if (isset($array[$i]))
                    $tem[] = $i >= $left ? "*" : $array[$i];
            }
            $array = array_chunk(array_reverse($array), $right);
            $array = array_reverse($array[0]);
            for ($i = 0; $i < $right; $i++) {
                $tem[] = $array[$i];
            }
            $string = implode("", $tem);
            break;
        default:
            for ($i = $bengin; $i < ($bengin + $len); $i++) {
                if (isset($array[$i]))
                    $array[$i] = "*";
            }
            $string = implode("", $array);
            break;
    }
    return $string;
}

/**
  +----------------------------------------------------------
 * 功能：字符串截取指定长度
 * leo.li hengqin2008@qq.com
  +----------------------------------------------------------
 * @param string    $string      待截取的字符串
 * @param int       $len         截取的长度
 * @param int       $start       从第几个字符开始截取
 * @param boolean   $suffix      是否在截取后的字符串后跟上省略号
  +----------------------------------------------------------
 * @return string               返回截取后的字符串
  +----------------------------------------------------------
 */
function cutStr($str, $len = 100, $start = 0, $suffix = 1) {
    $str = strip_tags(trim(strip_tags($str)));
    $str = str_replace(array("\n", "\t"), "", $str);
    $strlen = mb_strlen($str);
    while ($strlen) {
        $array[] = mb_substr($str, 0, 1, "utf8");
        $str = mb_substr($str, 1, $strlen, "utf8");
        $strlen = mb_strlen($str);
    }
    $end = $len + $start;
    $str = '';
    for ($i = $start; $i < $end; $i++) {
		if($i < count($array))
		{
        	$str.=$array[$i];
		}
    }
   return count($array) > $len ? ($suffix == 1 ? $str . "&hellip;" : $str) : $str;
}

/**
  +----------------------------------------------------------
 * 功能：检测一个目录是否存在，不存在则创建它
  +----------------------------------------------------------
 * @param string    $path      待检测的目录
  +----------------------------------------------------------
 * @return boolean
  +----------------------------------------------------------
 */
function makeDir($path) {
    return is_dir($path) or (makeDir(dirname($path)) and @mkdir($path, 0777));
}

/**
  +----------------------------------------------------------
 * 功能：检测一个字符串是否是邮件地址格式
  +----------------------------------------------------------
 * @param string $value    待检测字符串
  +----------------------------------------------------------
 * @return boolean
  +----------------------------------------------------------
 */
function is_email($value) {
    return preg_match("/^[0-9a-zA-Z]+(?:[\_\.\-][a-z0-9\-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+$/i", $value);
}

function is_mobile($value) {
    return preg_match("/^(?:13\d|15\d|17\d|14\d|18\d)\d{5}(\d{3}|\*{3})$/", $value);
}

/**
  +----------------------------------------------------------
 * 功能：系统邮件发送函数
  +----------------------------------------------------------
 * @param string $to    接收邮件者邮箱
 * @param string $name  接收邮件者名称
 * @param string $subject 邮件主题
 * @param string $body    邮件内容
 * @param string $attachment 附件列表namespace Org\Util\PHPMailer;
  +----------------------------------------------------------
 * @return boolean
  +----------------------------------------------------------
 */
function send_mail($to, $name, $subject = '', $body = '', $attachment = null, $config = '') {
    $config = is_array($config) ? $config : C('SYSTEM_EMAIL');
    //import('PHPMailer.phpmailer', VENDOR_PATH);         //从PHPMailer目录导class.phpmailer.php类文件
    $mail = new \Org\Util\PHPMailer\PHPMailer();                           //PHPMailer对象
    $mail->CharSet = 'UTF-8';                         //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
    $mail->IsSMTP();                                   // 设定使用SMTP服务
//    $mail->IsHTML(true);
    $mail->SMTPDebug = 0;                             // 关闭SMTP调试功能 1 = errors and messages2 = messages only
    $mail->SMTPAuth = true;                           // 启用 SMTP 验证功能
    if ($config['smtp_port'] == 465)
        $mail->SMTPSecure = 'ssl';                    // 使用安全协议
    $mail->Host = $config['smtp_host'];                // SMTP 服务器
    $mail->Port = $config['smtp_port'];                // SMTP服务器的端口号
    $mail->Username = $config['smtp_user'];           // SMTP服务器用户名
    $mail->Password = $config['smtp_pass'];           // SMTP服务器密码
    $mail->SetFrom($config['from_email'], $config['from_name']);
    $replyEmail = $config['reply_email'] ? $config['reply_email'] : $config['reply_email'];
    $replyName = $config['reply_name'] ? $config['reply_name'] : $config['reply_name'];
    $mail->AddReplyTo($replyEmail, $replyName);
    $mail->Subject = $subject;
    $mail->MsgHTML($body);
    $mail->AddAddress($to, $name);
    if (is_array($attachment)) { // 添加附件
        foreach ($attachment as $file) {
            if (is_array($file)) {
                is_file($file['path']) && $mail->AddAttachment($file['path'], $file['name']);
            } else {
                is_file($file) && $mail->AddAttachment($file);
            }
        }
    } else {
        is_file($attachment) && $mail->AddAttachment($attachment);
    }
    return $mail->Send() ? true : $mail->ErrorInfo;
}

/**
  +----------------------------------------------------------
 * 功能：剔除危险的字符信息
  +----------------------------------------------------------
 * @param string $val
  +----------------------------------------------------------
 * @return string 返回处理后的字符串
  +----------------------------------------------------------
 */
function remove_xss($val) {
    // remove all non-printable characters. CR(0a) and LF(0b) and TAB(9) are allowed
    // this prevents some character re-spacing such as <java\0script>
    // note that you have to handle splits with \n, \r, and \t later since they *are* allowed in some inputs
    $val = preg_replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '', $val);

    // straight replacements, the user should never need these since they're normal characters
    // this prevents like <IMG SRC=@avascript:alert('XSS')>
    $search = 'abcdefghijklmnopqrstuvwxyz';
    $search .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $search .= '1234567890!@#$%^&*()';
    $search .= '~`";:?+/={}[]-_|\'\\';
    for ($i = 0; $i < strlen($search); $i++) {
        // ;? matches the ;, which is optional
        // 0{0,7} matches any padded zeros, which are optional and go up to 8 chars
        // @ @ search for the hex values
        $val = preg_replace('/(&#[xX]0{0,8}' . dechex(ord($search[$i])) . ';?)/i', $search[$i], $val); // with a ;
        // @ @ 0{0,7} matches '0' zero to seven times
        $val = preg_replace('/(&#0{0,8}' . ord($search[$i]) . ';?)/', $search[$i], $val); // with a ;
    }

    // now the only remaining whitespace attacks are \t, \n, and \r
    $ra1 = array('javascript', 'vbscript', 'expression', 'applet', 'meta', 'xml', 'blink', 'link', 'style', 'script', 'embed', 'object', 'iframe', 'frame', 'frameset', 'ilayer', 'layer', 'bgsound', 'title', 'base');
    $ra2 = array('onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit', 'onunload');
    $ra = array_merge($ra1, $ra2);

    $found = true; // keep replacing as long as the previous round replaced something
    while ($found == true) {
        $val_before = $val;
        for ($i = 0; $i < sizeof($ra); $i++) {
            $pattern = '/';
            for ($j = 0; $j < strlen($ra[$i]); $j++) {
                if ($j > 0) {
                    $pattern .= '(';
                    $pattern .= '(&#[xX]0{0,8}([9ab]);)';
                    $pattern .= '|';
                    $pattern .= '|(&#0{0,8}([9|10|13]);)';
                    $pattern .= ')*';
                }
                $pattern .= $ra[$i][$j];
            }
            $pattern .= '/i';
            $replacement = substr($ra[$i], 0, 2) . '<x>' . substr($ra[$i], 2); // add in <> to nerf the tag
            $val = preg_replace($pattern, $replacement, $val); // filter out the hex tags
            if ($val_before == $val) {
                // no replacements were made, so exit the loop
                $found = false;
            }
        }
    }
    return $val;
}

/**
  +----------------------------------------------------------
 * 功能：计算文件大小
  +----------------------------------------------------------
 * @param int $bytes
  +----------------------------------------------------------
 * @return string 转换后的字符串
  +----------------------------------------------------------
 */
function byteFormat($bytes) {
    $sizetext = array(" B", " KB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB");
    return round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), 2) . $sizetext[$i];
}

function checkCharset($string, $charset = "UTF-8") {
    if ($string == '')
        return;
    $check = preg_match('%^(?:
                                [\x09\x0A\x0D\x20-\x7E] # ASCII
                                | [\xC2-\xDF][\x80-\xBF] # non-overlong 2-byte
                                | \xE0[\xA0-\xBF][\x80-\xBF] # excluding overlongs
                                | [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2} # straight 3-byte
                                | \xED[\x80-\x9F][\x80-\xBF] # excluding surrogates
                                | \xF0[\x90-\xBF][\x80-\xBF]{2} # planes 1-3
                                | [\xF1-\xF3][\x80-\xBF]{3} # planes 4-15
                                | \xF4[\x80-\x8F][\x80-\xBF]{2} # plane 16
                                )*$%xs', $string);

    return $charset == "UTF-8" ? ($check == 1 ? $string : iconv('gb2312', 'utf-8', $string)) : ($check == 0 ? $string : iconv('utf-8', 'gb2312', $string));
}


    //在线交易订单支付处理函数
    //函数功能：根据支付接口传回的数据判断该订单是否已经支付成功；
    //返回值：如果订单已经成功支付，返回true，否则返回false；
    function checkorderstatus($ordid){
        $Ord=M('Order');
        $ordstatus=$Ord->where("orderno='".$ordid."'")->getField('orderstatus');
        if($ordstatus==1){
            return true;
        }else{
            return false;    
        }
    }
    //处理订单函数
    //更新订单状态，写入订单支付后返回的数据
    function orderhandle($parameter){
        $ordid=$parameter['out_trade_no'];
        $data['trade_no']      =$parameter['trade_no'];
        $data['trade_status']  =$parameter['trade_status'];
        $data['notify_id']     =$parameter['notify_id'];
        $data['notify_time']   =$parameter['notify_time'];
        $data['buyer_email']   =$parameter['buyer_email'];
        $data['orderno']		=$ordid;
        $data['total_fee']   	=$parameter['total_fee'];

		
        $dataorder['orderstatus']        =1;
        $dataorder['paytime']          =date('Y-m-d H:i:s',time());
		
        $m_order=M('Order');
        $m_ordertrade=M('Ordertrade');
		// 开启事务处理
		$m_order->startTrans();
		$where['orderno']=$ordid;
        $result1 = $m_order->where($where)->save($dataorder);
		$result2 = $m_ordertrade->add($data);
		if($result1 && $result2){
			// 删除购物车原记录
			$m_order->commit();//成功则提交
		}else
		{
			$m_order->rollback();//不成功，则回滚
		}

    } 
?>
