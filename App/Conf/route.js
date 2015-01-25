/**
*	@author:Vace_Vlm(ocdo@qq.com)
*	@describe:路由配置
**/

module.exports = [
	// [/^\d+$/,'Article/read?id=:1'],
	// [/^\w+$/,'Article/list?name=:1']
	['read/:id','Article/read'],//文章阅读 read/1.html
	['list/:name','Article/list'],//文章列表 list/week.html
	['search','Index/search'],//搜索 search?k=xxx

	['admin/add','Admin/Index/add'],//添加文章
	['admin/edit/:id','Admin/Index/edit'],//编辑文章
	['admin/del/:id','Admin/Index/del'],//删除文章

]