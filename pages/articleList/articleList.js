var t = require("../../utils/util.js");

Page({
    data: {
        articleList: [],
        category: "",
        page: 1,
        pagesize: 7,
        content: "",
        canReachBottom: !0,
        articleDetailType: ""
    },
    onLoad: function(t) {
       var type = ""
        if (t.category === "news"){
          type = "queryNewsById";
        } else if (t.category === "laws"){
          type = "queryLawsById";
        }
        this.setData({
            category: t.category,
            articleDetailType: type
        }), this.fetchArticleList(t.category);
    },
    onReachBottom: function() {
        this.data.canReachBottom && this.fetchArticleList();
    },
    fetchArticleList: function(a) {
        var e = this;
        t.request({
            // url: "/wx/" + (a || this.data.category) + "/list?page=" + this.data.page
            url: "/wx/" + (a || this.data.category),
            method: "POST",
            data: {
              page: e.data.page,
              pageSize: e.data.pagesize
            }
        }).then(function(a) {
            if (a.data && a.data.length > 0) {
              for (var i = 0; i < a.data.length; i++) {
                a.data[i].createTimeStr = t.formatTime(a.data[i].createTime);
                a.data[i].contentTemp = a.data[i].contentTemp.substring(0,39);
                console.log("contentTemp: " + a.data[i].contentTemp);
              }
            }
            if (a.data.length < e.data.pagesize){
              e.setData({
                articleList: e.data.articleList.concat(a.data),
                canReachBottom: !1
              });
              console.log("canReachBottom: " + e.data.canReachBottom);
            }else {
                e.setData({
                  articleList: e.data.articleList.concat(a.data),
                  page: ++e.data.page
                });
            }
            console.log("canReachBottom: " + e.data.canReachBottom);
            // else e.setData({
            //     canReachBottom: !1
            // });
        });
    }
    
});