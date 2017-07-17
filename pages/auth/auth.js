// pages/auth/auth.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        academy: ['计算机学院', '生命学院', '材料学院','人文学院'],
        year: ['2012年','2013年','2014年','2015年','2016年','2017年'],
        index_academy: 0,
        index_year:0
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
    academy_picker: function (e) {
        this.setData({
            index_academy: e.detail.value
        });
    },
    year_picker: function (e) {
        this.setData({
            index_year: e.detail.value
        });
    },
    form_submit: function(e){
        self = this;
        console.log(e.detail.value);
        var page_data = e.detail.value;
        if(page_data.studentID == ""){
            wx.showToast({
                title: '学号不能为空',
                image: '/images/icon/warn.svg'
            });
        } else {
            var sign_data = {
                bjut_id: wx.getStorageSync('user_key'),
                student_data: {
                    studentID: page_data.studentID,
                    enter_year: page_data.year,
                    academy: page_data.academy
                }
            };
            // app.SendRequest('/api/sign_studentID', sign_data, self.sign_suc);
            app.SendRequest('/api/index_info', sign_data, self.sign_suc);
            
        }
    },
    sign_suc: function(res){
        console.log('注册学生信息返回成功:');
        console.log(res);
        // if(erron == 0){
        if(1){
            //if(res.sign == true){
            if (1) {
                wx.showToast({
                    title: '注册成功！',
                    image: '/images/icon/success.svg'
                });
            }
        }
    }
})