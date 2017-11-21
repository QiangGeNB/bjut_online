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
    var self = this;
    //获取用户运动信息
    self.get_user_sport_relate_data();
    //用户打卡
    self.user_clock_in();
  },
  // 打卡函数
  user_clock_in: function(){
    app.SendRequest('/api/clock_in', { 'bjut_id': wx.getStorageSync('user_key')}, function(res){
      console.log('用户打卡回调函数...', res);
    });
  },
  //登录 + 得到用户运动信息所需的相关秘钥 + 向后端请求获取运动信息
  // 登录-->获取code-->wx.getWeRunData() 获取encryptedData&iv -->发送数据到后台
  get_user_sport_relate_data: function () {
    var self = this;
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
            app.SendRequest('/api/get_wx_run_data', sport_data, self.sport_req_suc);
          }
        })
      },
      fail: function (res) {
        console.log("获取code失败...");
      }
    });
  },

  // 请求微信运动的回调函数
  sport_req_suc: function (res) {
    var self = this;
    // 将运动首页数据付给my_sport_data
    this.setData({
      my_sport_data: res.data.sport_data,
      userinfo: res.data.userinfo
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '今天我已经走了' + this.data.my_sport_data.step + '步,在北工大全校排名中的第' + this.data.my_sport_data.schoolrank + '名',
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
        app.SendRequest('/api/wx_day_rank_10', { range: 0 }, function (res) {
          console.log('this is wx_day_rank_10 res:');
          console.log(res);
          self.setData({
            rank_list_data: res.data.data
          });
        });
        app.SendRequest('/api/find_all_info_by_action', { action: 'academy' }, function (res) {
          var academy = res.data.data[0].academy;
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
  },
  click_record: function(){
    console.log('click record...');
    wx.navigateTo({
      url: '/pages/record2/record2',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})