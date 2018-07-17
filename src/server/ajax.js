import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import * as types from '../store/types'
Vue.prototype.$http = axios
Vue.prototype.HOST = ''
Vue.prototype.qs = qs
const ajax = function (method, url, data, func) {
  axios({
    method: method,
    url: url,
    data: qs.stringify(data)
  }).then(function (res) {
    // if (!res.data || res.data.success === false) {
    //   self.$message({
    //     type: 'error',
    //     message: res.data.msg
    //   })
    //   location.href = location.origin +  location.pathname + '#/login'
    //   return
    // }
    if (func) {
      func(res.data)
    }
  })
}
const ajaxMore = function (method, url, data, func) {
  axios({
    method: method,
    url: url,
    headers: {'Content-type': 'application/json;charset=utf-8'},
    data: data
  }).then(function (res) {
    // if (!res.data || res.data.success === false) {
    //   self.$message({
    //     type: 'error',
    //     message: res.data.msg
    //   })
    //   location.href = location.origin +  location.pathname + '#/login'
    //   return
    // }
    if (func) {
      func(res.data)
    }
  })
}
const ajaxGet = function (url, params, success) {
  axios.get(url, {
    params: params
  }).then((res) => {
    if (success) {
      success(res.data)
    }
  }).catch((error) => {
    console.log(error)
  })
}
// 正常情况下调用的ajax
Vue.prototype.$ajax = ajax
// 当使用this.$ajax报错时(415错误)，使用下方的方法this.$ajaxMore
Vue.prototype.$ajaxMore = ajaxMore
// ajax的get的方法
Vue.prototype.$ajaxGet = ajaxGet
