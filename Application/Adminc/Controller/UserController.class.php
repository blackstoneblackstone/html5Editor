<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class UserController extends BaseController {
    public function index(){
		if(!defined('VIRIFY')){
			aboutaa();
		}
 
		$m = M('users');      
		$where=array(); 
		$count = $m->where($where)->count();
		$p = getpage($count,16);
		$list = $m->field(true)->where($where)->order('create_time desc')->limit($p->firstRow, $p->listRows)->select();
		$this->assign('select', $list); 
		$this->assign('page', $p->show());  
		 
		//var_export($list);
		//echo C('TEST_ADMIN_ID');
		 
		
		$this->display();
    }
	public function del(){
		if(session('adminRole')==2  ){
			$this->error ( '您没有相关权限', U (  'user/index' ) );
		}
		$m = M('users');      
		$m->where('userid_int='.$_REQUEST['id'])->delete();
		$this->success ( '操作成功', '/adminc.php?c=user');  // U ('user/index')
		
	}
	
	public function e(){
		$m = M('users'); 
		 $field=C('REG_FIELD')? C('REG_FIELD'):'email_varchar';	

		
		if(IS_POST){
			$where['userid_int']=I('post.id');
			$update_arr=I('post.user');
			if(I('post.password_varchar')){
				$update_arr['password_varchar']=md5(I('post.password_varchar'));
			}
			 $update_arr['end_time']=strtotime( $update_arr['end_time']);
			$m->where($where)->save($update_arr);
			$this->success ( '操作成功','/adminc.php?c=user' );

		}else{
			$where['userid_int']=I('get.id');
			$userinfo=	$m->where($where)->find();
		 
			$this->assign('user', $userinfo); 
			 $this->assign('field', $field); 
			
		 $this->display();
		}
	}
}