<template>
  <div class="warpPad" style="height: 100%;overflow-y: scroll;background-color:#fff">
    <div v-if="showPart==2">
      <!-- 不是专家 -->
      <div  v-if="!isManager">
        <div class="zjList">
          <ul class="clearfix">
            <template v-for="(item,index) in managerList">
              <li :key="index">
                <div class="leftImg"><img src="../../assets/images/zhuanjia.png"></div>
                <div class="rightContent">
                  <h5 class="ellipsis">{{item.expert_name}}</h5>
                  <p class="dtpName ellipsis">{{item.expert_dept_name}}</p>
                  <p><a href="javascript:void(0)" @click="goAsk(item.expert_dept_id,item.id,item)">向他提问</a></p>
                </div>
              </li>
            </template> 
          </ul>
        </div>
        <div class="historyList">
          <ul>
              <template  v-for="(item,index) of unAnswerList">
                  <li :key="index">
                    <div class="h_item">
                      <span class="titleIcon">问</span>
                      <div class="content">
                        <p class="title_deil">
                          <span class="name" v-html="isManager?val.user_name:'我'"></span>
                          <span class="time"> {{item.question_time}}</span>
                        </p>
                        <div class="answor">{{item.question}}</div>
                      </div>
                    </div>
                  </li>
              </template>  
            </ul>
            <ul>
              <template  v-for="(val,index) of alAnswerList">
                  <li :key="index">
                    <div class="h_item">
                      <span class="titleIcon">问</span>
                      <div class="content">
                        <p class="title_deil">
                          <span class="name" v-html="isManager?val.user_name:'我'"></span>
                          <span class="time"> {{val.question_time}}</span>
                        </p>
                        <div class="answor">{{val.question}}</div>
                      </div>
                    </div>
                    <div class="h_item">
                      <span class="titleIcon green_icon">答</span>
                      <div class="content">
                        <p class="title_deil">
                          <span class="name greenText">{{val.expert_name}}</span>
                          <span class="time">{{val.answer_time}}</span>
                        </p>
                        <div class="answor">{{val.answer}}</div>
                      </div>
                    </div>
                  </li>
              </template>  
            </ul>
        </div>
      </div>
      <!-- 是专家 -->
      <div  v-else>
        <div class="historyList">
          <ul>
              <template  v-for="(item,index) of unAnswerList">
                  <li :key="index">
                    <div class="h_item">
                      <span class="titleIcon">问</span>
                      <div class="content">
                        <p class="title_deil">
                          <span class="name">{{item.user_name}}</span>
                          <span class="time"> {{item.question_time}}</span>
                        </p>
                        <div class="answor">{{item.question}}</div>
                        <p><a href="javascript:void(0)"  @click="ask(item.id,item)">回答</a></p>
                      </div>
                    </div>
                  </li>
              </template>  
            </ul>
            <ul>
              <template  v-for="(val,index) of alAnswerList">
                  <li :key="index">
                    <div class="h_item">
                      <span class="titleIcon">问</span>
                      <div class="content">
                        <p class="title_deil">
                          <span class="name" v-html="isManager?val.user_name:'我'"></span>
                          <span class="time"> {{val.question_time}}</span>
                        </p>
                        <div class="answor">{{val.question}}</div>
                      </div>
                    </div>
                    <div class="h_item">
                      <span class="titleIcon green_icon">答</span>
                      <div class="content">
                        <p class="title_deil">
                          <span class="name greenText">{{val.expert_name}}</span>
                          <span class="time">{{val.answer_time}}</span>
                        </p>
                        <div class="answor">{{val.answer}}</div>
                      </div>
                    </div>
                  </li>
              </template>  
            </ul>
        </div>
      </div>
    </div>
    <div v-else-if="showPart==3">
      <div class="w_content">
        <p>向 <span style="color:#70ad47">{{askWho}}</span> 提问</p>
        <div class="textareaBox" style="padding-bottom:10px">
           <textarea name="" id="" cols="30" rows="10"  v-model="quesion"></textarea> 
        </div>
        <div class="buttonGroup clearfix">
           <mt-button plain  class="btn"   @click="remove">取 消</mt-button>
          <mt-button   class="floatR" @click="upQuestion">确 定</mt-button>
        </div>
      </div>
    </div>
    <div v-else-if="showPart==4">
      <div class="w_content">
        <p>回答 <span style="color:#70ad47">{{huidaWho}}</span> 提问</p>
        <div class="textareaBox" style="padding-bottom:10px">
           <textarea name="" id="" cols="30" rows="10"  v-model="quesion"></textarea> 
        </div>
        <div class="buttonGroup clearfix">
           <mt-button plain   class="btn"  @click="remove">取 消</mt-button>
          <mt-button  class="floatR" @click="upAsk">确 定</mt-button>
        </div>
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
    
    this.getUserInfo().then((flag) => {
      if (flag) { //  如果是专家则加载专家的部门
        this.getDeptment().then((did) => {
          this.getQuestionListByDeptId(did)
        })
      } else {
        this.getUserDeptment().then((did) => {
          this.getExpertList(did)
          this.getUserQuestionListByDeptId(did)
        })
      }
    })
  },
    methods: {
     getDeptment: function () {
      let promise = new Promise((resolve, reject) => {
        this.$ajax('get', this.HOST + '/tr/TrQuestion/web/ getExpertDeptList', {}, (data) => {
          let flag = data.success
          if (flag === true) {
            this.managerDepartmentList = data.obj
            if (this.managerDepartmentList.length > 0) {
              this.deptId = this.managerDepartmentList[0].dept_id
              // 拿到问题列表
              resolve(this.deptId) // 执行成功回调;
            }
          }
        })
      })

      return promise
    },
    getExpertList: function (did) {
      let promise = new Promise((resolve, reject) => {
        this.$ajax('get', this.HOST + '/tr/TrQuestion/web/getExpertList?dept_id=' + did, {abd: '11'}, (data) => {
          let flag = data.success
          if (flag === true) {
            let managerList = data.obj
            this.managerList = managerList
            resolve('数据加载成功')
          }
        })
      })

      return promise
    },
    getQuestionListByDeptId: function (did) {
      let promise = new Promise((resolve, reject) => {
        this.$ajax('get', this.HOST + '/tr/TrQuestion/web/getExpertQuestionList?expert_dept_id=' + did, {ccc: 'asdfasdf'}, (data) => {

          let flag = data.success
          if (flag === true) {
            let obj = data.obj
            this.alAnswerList = obj.alAnswerList
            this.unAnswerList = obj.unAnswerList
            resolve('数据加载成功')
          }
        })
      })

      return promise
    },
    getUserQuestionListByDeptId: function (did) {
      let promise = new Promise((resolve, reject) => {
        this.$ajax('get', this.HOST + '/tr/TrQuestion/web/getUserQuestionList?dept_id=' + did, {}, (data) => {
         
          let flag = data.success
          if (flag === true) {
            let obj = data.obj
            this.alAnswerList = obj.alAnswerList
            this.unAnswerList = obj.unAnswerList
            resolve('数据加载成功')
          }
        })
      })

      return promise
    },
    handleClick: function (res) {
      let did = res.$attrs.panleId
      this.deptId = did
      if (this.isManager) {
        this.getQuestionListByDeptId(did)
      } else {
        this.getExpertList(did)
        this.getUserQuestionListByDeptId(did)
      }
    },
    getUserInfo: function () {
      let promise = new Promise((resolve, reject) => {
        this.$ajax('get', this.HOST + '/tr/trUser/web/getUserInfo', {}, (data) => {
        
          let flag = data.success
          if (flag === true) {
            if (data.data.userType === '4') {
              this.isManager = true
            }
            resolve(this.isManager) // 执行成功回调;
          }
        })
      })

      return promise
    },
    ask: function (id, val) {
      this.currentQuestionId = id
      this.showPart=4
      this.huidaWho = val.user_name
    },
    handleClose1 (done) {
      this.dialogVisible = false
    },
    handleClose (done) {
      this.dialogVisibleQuestion = false
    },
    upInfo: function () {
      let promise = new Promise((resolve, reject) => {
        this.dialogVisible = false
        if (this.quesion !== '') {
          let requestParam = {
            content: this.quesion,
            question_id: this.currentQuestionId
          }
          this.$ajaxMore('post', this.HOST + '/tr/TrQuestion/web/addAnswer', requestParam, (data) => {
         
            let flag = data.success
            if (flag === true) {
              this.quesion = ''
              Toast({
                message: '操作成功',
                iconClass: 'mintui mintui-success'
              });
              resolve(this.currentQuestionId) // 执行成功回调;
            }
          })
        }
      })

      return promise
    },
    upAsk: function () {
      if(this.quesion!=''){
        this.changeState()
        this.upInfo().then((qid) => {
          this.getQuestionListByDeptId(this.deptId) 
        })
      }else{
        Toast({
          message: '提问内容不能为空',
        });
      }
     
    },
    goAsk: function (edid, id, o) {
      this.$router.push({
        path: '/ask_zj',
        query: {
          edit: edid,
          myId: id,
          name: window.escape(o.expert_name)
        }
      })
      return
      this.quesion=''
      this.askWho = o.expert_name
      this.edid = edid
      this.myId = id
      this.$store.commit('footer_tab', {
        path:this.$route.meta.myPath ,
        show: false
      })
       this.$store.commit('header_tab', {
          path: this.$route.meta.mychildPath,
          show: false
        })
      this.showPart=3
    },
    remove:function(){
       this.showPart=2
       this.changeState()
    },
    changeState (){
       this.$store.commit('footer_tab', {
          path:this.$route.meta.myPath ,
          show: true
        })
        this.$store.commit('header_tab', {
          path: this.$route.meta.mychildPath,
          show: true
        })
    },
    upQuestion: function () {
      if(this.quesion!=''){
        this.changeState()
        this.unQuestionInfo(this.edid, this.myId).then((flag) => {
        this.getUserQuestionListByDeptId(this.deptId)
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
              resolve(flag) // 执行成功回调;
            }
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
              resolve(this.deptId) // 执行成功回调;
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
