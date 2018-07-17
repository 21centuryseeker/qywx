<template>
  <div class="common_header">
    <mt-navbar v-model="$store.state.headerTab"  @input="input" fixed>
    <template v-for="item in tabObj['/index']">
      <mt-tab-item :id="item.path" :key="item.path">{{item.name}}</mt-tab-item>
    </template>
  </mt-navbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: 0,
      tabObj: {
        '/index': [{path: 'zggzt', name: '诊改工作台'}, {path: 'zggzyl', name: '诊改工作一览'}, {path: 'zgzjpt', name: '诊改专家平台'}],
        '/zgsjfx': [{path: 'jsc', name: '驾驶舱'}, {path: 'sjhx', name: '数据画像'}, {path: 'zzzd', name: '自主诊断'}]
      }
    }
  },
  beforeCreate () {

  },
  created () {
  },
  mounted () {
    setTimeout(() => {
      this.$store.commit('header_tab', {
      path: this.$route.meta.mychildPath,
      show: true
    })
    },10)

  },
  methods: {
    input (id) {
      // console.log(id)
      this.$router.push({
        path: this.$router.currentRoute.meta.myPath + '/' + id
      })
    }
  }
}
</script>
<style>
.common_header .mint-navbar .mint-tab-item.is-selected {
  color: #70ad47 !important;
}
.common_header .mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #70ad47;
}
.common_header .mint-tab-item-label {
  height: 0.54rem;
  line-height: 0.54rem;
  font-size: 0.26rem;
}
.mint-navbar.is-fixed {
  border-bottom: 3px solid #eee;
}
</style>
