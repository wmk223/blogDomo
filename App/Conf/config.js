module.exports = {
  //配置项: 配置值
  port: 8360, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: '127.0.0.1', // 服务器地址
  db_port: '3306', // 端口
  db_name: 'vace', // 数据库名
  db_user: 'root', // 用户名
  db_pwd: 'root', // 密码
  db_prefix: 'think_', // 数据库表前缀
  //url优化
  default_group:'Home',
  //开启路由规则
  url_route_on:true,
  //后台的账号和密码,实际项目可以存储到数据库中
  admin_user:'admin',
  admin_password:'admin',
  //网站配置
  web_conf:{
  	title:'Vace nodejs Blog',
  	keyword:'nodejs,blog',
  	description:'this is description',
  },

  //博客分类配置
  blog_category:[
  	{name:'diary',title:'日记'},
  	{name:'week',title:'周记'},
  	{name:'life',title:'生活'},
  ],
};