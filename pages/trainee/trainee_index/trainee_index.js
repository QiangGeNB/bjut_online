// pages/trainee/trainee.js
var trainData = require('../../../trainee.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 触发功能按钮参数
    pop: false,
    trainee_data: trainData.trainee.trainee_data
  },


  onLoad: function (options) {

  },

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

  },
  click_function_button: function () {
    console.log('点击了功能按钮...');
    this.setData({
      pop: !this.data.pop
    })
  },
  // 点击trainee_item
  click_item: function (e) {
    var trainee_id = e.currentTarget.dataset.traineeid;
    wx.navigateTo({
      url: '/pages/trainee/trainee_detail/trainee_detail?' + trainee_id,
    })
    console.log("点击了实习item", e.currentTarget.dataset.traineeid);
  }
})