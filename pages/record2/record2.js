// pages/record2/record2.js
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
    this.initPage();
  },
  initPage: function (){
    var self = this;
    var get_avg_rank = {
      bjut_id: wx.getStorageSync('user_key'),
      nDays: 7
    };
    app.SendRequest('/api/get_wx_avg_rank_by_id', get_avg_rank, self.get_wx_avg_rank_request_suc);
    app.SendRequest('/api/find_wx_rundata_by_id', {'bjut_id': wx.getStorageSync('user_key')}, function(res){
      console.log('查询到打卡天数：', res);
    });
  },
  get_wx_avg_rank_request_suc: function (res) {
    console.log('this is get_wx_avg_rank_request_suc...');
    console.log(res);
  }

})