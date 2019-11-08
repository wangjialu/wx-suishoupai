// 公益诉讼与举报说明
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
            // 判断是否为诉讼举报页面跳转过来的，如果是则取举报说明内容，如果不是，则取公益诉讼内容
            if (e === 'reportNote'){
              n.setData({
                content: t.data.reportnote.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
              });
            }else{
              n.setData({
                content: t.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
              });
            }
        });
    }
});