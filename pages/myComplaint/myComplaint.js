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
        e.request({
            url: "/report/mine?page=" + this.data.page
        }).then(function(a) {
            if (a.data.reports && a.data.reports.length) {
                for (var r = 0; r < a.data.reports.length; r++) a.data.reports[r].createTimeStr = e.formatTime(a.data.reports[r].createTime), 
                a.data.reports[r].typeFir = a.data.reports[r].type[0];
                t.setData({
                    mineReportDate: t.data.mineReportDate.concat(a.data.reports),
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