// pages/add/add,.js
import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
    //折线图标题
    title: {
      text: '折线图的标题',
      left: 'center'
    },
    // 折线图线条的颜色
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    // 折线图的线条代表意义
    legend: {
      itemWidth: 5, //小圆点的宽度
      itemGap: 25,
      selectedModel: 'single', //折线可多选
      inactiveColor: '#87CEEB',
      data: [{
          name: '浏览小程序',
          icon: 'circle',
          textStyle: {
            color: '#000000',
          }
        },
        {
          name: '加入购物车',
          icon: 'circle',
          textStyle: {
            color: '#000000'
          }
        },
        {
          name: '支付订单',
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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
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
    series: [{
      name: '浏览小程序',
      type: 'line',
      // 设置折线是否平滑
      smooth: false,
      data: [18, 36, 65, 30, 78, 40, 150]
    }, {
      name: '加入购物车',
      type: 'line',
      smooth: false,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: '支付订单',
      type: 'line',
      smooth: false,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
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

  }
})