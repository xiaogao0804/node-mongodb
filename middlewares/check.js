//权限控制  就是检查用户是否登陆注册 如果登陆了就可以在里面发帖或写文章
//我们可以把用户状态的检查封装成一个中间件，在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制
module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录');   //flash 就是说只引用一次,第二次引用该值就没有了
            return res.redirect('/signin');  //如果用户未登陆 就显示登陆的状态 并跳转到登陆页面
        }
        next();  //并将请求传递给下一个中间件
    },//如果用户信息req.session.user不存在

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {            //如果用户信息req.session.user存在
            req.flash('error', '已登录');   //  显示已登陆
            return res.redirect('back');//返回之前的页面
        }
        next();
    }
};