/**
 * controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    //首页,加载最新的12偏文章
    indexAction: function(){
      var self = this
      D('Blog').getIndex(12).then(function(data){
        self.assign('bloglist',data)
        self.display()
      }).catch(function(err){
        self.error('服务器出错');
      })
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