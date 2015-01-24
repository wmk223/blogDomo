/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
  'use strict';
  return {
    init: function(http){
      this.super("init", http);
      //从session读取管理员信息,有就显示菜单
      var self = this;
      return self.session('UserInfo').then(function(data){
      	if(isEmpty(data)){
      		self.assign('login',false);
      	}
      	self.assign('login',data);
      });
      
      
    },

  }
})