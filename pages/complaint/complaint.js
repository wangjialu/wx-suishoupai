// 举报信息填写
function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../utils/util.js"), a = getApp(), o = wx.getRecorderManager(), n = wx.createInnerAudioContext();

Page({
    data: {
        authSetting: {},
        reportTypes: null,
        complaintIndex: 0,
        content: "",
        voices: [],
        videos: [],
        canRecorder: !0,
        location: "",
        images: [],
        mobile: "",
        fileObj: {},
        checkedStatement: !1,
        voicesIndex: -1,
        clearData: !0
    },
    onLoad: function() {
        var t = this;
        o.onStart(function() {
            console.log("recorder start"), t.setData({
                canRecorder: !1
            }), wx.showLoading({
                title: "录音中"
            });
        }), o.onStop(function(e) {
            console.log("recorder stop", e), t.setData({
                canRecorder: !0
            }), e.duration = (e.duration / 1e3).toFixed(1), wx.hideLoading();
            var a = t.data.voices;
            a[a.length] = e, t.setData({
                voices: a
            });
        }), o.onInterruptionEnd(function() {
            wx.showToast({
                title: "录音被中断，请重新开始",
                icon: "none"
            }), o.stop();
        }), o.onError(function(t) {
            console.log(t);
        }), n.onPlay(function() {
            console.log("开始播放");
        }), n.onStop(function() {
            console.log("结束播放");
        }), n.onEnded(function() {
            console.log("自然播放结束"), t.setData({
                voicesIndex: -1
            });
        }), n.onError(function(t) {
            console.log(t.errMsg), console.log(t.errCode);
        });
    },
    onShow: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            activeTab: "complaint"
        }), this.fetchReportTypes();
        var e = this;
        wx.getSetting({
            success: function(a) {
                if (a.authSetting["scope.record"]) {
                    o = "authSetting.record";
                    e.setData(t({}, o, !0));
                } else wx.authorize({
                    scope: "scope.record",
                    success: function() {
                        e.setData(t({}, "authSetting.record", !0));
                    },
                    fail: function(a) {
                        console.log(a);
                        e.setData(t({}, "authSetting.record", !1));
                    }
                });
                if (a.authSetting["scope.userLocation"]) {
                    var o = "authSetting.userLocation";
                    e.setData(t({}, o, !0));
                } else wx.authorize({
                    scope: "scope.userLocation",
                    success: function() {
                        e.setData(t({}, "authSetting.userLocation", !0));
                    },
                    fail: function(a) {
                        console.log(a);
                        e.setData(t({}, "authSetting.userLocation", !1));
                    }
                });
            }
        });
    },
    onHide: function() {
        this.data.voicesIndex > -1 && (n.stop(), this.setData({
            voicesIndex: -1
        })), this.data.clearData && this.setData({
            content: "",
            voices: [],
            videos: [],
            canRecorder: !0,
            location: "",
            images: [],
            mobile: "",
            fileObj: {}
        });
    },
    fetchReportTypes: function() {
        var t = this;
        e.request({
            url: "/wx/reportTypes"
        }).then(function(e) {
            // var o = e.data, n = o.types.indexOf(a.globalData.complaint);
          var o = e.data, n = o.indexOf(a.globalData.complaint);
            // a.globalData.complaint = "", 
            t.setData({
                reportTypes: o,
                complaintIndex: n > 0 ? n : 0
            });
        });
    },
    pickerChange: function(t) {
      // reportTypes[complaintIndex]
      a.globalData.complaint = this.data.reportTypes[t.detail.value],
        this.setData({
            complaintIndex: parseInt(t.detail.value)
        });
    },
    contentInput: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    gotoSetting: function() {
        wx.openSetting();
    },
    recorderStart: function() {
        this.data.voices.length < 3 ? this.data.canRecorder && o.start({
            duration: 6e4,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192e3,
            format: "mp3"
        }) : wx.showToast({
            title: "最多只能上传3条语音信息",
            icon: "none"
        });
    },
    recorderEnd: function() {
        o.stop();
    },
    playVoices: function(t) {
        var e = t.currentTarget.dataset.index;
        this.data.voicesIndex == e ? (n.stop(), this.setData({
            voicesIndex: -1
        })) : (n.stop(), n.src = this.data.voices[e].tempFilePath, n.play(), this.setData({
            voicesIndex: e
        }));
    },
    deleteVoices: function(t) {
        var e = this.data.voices;
        e.splice(t.currentTarget.dataset.index, 1), this.setData({
            voices: e
        });
    },
    uploadVideo: function() {
        var t = this;
        this.data.videos.length < 1 ? (this.setData({
            clearData: !1
        }), wx.chooseVideo({
            sourceType: [ "camera" ],
            success: function(e) {
                console.log(e), t.setData({
                    videos: [ e ]
                });
            },
            fail: function(t) {
                console.log(t), wx.showToast({
                    title: "上传失败",
                    icon: "none"
                });
            },
            complete: function(e) {
                t.setData({
                    clearData: !0
                });
            }
        })) : wx.showToast({
            title: "最多只能上传1条视频信息",
            icon: "none"
        });
    },
    deleteVideos: function() {
        this.setData({
            videos: []
        });
    },
    chooseLocation: function() {
        var t = this;
        this.setData({
            clearData: !1
        }), wx.chooseLocation({
            success: function(e) {
                t.setData({
                    location: e.address
                });
            },
            fail: function(t) {
                console.log(t);
            },
            complete: function(e) {
                t.setData({
                    clearData: !0
                });
            }
        });
    },
    uploadImage: function() {
        var t = this;
        this.setData({
            clearData: !1
        }), wx.chooseImage({
            count: 5,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                console.log(e), t.setData({
                    images: t.data.images.concat(e.tempFilePaths).slice(0, 5)
                });
            },
            complete: function(e) {
                t.setData({
                    clearData: !0
                });
            }
        });
    },
    preview: function(t) {
        var e = t.currentTarget.dataset.src;
        e && wx.previewImage({
            current: e,
            urls: this.data.images
        });
    },
    deleteImage: function(t) {
        var e = this.data.images;
        e.splice(t.currentTarget.dataset.index, 1), this.setData({
            images: e
        });
    },
    numberInput: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    checkboxChange: function(t) {
        this.setData({
            checkedStatement: t.detail.value.length > 0
        });
    },
    submit: function() {
        var t = this;
        var w = wx.getStorageSync("userInfo");
        if (this.data.checkedStatement) if (this.data.content) if (this.data.mobile) {
            for (var a = [], o = 0; o < this.data.voices.length; o++) 
                a.push(this.uploadFile("voices", this.data.voices[o].tempFilePath, o));
            for (o = 0; o < this.data.videos.length; o++) a.push(this.uploadFile("videos", this.data.videos[o].tempFilePath, o));
            for (o = 0; o < this.data.images.length; o++) a.push(this.uploadFile("images", this.data.images[o], o));
            wx.showLoading({
                title: "提交中"
            }), Promise.all(a).then(function() {
                for (var a = [], o = [], n = [], i = 0; i < t.data.voices.length; i++) a.push(t.data.fileObj["voices-" + i]);
                for (i = 0; i < t.data.videos.length; i++) o.push(t.data.fileObj["videos-" + i]);
                for (i = 0; i < t.data.images.length; i++) n.push(t.data.fileObj["images-" + i]);
                console.log({
                    type: t.data.reportTypes[t.data.complaintIndex],
                    content: t.data.content,
                    voices: a,
                    videos: o,
                    location: t.data.location,
                    images: n,
                    mobile: t.data.mobile
                }), e.request({
                    url: "/wx/saveReport",
                    method: "POST",
                    data: {
                        openId: w.openId,
                        effDate: new Date(),
                        type: t.data.reportTypes[t.data.complaintIndex],
                        content: t.data.content,
                        voices: a,
                        videos: o,
                        location: t.data.location,
                        images: n,
                        mobile: t.data.mobile
                    }
                }).then(function(t) {
                    wx.hideLoading(), wx.showToast({
                        title: "举报信息提交成功",
                        icon: "none"
                    }), setTimeout(function() {
                        wx.navigateTo({
                            url: "/pages/complaintSuccess/complaintSuccess"
                        });
                    }, 2e3);
                }).catch(function(t) {
                    wx.hideLoading();
                });
            }).catch(function(t) {
                wx.hideLoading();
            });
        } else wx.showToast({
            title: "请填写手机号码",
            icon: "none"
        }); else wx.showToast({
            title: "请填写举报详情内容",
            icon: "none"
        });
    },
    uploadFile: function(a, o, n) {
        var i = this;
        return e.uploadFile(o).then(function(e) {
            var o = "fileObj." + a + "-" + n;
            i.setData(t({}, o, "http://127.0.0.1:8082/" + e.data.url));
        });
    }
});