module.exports = Model(function(){
	/**
	*	@author:Vace_Vlm(ocdo@qq.com)
	*	@describe:博客数据库模型
	**/
	return {
		//获取指定分类列表
		getList:function(cate,limit){
			limit = limit | 10

			return this.where(cate?{category:cate}:{}).limit(limit).order('id DESC').select()
		},
		//获取当前分类top5
		getTop:function(cate,limit,field){
			limit = limit | 5
			field = field | 'id,title'
			return this.where({category:cate}).limit(limit).field(field).order('views DESC').select()
		},
		//读取指定id文章内容
		getDetail:function(id){
			return this.find({id:id})
		},
		//获取主页
		getIndex:function(limit){
			return this.limit(limit | 12).select()
		}


	}
})