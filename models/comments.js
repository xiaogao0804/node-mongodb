/**
 * Created by Administrator on 2017/3/10.
 */
var marked = require('marked');
var Comment = require('../lib/mongo').Comment;

// 将 comment 的 content 从 markdown 转换成 html
Comment.plugin('contentToHtml', {
    afterFind: function (comments) {
        return comments.map(function (comment) {
            comment.content = marked(comment.content);
            return comment;
        });
    }
});

//其实通过 commentId 就可以唯一确定并删除一条留言，添加 author 的限制是为了防止用户删除他人的留言。 注意：删除一篇文章成功后也要删除该文章下所有的评论，上面 delCommentsByPostId 就是用来做这件事的。
module.exports = {
    // 创建一个留言
    create: function create(comment) {
        return Comment.create(comment).exec();
    },

    // 通过用户 id 和留言 id 删除一个留言
    delCommentById: function delCommentById(commentId, author) {
        return Comment.remove({ author: author, _id: commentId }).exec();
    },

    // 通过文章 id 删除该文章下所有留言
    delCommentsByPostId: function delCommentsByPostId(postId) {
        return Comment.remove({ postId: postId }).exec();
    },

    // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
    getComments: function getComments(postId) {
        return Comment
            .find({ postId: postId })
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: 1 })
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },

    // 通过文章 id 获取该文章下留言数
    getCommentsCount: function getCommentsCount(postId) {
        return Comment.count({ postId: postId }).exec();
    }
};