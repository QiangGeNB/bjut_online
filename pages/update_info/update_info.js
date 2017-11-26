// update_info.js
var app = getApp();
Page({
    data: {
        rank_switch: false,
        nickName: '',
        user_info: {},
        new_nickName: '',
        switch_statu: '',
        phone_number: '',
        phone_input_mark: false
    },

    onLoad: function (options) {       
    },

    onReady: function () {
    },

    onShow: function () {
      app.SendRequest('/api/get_user_info', { bjut_id: wx.getStorageSync('user_key') }, this.get_user_info_request_suc);
    },

    switch1Change: function (e) {
        this.setData({
            switch_statu: e.detail.value
        });
    },
    get_user_info_request_suc: function (res) {
        console.log(res);
        var phone = res.data.user_info.phone_number;
        if(phone == "" || phone == null){
          console.log('用户没有手机号');
        } else {
          console.log('用户有手机号');
          // 手机号输入框是否disable
          this.setData({
            phone_input_mark: true
          });
        }
        this.setData({
            user_info: res.data.user_info,
            new_nickName: res.data.user_info.nickName,
            switch_statu: res.data.user_info.rank_switch,
            phone_number: phone
        });
    },
    // 点击提交按钮
    click_save: function () {
      let _this = this;
      console.log(this.data.phone_number.length);
        if(this.data.phone_number.length !=11) {
          wx.showModal({
            title: '信息错误',
            content: '手机号格式不正确',
          });
        } else if (this.data.phone_number.length == 11 && !this.data.phone_input_mark) { // 格式正确 手机号进行了修改
        wx.showModal({
          title: '提示',
          content: '手机号一经提交，不得修改，您确认提交此手机号吗？',
          success: function(res) {
            // 确认修改手机号
            if(res.confirm) {
              let setting_data = {
                _id: _this.data.user_info._id,
                nickName: _this.data.new_nickName,
                rank_switch: _this.data.switch_statu,
                phone_number: _this.data.phone_number
              }
              app.SendRequest('/api/update_student', setting_data, _this.user_setting_success_cb);
            }
          }
        })
         
        }
    },
    user_setting_success_cb: function (res) {
        console.log(res);
        wx.showToast({
          title: '修改成功！',
          duration: 2000,
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          });
        }, 2000);
    },
    input_change: function (e) {
        this.setData({
            new_nickName: e.detail.value
        });
    },
    phone_number_change: function(e) {
      this.setData({
        phone_number: e.detail.value
      });
    }
})