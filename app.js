var n = require("/utils/util.js");

App({
    onLaunch: function() {
        n.wxLogin();
    },
    onShow: function() {},
    globalData: {
        complaint: ""
    }
});