<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class AdvController extends BaseController {
    public function index(){
		if(!defined('VIRIFY')){
			aboutaa();
		}
 
		$m = M('scenepage');      
		$where=array(); 
		$count = $m->where($where)->count();
		$p = getpage($count,16);
		$list = $m->field(true)->where($where)->order('USERID ASC')->limit($p->firstRow, $p->listRows)->select();
		$this->assign('select', $list); 
		$this->assign('page', $p->show());  
		 
		// var_export($list);
		//echo C('TEST_ADMIN_ID');
		 
		
		$this->display();
    }
	public function e(){
		$m = M('scenepagesys');  
		if(IS_POST){
			$where['pageid_bigint']=I('post.id');
			$update_arr=I('post.user');
			 
			if(I('post.userpassword')){
				$update_arr['USERPASSWORD']=md5(I('post.userpassword'));
			}
			
			$m->where($where)->save($update_arr);
 
			$this->success ( '操作成功','/adminc.php?c=sys&a=admin' ); //U (  'sys/admin' )

		}else{
			$where['pageid_bigint']=I('get.id',2);
			$userinfo=	$m->where($where)->find();
		 
		    
			$this->assign('user', $userinfo); 
			
		
		 $this->display();
		}
	}
	public function getoe(){
		 
		
	}
	
	public function add(){
		$m = M('scenepage'); 
		
		if(session('adminRole')==2 && session('adminUserid') != $_REQUEST['id']){
			$this->error ( '您没有编辑其它管理员的权限', '/adminc.php?c=sys&a=admin' );
		} 
		if(IS_POST){
			 
			$update_arr=I('post.user');
			
			if(I('post.userpassword')){
				$update_arr['USERPASSWORD']=md5(I('post.userpassword'));
			}
			$update_arr['REGTIME']=time();
			$update_arr['USERIS']=1;
			
			$m->add($update_arr);
			 
			$this->success ( '操作成功','/adminc.php?c=sys&a=admin' ); //U (  'sys/admin' )

		}else{
			 
			
			$this->assign('isAdd', 1); 
			$this->assign('user', array()); 
			
			
			$this->display('edit');
		}
	}
	public function del(){
		if(session('adminRole')==2 ){
			$this->error ( '您没有编辑其它管理员的权限', '/adminc.php?c=sys&a=admin' );
		}
		 
			$m = M('scenepage'); 
		$m->where('userid='.$_REQUEST['id'])->delete();
		 
		$this->success ( '操作成功', '/adminc.php?c=sys&a=admin' );
		
	}
	
	 
	 
}