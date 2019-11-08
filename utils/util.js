var app = getApp();

var t = function(t) {
    wx.login({
        success: function(o) {
            e({
                url: "/wx/getOpenId",
                method: "POST",
                data: {
                    code: o.code
                }
            }).then(function(o) {
                wx.setStorageSync("userInfo", o.data), t && e(t);
                console.log("userInfo: " + wx.getStorageSync("userInfo"));
            });
            console.log("code: " + o.code)
        }
    });
}, e = function(e) {
    var o = wx.getStorageSync("userInfo"),
    n = {
        // Authorization: o.token ? "Bearer " + o.token : ""
    };
    return new Promise(function(o, a) {
        wx.request({
            // url: "https://www.alsyqjcy.top" + e.url,
            url: "http://172.20.10.2:8080" + e.url,
            // url: "http://172.20.10.2:8080" + '/wxLogin/getUserInfo',
            method: e.method || "GET",
            data: e.data,
            header: Object.assign(n, e.header),
            success: function(n) {
                200 === n.statusCode || 204 === n.statusCode ? o(n.data) : 401 === n.statusCode ? (t(e), 
                console.log("401")) : (wx.showToast({
                    title: n.data.message,
                    icon: "none"
                }), a(n.data));
            },
            fail: function(t) {
                wx.showToast({
                    title: "请检查网络连接",
                    icon: "none"
                });
            },
            complete: function(t) {}
        });
    });
}, o = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    wxLogin: t,
    request: e,
    uploadFile: function(t) {
        var e = wx.getStorageSync("userInfo");
        return new Promise(function(o, n) {
            wx.uploadFile({
              url: "http://172.20.10.2:8080/upload/uploadFile",
                filePath: t,
                name: "file",
                formData: {
                    openId: e.openId
                },
                header: {
                    Authorization: "Bearer " + e.token
                },
                success: function(t) {
                    var e = JSON.parse(t.data);
                    o(e);
                },
                fail: function(t) {
                    console.log(t), wx.showToast({
                        title: "文件上传失败",
                        icon: "none"
                    });
                }
            });
        });
    },
    formatTime: function(t) {
        var e = new Date(t), n = e.getFullYear(), a = e.getMonth() + 1, s = e.getDate(), r = e.getHours(), u = e.getMinutes(), i =                  e.getSeconds();
        return [ n, a, s ].map(o).join("-") + " " + [ r, u, i ].map(o).join(":");
    }
};