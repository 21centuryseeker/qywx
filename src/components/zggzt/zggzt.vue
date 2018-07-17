<template>
  <div>
    <FooterTab :headerTabShow="true" :footerTabShow="true"></FooterTab>
  </div>
</template>
<script>
import FooterTab from '../common/Footer.vue'
export default {
  data () {
    return {
      index: 1
    }
  },
  components: { FooterTab }
}
</script>