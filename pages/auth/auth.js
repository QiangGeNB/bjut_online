// pages/auth/auth.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        academy: ['计算机学院', '生命学院', '材料学院', '人文学院'],
        year: ['2012年', '2013年', '2014年', '2015年', '2016年', '2017年'],
        index_academy: 0,
        index_year: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log("load")
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("ready")
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      console.log("show")
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
    form_submit: function (e) {
      console.log("jinrusubmit");
        self = this;
        console.log(e.detail.value);
        var page_data = e.detail.value;
        if (page_data.studentID == "") {
            wx.showToast({
                title: '学号不能为空',
                image: '/images/icon/warn.svg'
            });
        } else {
            var sign_data = {
                _id: wx.getStorageSync('user_key'),
                student_data: {
                    studentID: page_data.studentID,
                    enter_year: page_data.year,
                    academy: page_data.academy
                }
            };
            //app.SendRequest('/api/index_info', sign_data, self.sign_suc);
            wx.uploadFile({
              // url: 'https://www.i-exshare.cn/api/upload_stu_image',
                url: 'http://127.0.0.1:3000/api/upload_stu_image',
              filePath: self.data.stu_image[0],
              name: 'stu_image',
              header: {
                'content-type': 'multipart/form-data'
              },
              formData: sign_data,
              success: function(res) {
                console.log('this is upload respo:')
                console.log(typeof res.data);
                var j_res = JSON.parse(res.data);
                console.log(j_res);
                console.log("jinrusubmit1");
                if(j_res.erron == 0){
                    wx.navigateBack({
                        delta: 1,
                    });
                } else {
                    wx.showToast({
                        title: '上传出现问题...',
                        image: '/images/icon/cry.svg'
                    })
                }
              },
              fail: function(res) {},
              complete: function(res) {},
            });
        }
    },
    sign_suc: function (res) {
        console.log('注册学生信息返回成功:');
        console.log(res);
        // if(erron == 0){
        if (1) {
            //if(res.sign == true){
            if (1) {
                wx.showToast({
                    title: '注册成功！',
                    image: '/images/icon/success.svg'
                });
            }
        }
    },
    choose_image: function () {
        self = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                self.setData({
                    stu_image: tempFilePaths
                });
                console.log(tempFilePaths);
            }
        })
    }
})