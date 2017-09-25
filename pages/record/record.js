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
    touch_mark: false,
    x_move: 0,
    page_count: -1,
    record_scale: 1,
    is_changing: false,
    sport_pic: 'fencing'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    var sp_count = 0;
    var sp = ['athlete', 'bowling', 'fencing', 'football-1', 'ping-pong', 'swimming', 'tennis'];
    setInterval(function () {
      if (sp_count > sp.length - 1) {
        sp_count = 0;
      }
      self.setData({
        sport_pic: sp[sp_count]
      });
      // console.log('this is swich_sport_pic...', sp[sp_count]);
      sp_count++;
    }, 2000);
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
  handletouchmove: function (event) {
    let now_x = event.touches[0].pageX;
    let now_y = event.touches[0].pageY;

    let gap_x = this.data.show_x - (this.data.frist_tap_x - now_x) / 200;
    let gap_y = this.data.show_y - (this.data.frist_tap_y - now_y) / 200;

    this.setData({
      show_x: gap_x,
      show_y: gap_y
    });

    //滑动信息模块
    let x_move = this.data.frist_tap_x - now_x;
    //console.log('this is x_move: ' , x_move);
    this.setData({
      x_move: -x_move / 4,
      record_opcity: .5 - Math.abs(x_move) / wx.getStorageSync('sys_info_width') * 2,
      record_scale: 1 - Math.abs(x_move) / wx.getStorageSync('sys_info_width') / 2
    });
  },

  handletouchend: function (event) {
    console.log('this is handletouchend');
    let x_move = -this.data.x_move;
    console.log(x_move);
    if (Math.abs(this.data.x_move*4) > wx.getStorageSync('sys_info_width')/4) {
      console.log('chenlong...');
      let temp = this.data.page_count;
      if (x_move > 0) {
        //console.log('向右划...');
        if (temp == 2) {
          //console.log('已经是最右边了...');
        } else {
          this.setData({
            page_count: temp + 1
          });
        }
      } else {
        //console.log('向左滑...');
        if (temp == 0 || temp == -1) {
          //console.log('已经是最左边了...');
        } else {
          this.setData({
            page_count: temp - 1
          });
        }
      }
    }



    this.setData({
      touch_mark: false,
      x_move: 0,
      record_scale: 1,
      record_opcity: .5,
      is_changing: false
    });
  }
})