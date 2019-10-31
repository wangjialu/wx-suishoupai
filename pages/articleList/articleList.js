var t = require("../../utils/util.js");

Page({
    data: {
        articleList: [],
        category: "",
        page: 0,
        canReachBottom: !0
    },
    onLoad: function(t) {
        this.setData({
            category: t.category
        }), this.fetchArticleList(t.category);
    },
    onReachBottom: function() {
        this.data.canReachBottom && this.fetchArticleList();
    },
    fetchArticleList: function(a) {
        var e = this;
        t.request({
            url: "/entity/" + (a || this.data.category) + "/list?page=" + this.data.page
        }).then(function(a) {
            if (a.data.data && a.data.data.length) {
                for (var i = 0; i < a.data.data.length; i++) a.data.data[i].createTimeStr = t.formatTime(a.data.data[i].createTime);
                e.setData({
                    articleList: e.data.articleList.concat(a.data.data),
                    page: ++e.data.page
                });
            } else e.setData({
                canReachBottom: !1
            });
        });
    }
});