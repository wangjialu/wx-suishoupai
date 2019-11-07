var n = require("/utils/util.js");

App({
    serverUrl: "http://192.168.2.177:8080",
    onLaunch: function() {
        n.wxLogin();
    },
    onShow: function() {},
    globalData: {
        complaint: ""
    }
});