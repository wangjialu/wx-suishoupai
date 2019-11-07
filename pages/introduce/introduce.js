// 公益诉讼
var t = require("../../utils/util.js");

Page({
    data: {
        content: ""
    },
    onLoad: function(t) {
        this.fetchContent(t.categoryId);
    },
    fetchContent: function(e) {
        var n = this;
        t.request({
            // url: "/entity/" + e
           url: "/wx/queryPublicMsg"
        }).then(function(t) {
            n.setData({
                content: t.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
            });
        });
    }
});