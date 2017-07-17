var data = require('../../data.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hot_tag: data.data.search.hotTag,
        text:'text'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 加载历史记录
        var search_history = wx.getStorageSync('search_history');
        this.setData({
            search_history: search_history
        });
        // 加载用户信息
        var user_key = wx.getStorageSync('user_key');
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
    input_done: function (e) {
        self = this;
        var value = e.detail.value;
        this.setData({
            input_key: value
        });
        // 添加历史记录
        if (!wx.getStorageSync('search_history')) {
            var temp_sh = [value];
            wx.setStorageSync('search_history', temp_sh);
            this.setData({
                search_history: temp_sh
            });
        } else {
            var temp_sh = wx.getStorageSync('search_history');
            if (temp_sh.indexOf(value) < 0) {
                temp_sh.push(value);
                wx.setStorageSync('search_history', temp_sh);
                this.setData({
                    search_history: temp_sh
                });
            }
        }
        // 发送查询请求
        var search_data = {
            keyword: value
        };
        app.SendRequest('/api/search_keyword', search_data, self.input_done_request_suc);
    },
    // 请求成功回调函数
    input_done_request_suc: function (res) {
        var search_res = res.data.activity;
        if (search_res.length == 0) {
            wx.showToast({
                title: '没有查询到您想要的结果',
                image: '/images/icon/cry.svg'
            });
        } else{
            wx.navigateTo({
                url: '/pages/search_result/search_result?keyword=' + this.data.input_key,
            });
        }
    },
    delete_history: function (e) {
        var index = e.target.dataset.index;
        var temp_sh = wx.getStorageSync('search_history');
        temp_sh.splice(index, 1);
        wx.setStorageSync('search_history', temp_sh);
        this.setData({
            search_history: temp_sh
        });
    },
    clean_history: function () {
        wx.setStorageSync('search_history', []);
        this.setData({
            search_history: []
        });
    },
    get_user_info: function () {
        var user_key = wx.getStorageSync('user_key');
    },
    click_history_item: function(e){
        var his_data = e.currentTarget.dataset.itemdata;
        this.setData({
            input_key: his_data
        });
        app.SendRequest('/api/search_keyword', {keyword: his_data}, this.input_done_request_suc);
    }
})