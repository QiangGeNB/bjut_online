// pages/trainee_my/trainee_my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: 812,
    chnel:123
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_key = wx.getStorageSync('user_key');
    var send_data = { _id: user_key };
    app.SendRequest('/api/users/all', send_data, this.get_user_info_request_suc);
    // 获得学校列表
    app.SendRequest('/api/other_school/all', {}, this.get_other_school_request_suc);
  },
  get_user_info_request_suc: function(res){
    console.log(res);
    // 判断有无学校
    if (res.data.data[0].school == undefined){
      this.setData({
        school:812
      });
    } else {
      this.setData({
        school: res.data.data[0].school
      });
    }
    this.setData({
      user_info: res.data.data[0],
      // school: res.data.data[0].school
    });
  },
  get_other_school_request_suc: function(res){
    console.log(res.data.data[0].other_school);
    this.setData({
      other_school_list: res.data.data[0].other_school
    });
  },
  onReady: function () {
  
  },

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
  
  }
})