var t = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        homeDate: null
    },
    onLoad: function() {
        wx.getStorageSync("wxUserInfo") ? this.fetchHomeDate() : wx.redirectTo({
            url: "/pages/login/login"
        });
    },
    onShow: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            activeTab: "index"
        });
    },
    onPullDownRefresh: function() {
        this.fetchHomeDate();
    },
    fetchHomeDate: function() {
        var e = this;
        t.request({
            url: "/home"
        }).then(function(t) {
            e.setData({
                homeDate: t.data
            }), wx.stopPullDownRefresh();
        });
    },
    callPhone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.homeDate.complaintPhone
        });
    },
    jumpToComplaint: function(t) {
        e.globalData.complaint = t.currentTarget.dataset.complaint, wx.switchTab({
            url: "/pages/complaint/complaint"
        });
    }
});