// pages/trainee_detail/trainee_detail.js
var data = require('../../../trainee.js');
Page({

  data: {
    trainee_data: data.trainee.trainee_data[0],
    // 地图上的marker
    marker: [],
    collection_mark: data.trainee.trainee_data[0].collection_mark
  },

  onLoad: function (options) {
    console.log(options.trainee_id);
    console.log(data);
    this.setData({
      marker: [{
        id: 1,
        latitude: data.trainee.trainee_data[0].coordinate[0],
        longitude: data.trainee.trainee_data[0].coordinate[1],
        title: data.trainee.trainee_data[0].company
      }]
    });
  },

  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  },
  click_collection: function(){
    console.log('点击了收藏or取消收藏按钮');
    this.setData({
      collection_mark: !this.data.collection_mark
    })
  }
})