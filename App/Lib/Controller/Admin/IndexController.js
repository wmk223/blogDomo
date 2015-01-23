/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
  	init:function(http){
  		this.super('init',http);
  		var self = this;
  		//判断是否登陆.没有登陆跳转到Public的Login中
  		return this.session('UserInfo').then(function(data){
  			if(isEmpty(data)){
  				//ajax请求返回错误信息
  				if(self.isAjax()){
  					return self.error(401,'请先登陆');
  				}
  				return self.redirect('/Admin/Public/login');
  			}
  			self.assign('userInfo',data);
  		})
  	},
    indexAction: function(){
      var self = this;
      //从数据库中读取现有的文章
      return D('Blog').field('id,category,title,views,create_time').select().then(function(data){
        self.assign('blogList',data);
        return self.display();
      }).catch(function(err){
        return self.error('数据库错误');
      });
    },
    addAction:function(){
    	var self = this;
      if(self.isPost()){
        return self.error(self.file('cover'))
      }else{
      	return self.display();
      }
    },
    editAction:function(){
      var self = this,id = this.get('id');
      return M('Blog').where({id:id}).find().then(function(data){
        if(isEmpty(data)){
          return self.error('文章不存在');
        }else{
          self.assign('info',data);
          return self.display();
        }

      }).catch(function(err){
        return this.error('服务器出现错误');
      });
    },
    delAction:function(){
      var self = this;
      //post为批量删除
      if(self.isPost()){

      }else{
        //get为单偏删除
        var id = self.get('id');
        return M('Blog').where({id:id}).delete().then(function(res){
          return res?self.success('删除成功'):self.error('删除失败');
        });
      }
    },
    //用于404的访问
    _404Action:function(){
      this.status(404);
      this.end('页面不存在');
    },
    //empty操作
    __call:function(action){
      this.end(action+'不存在');
    }
  };
});