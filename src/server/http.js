import axios from 'axios'
// import qs from 'qs'
import { Toast } from 'antd-mobile';

axios.interceptors.response.use(response => {
  if(response.data.code==10000){ // 登录失效逻辑
    
  }else if(response.data.code !==0){
    Toast.fail(response.data.msg);
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 401:// 登录失效逻辑
        
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败';
  }
  if(err.message) Toast.fail(err.message);
    return Promise.resolve(err.response)
})
export default async (url = '', data = {}, method = 'get', config = {headers:{}},isLoading=false) => {
  store.commit('changeLoading',isLoading)
  method = method.toLowerCase()
//   if(getCookie('_dstoken')) {
//     config.headers['Authorization'] = getCookie('_dstoken');
//   }
  let params;
  if(config.headers['Content-Type']=='multipart/form-data'){
    params = new FormData(); //创建form对象
    for(let item of Object.keys(data)){
      if(Array.isArray(data[item])&&data[item][0].file.constructor===File){
        for(let ite of data[item]){
          let file = ite.file;
          params.append(item,file);//通过append向form对象添加数据
        }
      }else{
        params.append(item,data[item])
      }
    }
  }else{
    params=data
  }
  
  const ajaxConfig = Object.assign({
    url,
    method
  }, config)
  if (['post', 'put', 'patch'].includes(ajaxConfig.method)) {
    ajaxConfig.data = params
  } else {
    ajaxConfig.params = data
  }
  
  let result = (await axios(ajaxConfig)).data
  
  store.commit('changeLoading',false)
  return result
}