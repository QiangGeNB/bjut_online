// pages/record2/record2.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户近七天平均步数
    ave_step: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage();
  },
  initPage: function (){
    var self = this;
    var get_avg_rank = {
      bjut_id: wx.getStorageSync('user_key'),
      nDays: 7
    };
    // 查询冠军信息
    app.SendRequest('/api/find_wx_rundata_by_id', {'bjut_id': wx.getStorageSync('user_key')}, function(res){
      console.log('查询到打卡天数：', res);
      let temp = res.data.data;
      // 获得冠军的日期
      let school_champion_dates = self.date_formate(temp.schoolChampionDates);
      self.setData({
        clock_in_count: temp.clockInCount,
        school_champion_dates: school_champion_dates
      });
    });
    // 获得近七天平均步数
    app.SendRequest('/api/get_wx_avg_step_by_id', {'bjut_id': wx.getStorageSync('user_key')}, function(res) {
      self.setData({
        ave_step: res.data.data
      })
    });
    // 在没有获得冠军的情况下 获取最优记录
    app.SendRequest('/api/get_best_rank_by_bjut_id', { 'bjut_id': wx.getStorageSync('user_key') }, function(res){
      console.log('this is best success');
      console.log(res);
      
      if(res.data.data == null){
        self.setData({
          best_mark: false
        });
      } else {
        // 存在最佳记录
        var date_list =[];
        var best_record = res.data.data.ranks;
        date_list.push(best_record.date);
        var best_date = self.date_formate(date_list);
        self.setData({
          best_date: best_date[0],
          best_rank: best_record.rank,
          best_percentage: best_record.defeatPercentage,
          best_mark: true
        });
        // 获取最佳 击败 百分数
        var defeat_data = res.data.defeatPercentage.ranks;
        self.setData({
          defeat_date: self.date_formate([defeat_data.date])[0],
          defeat_percentage: defeat_data.defeatPercentage
        });
      }

    });
  },

  // 格式化时间（年、月、日） 传入参数为数组格式
  date_formate: function(t_date) {
    var result_date_list = [];
    for (let i=0; i<t_date.length; i++){
      var date = new Date(t_date[i]);
      result_date_list.push(date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日');
    }
    return result_date_list;
  }
})