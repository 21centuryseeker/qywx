<template>
  <div style="height: 100%;overflow-y: scroll">
    <div>
    <mt-navbar v-model="userId" :fixed="isFixed"  @input="input" style="top: 0px;box-shadow: rgb(204, 204, 204) 0px 3px 5px;">
      <mt-tab-item id="1" >
        <img src="../../../assets/group/teacher-group.png" alt="" class="group_img">
        <div class="group_font">教师</div>
      </mt-tab-item>
      <mt-tab-item id="2" >
        <img src="../../../assets/group/student-group.png" alt="" class="group_img">
        <div class="group_font">学生</div>
      </mt-tab-item>
      <mt-tab-item id="4" >
        <img src="../../../assets/group/major-group.png" alt="" class="group_img">
        <div class="group_font">专业</div>
      </mt-tab-item>
      <mt-tab-item id="5" >
        <img src="../../../assets/group/class-group.png" alt="" class="group_img">
        <div class="group_font">课程</div>
      </mt-tab-item>
    </mt-navbar>
    </div>
    <sjxl-fx :userId="userId" v-if="showModel===1"></sjxl-fx>
    <qsyc-fx :userId="userId" v-if="showModel===4"></qsyc-fx>
  </div>
</template>
<script>
  import SjxlFx from './sjxlfx/sjxlfx'
  import QsycFx from './qsycfx/qsycfx'
export default {
  data () {
    return {
      userId: '1',
      isFixed: true,
      showModel:-999
    }
  },
  mounted (){
    let {currentRoute}  = this.$router;
    let {meta} = currentRoute;
    let {id} = meta;
    this.showModel  = id;
    console.log('aaa',this.showModel===4)
  },
  methods: {
    input () {

    }
  },
  components: {
    SjxlFx,
    QsycFx
  },
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
