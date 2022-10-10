const BASE_URL = "http://123.207.32.32:9001"
class TcRequest {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url:  url,
        method: method,
        data: params,
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  get(url, params){
    return this.request(url,"GET",params)
  }
  post(url, params){
    return this.request(url,"POST",params)
  }
}

const tcRequest = new TcRequest()

export default tcRequest