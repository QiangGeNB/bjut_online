var data = require('../../data.js');
var app = getApp();
// pages/myinfo/myinfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //student_info: data.data.student,
        //join_act: data.data.student.join_activity,
        // fav_act: data.data.student.fav_activity,
        join_fav_mark: 1
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
        this.initPage();
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
    initPage: function () {
        self = this;
        var user_key = wx.getStorageSync('user_key');
        var send_data = { bjut_id: user_key };
        if (user_key == undefined) {
            app.getUserKey();
            app.SendRequest('/api/get_user_info', { bjut_id: wx.getStorageSync('user_key')}, self.get_user_info_request_suc);
        } else {
            console.log('sending req...');
            app.SendRequest('/api/get_user_info', send_data, self.get_user_info_request_suc);
        }
    },
    // 收到查询结果回调函数
    get_user_info_request_suc:function(res){
        self = this;
        console.log('this is user-info res: ');
        console.log(res);
        if (res.data.erron == 0) {
            console.log(res);
            self.setData({
                student_info: res.data.user_info[0],
                join_act: res.data.join_activity,
                fav_act: res.data.coll_activity
            });
        } else {
            wx.showToast({
                title: '请求错误',
                icon: 'loading'
            });
        }
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
        console.log('this is click_act actid: ' + e.currentTarget.dataset.actid);
        wx.navigateTo({
            url:'/pages/detail/detail?actid=' + actid,
        });
    },
    click_sign: function(){
        wx.navigateTo({
            url: '/pages/auth/auth'
        })
    }
})