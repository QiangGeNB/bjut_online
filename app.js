//app.js
App({
    onLaunch: function () {
        self = this;
        if (wx.getStorageSync('user_key')) {
            console.log('缓存中存在user_key...');
        } else {
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
                self.sendRequest(code, res.userInfo);
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
                if (code) {
                    self.getUserInfo(code);
                }
            }
        });
    },
    sendRequest: function (code, userInfo) {
        wx.request({
            url: 'http://192.168.10.1:3000/api/get_user_key',
            data: {
                code: 1,
                userInfo: userInfo
            },
            success: function (res) {
                console.log('response success...');
                console.log(res.data)
            }
        })
    },
    globalData: {
        userInfo: null
    }
})



/*
wx.onSocketOpen(function (res) {
      console.log("WebSocket链接已打开！");
      var message = new Object();
      message.code = wx.getStorageSync('code');
      message.data = wx.getStorageSync('userinfo').userInfo;
      message.action = 'add';
      console.log("this is message:");
      console.log(message);
      wx.sendSocketMessage({
        data: JSON.stringify(message)
      });
    });
*/