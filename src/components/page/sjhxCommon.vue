<template>
  <div>
    <mt-navbar v-model="type"  @input="input" style="margin-bottom: 0.2rem;">
      <mt-tab-item id="school" >
        <img src="../../assets/group/school-group.png" alt="" class="group_img">
        <div class="group_font">学校</div>
      </mt-tab-item>
      <mt-tab-item id="major" >
        <img src="../../assets/group/major-group.png" alt="" class="group_img">
        <div class="group_font">专业</div>
      </mt-tab-item>
      <mt-tab-item id="class" >
        <img src="../../assets/group/class-group.png" alt="" class="group_img">
        <div class="group_font">课程</div>
      </mt-tab-item>
      <mt-tab-item id="teacher" >
        <img src="../../assets/group/teacher-group.png" alt="" class="group_img">
        <div class="group_font">教师</div>
      </mt-tab-item>
      <mt-tab-item id="student" >
        <img src="../../assets/group/student-group.png" alt="" class="group_img">
        <div class="group_font">学生</div>
      </mt-tab-item>
    </mt-navbar>
    <router-view ></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: 'school'
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
