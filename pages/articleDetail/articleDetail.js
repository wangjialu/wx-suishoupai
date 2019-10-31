var t = require("../../utils/util.js");

Page({
    data: {
        articleInfo: ""
    },
    onLoad: function(t) {
        this.fetchArticle(t.articleId);
    },
    fetchArticle: function(e) {
        var i = this;
        t.request({
            url: "/entity/" + e
        }).then(function(e) {
            var a = e.data;
            a.content = a.data.html.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '), 
            a.createTimeStr = t.formatTime(a.createTime), i.setData({
                articleInfo: a
            });
        });
    }
});