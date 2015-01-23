/**
*	@author:Vace_Vlm(ocdo@qq.com)
*	@describe:路由配置
**/

module.exports = [
	// [/^\d+$/,'Article/read?id=:1'],
	// [/^\w+$/,'Article/list?name=:1']
	['read/:id','Article/read'],
	['list/:name','Article/list'],
	['admin/add','Admin/Index/add'],
	['admin/edit/:id','Admin/Index/edit'],
	['admin/del/:id','Admin/Index/del'],

]