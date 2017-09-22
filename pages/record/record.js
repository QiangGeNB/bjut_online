// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    frist_tap_x: 0,
    frist_tap_y: 0,
    show_x: 0,
    show_y: 0,
    touch_mark: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //记录开始的坐标
  handletouchstart: function (event) {
    let start_x = event.touches[0].pageX;
    let start_y = event.touches[0].pageY;
    this.setData({
      frist_tap_x: start_x,
      frist_tap_y: start_y,
      touch_mark: true
    })
  },

  handletouchmove: function(event){
    let now_x = event.touches[0].pageX;
    let now_y = event.touches[0].pageY;

    let gap_x = this.data.show_x - (this.data.frist_tap_x - now_x)/200;
    let gap_y = this.data.show_y - (this.data.frist_tap_y - now_y)/200;
    
    this.setData({
      show_x: gap_x,
      show_y: gap_y
    })
  },

  handletouchend: function (event) {
    console.log('this is handletouchend');
    this.setData({
      touch_mark: false
    });
  }
})