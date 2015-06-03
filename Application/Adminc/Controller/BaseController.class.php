<?php
namespace Adminc\Controller;
use Think\Controller;
class BaseController extends Controller {
   protected function _initialize(){
		if(!defined('VIRIFY')){
			virifylocal();
		}
		
		$this->assign('adminRole', session('adminRole')); 
		if(!session('adminUser')){		 
			//$this->redirect('auth/login');
			header('Location: ' . '/adminc.php?c=auth&a=login');
		}
		else {
			return true;
		}
		
	}
	protected function all_insert($name = '', $back = '/index') {
		$name = $name ? $name : MODULE_NAME;
		$db = D ( $name );
		if ($db->create () === false) {
			$this->error ( $db->getError () );
		} else {
			$id = $db->add ();
			if ($id) {
				$this->success ( '操作成功', U ( MODULE_NAME . $back ) );
			} else {
				$this->error ( '操作失败', U ( MODULE_NAME . $back ) );
			}
		}
	}
}