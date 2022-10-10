//app.js
App({
  onLaunch: function () {
console.log("小程序启动啦");
wx.cloud.init({
  env:'smarthome-8gmc8w9r584421e6'
})

  },
})