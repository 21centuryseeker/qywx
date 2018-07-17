<template>
  <div style="height: 100%;" class="cell_no_bac">
    <!-- 教师 -->
    <teacher v-if="$route.params.type - 0 === 1"></teacher>
    <!-- 学生 -->
<student v-if="$route.params.type - 0 === 2"></student>
    <!-- 专业 -->
<major v-if="$route.params.type - 0 === 4"></major>
    <!-- 课程 -->
<classCom v-if="$route.params.type - 0 === 5"></classCom>
  </div>
</template>
<script>
import teacher from './addTeacher.vue'
import student from './addStudent.vue'
import major from './addMajor.vue'
import classCom from './addClass.vue'
export default {
  data () {
    return {
      type: '1'
    }
  },
  components: { teacher, student, major, classCom },
  mounted () {
    
  },
  methods: {
    
  }
}
</script>
<style>
.select {
  font-size: 0.24rem;
}
.table-step span {
  font-size: 0.2rem;
}
.fixed_bottom_box .step_box {
  font-size: 0.2rem;
}
body .cell_no_bac .mint-cell, body .cell_no_bac .mint-cell-wrapper {
  background-image: none;
}
.cell_no_bac  .content-fx  .header{
    position: static;
    top: 0;
    z-index: 1;
    width: 100%;
  }
  html body .fixed_bottom_box {
    height: 41px !important;
  }
    .fixed_bottom_box button{
    background-color: #70ad47;
    color: white;
  }
  .fixed_bottom_box label{
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
  }
</style>
