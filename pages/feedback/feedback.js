var t = require("../../utils/util.js");

Page({
    data: {
        content: ""
    },
    feedbackInput: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    submit: function() {
        var e = wx.getStorageSync("userInfo");
        t.request({
            url: "/wx/saveFeedback",
            method: "POST",
            data: {
                openId: e.openId,
                content: this.data.content
            }
        }).then(function(t) {
            if(t.status != 200){
              wx.showToast({
                title: t.msg,
                icon: "none"
              })
            }else{
              wx.showToast({
                title: "意见反馈提交成功",
                icon: "none"
              }), setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                });
              }, 2e3);
            }
        });
    },
    onLoad: function() {}
});