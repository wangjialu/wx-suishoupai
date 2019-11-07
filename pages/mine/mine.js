/**
 * 关于我们
 */
var t = require("../../utils/util.js");

Page({
    data: {
        userDate: null
    },
    onLoad: function() {
        this.fetchUserDate();
    },
    onShow: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            activeTab: "mine"
        });
    },
    fetchUserDate: function() {
        var e = this;
        var w = wx.getStorageSync("userInfo");
        t.request({
           url: "/wx/queryUser",
           method: "POST",
           data: {
             openId: w.openId
           }
        }).then(function(t) {
            e.setData({
                userDate: t.data
            });
        });
    }
});