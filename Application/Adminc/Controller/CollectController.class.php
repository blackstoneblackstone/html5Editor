<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class CollectController extends BaseController {
	public function index(){
 		$this->display('Scene/collect' );
    }
 
	public function collect()
    {
        $getcs = I('GET.cs');
        $getdtagid = I('GET.dtagid');
        $getscene = M('scene');
        $geteqcode['eqcode'] = $getcs;
        $cj_int = $getscene->where($geteqcode)->select();
        $eqxcj = 'http://s2.eqxiu.com/eqs/s/' . $getcs;
        $eqxcjt = $this->GetCurl($eqxcj);
        $scenepic = './Uploads/syspic/pageimg/';
        $eqxmp3 = './Uploads/syspic/mp3/';
        $cj_name = json_decode($eqxcjt, true);
        if (empty($cj_int) and $cj_name[obj][name] !== '该场景已关闭') {
            preg_match_all('/((group[0-9]*\\/\\w+\\/\\w+\\/\\w+\\/\\w+(--\\w+|-\\w+)*+.(gif|jpg|jpeg|png|bmp)))/isu', $eqxcjt, $preg_pic);
            $cj_syspic = 'syspic/pageimg/';
            $preg_replace = preg_replace('/(group[0-9]*\\/\\w+\\/\\w+\\/\\w+\\/)/', $cj_syspic, $eqxcjt);
            $json_decode = json_decode($preg_replace, true);
            foreach ($preg_pic[0] as $zym_50 => $zym_45) {
                $zym_44[$zym_50] = pathinfo($zym_49[0][$zym_50]);
                $this->save_pic('http://res.eqxiu.com/' . $zym_45, $scenepic);
            }
			$where['sceneid_bigint'] = $cj_name['obj']['id'];
            $where['scenename_varchar'] = $cj_name['obj']['name'];
            $where['scenecode_varchar'] = $cj_name['obj']['code'];
            $where['eqid_int'] = $cj_name['obj']['id'];
            $where['eqcode'] = $cj_name['obj']['code'];
            $where['createtime_time'] = date('Y-m-d H:i:s', time());
            $where['tagid_int'] = I('GET.tagid', 0);
            $where['showstatus_int'] = 1;
            $where['movietype_int'] = 0;
            $where['userid_int'] = 0;
            
			/*if (!empty($cj_name['obj']['image']['bgAudio']['url'])) {
                if (preg_match('|^http://|', $cj_name['obj']['image']['bgAudio']['url'])) {
                    $zym_41 = $cj_name['obj']['image']['bgAudio']['url'];
                } elseif (isset($cj_name['obj']['image']['bgAudio']['url'])) {
                    $zym_41 = 'http://res.eqxiu.com/' . $cj_name['obj']['image']['bgAudio']['url'];
                }
                $where['musicurl_varchar'] = 'syspic/mp3/' . $this->save_pic($zym_41, $eqxmp3);
            }*/ 
			
				if ($cj_name['obj']['bgAudio']!=="null") {
                if (preg_match('|http://|', $cj_name['obj']['bgAudio'])) {				
					$arr = explode("\"",$cj_name['obj']['bgAudio']);			
                    $zym_41 = $arr[3];
                } else{
					$arr = explode("\"",$cj_name['obj']['bgAudio']);
                    $zym_41 = 'http://res.eqxiu.com/' . $arr[3];
                }
                $where['musicurl_varchar'] = 'syspic/mp3/' . $this->save_pic($zym_41, $eqxmp3);
            }
			
			
			else {
            }
            $zym_42 = 'http://res.eqxiu.com/' . $cj_name['obj']['image']['imgSrc'];
            $where['thumbnail_varchar'] = 'syspic/pageimg/' . $this->save_pic($zym_42, $scenepic);
            $where['scenetype_int'] = $getdtagid;
            $where['desc_varchar'] = $cj_name['obj']['description'];
            $where['biztype_int'] = $getdtagid;
            $where['musictype_int'] = $cj_name['obj']['image']['bgAudio']['type'];
            $where['musictype_int'] = empty($cj_name['obj']['image']['bgAudio']['type']) ? 'null' : $where['musictype_int'];
            if (empty($cj_int)) {
                $zym_43 = $getscene->add($where);
                echo json_encode(array('msg' => '成功采集', 'url' => 'http://' . $_SERVER['HTTP_HOST'] . '/v-' . $where['scenecode_varchar']));
            }
            $scenepages = M('scenepage');
            $where['sceneid_bigint'] = $zym_43;
            $where['scenecode_varchar'] = $json_decode['obj']['code'];
            $where['createtime_time'] = date('Y-m-d H:i:s', time());
            $where['content_text'] = '';
            $where['pagename_varchar'] = 'null';
            $where['userid_int'] = '0';
            $where['properties_text'] = 'null';
            foreach ($json_decode['list'] as $zym_8 => $zym_45) {
                $where['content_text'] = json_encode($zym_45['elements']);
                $where['pagecurrentnum_int'] = $zym_8 + 1;
                $scenepages->add($where);
            }
        } elseif (isset($_GET['cpic'])) {
            $scenepages = M('scenepage');
            $geteqcode['sceneid_bigint'] = $_GET['id'];
            $where = $scenepages->where($geteqcode)->field('content_text')->select();
        } else {
            if (!empty($cj_int[0][scenecode_varchar])) {
                echo json_encode(array('msg' => '已经存在', 'url' => 'http://' . $_SERVER['HTTP_HOST'] . '/v-' . $cj_int[0][scenecode_varchar]));
            } else {
                echo json_encode(array('msg' => '参数不对'));
            }
        }
    }
    public function Type()
    {
        $my_tag = M('tag');
        $where['biztype_int'] = I('get.biztype');
        $where['type_int'] = 2;
        $where['userid_int'] = 0;
        $my_type = $my_tag->where($where)->select();
        foreach ($my_type as $zym_45) {
            echo '<option value="' . $zym_45['tagid_int'] . '">' . $zym_45['name_varchar'] . '</option>';
        }
    }
    public function searchMultiArray(array $zym_49, $zym_7, $zym_6 = 'key')
    {
        $zym_2 = array();
        foreach (new RecursiveIteratorIterator(new RecursiveArrayIterator($zym_49)) as $zym_50 => $zym_1) {
            if ($zym_7 === ${${'mode'}}) {
                if ($zym_6 == 'key') {
                    $zym_2[] = $zym_1;
                } else {
                    $zym_2[] = $zym_50;
                }
            }
        }
        return $zym_2;
    }
    public function my_file_exists($zym_3)
    {
        if (preg_match('/^http:\\/\\//', $zym_3)) {
            if (ini_get('allow_url_fopen')) {
                if (@fopen($zym_3, 'r')) {
                    return true;
                }
            } else {
                $zym_4 = parse_url($zym_3);
                $zym_5 = $zym_4['host'];
                $zym_12 = $zym_4['path'];
                $zym_13 = fsockopen($zym_5, 80, $zym_21, $zym_22, 10);
                if (!$zym_13) {
                    return false;
                }
                fputs($zym_13, "GET {$zym_12} HTTP/1.1 \r\nhost:{$zym_5}\r\n\r\n");
                if (preg_match('/HTTP\\/1.1 200/', fgets($zym_13, 1024))) {
                    return true;
                }
            }
            return false;
        }
        return file_exists($zym_3);
    }
    public function save_pic($eqxcj, $zym_23 = '')
    {
        $eqxcj = trim($eqxcj);
        $eqxcj = str_replace(' ', '%20', $eqxcj);
        $zym_24 = $this->read_filetext($eqxcj);
        if (empty($zym_24)) {
            echo '读取不了文件';
            die;
        }
        $zym_20 = $this->get_filename($eqxcj);
        $this->make_dir($zym_23);
        $zym_19 = $zym_23 . $zym_20;
        $this->write_filetext($zym_19, $zym_24);
        return $zym_20;
    }
    public function get_filename($zym_19)
    {
        $zym_15 = explode('/', $zym_19);
        $zym_14 = count($zym_15) - 1;
        return $zym_15[$zym_14];
    }
    public function read_filetext($zym_19)
    {
        $zym_19 = trim($zym_19);
        $zym_16 = @fopen($zym_19, 'r');
        if (strstr($zym_19, '://')) {
            while ($where = @fread($zym_16, 500000)) {
                $zym_24 .= $where;
            }
        } else {
            $zym_24 = @fread($zym_16, @filesize($zym_19));
        }
        @fclose($zym_16);
        return $zym_24;
    }
    public function write_filetext($zym_19, $zym_24)
    {
        $zym_13 = @fopen($zym_19, 'w');
        @fputs($zym_13, $zym_24);
        @fclose($zym_13);
    }
    public function make_dir($zym_12)
    {
        if (!file_exists($zym_12)) {
            $zym_17 = @mkdir($zym_12, 511, true);
            @chmod($zym_12, 511);
        }
        return true;
    }
    public function GetCurl($eqxcj)
    {
        $zym_18 = curl_init();
        curl_setopt($zym_18, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($zym_18, CURLOPT_URL, $eqxcj);
        curl_setopt($zym_18, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
        $cj_name = curl_exec($zym_18);
        curl_close($zym_18);
        return $cj_name;
    }
	
}