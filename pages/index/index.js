var data = require('../../data.js');
var app = getApp();
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page_num: 1,
      show_search_back: false,
    //   activity_data: data.data.activity,
    //   swiper:data.data.swiper,
      activity_data: '',
      swiper:'',
      tag_select:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.initPage();
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
  // 页面初始化函数
  initPage(){
      self = this;
      app.SendRequest('/api/index_info', {}, self.initPage_request_suc);
  },
  // 请求成功回调函数
  initPage_request_suc: function(res){
      console.log(res);
      self.setData({
          activity_data: res.data.activity,
          swiper: res.data.swiper
      });
  },

  bindscroll: function(e){  
      if (e.detail.scrollTop > 2){
          this.setData({
              show_search_back: true
          });
      }
  },
  reach_top: function(){
      this.setData({
          show_search_back: false
      });
  },
  // 点击tag的响应函数
  click_tag:function(e){
    self = this;
    console.log(e.currentTarget.dataset.tagIndex);
    let index = e.currentTarget.dataset.tagIndex;
    switch(index){
        case "0":
            this.setData({
                tag_select: 0
            });
            break;
        case "1":
            this.setData({
                tag_select: 1
            });
            break;
        case "2":
            this.setData({
                tag_select: 2
            });
            break;
    }
  },
  // 点击活动进入活动详情页面
  click_activity: function(e){
      console.log(e.currentTarget.dataset.actid);
      let actid = e.currentTarget.dataset.actid;
      let user_key = wx.getStorageSync('user_key');
      wx.navigateTo({
          url: '/pages/detail/detail?actid=' + actid,
      });
  },
  click_search: function(){
      wx.navigateTo({
          url: '/pages/search/search',
      });
  }
})