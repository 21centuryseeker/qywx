import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footerTab: '/index',
    footerTabShow: true,
    headerTab: '/zggzt',
    headerTabShow: true
  },
  mutations: {
    [types.FOOTER_TAB]: (state, data) => {
      state.footerTab = data.path
      state.footerTabShow = data.show
      // console.log(state.headerTabShow)
    },
    [types.HEADER_TAB]: (state, data) => {
      state.headerTab = data.path
      state.headerTabShow = data.show
    }
  }
})
