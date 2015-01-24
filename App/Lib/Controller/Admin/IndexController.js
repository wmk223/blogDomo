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
        var fs = require('fs');
        var img = self.file('cover');
        var title = self.post('title');
        var category = self.post('category');
        if(!self.valid(title,'required')){
          return this.error('博客标题必须');
        }
        if(!getCategory(category)){
          return this.error('请选择博客分类');
        }
        if(!img.originalFilename || !img.size){
          return this.error('博客必须上传一张封面哦');
        } 
        // TODO检测文件类型,这里略去了
        var suffix = img.originalFilename.match(/\.(jpg|png|jpeg|gif)$/);
        if(suffix[0]){
          var coverpath = getPictureName()+suffix[0];
          return fs.rename(img.path,RESOURCE_PATH+'/resource/img/' + coverpath,function(err){
            return D('Blog').add({
              title:title,
              category:category,
              description:self.post('description'),
              content:self.post('content'),
              cover:coverpath,
              create_time:Date.parse(new Date) / 1000,
            }).then(function(insert){
              if(insert){
                return slef.success('博客发表成功');
              }else
                return self.error('博客发表失败');
            });
          });
        }else{
          return self.error('文件格式只允许jpg,png,jpeg,gif图片');
        }
        // return self.error(img);
      }else{
      	return self.display();
      }
    },
    editAction:function(){
      var self = this,id = this.get('id');
      if(self.isPost()){
        var fs = require('fs');
        var img = self.file('cover');
        var title = self.post('title');
        var category = self.post('category');
        var data = {};
        if(!self.valid(title,'required')){
          return this.error('博客标题必须');
        }
        if(!getCategory(category)){
          return this.error('请选择博客分类');
        }
        if(img.originalFilename && img.size){
          var suffix = img.originalFilename.match(/\.(jpg|png|jpeg|gif)$/);
          if(suffix[0]){
            var coverpath = getPictureName()+suffix[0];
            fs.rename(img.path,RESOURCE_PATH+'/resource/img/' + coverpath,function(){});
            data.cover = coverpath;
          }
        }
        data.title = title;
        data.category = category;
        data.description = self.post('description');
        data.content = self.post('content');
        return D('Blog').where({id:self.post('id')}).save(data).then(function(){
          return self.success('文章修改成功');
        });
      }else{
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
      }
      
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
    },
  };
});