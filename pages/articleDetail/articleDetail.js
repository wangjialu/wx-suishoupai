var t = require("../../utils/util.js");
var WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        articleInfo: "",
        category: "",
        articleId: ""
    },
    onLoad: function(t) {
        this.fetchArticle(t.category, t.articleId);
    },
    fetchArticle: function(a, e) {
        var i = this;
        t.request({
            url: "/wx/" + a,
            method: "POST",
            data: {
              id: e
            }
        }).then(function(e) {
            var a = e.data;
            if (a) {
              a.content = a.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
              a.createTimeStr = t.formatTime(a.createTime), 
              // WxParse.wxParse('content', 'html', a.content, i);
              i.setData({
                articleInfo: a
              });
            }
        });
    }
});