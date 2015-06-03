<?php
namespace Adminc\Controller;
use Think\Controller;
class AuthController extends Controller {
	public function login(){
		$sysinfo=M('sys')->order('id asc')->find();	
		$this->assign('sys', $sysinfo);
		
		 if (IS_POST  ) {
			$datas = $_POST;
			$password_varchar = md5($datas['password']);
			$userinfo['USERNAME'] = $datas['username'];
			
			$User = M('admin');
			
			
			$returnInfo=$User->where($userinfo)->find();
		 
			if($returnInfo){
			 	if($returnInfo['userpassword']==$password_varchar){
 					if($returnInfo['useris']==1){
						session('adminUser',$returnInfo["username"]);
						session('adminUserid',$returnInfo["userid"]);
						session('adminRole',$returnInfo["role"]);
						
						$User->where('USERID='.$returnInfo['userid'])->save(array('LOGINTIME'=>time(),'LOGINIP'=>$_SERVER['REMOTE_ADDR'],'LOGINNUM'=>$returnInfo[LOGINNUM]+1));
						echo '{"status":1,"info":""}';	 exit;
					}else{
						$this->error('账号已被禁','?c=auth&a=login',3);
					}
					
					
				}else{
					$this->error('密码不对','?c=auth&a=login',3);
				}
				
			}else{
				$this->error('登录失败','?c=auth&a=login',3);
			} 
		}else{
			
			$this->display();
		}  
		
	}
	
	public function logout(){
		session('adminUser',null);
		session('adminUserid',null);
		session('adminRole',null); 
		cookie('adminUser',null);
		$this->success ( '安全退出', '/adminc.php' );
		//redirect('login',20,'安全退出!');
	}
}