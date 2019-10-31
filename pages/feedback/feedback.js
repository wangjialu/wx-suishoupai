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
        t.request({
            url: "/user/feedback",
            method: "POST",
            data: {
                content: this.data.content
            }
        }).then(function(t) {
            wx.showToast({
                title: "意见反馈提交成功",
                icon: "none"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2e3);
        });
    },
    onLoad: function() {}
});