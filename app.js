//app.js
App({
    onLaunch: function () {
        self = this;
        // 添加数组包含方法
        Array.prototype.contains = function (obj) {
            var i = this.length;
            while (i--) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        }

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
                res.userInfo.studentID = '';
                wx.setStorageSync('userinfo', res.userInfo);
                // self.sendRequest(code, res.userInfo);
                var code_userInfo = {
                    code: code,
                    userInfo: res.userInfo
                };
                // 发送 getuserkey 请求（有点复杂）
                self.SendRequest('/api/get_user_key', code_userInfo, function (res) {
                    console.log('/api/get_user_key response success...');
                    console.log(res.data);
                    res = res.data;
                    if (res.errno == '0') {
                        console.log('user_key存入缓存...');
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
        console.log(url + ' is sending request...');
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
    formate_data: function (date) {
      let month_add = date.getMonth() + 1;
      var formate_result = date.getFullYear() + '年'
        + month_add + '月'
        + date.getDate() + '日'
        + ' '
        + date.getHours() + '点'
        + date.getMinutes() + '分';
      return formate_result;
    },
    globalData: {
        userInfo: null,
        //ServerUrl: 'https://www.i-exshare.cn',
        ServerUrl:'http://127.0.0.1:3000',

        academy: [
          {
            "_id": "598b0494fb89956113a5f19f",
            "academy_number": 7,
            "academy_name": "学院"
          },
          {
            "_id": "599268d758c0e9a8c7e0bbcc",
            "academy_name": "电控学院",
            "academy_number": 1
          }
        ]
        //ServerUrl:'https://10.21.8.131:3000'
    },
    
})


