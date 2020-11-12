var n = require("/utils/util.js");

App({
    serverUrl: "http://127.0.0.1:8080",
    onLaunch: function() {
        n.wxLogin();
    },
    onShow: function() {},
    globalData: {
        complaint: ""
    }
});