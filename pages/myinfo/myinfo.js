
var app = getApp();
// pages/myinfo/myinfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        join_fav_mark: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    // onShow: function () {
    //   let self = this;
    //   wx.getSetting({
    //     success(res) {
    //       console.log(res);
    //       if (!res.authSetting['scope.userInfo']) {
    //         wx.showModal({
    //           title: '授权信息',
    //           content: '该功能需要授权获取你的公开信息',
    //           confirmText: '进行授权',
    //           success: function (res) {
    //             if (res.confirm) {
    //               wx.openSetting({
    //                 success: (res) => {
    //                   res.authSetting = {
    //                     "scope.userInfo": true,
    //                     "scope.werun": true
    //                   }
    //                   self.initPage();
    //                 }
    //               })
    //             }
    //             else {
    //               console.log("取消");
    //               wx.navigateTo({
    //                 url: '/pages/index/index'
    //               })
    //             }
    //           }
    //         })

    //       }
    //       else {
    //         self.initPage();
    //       }
    //     }
    //   })
    // },
    onShow: function() {
      let self = this;
      self.initPage();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.initPage();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    initPage: function () {
      console.log('this is hahah');
        self = this;
        var user_key = wx.getStorageSync('user_key');
        var send_data = { bjut_id: user_key };
        app.SendRequest('/api/get_user_info', send_data, self.get_user_info_request_suc);
    },
    // 收到查询结果回调函数
    get_user_info_request_suc: function (res) {
        var un_verify_reason = res.data.user_info.un_verify_reason;
        console.log(un_verify_reason);
        self = this;
        console.log('this is get_user_info_request_suc')
        console.log(res);
        for (var i = 0; i < res.data.coll_activity.length; i++){
            res.data.coll_activity[i].activityDate = this.formate_date(new Date(res.data.coll_activity[i].activityDate));
        }
        for (var i = 0; i < res.data.join_activity.length; i++) {
            res.data.join_activity[i].activityDate = this.formate_date(new Date(res.data.join_activity[i].activityDate));
        }
        if (res.data.user_info.verify_state == 3){
          wx.showModal({
            title: '提示',
            content: '对不起，您的学生验证未通过，请重新验证。未通过原因：'+ un_verify_reason,
            confirmText: '重新验证',
            success: function (res) {
              app.SendRequest('/api/cancel_verify', { bjut_id: wx.getStorageSync('user_key') }, function(res){
                console.log('认证拒绝后修改状态成功...');
              });
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/auth/auth'
                });
              }
            }
          });
        }
        self.setData({
            student_info: res.data.user_info,
            join_act: res.data.join_activity,
            fav_act: res.data.coll_activity
        });
    },
    click_join: function () {
        this.setData({
            join_fav_mark: 1
        });
    },
    click_fav: function () {
        this.setData({
            join_fav_mark: 2
        });
    },
    click_act: function (e) {
        var actid = e.currentTarget.dataset.actid;
        wx.navigateTo({
            url: '/pages/detail/detail?actid=' + actid,
        });
    },
    // 
    click_sign: function () {
        wx.navigateTo({
            url: '/pages/auth/auth'
        })
    },
    // 点击头像跳转设置界面
    update_info: function(e) {
      wx.navigateTo({
        url: '/pages/update_info/update_info',
      })
    },
    // 格式化时间（年月日）
    formate_date: function (date) {
        let month_add = date.getMonth() + 1;
        var formate_result = date.getFullYear() + '年'
            + month_add + '月'
            + date.getDate() + '日'
            + ' '
            + date.getHours() + '点'
            + date.getMinutes() + '分';
        return formate_result;
    },

})