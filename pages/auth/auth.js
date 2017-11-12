// pages/auth/auth.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    academy: [],
    academy_names: ['加载中...'],
    year: [],
    index_academy: 0,
    index_year: 0,
    verify_state: 3,
    stu_image: [],
    school_names: ["北京工业大学", "北京传媒大学", "首都经济贸易大学"],
    index_school: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var nowYear = new Date().getFullYear()
    var arrYear = []
    for (var i = 2012; i <= nowYear; i++) {
      arrYear.push(i)
    }
    that.setData({
      year: arrYear,
    });
    // 获取北京工业大学学院信息
    app.SendRequest('/api/find_all_info_by_action', { action: "academy" }, function (res) {
      if (res.statusCode != 200 || res.data.errno != 0) {
        wx.showToast({
          title: '获取学院信息失败！',
        })
        return
      }
      var academy = res.data.data[0].academy;
      // 去除全校
      academy.shift();
      that.setData({
        academy: academy,
      });
      var names = [];
      for (var i = 0; i < academy.length; i++) {
        names.push(academy[i].academy_name);
      }
      that.setData({
        academy_names: names,
      });
    });
    // 获取学校列表
    app.SendRequest('/api/other_school/all', {}, function (res) {
      console.log('this is /api/other_school/all callback...', res);
      var temp = res.data.data[0].other_school;
      // 为schoolk_list 赋值，之后向后端发数据时查询school的school_number
      that.setData({
        school_list: temp,
      });
      var school_list = [];
      for (let i = 0; i < temp.length; i++) {
        school_list.push(temp[i].school_name);
      }
      that.setData({
        school_names: school_list
      });
    });
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
  // 学校的选择
  school_picker: function (e) {
    this.setData({
      index_school: e.detail.value
    });
  },
  // 点击上传按钮
  form_submit: function (e) {
    self = this;
    var page_data = e.detail.value;
    if (page_data.name == "") {
      wx.showToast({
        title: '姓名不能为空',
        image: '/images/icon/warn.svg'
      });
    } else if (page_data.studentID == "") {
      wx.showToast({
        title: '学号不能为空',
        image: '/images/icon/warn.svg'
      });
    } else if (self.data.stu_image.length == 0) {
      wx.showToast({
        title: '请选择图片',
        image: '/images/icon/warn.svg'
      });
    } else {
      wx.showLoading({
        title: '正在提交学生信息，请稍后...',
      });
      wx.uploadFile({
        url: app.globalData.ServerUrl + '/api/upload_stu_image',
        filePath: self.data.stu_image[0],
        name: 'stu_image',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: { _id: wx.getStorageSync('user_key') },
        success: uploadFileSuccessedCallback,
        fail: function (res) { },
        complete: function (res) {
          console.log('上传图片完成')
          console.log(res)
        }
      });
    }
    // 上传图片成功后 上传其他信息
    function uploadFileSuccessedCallback(res) {
      console.log('uploadFileSuccessedCallback...');
      var j_res;
      if (res.statusCode != 200 || (j_res = JSON.parse(res.data)).errno != 0) {
        wx.showToast({
          title: '上传异常',
          image: '/images/icon/cry.svg'
        })
        return
      }

      var student_data = {
        _id: wx.getStorageSync('user_key'),
        name: page_data.name,
        studentID: page_data.studentID,
        enter_year: self.data.year[page_data.year],
        academy: -1,
        verify_state: 1,
        school: 0 // 北京工业大学
      }
      // 发送北工大用户注册信息
      if (!self.data.index_school) {
        // 填写学院信息
        student_data.academy = self.data.academy[page_data.academy].academy_number;
        console.log('send bjut data:', student_data);
        app.SendRequest('/api/update_student', student_data, updateStudentSuccessCallback);
      } else { // 发送外校用户注册信息
        // 外校无学院，将学院置为-1
        student_data.academy = -1;
        // 通过 school_list 以及 index_school 查询 school_number
        student_data.school = self.data.school_list[self.data.index_school].school_number;
        console.log('send other school data:', student_data);
        app.SendRequest('/api/update_student', student_data, updateStudentSuccessCallback);
      }
    }
    function updateStudentSuccessCallback(res) {
      if (res.statusCode != 200 || res.data.errno != 0) {
        wx.showToast({
          title: '提交失败！',
          image: '/images/icon/cry.svg',
        })
        return
      }
      wx.hideLoading();
      wx.showToast({
        title: '提交成功！',
        duration: 2000,
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1,
        });
      }, 2000)
    }
  },
  sign_suc: function (res) {
    console.log('注册学生信息返回成功:');
    console.log(res);
    if (1) {
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
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
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