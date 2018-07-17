<template>
  <div style="height: 100%;">
    <mt-navbar v-model="type"  @input="input" style="margin-bottom: 0.2rem; top: 0;box-shadow: 0 3px 5px #ccc; position: absolute; width: 100%;z-index: 9999;" >
      <mt-tab-item id="school" >
        <img src="../../../assets/group/school-group.png" alt="" class="group_img">
        <div class="group_font">学校</div>
      </mt-tab-item>
      <mt-tab-item id="major" >
        <img src="../../../assets/group/major-group.png" alt="" class="group_img">
        <div class="group_font">专业</div>
      </mt-tab-item>
      <mt-tab-item id="class" >
        <img src="../../../assets/group/class-group.png" alt="" class="group_img">
        <div class="group_font">课程</div>
      </mt-tab-item>
      <mt-tab-item id="teacher" >
        <img src="../../../assets/group/teacher-group.png" alt="" class="group_img">
        <div class="group_font">教师</div>
      </mt-tab-item>
      <mt-tab-item id="student" >
        <img src="../../../assets/group/student-group.png" alt="" class="group_img">
        <div class="group_font">学生</div>
      </mt-tab-item>
    </mt-navbar>
      <div style="padding-top: 1.4rem;height: 100%;box-sizing: border-box;overflow-y: scroll;" class="scrollTop">
        <router-view ></router-view>        
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: 'school'
    }
  },
  mounted () {
    // console.log(this.$route.path.split('/'))
    let arr = this.$route.path.split('/')
    if (arr.length === 4) {
      this.type = arr[3]
    } else {
      this.type = 'school'
    }
  },
  methods: {
    input () {
      this.type === 'school' ? this.$router.push({
        path: '/zgsjfx/sjhx'
      }) : this.$router.push({
        path: '/zgsjfx/sjhx/' + this.type
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
.sjhx_tab {
  width: 100%;
  overflow-x: scroll;
  background: #fff;
  margin-bottom: 0.2rem; 
  top: 1.17rem;
  box-shadow: 0 3px 5px #ccc; 
  position: absolute; 
  width: 100%;
  z-index: 9999;
}
.sjhx_tab td {
  white-space: nowrap;
  padding: 0 20px;
  height: 0.8rem;
  color: #999;
  font-size: 0.26rem;
}
.sjhx_tab td.active {
  color: #70ad47;
}
</style>
