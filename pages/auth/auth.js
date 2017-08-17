// pages/auth/auth.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        academy: [],
        academy_names : ['加载中...'],
        year: [],
        index_academy: 0,
        index_year: 0,
        verify_state: 3,
        stu_image : [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var nowYear = new Date().getFullYear()
        var arrYear = []
        for(var i=2012; i<=nowYear; i++){
            arrYear.push(i)
        }
        that.setData({
            year : arrYear,
        })
        app.SendRequest('/api/find_all_info_by_action', {action:"academy"}, function(res){
            if(res.statusCode != 200 || res.data.errno != 0){
                wx.showToast({
                    title: '获取学院信息失败！',
                })
                return
            }
            var academy = res.data.data[0].academy
            that.setData({
                academy : academy,
            })
            var names = [];
            for (var i = 0; i < academy.length; i++) {
                names.push(academy[i].academy_name);
            }
            that.setData({
                academy_names : names,
            })
        });
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
        self = this;
        var page_data = e.detail.value;
        if (page_data.studentID == "") {
            wx.showToast({
                title: '学号不能为空',
                image: '/images/icon/warn.svg'
            });
        } else if(self.data.stu_image.length == 0){
            wx.showToast({
                title: '请选择图片',
                image: '/images/icon/warn.svg'
            });
        } else {
            wx.showLoading({
                title: '正在提交学生信息，请稍后...',
            })
            //app.SendRequest('/api/index_info', sign_data, self.sign_suc);
            wx.uploadFile({
              // url: 'https://www.i-exshare.cn/api/upload_stu_image',
                url: app.globalData.ServerUrl + '/api/upload_stu_image',
              filePath: self.data.stu_image[0],
              name: 'stu_image',
              header: {
                'content-type': 'multipart/form-data'
              },
              formData: { _id: wx.getStorageSync('user_key')},
              success: uploadFileSuccessedCallback,
              fail: function(res) {},
              complete:function(res){
                  console.log('上传图片完成')
                  console.log(res)
              }
            });
        }

        function uploadFileSuccessedCallback(res) {
            var j_res;
            if(res.statusCode != 200 || (j_res=JSON.parse(res.data)).errno != 0){
                wx.showToast({
                    title: '上传图片出现问题...',
                    image: '/images/icon/cry.svg'
                })
                return
            }
            
            var student_data = {
                _id: wx.getStorageSync('user_key'),
                studentID: page_data.studentID,
                enter_year: self.data.year[page_data.year],
                academy: self.data.academy[page_data.academy].academy_number,
                verify_state: 1
            }
            app.SendRequest('/api/update_student',student_data,updateStudentSuccessCallback);
        }
        function updateStudentSuccessCallback(res){
            if(res.statusCode != 200 || res.data.errno != 0){
                wx.showToast({
                    title: '提交学生信息失败！',
                    image: '/images/icon/cry.svg',
                })
                return
            }
            wx.hideLoading();
            wx.showToast({
                title: '提交学生信息成功！',
                duration: 2000,
            })
            setTimeout(function () {
                wx.navigateBack({
                    delta: 1,
                });
            },2000)
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
            }
        })
    },
})