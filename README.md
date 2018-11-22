# html5Editor
> 仿易企秀，h5制作后台
> 易企秀源码运行环境：PHP 5.3 + MySQL + 伪静态支持，我们在PHP 5.2和PHP 5.4下测试过，好像无法运行，所以请配置好PHP 5.3测试。

## 源码安装说明：
-1 把文件包上传到网站根目录
-2 创建一个数据库
-3 然后导入数据库文件（源码根目录下的ewesambo.sql）到数据库，不会导入数据库的小白，请参考：phpmyadmin导入sql数据库文件教程
-4 修改数据库
> 打开：ApplicationCommonConfsystemConfig.php
> 配置服务器
```php
$public_system_db_host = '127.0.0.1';（这个不要修改）
$public_system_db_name = 'yiqixiu';  //你的数据库名称
$public_system_db_user = 'yiqixiu';   //你的数据库用户名
$public_system_db_pwd = 'haoid.cn';  //你的数据库密码
```

推荐使用Notepad++来修改PHP文件
-5 安装完成
然后把php.ini里面的  max_execution_time  改成500  不然可能采集失败
> 前台地址：http://域名
> 后台地址：http://域名/adminc.php
> 默认后台账号密码都是admin@qq.com  admin
