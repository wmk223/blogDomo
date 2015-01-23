/**
*	@author:Vace_Vlm(ocdo@qq.com)
*	@describe:公共的操作方法,登陆,登出
**/

module.exports = Controller('Admin/BaseController',function(){
	"use strict"
	return {
		init:function(http){
			this.super('init',http);
		},
		loginAction:function(){
			var self = this;
			if(this.isPost()){
				var username = this.post('user');
				if(C('admin_user') == username && C('admin_password')==this.post('pwd')){
					return this.session('UserInfo',{user:username}).then(function(){
						self.success('登陆成功');
					});
				}else{
					return this.error('用户名或者密码错误');
				}
			}else{
				return this.display();			
			}
		},
		lgoutAction:function(){
			//清除session,跳转到Login
			var that = this;
			this.session('UserInfo',null).then(function(){
				that.redirect('/Admin/Public/login')
			});
		}
	};
});