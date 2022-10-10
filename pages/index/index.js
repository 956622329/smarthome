import tcRequest from '../../service/index'
//获取应用实例
const app = getApp()

Page({
  data: {
    uid: 'e96efba491587c247b347ade3782e4c6', //用户密钥，
    topic_data: "temp", //主题名称，
    topic_led: "light002", //led主题名称，用于控制led

    device_status: "在线", //默认离线，自定义变量名称，随意命名
    temperature: "", //自定义变量，温度
    humidity: "", //自定义变量，湿度
    led_status: "",
    checked: false, //led开关状态
    ledicon: '/utils/img/lightoff.png',//当前展示的灯的图片路径 默认为关
  },
  //”打开“按钮处理函数函数
  // openclick: function () {

  //   //当点击打开按钮，更新开关状态为打开
  //   var that = this
  //   that.setData({
  //     powerstatus: "已打开"
  //   })
  //   this.setData({
  //     checked: true
  //   })
  //   //控制接口
  //   wx.request({
  //     url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
  //     method: "POST",
  //     data: { //请求字段，详见巴法云接入文档，http接口
  //       uid: that.data.uid,
  //       topic: that.data.topic_led,
  //       msg: "on" //发送消息为on的消息
  //     },
  //     header: {
  //       'content-type': "application/x-www-form-urlencoded"
  //     },
  //     success(res) {
  //       console.log(res.data)
  //       wx.showToast({
  //         title: '打开成功',
  //         icon: 'success',
  //         duration: 1000
  //       })
  //     }
  //   })
  // },
  // //”关闭“按钮处理函数函数
  // closeclick: function () {

  //   //当点击关闭按钮，更新开关状态为关闭
  //   var that = this
  //   that.setData({
  //     powerstatus: "已关闭"
  //   })
  //   this.setData({
  //     checked: false
  //   })
  //   //控制接口
  //   wx.request({
  //     url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
  //     method: "POST",
  //     data: {
  //       uid: that.data.uid,
  //       topic: that.data.topic_led,
  //       msg: "off"
  //     },
  //     header: {
  //       'content-type': "application/x-www-form-urlencoded"
  //     },
  //     success(res) {
  //       console.log(res.data)
  //       wx.showToast({
  //         title: '关闭成功',
  //         icon: 'success',
  //         duration: 1000
  //       })
  //     }
  //   })
  // },
  // onchange: function (e) {
  //   console.log(e.detail)
  //   this.setData({
  //     checked: e.detail
  //   })
  //   if (e.detail == true) { //如果是打开操作
  //     //控制接口
  //     var that = this
  //     wx.request({
  //       url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
  //       method: "POST",
  //       data: { //请求字段，详见巴法云接入文档，http接口
  //         uid: that.data.uid,
  //         topic: that.data.topic_led,
  //         msg: "on" //发送消息为on的消息
  //       },
  //       header: {
  //         'content-type': "application/x-www-form-urlencoded"
  //       },
  //       success(res) {
  //         console.log(res.data)
  //         that.setData({ 
  //           ledicon: "/utils/img/lighton.png",//设置led图片为on
  //          });
  //         wx.showToast({
  //           title: '打开成功',
  //           icon: 'success',
  //           duration: 1000
  //         })
  //       }
  //     })
  //   } else {
  //     var that = this
  //     //控制接口
  //     wx.request({
  //       url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
  //       method: "POST",
  //       data: {
  //         uid: that.data.uid,
  //         topic: that.data.topic_led,
  //         msg: "off"
  //       },
  //       header: {
  //         'content-type': "application/x-www-form-urlencoded"
  //       },
  //       success(res) {
  //         console.log(res.data)
  //         that.setData({ 
  //           ledicon: "/utils/img/lightoff.png",//设置led图片为off
  //          });
  //         wx.showToast({
  //           title: '关闭成功',
  //           icon: 'success',
  //           duration: 1000
  //         })
  //       }
  //     })
  //   }
  // },
  // onLoad: function () {
  //   var that = this

  //   //请求设备状态
  //   //设备断开不会立即显示离线，由于网络情况的复杂性，离线1分钟左右才判断真离线
  //   wx.request({
  //     url: 'https://api.bemfa.com/api/device/v1/status/',
  //     data: {
  //       uid: that.data.uid,
  //       topic: that.data.topic_led,
  //     },
  //     header: {
  //       'content-type': "application/x-www-form-urlencoded"
  //     },
  //     success(res) {
  //       // console.log(res.data)
  //       if (res.data.status === "online") {
  //         that.setData({
  //           device_status: "在线"
  //         })
  //       } else {
  //         that.setData({
  //           device_status: "离线"
  //         })
  //       }
  //       // console.log(that.data.device_status)
  //     }
  //   })

  //   //请求获取各种传感器值
  //   wx.request({
  //     url: 'https://api.bemfa.com/api/device/v1/data/1/',
  //     data: {
  //       uid: that.data.uid,
  //       topic: that.data.topic_data,
  //     },
  //     header: {
  //       'content-type': "application/x-www-form-urlencoded"
  //     },
  //     success(res) {
  //       console.log(res.data)
  //       if (res.data.msg.indexOf("#") != -1) { //如果数据里包含#号
  //         //如果有#号就进行字符串分割
  //         var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
  //         // console.log(all_data_arr) //打印数组
  //         that.setData({ //数据赋值给变量
  //           temperature: all_data_arr[1], //赋值温度
  //           humidity: all_data_arr[2], //赋值湿度
  //           topicled_status_led: all_data_arr[3], //赋值led状态
  //         })
  //       }

  //     }
  //   })


  //   //设置定时器，每五秒请求一下设备状态
  //   setInterval(function () {
  //     // console.log("定时请求设备状态,默认五秒");
  //     wx.request({
  //       url: 'https://api.bemfa.com/api/device/v1/status/', //get 设备状态接口，详见巴法云接入文档
  //       data: {
  //         uid: that.data.uid,
  //         topic: that.data.topic_led,
  //       },
  //       header: {
  //         'content-type': "application/x-www-form-urlencoded"
  //       },
  //       success(res) {
  //         // console.log(res.data)
  //         if (res.data.status === "online") {
  //           that.setData({
  //             device_status: "在线"
  //           })
  //         } else {
  //           that.setData({
  //             device_status: "离线"
  //           })
  //         }
  //         // console.log(that.data.device_status)
  //       }
  //     })
  //   }, 5000)

  //   //设置定时器，请求获取各种传感器值
  //   setInterval(function () {
  //     console.log("请求获取各种传感器值,默认2秒");
  //     ////请求获取各种传感器值
  //     // wx.request({
  //     //   url: 'https://api.bemfa.com/api/device/v1/data/1/', //get接口，详见巴法云接入文档
  //     //   data: {
  //     //     uid: that.data.uid,
  //     //     topic: that.data.topic_data,
  //     //   },
  //     //   header: {
  //     //     'content-type': "application/x-www-form-urlencoded"
  //     //   },
  //     //   success(res) {
  //     //     // console.log(res.data)
  //     //     if (res.data.msg.indexOf("#") != -1) {
  //     //       //如果有#号就进行字符串分割
  //     //       var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
  //     //       // console.log(all_data_arr) //打印数组
  //     //       that.setData({ //数据赋值给变量
  //     //         temperature: all_data_arr[1], //赋值温度
  //     //         humidity: all_data_arr[2], //赋值湿度
  //     //         led_status: all_data_arr[3], //赋值led状态
              
  //     //         light_status: all_data_arr[4], //赋值光感状态
  //     //         rain_status: all_data_arr[5], //赋值光感状态
  //     //       })
  //     //     }
  //     //   }
  //     // })
  //     tcRequest.get('https://api.bemfa.com/api/device/v1/data/1/',{
  //       uid: that.data.uid,
  //       topic: that.data.topic_data,
  //     }).then(res=>{
  //       // console.log(res.data)
  //       if (res.data.msg.indexOf("#") != -1) {
  //         //如果有#号就进行字符串分割
  //         var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
  //         console.log(all_data_arr) //打印数组
  //         that.setData({ //数据赋值给变量
  //           temperature: all_data_arr[1], //赋值温度
  //           humidity: all_data_arr[2], //赋值湿度
  //           led_status: all_data_arr[3], //赋值led状态
            
  //           light_status: all_data_arr[4], //赋值光感状态
  //           rain_status: all_data_arr[5], //赋值光感状态
  //         })
  //       }
  //     })
  //   }, 2000)


  // }
  
})