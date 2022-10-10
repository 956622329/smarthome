import * as echarts from '../../ec-canvas/echarts';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    list: [],
    xAxisData:[],//横坐标的值
    temData:[],//温度的值
    humData:[],//湿度的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  add() {
    wx.cloud.database().collection('environment')
      .add({
        data: {
          tem: '10',
          hum: '99'
        }
      })
      .then(res => {
        console.log('成功', res.data)
      })
      .catch(err => {
        console.log('失败', err)
      })
  },
  //初始化图表
  init_echarts() {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption())
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart
    })
  },

  //获取数据
  getOption() {
    var that = this

    // 前台配置折线线条表示属性
    // 使用for in 遍历对象拿出name,并配置icon和textStyle，最后放入新建的legendList数组中
    // var legendList = []
    // for (var i in that.data.series) {
    //   var obj = {
    //     name: that.data.series[i].name,
    //     icon: 'circle',
    //     textStyle: {
    //       color: '#000000',
    //     }
    //   }
    //   legendList.push(obj)
    //   // that.data.series[i].data.reverse()
    // }

    var option = {
      // 折线图线条的颜色
      color: ["#37A2DA", "#67E0E3"],
      // 折线图的线条代表意义
      legend: {
        itemWidth: 5, //小圆点的宽度
        itemGap: 25,
        selectedModel: 'single', //折线可多选
        inactiveColor: '#87CEEB',
        data: [{
            name: '湿度',
            icon: 'circle',
            textStyle: {
              color: '#000000',
            }
          },
          {
            name: '温度',
            icon: 'circle',
            textStyle: {
              color: '#000000'
            }
          }
        ],
        bottom: 0,
        left: 30,
        z: 100
      },
      // 刻度
      grid: {
        containLabel: true
      },
      // 悬浮图标
      tooltip: {
        show: true,
        trigger: 'axis',
        position: function (pos, params, dom, rect, size) {
          var obj = {
            top: 60
          };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: that.data.xAxisData
        // data: that.data.ascissaData.reverse()
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLine: { //y轴坐标是否显示
          show: false
        },
        axisTick: { //y轴刻度小标是否显示
          show: false
        }
      },
      // series: that.data.series
      series: [{
        name: '温度',
        type: 'line',
        // 设置折线是否平滑
        smooth: false,
        data: that.data.temData
      }, {
        name: '湿度',
        type: 'line',
        smooth: false,
        data: that.data.humData
      }]
    }
    return option
  },

  //调用接口获取数据
  getChartData() {
    let that = this
    //云函数获取数据
    wx.cloud.database().collection('environment')
      .get()
      .then(res => {
        console.log('成功', res.data)
        that.setData({
          list: res.data
        })
        
        let dateList = []//设立横坐标数组
        let temList = []//设立温度数据数组
        let humList = []//设立湿度数据数组
        for(let i = 0; i<res.data.length; i++){
          //处理时间格式
          let date = that.dateFormat("mm-dd",new Date(res.data[i].day))
          dateList.push(date)
          //处理温度数据
          temList.push(res.data[i].tem)
          //处理湿度数据
          humList.push(res.data[i].hum)
        }

        that.setData({
          xAxisData:dateList,
          temData: temList,
          humData: humList
        })
        console.log(dateList)
       
        that.init_echarts()
      })
      .catch(err => {
        console.log('失败', err)
      })


    // console.log(that.data.date01, that.data.date02)
    // wx.request({
    //   url: 'http://weixin.frp.kaigejava.com/salary/getSalaryByDate',
    //   data: {
    //     start: that.data.date01,
    //     end: that.data.date02,
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     // 'Authorization': 'Bearer ' + wx.getStorageSync('token')
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     var data = res.data.data
    //     that.setData({
    //       series: data.series,
    //       ascissaData: data.ascissaData //默认横坐标
    //     })
    //     that.init_echarts()
    //   }
    // })
  },

  onLoad: function () {
    //选中canvans
    this.echartsComponnet = this.selectComponent('#mychart');
    // this.init_echarts()
    console.log("为什么不打印")
    //调用云函数请求数据
    this.getChartData()
  },
  //处理时间的函数
  dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
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

  }
})