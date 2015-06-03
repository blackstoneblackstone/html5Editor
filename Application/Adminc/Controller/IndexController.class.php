<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class IndexController extends BaseController {
    public function index(){
		
		$this->assign('Adminusername', session('adminUser')); 
		$this->assign('Adminuserid', session('adminUserid')); 
		$sysinfo=M('sys')->order('id asc')->find();	
		$this->assign('sys', $sysinfo);
		$this->display();
    }
	public function main(){
		$sysinfo=M('sys')->order('id asc')->find();	
		$this->assign('sys', $sysinfo);
		/* 系统信息 */

		$sys_info['os']            = PHP_OS;

		$sys_info['ip']            = $_SERVER['SERVER_ADDR'];

		$sys_info['web_server']    = $_SERVER['SERVER_SOFTWARE'];

		$sys_info['php_ver']       = PHP_VERSION;

		$sys_info['mysql_ver']     = $mysql_ver;

		$sys_info['zlib']          = function_exists('gzclose') ? '是' : '否';

		$sys_info['safe_mode']     = (boolean) ini_get('safe_mode') ?  '是' : '否';

		$sys_info['safe_mode_gid'] = (boolean) ini_get('safe_mode_gid') ? '是' : '否';

		$sys_info['socket']        = function_exists('fsockopen') ? '是' : '否';

		$sys_info['post_max_size'] = get_cfg_var('post_max_size');
	$this->assign('sys_info', $sys_info); 
		$this->display();
	}
}