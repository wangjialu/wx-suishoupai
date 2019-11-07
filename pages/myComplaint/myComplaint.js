// 我的举报信息
function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../utils/util.js");

Page({
    data: {
        mineReportDate: [],
        page: 0,
        canReachBottom: !0
    },
    onLoad: function() {
        this.fetchMineReportDate();
    },
    onReachBottom: function() {
        this.data.canReachBottom && this.fetchMineReportDate();
    },
    fetchMineReportDate: function() {
        var t = this;
        var w = wx.getStorageSync("userInfo");
        e.request({
          //  url: "/wx/queryMyReport?page=" + this.data.page,
           url: "/wx/queryMyReport",
           method: "POST",
           data: {
             openId: w.openId
           }
        }).then(function(a) {
            if (a.data && a.data.length) {
                for (var r = 0; r < a.data.length; r++) 
                a.data[r].createTimeStr = e.formatTime(a.data[r].createTime), 
                a.data[r].typeFir = a.data[r].reporttype[0];
                t.setData({
                    mineReportDate: t.data.mineReportDate.concat(a.data),
                    page: ++t.data.page
                });
            } else t.setData({
                canReachBottom: !1
            });
        });
    },
    changeShowReply: function(e) {
        var a = e.currentTarget.dataset.index, r = "mineReportDate[" + a + "].showReply";
        this.setData(t({}, r, !this.data.mineReportDate[a].showReply));
    }
});