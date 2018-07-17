<template>
  <div class="warpPad" style="height: 100vh;overflow-y: scroll;background-color:#fff;">
      <div class="w_content">
        <p>向 <span style="color:#70ad47">{{askWho}}</span> 提问</p>
        <div class="textareaBox" style="padding-bottom:10px">
           <textarea name="" id="" cols="30" rows="10"  v-model="quesion"></textarea> 
        </div>
        <div class="buttonGroup clearfix">
           <mt-button plain  class="btn"   @click="$router.push({path: '/index/zgzjpt'})">取 消</mt-button>
          <mt-button   class="floatR" @click="upQuestion">确 定</mt-button>
        </div>
      </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      activeName: 'abc0',
      abd: '',
      askWho: '',
      huidaWho: '',
      isManager: false,
      managerDepartmentList: [],
      deptId: 0,
      alAnswerList: [],
      unAnswerList: [],
      currentQuestionId: -1,
      managerList: [],
      edid: 0,
      myId: 0,
      showPart:2,
      quesion:''
    }
  },
  mounted: function () {
    this.askWho = window.unescape(this.$route.query.name)
    this.getUserDeptment()
    return
  },
    methods: {
    upQuestion: function () {
      if(this.quesion!=''){
        this.unQuestionInfo(this.$route.query.edit, this.$route.query.myId).then((flag) => {
        })
      }else{
        Toast({
          message: '提问内容不能为空',
        });
      }
     
    },
    unQuestionInfo: function (edid, id) {
      let promise = new Promise((resolve, reject) => {
        this.showPart=2
        // if (this.abd !== '') {
          let requestParam = {
            content: this.quesion,
            dept_id: this.deptId,
            expert_id: id,
            expert_dept_id: edid
          }
          this.$ajaxMore('post', this.HOST + '/tr/TrQuestion/web/addQuestion', requestParam, (data) => {
            let flag = data.success
            if (flag === true) {
              this.quesion = ''
              Toast({
                message: '操作成功',
                iconClass: 'mintui mintui-success'
              });
              
            }
            this.$router.push({
              path: '/index/zgzjpt'
            })
          })
        // }
      })

      return promise
    },
    getUserDeptment: function () {
      let promise = new Promise((resolve, reject) => {
        this.$ajax('get', this.HOST + '/tr/TrQuestion/web/getUserDeptList ', {}, (data) => {
          let flag = data.success
          if (flag === true) {
            this.managerDepartmentList = data.obj
            if (this.managerDepartmentList.length > 0) {
              this.deptId = this.managerDepartmentList[0].dept_id
              // 拿到问题列表
              // resolve(this.deptId) // 执行成功回调;
            }
          }
        })
      })

      return promise
    },


  }
  
}
</script>
<style scoped>
* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

*:after,
*:before {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.clearfix {
	*zoom: 1;
}

.clearfix:after {
	display: block;
	clear: both;
	content: " ";
	height: 0;
	visibility: hidden;
}
.ellipsis{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.warpPad{
  padding: 10px
}
.zjList li{
  margin-right: 2%;
  margin-bottom: 5px;
  float: left;
  width: 49%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e4e4e4
}
.zjList li:nth-child(2n){
margin-right: 0
}
.zjList .leftImg{
float: left;
width: 30%;
padding-top: 0.1rem
}
.zjList .leftImg img{
  width: 100%
}
.zjList .rightContent{
  float: left;
  width: 70%;
  padding-left: 0.2rem
}
.zjList .rightContent h5{
  font-size: 0.24rem;
  line-height: 1.6;
  color: #444;
  font-weight: normal;
}
.zjList .rightContent .dtpName{
  font-size: 0.2rem;
  line-height: 1.4;
  color: #888;
  margin-bottom: 2px
}
.zjList .rightContent a{
  display: inline-block;
  font-size: 0.2rem;
  padding: 3px 5px;
  color: #fff;
  text-align: center;
  background-color: #ed7d31
}
.historyList li{
  padding-top: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e9e9e9
}
.historyList li .h_item{
 position: relative;
 margin-bottom: 8px
}
.historyList li .content{
  padding-left: 25px;
}
.historyList .titleIcon{
    position: absolute;
    top: 3px;
    left: 0;
    display: inline-block;
    background-color: #ffc000;
    height: 20px;
    width: 20px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    font-size: 0.24rem;
}
.historyList .green_icon{
    background-color: #70ad47;
}
.historyList .greenText{
color: #70ad47 
}
.historyList li .title_deil{
  font-size: 0.22rem;
  color: #999;
  line-height: 1.6;
  margin-bottom: 0.05rem
}
.historyList li .answor{
  font-size: 0.26rem;
  color: #555
}
.w_content{
  width: 80%;
  margin: 0.4rem auto
}
.w_content p{
  font-size: 0.26rem;
  padding-bottom:0.2rem
}
.w_content p span{
  font-size: 0.24rem;
}
.textareaBox textarea {
  width: 100%;
  height: 3.64rem;
  resize: none;
  border-radius: 0.04rem;
  border: 1px solid #dedede;
  box-sizing: border-box;
}
.buttonGroup button{
  float: left;
  width: 48%
}
.buttonGroup  .floatR{
  float: right
}
.w_content button{
    height: auto;
    border-color: #70ad47;
    background-color: #70ad47;
    color: white;
     font-size: 0.28rem;
     height: 0.68rem;
    /* padding: 0.1rem 0.5rem;
    line-height: 2; */
}
.w_content button.btn{
    border-color:#70ad47 ;
    background-color: #fff;
    color: #70ad47;
}
</style>
