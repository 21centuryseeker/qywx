<template>
  <div class="progressBox cell_no_bac">
     <ul>
      <li>
        <label class="lableCont">
          <div class="radioBox">
            <mt-radio v-model="value" 
            :options="options" ></mt-radio> 
          </div>  
          <span class="radio_i" style="background: #70ad47"></span>
        </label> 
      </li>
        <li>
        <label class="lableCont">
          <div class="radioBox">
            <mt-radio v-model="value" 
            :options="options1" ></mt-radio> 
          </div>  
           <span class="radio_i" style="background: #fec000"></span>
        </label> 
      </li>
        <li>
        <label class="lableCont">
          <div class="radioBox">
            <mt-radio v-model="value" 
            :options="options2" ></mt-radio> 
          </div>  
           <span class="radio_i" style="background: #e96c72"></span>
        </label> 
      </li>
        <li>
        <label class="lableCont">
          <div class="radioBox">
            <mt-radio v-model="value" 
            :options="options3" ></mt-radio> 
          </div>  
           <span class="radio_i" style="background: #333333"></span>
        </label> 
      </li>
    </ul>
    <div class="btnGroup">
       <mt-button size="small" type="primary"  class="btn"  @click="sureBtn">确定</mt-button>
    </div>
     
  </div>
 


</template>
<script>

export default {
  data () {
    return {
      value:'',
      options: [{
        label: '正常',
        value: '1',
      }],
      options1: [{
        label: '有问题或时间到但未填报',
        value: '2',
        }],
      options2: [{
         label: '停滞',
        value: '3',
        }],
      options3: [{
        label: '已结项',
        value: '4',
      }],
    }
  },
   mounted () {
     this.value=this.$route.params.monthStatus
  },
  methods: {
    sureBtn(){
      let data = {
        reformId: this.$route.params.id,
        reformType: 2,
        progress: this.value
      }
      this.$ajaxMore('post', this.HOST + '/tr/trPlan/web/editProgress', data, (res) => {
        if (res.success) { 
          // this.$router.push({path: '/index/zggzt/'})
          this.$router.go(-1)
        } else {
          
        }
      })
    }
  }
 
}
</script>
<style scoped>
.progressBox{
background-color: #fff;
height: 98%;
}
.lableCont{
  position: relative;
  display: block;
}
.radio_i {
    position: absolute;
    left: 50px;
    top: 17px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    /* background: #70ad47 */
}
.link_group .green_link{
  color: #70ad47;
  background-color: #eaf5e3;
  border: 1px solid #afdf8f;
}
.btnGroup{
  text-align: center
}
.btnGroup .btn{
  display: inline-block;
  width: 80%;
  background: #70ad47;
}
</style>
