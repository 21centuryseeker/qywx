<template>
  <div style="height:100vh;overflow: scroll;">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomDistance="bottomDistance" :bottomPullText='bottomText'>
  <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>
  <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
    <div slot="bottom" class="mint-loadmore-bottom">
      <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'pull' }">↑</span>
      <span v-show="bottomStatus === 'loading'">Loading...</span>
    </div>
</mt-loadmore>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bottomText: '上拉加载更多...',
      bottomDistance: 70,
      topStatus: 'loading',
      bottomStatus: '',
      allLoaded: false,
      list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    }
  },
  watch: {
    '$route' (to, from) {
      return
      // 对路由变化作出响应...
      if (to.meta.myPath) {
        this.$store.commit('footer_tab', {
          path: to.meta.myPath,
          show: true
        })
      }
      if (to.meta.mychildPath) {
        this.$store.commit('header_tab', {
          path: to.meta.mychildPath,
          show: true
        })
      }
    }
  },
  methods: {
    loadTop () {
      // 加载更多数据
      setTimeout(() => {
      this.$refs.loadmore.onTopLoaded();        
      }, 1000)
    },
    loadBottom() {
      // 加载更多数据
      this.allLoaded = true;// 若数据已全部获取完毕
      setTimeout(() => {
        for (let i = 0;i < 10;i++) {
          this.list.push(this.list[this.list.length-1] + 1)
        }
        this.allLoaded = false
        this.$refs.loadmore.onBottomLoaded();
      }, 1000)
    }
  }
}
</script>
<style scoped>
  /* * {margin: 0;padding: 0;} */
  li {list-style-type: none;height: 0.5rem;border: 1px solid #e0e0e0;font-size: 0.24rem}
</style>
