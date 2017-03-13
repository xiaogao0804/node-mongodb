//models文件夹里的js是对数据进行操作的

var User = require('../lib/mongo').User;  //获取mongo里面的数据

module.exports = {
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec();
    },
    // 通过用户名获取用户信息
    getUserByName: function getUserByName(name) {
        return User
            .findOne({ name: name })  //findOne()  返回一个文档
            .addCreatedAt()
            .exec();
    }
};