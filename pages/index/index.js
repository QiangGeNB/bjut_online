var data = require('../../data.js');
var app = getApp();
// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 已经点击过的侧边栏item
        has_click_side_item:[1],
        page_index: 2,
        show_search_back: false,
        activity_data: '',
        swiper: '',
        tag_select: 0,
        open: false,
        sport_data: data.data.sport.sport_data,
        userinfo: data.data.sport.userinfo
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    // 页面初始化函数
    initPage() {
        self = this;
        app.SendRequest('/api/index_info', {}, self.initPage_request_suc);
    },
    // 请求成功回调函数
    initPage_request_suc: function (res) {
        console.log(res);
        self.setData({
            activity_data: res.data.activity,
            swiper: res.data.swiper
        });
    },
    bindscroll: function (e) {
        if (e.detail.scrollTop > 2) {
            this.setData({
                show_search_back: true
            });
        }
    },
    reach_top: function () {
        this.setData({
            show_search_back: false
        });
    },
    open_side_list: function () {
        self = this;
        this.setData({
            open: !self.data.open,
            show_search_back: true
        });
    },
    // 点击侧边栏的item 
    click_side_item: function (e) {
        self = this;
        let list_index = e.currentTarget.dataset.listIndex;
        let has_side = this.data.has_click_side_item;
        // 根据点击item发送相应请求
        switch(list_index){
            case "1": // 点击学生活动
                break;
            case "2": // 点击“每天行走一万步活动”
                // 请求每天行走一万步的数据
                self.require_sport_message();
        }
        // 收起侧边栏
        this.setData({
            open: !self.data.open
        });
        // 显示界面信息
        setTimeout(function () {
            self.setData({
                page_index: list_index
        });
        }, 500);
    },
    require_sport_message: function(){
        self = this;
        wx.getWeRunData({
            success(res) {
                var sport_data = {
                    bjut_id: wx.getStorageSync('user_key'),
                    encryptedData: res.encryptedData,
                    iv: res.iv
                }
                app.SendRequest('/api/get_wx_run_date', sport_data, self.sport_req_suc);
            }
        })
    },
    // 请求微信运动的回调函数
    sport_req_suc: function(res){
        console.log(res);
    },
    // 点击tag的响应函数
    click_tag: function (e) {
        self = this;
        console.log(e.currentTarget.dataset.tagIndex);
        let index = e.currentTarget.dataset.tagIndex;
       switch (index) {
            case "0":
                this.setData({
                    tag_select: 0
                });
                break;
            case "1":
                this.setData({
                    tag_select: 1
                });
                break;
            case "2":
                this.setData({
                    tag_select: 2
                });
                break;
        } 
    },
    // 点击活动进入活动详情页面
    click_activity: function (e) {
        console.log(e.currentTarget.dataset.actid);
        let actid = e.currentTarget.dataset.actid;
        let user_key = wx.getStorageSync('user_key');
        wx.navigateTo({
            url: '/pages/detail/detail?actid=' + actid,
        });
    },
    click_search: function () {
        wx.navigateTo({
            url: '/pages/search/search',
        });
    }
})