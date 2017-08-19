// update_info.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rank_switch: false,
        nickName: '',
        user_info: {},
        new_nickName: '',
        switch_statu: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.SendRequest('/api/get_user_info', { bjut_id: wx.getStorageSync('user_key') }, this.get_user_info_request_suc);
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
    switch1Change: function (e) {
        this.setData({
            switch_statu: e.detail.value
        });
    },
    get_user_info_request_suc: function (res) {
        console.log(res);
        this.setData({
            user_info: res.data.user_info,
            new_nickName: res.data.user_info.nickName
        });
    },
    click_save: function () {
        let setting_data = {
            bjut_id: user_info._id,
            new_nickName: this.data.new_nickName,
            switch_statu: this.data.switch_statu
        }
        // app.SendRequest('/api/user_setting', setting_data, this.user_setting_success_cb);
    },
    user_setting_success_cb: function (res) {
        console.log(res);
    },
    input_change: function (e) {
        this.setData({
            new_nickName: e.detail.value
        });
    }
})