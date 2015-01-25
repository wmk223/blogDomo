/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    //首页,加载最新的12偏文章
    indexAction: function(){
      //搜索
      var self = this
      return D('Blog').getIndex(12).then(function(data){
        self.assign('bloglist',data)
        return self.display()
      }).catch(function(err){
        self.error('服务器出错');
      })
    },
    searchAction:function(){
      var self = this
      var keyword = self.get('k')
      if(keyword){
        return D('Blog').where({title:['like','%'+keyword+'%']}).limit(12).select().then(function(data){
          self.assign('blog',data);
          return self.display();
        }).catch(function(err){
          self.error('服务器出错');
        })
      }else{
        return self.error('请输入搜索关键字');
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