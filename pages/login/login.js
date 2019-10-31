var t = require("../../utils/util.js");

Page({
    data: {},
    onLoad: function() {},
    getUserInfo: function(e) {
        t.request({
            url: "/wechat/login",
            method: "POST",
            data: {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            }
        }).then(function(t) {
            wx.showToast({
                title: "授权成功",
                icon: "none"
            }), setTimeout(function() {
                wx.setStorageSync("wxUserInfo", t.data.user), wx.switchTab({
                    url: "/pages/index/index"
                });
            }, 2e3);
        });
    }
});