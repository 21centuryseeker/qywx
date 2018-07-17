<template>
<!-- <div> -->
  <div class="common_footer" style="position: fixed;z-index: 9999;">
    <div class="layBg" v-if="protectState" @click="closeBg"></div>
      <div class="fixed_box"  v-if="protectState">
        <ul>
          <li @click="touchTo('jsc')">驾驶舱</li>
          <li @click="touchTo('sjhx')">数据画像</li>
          <li @click="touchTo('zzzd')">自主诊断</li>
        </ul>
      </div>
    <mt-tabbar v-model="$store.state.footerTab" fixed @input="input" v-tap="touchStartFunc">
      <mt-tab-item id="/index">
        <i slot="icon" class="iconfont">&#xe61e;</i>
        首页
      </mt-tab-item>
      <mt-tab-item id="/zgsjfx">
        <i slot="icon" class="iconfont">&#xe665;</i>
        诊改数据分析
      </mt-tab-item>
      <mt-tab-item id="/me">
        <i slot="icon" class="iconfont">&#xe658;</i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
<!-- </div> -->
</template>
<script>
export default {
  data () {
    return {
      protectState: false,
      foottab: ''
    }
  },
  mounted () {
    this.$store.commit('footer_tab', {
      path: this.$route.meta.myPath,
      show: true
    })
    if (this.$route.meta.mychildPath) {
      this.$store.commit('header_tab', {
        path: this.$route.meta.mychildPath,
        show: true
      })
    }

  },
  watch: {
    '$route' (to, from) {
      return
      // 对路由变化作出响应...
      if (to.meta.myPath) {
        if (to.meta.myPath !== '/zgsjfx') {
          this.$store.commit('footer_tab', {
            path: to.meta.myPath,
            show: true
          })
        }
      } else {
        this.$store.commit('footer_tab', {
          path: '/index',
          show: false
        })
      }
      if (to.meta.mychildPath) {
        this.$store.commit('header_tab', {
          path: to.meta.mychildPath,
          show: true
        })
      } else {
        this.$store.commit('header_tab', {
          path: 'zggzt',
          show: false
        })
      }
    }
  },
  methods: {
    touchStartFunc () {
      this.foottab = this.$store.state.footerTab
    },
    closeBg () {
      this.protectState = false
      // this.protectState = false
    },
    touchTo (path) {
      this.$router.push({
        path: '/zgsjfx/' + path
      })
      this.$store.commit('header_tab', {
        path: 'jsc',
        show: false
      })
      this.protectState = false
    },
    input (id) {
      if (id === '/index') {
        this.$router.push({
          path: '/index/zggzt'
        })
        this.$store.commit('footer_tab', {
          path: '/index',
      show: true
        })
        this.$store.commit('header_tab', {
          path: 'zggzt',
      show: true
        })
      } else if (id === '/zgsjfx') {
        // this.$router.push({
        //   path: '/zgsjfx/jsc'
        // })
        this.$store.commit('footer_tab', {
          path: this.foottab,
          show: true
        })
        this.protectState = true
      //   this.$store.commit('header_tab', {
      //     path: 'jsc',
      // show: false
      //   })
      } else {
        this.$router.push({
          path: id
        })
        this.$store.commit('footer_tab', {
          path: id,
      show: true
        })
      }
    }
  }
}
</script>
<style scoped>
.common_footer .mint-tab-item.is-selected i {
  color: #70ad47 !important;
}

.common_footer i {
  font-size: 0.4rem;
  color: #999;
}
.common_footer .mint-tab-item-label {
  font-size: 0.2rem;
  color: #999;
}
.fixed_box {
  background: #fff;
  box-shadow: 0px 0px 5px #888;
  position: fixed;bottom: 55px;left: 33.33%;right: 33.33%;
  z-index: 100000;
}
.fixed_box li {
  color: #999;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.25rem;
  text-align: center;
}
.layBg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  /* background: transparent; */
  background: rgba(0,0,0,.3)
}
</style>
