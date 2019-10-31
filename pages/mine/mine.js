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
        t.request({
            url: "/user"
        }).then(function(t) {
            e.setData({
                userDate: t.data
            });
        });
    }
});