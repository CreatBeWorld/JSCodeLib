/* page中间件,在page下的onLoad生命周期中判断token是否存在，以及token存在时,token是否有效 */
export function pageIntercept(pageObj) {
  if (pageObj.onLoad) {
      let _onLoad = pageObj.onLoad;
      // 使用onLoad的话需要传递options
      pageObj.onLoad = async function (options) {
          //如果storage中有token，校验token是否有效
          const loginInfo = wx.getStorageSync('loginInfo')
          if (loginInfo&&loginInfo.access_token) {
              const res = await checkToken()
              if(res){
                wx.removeStorageSync('lastPage')
                let currentInstance = getPageInstance(); // 获取当前页面
                _onLoad.call(currentInstance, options);
              }else{
                notLogin()
              }
          } else {
            notLogin()
          }
      }
  }
  return pageObj;
}
//设置登录前的页面
function setLastPage() {
  let path = '/' + getPageInstance().route
  const options = getPageInstance().options
  let params = ''
  for (let prop in options) {
      params += `${prop}=${options[prop]}&`
  }
  params = params.substring(0, params.length - 1)
  if (params) {
      path = `${path}?${params}`
  }
  wx.setStorageSync('lastPage', path)
}
// 获取当前页面    
function getPageInstance() {
  let pages = getCurrentPages();
  return pages[pages.length - 1];
}
// 校验token是否有效 模拟token校验
export function checkToken(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(Math.random()<0.5){
        console.log('token过期')
        resolve(false)
      }else{
        resolve(true)
      }
    },200)
  })
}
// 未登录或登录已过期时的处理
function notLogin(){
  setLastPage()
  //跳转到登录页
  wx.showModal({
      title: '提示',
      content: '您还没有登录',
      showCancel: false,
      confirmText: '去登录',
      success(res) {
          if (res.confirm) {
              wx.redirectTo({
                  url: "/pages/login/index"
              });
          }
      }
  })
}
