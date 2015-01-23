module.exports = Controller('Home/BaseController',function(){
    /**
    *   @author:Vace_Vlm(ocdo@qq.com)
    *   @describe:文档控制器
    **/
    "use strict"
    return {
        indexAction:function(){
            this.list()
        },
        //获取指定分类的列表
        listAction:function(){
            var self = this
            return D('Blog').getList(self.get('name'),10).then(function(data){
                self.assign('blog',data)
                return self.display()
            }).catch(function(err){
                return self.error(102,'参数非法')
            })

        },
        //阅读参数为id的文章
        readAction:function(){
            var self = this
            var id = self.get('id');
            if(!id){
                return self.error(102,'参数错误');
            }
            var model = D('Blog')
            return model.where({id:id}).find().then(function(data){
                if(isEmpty(data)){
                    return self.error(102,'不存在文章')
                }
                //增加阅读量
                model.where({id:id}).setInc('views')
                self.assign('info',data)
                //获取推荐列表
                return model.getTop(data.category);
            }).then(function(res){
                self.assign('topblog',res);
                return self.display()
            }).catch(function(err){
                return self.error(102,'请设置阅读的文章');
            })
        }
    };

});