import axios from 'axios'

let server = "http://dev.hxmec.com/"; //后端转发服务器地址
// let server = "/"; //后端转发服务器地址

//let accesstoken = localStorage.getItem('accesstoken')
let accesstoken = sessionStorage.getItem('_token')
accesstoken = JSON.parse(accesstoken).accessToken
console.log("now token is: "+accesstoken)
let post = async function (url, body={}) {
  try {
    let reqData = {
      method: 'post',
      url: server + url,
      headers: {
        // 'Content-type': 'application/x-www-form-urlencoded',
        'Content-type': 'application/json',
        'accesstoken': accesstoken,
      },
      data:body,
      // params:body,
      // withCredentials :true,
      crossDomain:true,
      timeout:60*1000
    }
    let res = await axios(reqData);
    return res.data;
  } catch (error) {
    if(error.toString().indexOf('timeout')>0){
      return {success:false, code: -2, message: '请求超时！'};
    }else{
      return {success:false, code: -1, message: '请求出错！'};
    }
  }
}

let oldToken = 'w196386161568870400@eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxQDFAMEAxOTYzODYxNjE1Njg4NzA0MDAifQ.i1uEHQRBNnVil0HfCis18NDT_hFOqbiU5sYUDspFOLDYuMyb2wCa1OeiRmWSuPdhpYXHoyB6tr0O3OLDykq8jg'
let postWithOldToken = async function (url, body={}) {
  try {
    let reqData = {
      method: 'post',
      url: server + url,
      headers: {
        // 'Content-type': 'application/x-www-form-urlencoded',
        'Content-type': 'application/json',
        'accesstoken': accesstoken,
      },
      data:body,
      // params:body,
      // withCredentials :true,
      crossDomain:true,
      timeout:60*1000
    }
    let res = await axios(reqData);
    return res.data;
  } catch (error) {
    if(error.toString().indexOf('timeout')>0){
      return {success:false, code: -2, message: '请求超时！'};
    }else{
      return {success:false, code: -1, message: '请求出错！'};
    }
  }
}

let upload = async function (file) {
  try {
    var formdata = new FormData()
    formdata.append('file', file, file.name)
    let config = {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    let url = server + 'portal/pub/comm/uploadfile'
    let res = await axios.post(url, formdata, config)
    return res.data
  } catch (error) {
    if(error.toString().indexOf('timeout')>0){
      return {success:false, code: -2, message: '请求超时！'};
    }else{
      return {success:false, code: -1, message: '请求出错！'};
    }
  }
}

export default {
  post,
  upload,
  postWithOldToken
};
