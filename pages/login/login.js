/**
 * 微信登录授权
 */
var t = require("../../utils/util.js");

Page({
    data: {},
    onLoad: function() {},
    getUserInfo: function(e) {
        var userinfo = wx.getStorageSync("userInfo")
        t.request({
          url: "/wx/getUserInfo",
            method: "POST",
            data: {
                openid: userinfo.openId,
                session_key: userinfo.session_key,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            }
        }).then(function(t) {
            wx.showToast({
                title: "授权成功",
                icon: "none"
            }), setTimeout(function() {
                // wx.setStorageSync("wxUserInfo", t.data.user), 
                wx.switchTab({
                    url: "/pages/index/index"
                });
            }, 2e3);
        });
    }
});