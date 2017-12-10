// pages/trainee_my/trainee_my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: 812,
    verify_mark: false,
    collection_data: [{
      id:1,
      logo: '/images/trainee/baidu.svg',
      company: '北京百度在线网络技术有限公司',
      position: 'java后端工程师'
    },
    {
      id:2,
      logo: '/images/trainee/tencent.svg',
      company: '深圳市腾讯计算机系统有限公司',
      position: '前端开发'
    },
    {
      id: 3,
      logo: '/images/trainee/tencent.svg',
      company: '深圳市腾讯计算机系统有限公司',
      position: '前端开发'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_key = wx.getStorageSync('user_key');
    var send_data = { _id: user_key };
    app.SendRequest('/api/users/all', send_data, this.get_user_info_request_suc);
    // 获得学校列表
    app.SendRequest('/api/other_school/all', {}, this.get_other_school_request_suc);
  },
  check_auth_state: function (userinfo) {
    var _this = this;
    // 用户已认证
    if (userinfo.verify_state == 0) {
      // 根据学院id获取学院
      app.SendRequest('/api/find_academy_by_number', { academy_number: userinfo.academy}, function(res){
        _this.setData({
          academy: res.data.academy_name
        });
      });
      this.setData({
        enter_year: userinfo.enter_year,
        verify_mark: true
      });
    }
  },
  check_school: function(school) {
    if (school == undefined) { // 没有学校的情况下将学校值设为812
      this.setData({
        school: 812
      });
    } else {
      this.setData({
        school: school
      });
    }
  },
  get_user_info_request_suc: function(res){
    console.log(res);
    var user_info = res.data.data[0];
    // 判断用户认证状态, 并对相应数据复制
    this.check_auth_state(user_info);
    // 判断有无学校(因为所属学校是之后加入的数据)
    this.check_school(user_info.school);
    this.setData({
      user_info: res.data.data[0],
    });
  },
  // 获取学校列表回调函数
  get_other_school_request_suc: function(res){
    console.log(res.data.data[0].other_school);
    this.setData({
      other_school_list: res.data.data[0].other_school
    });
  },
  onReady: function () {
  
  },

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
  // 点击收藏的模块
  cilck_col_item: function (id) {
    console.log(id.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/trainee/trainee_detail/trainee_detail?trainee_id=' + id.currentTarget.dataset.id,
    });
  }
})