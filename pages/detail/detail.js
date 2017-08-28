var data = require('../../data.js');
var app = getApp();
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag_select: 0,
    formate_act_date: '',
    formate_online_date: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      actid: options.actid
    });

    console.log('this is options.actid' + options.actid);
    this.initPage(options.actid);
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
    return {
      title: this.data.detail_data.activityTitle,
      path: '/pages/detail/detail?actid='+this.data.actid,
      imageUrl: this.data.detail_data.mainImage,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        });
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'fail'
        });
      }
    }
  },
  // 页面初始化函数
  initPage: function (actid) {
    self = this;
    var user_key = wx.getStorageSync('user_key');
    console.log('this is actid: ' + actid);
    var initPageData = {
      bjut_id: user_key,
      activityID: actid
    };
    app.SendRequest('/api/get_activity_by_id', initPageData, self.initPage_req_suc);
  },
  // 页面初始化请求成功回调函数
  initPage_req_suc: function (res) {

    console.log(res);
    var detail_data = res.data.data[0];
    var formate_act_date = this.formate_data(new Date(res.data.data[0].activityDate));
    var formate_online_date = this.formate_data(new Date(res.data.data[0].onlineTime));
    this.setData({
      formate_act_date: formate_act_date,
      formate_online_date: formate_online_date
    });

    var has_join = res.data.join;
    var has_fav = res.data.coll;
    self.setData({
      detail_data: detail_data,
      has_join: res.data.join,
      has_fav: res.data.coll
    });
  },
  click_tag: function (e) {
    let index = e.currentTarget.dataset.tagIndex;
    console.log(e.currentTarget.dataset.tagIndex)
    this.setData({
      tag_select: index
    });
  },
  // 点击参加按钮，参加或者退出活动
  click_join: function () {
    self = this;
    let temp_join = this.data.has_join;

    var join_data = {
      bjut_id: wx.getStorageSync('user_key'),
      activityID: self.data.actid
    };
    // 发送 参加/取消 活动请求
    if (temp_join == true) {
      app.SendRequest('/api/quit_activity', join_data, function (res) {
        console.log('取消活动返回信息收到...');
        if (res.data.erron) {
          wx.showToast({
            title: '服务器出错',
            icon: 'fail'
          });
        } else {
          wx.showToast({
            title: '取消活动成功',
            icon: 'success'
          });
          self.setData({
            has_join: !temp_join
          });
        }
      });
    } else {
      app.SendRequest('/api/join_activity', join_data, function (res) {
        console.log('参加活动返回信息收到...');
        let erron = res.data.erron;
        let has_stu_id = res.data.has_stu_id;
        let verify_state = res.data.verify_state;
        console.log(verify_state)
        if (erron) {
          wx.showToast({
            title: '服务器出错',
            image: '/images/icon/cry.svg'
          });
        } else if (verify_state == 2) {
          wx.showModal({
            title: '提示',
            content: '对不起，您还没通过学生验证',
            confirmText: '去验证',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/auth/auth'
                });
              }
            }
          });
        } else if (verify_state == 1){
          wx.showModal({
            title: '提示',
            content: '您的学生验证信息正在认证中，暂时不能参加活动，请等待管理员通过认证。',
            confirmText: '确定',
            success: function (res) {}
          });
        }else{
          wx.showToast({
            title: '参加活动成功',
            icon: 'success'
          });
          self.setData({
            has_join: !temp_join
          });
        }
      });
    }

  },
  click_fav: function () {
    let temp_fav = this.data.has_fav;
    this.setData({
      has_fav: !temp_fav
    });
    if (temp_fav) {
      wx.showToast({
        title: '取消收藏成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      });
    }
    var fav_data = {
      bjut_id: wx.getStorageSync('user_key'),
      activityID: self.data.actid
    };
    // 发送 收藏/取消收藏 请求
    if (temp_fav == true) {
      app.SendRequest('/api/uncoll_activity', fav_data, function () {
        console.log('收藏活动返回信息收到...');
      });
    } else {
      app.SendRequest('/api/coll_activity', fav_data, function () {
        console.log('取消收藏活动返回信息收到...');
      });
    }
  },
  formate_data: function (date) {
    let month_add = date.getMonth() + 1;
    var formate_result = date.getFullYear() + '年'
      + month_add + '月'
      + date.getDate() + '日'
      + ' '
      + date.getHours() + '点'
      + date.getMinutes() + '分';
    return formate_result;
  }
})