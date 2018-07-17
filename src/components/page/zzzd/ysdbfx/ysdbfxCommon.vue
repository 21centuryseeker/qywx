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
    <teacher></teacher>
    <!-- 学生 -->
    <!-- <student v-if="type - 0 === 2"></student> -->
    <!-- 专业 & 课程 & 学生-->
    <!-- <major v-if="type - 0 === 4 || type - 0 === 5 || type - 0 === 2"></major> -->
    <!-- 课程 -->
    <!-- <classCom v-if="type - 0 === 5"></classCom> -->
  </div>
</template>
<script>
import teacher from './ysdbfx.vue'
// import student from './ysdbfxStudent.vue'
// import major from './ysdbfxMajor.vue'
// import classCom from './ysdbfxClass.vue'
export default {
  data () {
    return {
      type: '1'
    }
  },
  components: { teacher },
  mounted () {
    this.type = this.$route.params.type.toString()
  },
  methods: {
    input (id) {
      this.$router.push({
        path: '/zgsjfx/zzzd/ysdbfx/' + id
      })
    }
  }
}
</script>
<style>
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
.common_title_div {
  word-break: break-all;
}
</style>
