//app.js
App({
  onLaunch: function () {
    console.log('this is onlauch')
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
    wx.getStorage({
      key: 'first_login',
      success: function (res) {
        console.log("first_login存在");
        self.useAuthSetting();
      },
      fail: function (res) {
        console.log("first_login不存在");
        wx.setStorage({
          key: 'first_login',
          data: true,
        })
        self.getUserKey();
      }
    });
  },
  useAuthSetting: function () {
    let self = this;
    // 获取用户设置
    wx.getSetting({
      success(res) {
        // console.log(res);
        // 没有通过验证
        if (res.authSetting['scope.userInfo'] === false ) {
          wx.showModal({
            title: '授权信息',
            content: '该功能需要授权获取你的公开信息',
            confirmText: '进行授权',
            success: function (res) {
              if (res.confirm) {
                // 打开用户设置页面
                wx.openSetting({
                  success: (res) => {
                    console.log('this is openSetting res:', res);
                    res.authSetting = {
                      "scope.userInfo": true,
                      "scope.werun": true
                    }
                    console.log("第一次未授权");
                    self.getUserKey();
                  }
                })
              }
              else {
                console.log("取消");
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })

        }
        else {
          self.getUserKey();
        }
      }
    })
  },
  // 获取 user_key
  getUserKey: function () {
    //console.log("getUserKey");
    self = this;
    self.getLogin(self.getUserInfo);
  },
  getLogin: function (login_success_cb) {
    console.log('this is app login...');
    wx.login({
      success: function (res) {
        // 成功获取code
        if (res.code) {
          console.log('获取 code 成功...');
          login_success_cb(res.code);
        } else {
          console.log("app getLogin function: 获取code失败...");
        }
      },
      fail: function (res) {
        wx.navigateBack({
          delta: 1
        })
      }
    });
  },

  getUserInfo: function (code) {
    self = this;
    console.log('getUserInfo...');
    wx.getUserInfo({
      success: function (res) {
        console.log('获取 userInfo 成功...');
        res.userInfo.studentID = '';
        wx.setStorageSync('userinfo', res.userInfo);
        var code_userInfo = {
          code: code,
          userInfo: res.userInfo
        };
        // 发送 getuserkey 请求（有点复杂）
        self.SendRequest('/api/get_user_key', code_userInfo, function (res) {
          res = res.data;
          // 后台存入用户数据并返回bjut_id，前端存入缓存
          if (res.errno == '0') {
            console.log('user_key存入缓存...');
            wx.setStorageSync('user_key', res.data);
            // 获取用户运动信息（此时code并没有过期）
            self.GetRunData(code);
          }
        });
      },
      fail: function () {
        console.log('获取 userInfo 失败...');
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  // 传入user的code（login获取），获取用户的 获取运动必要解密信息 并发往后端进行获取并存储
  GetRunData: function (sport_code) {
    self = this;
    wx.login({
      success: function (res) {
        let sport_code = res.code;
        wx.getWeRunData({
          success(res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            var sport_data = {
              bjut_id: wx.getStorageSync('user_key'),
              code: sport_code,
              encryptedData: encryptedData,
              iv: iv
            };
            self.SendRequest('/api/get_wx_run_data', sport_data, function (res) {
              console.log('app getrundata success!');
              console.log(res);
              wx.setStorage({
                key: 'day_step',
                data: res.data.sport_data.step,
              });
              wx.setStorage({
                key: 'schoolrank',
                data: res.data.sport_data.schoolrank,
              });
              wx.setStorage({
                key: 'school_gap',
                data: res.data.sport_data.bjut_gap,
              });
            });
          }
        })
      },
      fail: function (res) {
        console.log("app getrundata: 获取code失败...");
      }
    });
  },
  SendRequest: function (url, data, success_cb) {
    console.log(url + ' is sending request...');
    wx.request({
      url: this.globalData.ServerUrl + url,
      data: data,
      success: function (res) {
        success_cb(res);
      },
      fail: function (res) {
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
  GetSysInfo: function () {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        wx.setStorageSync('sys_info_height', res.screenHeight);
        wx.setStorageSync('sys_info_width', res.screenWidth);
      },
      fail: function (res) { },
      complete: function (res) { },
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


