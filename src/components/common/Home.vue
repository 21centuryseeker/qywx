<template>
  <div class="app_home">
    <HeaderTab v-if="$store.state.headerTabShow"></HeaderTab>
      <div class="app_container" :class="{'padding_top_show': !$store.state.headerTabShow, 'padding_bottom_show': !$store.state.footerTabShow}" >
        <router-view></router-view>
      </div>
    <FooterTab v-if="$store.state.footerTabShow"></FooterTab>
  </div>
</template>
<script>
import HeaderTab from '../common/HeaderTab.vue'
import FooterTab from '../common/Footer.vue'
export default {
  data () {
    return {
      index: 1
    }
  },
  components: { HeaderTab, FooterTab }
}
</script>
<style>
.page-tabbar-container {
  height: 100vh;
}
.app_container {
  padding: 0.95rem 0 55px 0;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: scroll;
}
.app_home .app_container.padding_top_show {
  padding-top: 0;
}
.app_home .app_container.padding_bottom_show {
  padding-bottom: 0;
}
</style>
