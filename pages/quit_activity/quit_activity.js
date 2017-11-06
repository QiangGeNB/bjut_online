// pages/quit_activity/quit_activity.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    quit_reason: ["请选择您取消的原因", "点着玩的", "操作失误", "对活动内容不感兴趣", "时间有冲突", "其他原因"],
    index_reason: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      actid: options.actid,
      act_title: options.act_title
    });
    this.get_user_name();
  },
  reason_picker: function (e) {
    console.log('this is reason_picker');
    var r_index = e.detail.value;
    this.setData({
      index_reason: r_index
    });
  },
  get_user_name: function () {
    self = this;
    var send_data = { bjut_id: wx.getStorageSync('user_key') };
    app.SendRequest('/api/get_user_info', send_data, function (res) {
      console.log(res.data.user_info)
      var user_info = res.data.user_info;
      self.setData({
        user_name: user_info.name,
        student_id: user_info.studentID
      });
    });
  },
  // 点击提交按钮
  form_submit: function (e) {
    self = this;
    var quit_data = {};
    // if (e.detail.value.reson_text){
    //   quit_data = {
    //     quit_reason: this.quit_reason[index_reason],
    //     quit_reson_text: e.detail.value.reson_text
    //   }
    // } else {
    //   quit_data = {
    //     quit_reason: this.quit_reason[this.data.index_reason],
    //     quit_reson_text: ""
    //   }
    // }
    if (this.data.index_reason == 0) {
      console.log("用户没有选择原因");
      wx.showModal({
        title: '请您选择退出原因',
        content: '请您选择退出活动原因，以便管理人员统计~',
      })
    } else {
      var join_data = {
        bjut_id: wx.getStorageSync('user_key'),
        activityID: self.data.actid
      };
      app.SendRequest('/api/quit_activity', join_data, function (res) {
        console.log('取消活动返回信息收到...');
        if (res.data.erron) {
          wx.showToast({
            title: '服务器出错',
            icon: 'fail'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/detail/detail?actid=' + self.data.actid,
            })
          }, 1500);
        } else {
          wx.showToast({
            title: '取消活动成功',
            icon: 'success'
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/detail/detail?actid=' + self.data.actid,
            })
          }, 1500);
        }
      });
    }
  }
})