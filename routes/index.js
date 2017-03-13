//根路由 规定对所有路由的处理方法
module.exports = function (app) {
    //对用get请求的数据做出响应 就是响应get请求  处理get请求
    //  / 直接请求网址
    app.get('/', function (req, res) {    //为HTTP的get方法添加一个路由请求  调用当前的路径
        res.redirect('/posts');    //设置响应的Location HTTP头，并且设置状态码302 就是跳转到posts页面
    });
    app.use('/signup', require('./signup'));  //app.use('/', routes);和app.use('/users', users)：路由控制器
    app.use('/signin', require('./signin'));  //当在signin这个目录下时 引入signin 并用signin代替posts
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};
//app.get是路由  app.use是对路由的控制或加载中间件
//通过app.use将app.get获得的请求数据全部转发到signup.js或其他js中，再在signup.js中或其他js中使用route.get/post精确匹配