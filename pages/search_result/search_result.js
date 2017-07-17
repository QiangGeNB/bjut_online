// pages/search_result/search_result.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.search(options.keyword);
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
  search: function(keyword){
      this.setData({
          keyword: keyword
      });
      app.SendRequest('/api/search_keyword', { keyword: keyword }, this.search_suc);
  },
  search_suc: function(res){
    console.log(res);
    this.setData({
        search_res: res.data.activity
    });
  },
  input_done: function (e) {
      self = this;
      var value = e.detail.value;
      this.setData({
          input_key: value
      });
      // 添加历史记录
      if (!wx.getStorageSync('search_history')) {
          var temp_sh = [value];
          wx.setStorageSync('search_history', temp_sh);
          this.setData({
              search_history: temp_sh
          });
      } else {
          var temp_sh = wx.getStorageSync('search_history');
          if (temp_sh.indexOf(value) < 0) {
              temp_sh.push(value);
              wx.setStorageSync('search_history', temp_sh);
              this.setData({
                  search_history: temp_sh
              });
          }
      }
      // 发送查询请求
      var search_data = {
          keyword: value
      };
      app.SendRequest('/api/search_keyword', search_data, self.input_done_request_suc);
  },
  // 请求成功回调函数
  input_done_request_suc: function (res) {
      var search_res = res.data.activity;
      if (search_res.length == 0) {
          wx.showToast({
              title: '没有查询到您想要的结果',
              image: '/images/icon/cry.svg'
          });
      } else {
          wx.navigateTo({
              url: '/pages/search_result/search_result?keyword=' + this.data.input_key,
          });
      }
  },
  // 点击活动进入活动详情页面
  click_activity: function (e) {
      console.log(e.currentTarget.dataset.actid);
      let actid = e.currentTarget.dataset.actid;
      let user_key = wx.getStorageSync('user_key');
      wx.navigateTo({
          url: '/pages/detail/detail?actid=' + actid,
      });
  },
})