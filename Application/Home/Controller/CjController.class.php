<?php
namespace Home\Controller;
use Think\Controller;
header("Content-Type: text/html;charset=utf-8");

class CjController extends Controller {
    public function index() {
        $cs = $_GET['cs'];
        $user = M("scene");
		//die(var_dump($cs)); 
        $where['eqcode'] = $cs;
        $code = $user->where($where)->select();
        $url = 'http://s2.eqxiu.com/eqs/s/' . $_GET['cs'];
        $da = $this->GetCurl($url);
        $img = './Uploads/syspic/scene/';
        $img2 = './Uploads/';
        $mp3 = './Uploads/syspic/mp3/';
        $resp = json_decode($da, true);
        if (empty($code) and $resp[obj][name] !== '该场景已关闭') {
            preg_match_all("/((group1\/\w+\/\w+\/\w+\/\w+(-\\w+)*+.(gif|jpg|jpeg|png|bmp)))/isu", $da, $array);
            $src2 = 'syspic/scene/';
            $src3 = preg_replace("/(group1\/\w+\/\w+\/\w+\/)/", $src2, $da);
            $resp2 = json_decode($src3, true);
            foreach ($array[0] as $key => $var) {
                $urls[$key] = pathinfo($array[0][$key]);
                $this->save_pic('http://res.eqxiu.com/' . $var, $img);
            }
            $data['scenename_varchar'] = $resp['obj']['name'];
            $data['scenecode_varchar'] = 'S' . (date('y', time()) - 9) . date('m', time()) . randorderno(6, -1);
            $data['eqid_int'] = $resp['obj']['id'];
            $data['eqcode'] = $resp['obj']['code'];
            $data['createtime_time'] = date('Y-m-d H:i:s', time());
            $data['showstatus_int'] = 1;
            $data['movietype_int'] = 0;
            $data['userid_int'] = 0;
            if (!empty($resp['obj']['image']['bgAudio']['url'])) {
                if (preg_match('|^http://|', $resp['obj']['image']['bgAudio']['url'])) {
                    $mp = $resp['obj']['image']['bgAudio']['url'];
                } elseif (isset($resp['obj']['image']['bgAudio']['url'])) {
                    $mp = 'http://res.eqxiu.com/' . $resp['obj']['image']['bgAudio']['url'];
                }
                $data['musicurl_varchar'] = 'syspic/mp3/' . $this->save_pic($mp, $mp3);
            } else {
            }
            $pic1 = 'http://res.eqxiu.com/' . $resp['obj']['image']['imgSrc'];
            $data['thumbnail_varchar'] = 'syspic/scene/' . $this->save_pic($pic1, $img);
            $data['scenetype_int'] = $resp['obj']['type'];
			$data['is_tpl'] = 1;
            $data['desc_varchar'] = $resp['obj']['description'];
            $data['biztype_int'] = $resp['obj']['type'];
            $data['musictype_int'] = $resp['obj']['image']['bgAudio']['type'];
            $data['musictype_int'] = (empty($resp['obj']['image']['bgAudio']['type'])) ? 'null' : $data['musictype_int'];
            if ($lastInsId = $user->add($data)) {
                echo json_encode(array(
                    "msg" => "成功采集",
                    "url" => 'http://' . $_SERVER['HTTP_HOST'] . '/v-' . $data['scenecode_varchar']
                ));
            } else {
			die(var_dump("数据写入错误"));
                echo json_encode(array(
                    "msg" => "数据写入错误"
                ));
            }
            $dd = M("scenepage");
            $de['sceneid_bigint'] = $lastInsId;
            $de['scenecode_varchar'] = $resp2['obj']['code'];
            $de['createtime_time'] = date('Y-m-d H:i:s', time());
            $de['content_text'] = '';
            $de['pagename_varchar'] = 'admin';
            $de['userid_int'] = '0';
            $de['properties_text'] = 'null';
            foreach ($resp2['list'] as $k => $var) {
                $de['content_text'] = json_encode($var['elements']);
                $de['pagecurrentnum_int'] = $k + 1;
                $dd->add($de);
            }
        } elseif (isset($_GET['cpic'])) {
            $dd = M("scenepage");
            $where['sceneid_bigint'] = $_GET['id'];
            $data = $dd->where($where)->field('content_text')->select();
        } else {
            if (!empty($code[0][scenecode_varchar])) {
                echo json_encode(array(
                    "msg" => "已经存在",
                    "url" => 'http://' . $_SERVER['HTTP_HOST'] . '/v-' . $code[0][scenecode_varchar]
                ));
            } else {
                echo json_encode(array(
                    "msg" => "参数不对"
                ));
            }
        }
    }
    public function searchMultiArray(array $array, $search, $mode = 'key') {
        $res = array();
        foreach (new RecursiveIteratorIterator(new RecursiveArrayIterator($array)) as $key => $value) {
            if ($search === $ {
                $ {
                    "mode"
                }
            }) {
                if ($mode == 'key') {
                    $res[] = $value;
                } else {
                    $res[] = $key;
                }
            }
        }
        return $res;
    }
    public function my_file_exists($file) {
        if (preg_match('/^http:\/\//', $file)) {
            if (ini_get('allow_url_fopen')) {
                if (@fopen($file, 'r')) return true;
            } else {
                $parseurl = parse_url($file);
                $host = $parseurl['host'];
                $path = $parseurl['path'];
                $fp = fsockopen($host, 80, $errno, $errstr, 10);
                if (!$fp) return false;
                fputs($fp, "GET {$path} HTTP/1.1 \r\nhost:{$host}\r\n\r\n");
                if (preg_match('/HTTP\/1.1 200/', fgets($fp, 1024))) return true;
            }
            return false;
        }
        return file_exists($file);
    }
    public function save_pic($url, $savepath = '') {
        $url = trim($url);
        $url = str_replace(" ", "%20", $url);
        $string = $this->read_filetext($url);
        if (empty($string)) {
            echo '读取不了文件';
            exit;
        }
        $filename = $this->get_filename($url);
        $this->make_dir($savepath);
        $filepath = $savepath . $filename;
        $this->write_filetext($filepath, $string);
        return $filename;
    }
    public function get_filename($filepath) {
        $fr = explode("/", $filepath);
        $count = count($fr) - 1;
        return $fr[$count];
    }
    public function read_filetext($filepath) {
        $filepath = trim($filepath);
        $htmlfp = @fopen($filepath, "r");
        if (strstr($filepath, "://")) {
            while ($data = @fread($htmlfp, 500000)) {
                $string.= $data;
            }
        } else {
            $string = @fread($htmlfp, @filesize($filepath));
        }
        @fclose($htmlfp);
        return $string;
    }
    public function write_filetext($filepath, $string) {
        $fp = @fopen($filepath, "w");
        @fputs($fp, $string);
        @fclose($fp);
    }
    public function make_dir($path) {
        if (!file_exists($path)) {
            $mk = @mkdir($path, 0777, true);
            @chmod($path, 0777);
        }
        return true;
    }
    public function GetCurl($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
        $resp = curl_exec($curl);
        curl_close($curl);
        return $resp;
    }
} ?>
