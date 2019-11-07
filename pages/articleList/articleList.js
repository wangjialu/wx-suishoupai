var t = require("../../utils/util.js");

Page({
    data: {
        articleList: [],
        category: "",
        page: 0,
        content: "",
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
            // url: "/wx/" + (a || this.data.category) + "/list?page=" + this.data.page
            url: "/wx/" + (a || this.data.category)
        }).then(function(a) {
            if (a.data && a.data.length > 0) {
              for (var i = 0; i < a.data.length; i++) {
                a.data[i].createTimeStr = t.formatTime(a.data[i].createTime);
                a.data[i].contentTemp = a.data[i].contentTemp.substring(0,39);
                console.log("contentTemp: " + a.data[i].contentTemp);
              }
              e.setData({
                  articleList: e.data.articleList.concat(a.data),
                  page: ++e.data.page
              });
            } else e.setData({
                canReachBottom: !1
            });
        });
    }
    
});