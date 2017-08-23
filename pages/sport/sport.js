// pages/sport/sport.js
var data = require('../../data.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sport_tab: 1,
      academy: [],
      sport_aca_picker_index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      self = this;
      wx.getWeRunData({
          success(res) {
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              var sport_data = {
                  bjut_id: wx.getStorageSync('user_key'),
                  code: '',
                  encryptedData: encryptedData,
                  iv: iv
              };
              // 登录 获取code
              wx.checkSession({
                  success: function () {
                      console.log('用户session没有过期');
                      console.log(sport_data);
                      app.SendRequest('/api/get_wx_run_data', sport_data, self.sport_req_suc);
                  },
                  fail: function () {
                      console.log('用户session已过期，需要重新登录获取session...');
                      wx.login({
                          success: function (res) {
                              sport_data.code = res.code;
                              console.log(sport_data);
                              app.SendRequest('/api/get_wx_run_date', sport_data, self.sport_req_suc);
                          },
                          fail: function (res) { },
                          complete: function (res) { },
                      });
                  }
              })
          }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '今天我走了' + this.data.my_sport_data.step + '步,在北工大全校排名中排在第' + this.data.my_sport_data.schoolrank+'名',
      path: '/pages/sport/sport',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        });
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'fail'
        });
      }
    }
  },
  // 请求微信运动的回调函数
  sport_req_suc: function (res) {
      console.log('this is sport callback:')
      console.log(res.data);
      // 将运动首页数据付给my_sport_data
      this.setData({
          my_sport_data: res.data.sport_data,
          userinfo: res.data.userinfo
      });
  },
  click_sport_tab: function (e) {
      self = this;
      let sport_tab_index = e.currentTarget.dataset.sportTabIndex;
      switch (sport_tab_index) {
          case "1":
              self.setData({
                  sport_tab: 1
              });
              break;
          case "2":
              self.setData({
                  sport_tab: 2
              });
              app.SendRequest('/api/wx_day_rank_10', { range: 0}, function (res) {
                  console.log('this is wx_day_rank_10 res:');
                  console.log(res);
                  self.setData({
                      rank_list_data: res.data.data
                  });
              });
              app.SendRequest('/api/find_all_info_by_action', { action: 'academy' }, function (res) {
                var academy = res.data.data[0].academy;
                var academy_temp = academy[1];
                var academy_xxxb = academy[academy.length-1];
                academy[academy.length-1] = academy_temp;
                academy[1] = academy_xxxb;
                self.setData({
                  academy: academy
                })
              })
              break;
      }
  },
  // 学院选择器变化时触发
  sport_aca_picker: function (e) {
    let self = this;
      this.setData({
          sport_aca_picker_index: e.detail.value
      });
      
      app.SendRequest('/api/wx_day_rank_10', { range: this.data.academy[e.detail.value].academy_number }, function (res) {
          console.log('this is rank res:')
          console.log(res);
          self.setData({
            rank_list_data: res.data.data
          });
      });
  }
})