//app.js
App({
    onLaunch: function () {
        self = this;
        if (wx.getStorageSync('user_key')) {
            console.log('缓存中存在user_key...');
        } else {
            console.log('缓存中不存在user_key...');
            self.getUserKey();
        }
    },

    getLogin: function (getUserInfo) {
        wx.login({
            success: function (res) {
                // 成功获取code
                if (res.code) {
                    console.log('获取 code 成功...');
                    console.log(res.code);
                    //getUserInfo(res.code);
                }
            }
        })
    },

    getUserInfo: function (code) {
        self = this;
        console.log('getUserInfo...');
        wx.getUserInfo({
            success: function (res) {
                console.log('获取 userInfo 成功...');
                console.log(res);
                res.userInfo.studentID = 'S201607044';
                wx.setStorageSync('userinfo', res.userInfo);
                // self.sendRequest(code, res.userInfo);
                var code_userInfo = {
                    code: code,
                    userInfo: res.userInfo
                };
                // 发送 getuserkey 请求（有点复杂）
                self.SendRequest('/api/get_user_key', code_userInfo, function (res) {
                    console.log('response success...');
                    console.log(res.data);
                    res = res.data;
                    if (res.erron == 0) {
                        wx.setStorageSync('user_key', res.data);
                    }
                });
            },
            fail: function () {
                console.log('获取 userInfo 失败...');
            }
        })
    },
    // 获取 user_key
    getUserKey: function () {
        self = this;
        wx.login({
            success: function (res) {
                var code = res.code;
                console.log(code);
                if (code) {
                    self.getUserInfo(code);
                }
            }
        });
    },
    SendRequest: function(url, data, success_cb){
        console.log('app is sending request...');
        wx.request({
            url: this.globalData.ServerUrl + url,
            data: data,
            success: function(res) {
                success_cb(res);
            },
            fail: function(res) {
                wx.showToast({
                    title: '请求错误',
                })
            }
        });
    },
    globalData: {
        userInfo: null,
        ServerUrl: 'https://www.i-exshare.cn'
    }
})


