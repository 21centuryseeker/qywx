<template>
  <div style="height: 100%;">
    <mt-navbar v-model="type"  @input="input" style="margin-bottom: 0.2rem; top: 0px;box-shadow: 0 3px 5px #ccc; position: absolute; width: 100%;z-index: 999">
      <mt-tab-item id="1" >
        <img src="../../../../assets/group/teacher-group.png" alt="" class="group_img">
        <div class="group_font">教师</div>
      </mt-tab-item>
      <mt-tab-item id="2" >
        <img src="../../../../assets/group/student-group.png" alt="" class="group_img">
        <div class="group_font">学生</div>
      </mt-tab-item>
      <mt-tab-item id="4" >
        <img src="../../../../assets/group/major-group.png" alt="" class="group_img">
        <div class="group_font">专业</div>
      </mt-tab-item>
      <mt-tab-item id="5" >
        <img src="../../../../assets/group/class-group.png" alt="" class="group_img">
        <div class="group_font">课程</div>
      </mt-tab-item>
    </mt-navbar>
    <!-- 教师 -->
    <Item></Item>
  </div>
</template>
<script>
import Item from './xgxfx.vue'
export default {
  data () {
    return {
      type: '1'
    }
  },
  components: { Item },
  mounted () {
    this.type = this.$route.params.type.toString()
  },
  watch:{
  
  },
  methods: {
    input (id) {
      this.type=id
      console.log('this.type',this.type)
      this.$router.push({
        path: '/zgsjfx/zzzd/xgxfx/'+id
      })

    }
  }
}
</script>
<style scoped>
.group_img {
  width: 0.4rem;
  height: 0.4rem;
}
.group_font {
  font-size: 0.24rem;
  color: #666;
  margin-top: 0.1rem;  
}
body .mint-navbar .mint-tab-item.is-selected  {
  border-bottom: 0;
}
.mint-tab-item.is-selected .group_font {
  color: #70ad47;
  border-bottom: 0;
}
</style>
