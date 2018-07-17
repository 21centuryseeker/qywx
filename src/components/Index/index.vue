<template>
  <div>
    <HeaderTab v-if="$store.state.headerTabShow"></HeaderTab>
    <!-- <mt-tab-container class="page-tabbar-container" v-model="$store.state.footerTab">
        <mt-tab-container-item id="/index">
          <mt-cell v-for="n in 10" :title="'餐厅 ' + n"  :key="n"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="/zgsjfx">
          <mt-cell v-for="n in 5" :title="'订单 ' + n"   :key="n"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="/me">
          <div class="page-part">
            <mt-cell v-for="n in 12" :title="'我的 ' + n"   :key="n"/>
          </div>
          <router-link to="/">
            <mt-button type="danger" size="large">退出</mt-button>
          </router-link>
        </mt-tab-container-item>
      </mt-tab-container> -->
      <div style="padding: 100px 0;">
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
</style>
