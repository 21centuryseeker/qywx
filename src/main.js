// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '../static/js/vue-touch.js'
import '../static/js/henan'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
Vue.use(MintUI);
import scroll from 'vue-seamless-scroll'
Vue.use(scroll);
import '../static/fonts/iconfont.css'
import store from './store/store'
import './server/ajax'
import router from './router'
import App from './App'
import 'babel-polyfill'
import echarts from 'echarts'
import {ChartUt, chartUtil} from './util/ChartUtil'
Vue.config.productionTip = false;
Vue.prototype.doCookie = {
  setCookie (name, value, iDay) {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate
  },
  getCookie (name) {
    var arr = document.cookie.split('; '); // 多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');
      if (arr2[0] === name) {
        return arr2[1]
      }
    }
    return ''
  },
  removeCookie (name) {
    this.setCookie(name, 1, -1)
  }
};
Vue.prototype.mydateFormat = {
  dateCodeYm (str) {
    var date = new Date(str);
    return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
  },
  dateCodeYmd (str) {
    var date = new Date(str);
    return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate()
  },
  dateCodeYmdHms (str) {
    var date = new Date(str);
    return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate() + ' ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
  }
};
Vue.prototype.isArray = function (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
};
Vue.prototype.$echarts = echarts;
Vue.prototype.$ChartUtil = chartUtil;
Vue.prototype.$ChartUt = ChartUt;
Vue.prototype.$myRem = 100 * (document.documentElement.clientWidth / 720)
Vue.prototype.$mytimer = ''
/* eslint-disable no-new */
window._VUE_STORE_ = store;

// import { Step, StepItem } from 'vux'
//
// Vue.component('step', Step)
// Vue.component('step-item', StepItem)


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
