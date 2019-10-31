Component({
    data: {
        activeTab: ""
    },
    methods: {
        jumpTab: function(t) {
            var a = t.currentTarget.dataset.tab;
            wx.switchTab({
                url: "/pages/" + a + "/" + a
            }), this.setData({
                activeTab: a
            });
        }
    }
});