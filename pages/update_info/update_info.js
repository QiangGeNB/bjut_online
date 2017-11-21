// update_info.js
var app = getApp();
Page({
    data: {
        rank_switch: false,
        nickName: '',
        user_info: {},
        new_nickName: '',
        switch_statu: '',
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
    click_save: function () {
        let setting_data = {
            _id: this.data.user_info._id,
            nickName: this.data.new_nickName,
            rank_switch: this.data.switch_statu
        }
        app.SendRequest('/api/update_student', setting_data, this.user_setting_success_cb);
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
})