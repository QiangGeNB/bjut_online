// update_info.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank_switch: false,
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.SendRequest('/api/get_user_info', { bjut_id: wx.getStorageSync('user_key') }, this.get_user_info_request_suc);
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
  
  },
//   switch1Change: function (e) {
//     app.SendRequest('/api/update_student', this.data);
//   }
    get_user_info_request_suc: function(){}
})