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
        //每次登陆时都向后台发送code验证bjut_id, 保证bjut_id 的实时性
        self.getUserKey();
    },

    getLogin: function (getUserInfo) {
        wx.login({
            success: function (res) {
                // 成功获取code
                if (res.code) {
                    console.log('获取 code 成功...');
                }
            }
        });
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
    // 获取设备高度and宽度
    GetSysInfo: function(){
      var self = this;
      wx.getSystemInfo({
        success: function(res) {
          console.log(res.screenHeight);
          wx.setStorageSync('sys_info_height', res.screenHeight);
          wx.setStorageSync('sys_info_width', res.screenWidth);
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    },

    
    globalData: {
        userInfo: null,
        ServerUrl: 'https://www.i-exshare.cn',
        //ServerUrl:'http://127.0.0.1:3000',
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
        ],
        //ServerUrl:'https://10.21.8.131:3000'
    },
    
})


