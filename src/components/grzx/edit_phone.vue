<template>
  <div class="editas">
       <div class="title">编辑手机号</div>
      <ul>
        <li>
          <input type="tel" v-model="newTel" placeholder="请输入新手机号" :class="flagKong?'red':''"/>
        </li>
        <li class="code-box clearfix">
           <input type="text" placeholder="验证码" v-model="codeTel"  :class="flagKongCode?'red':''"/>
           <mt-button  :disabled="disabledFlag"  @click="getCodeTel">{{codemsg}}</mt-button>
        </li>
        <li class="buttonGroup clearfix">
          <mt-button plain  class="btn"  @click="$router.push({path: '/me'})">取 消</mt-button>
          <mt-button  class="floatR" @click="edit_sure">确 定</mt-button>
        </li>
      </ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
     name:'',
     num:'',
     iphone:'',
     sex:'',
     email:'',
     flagNum:1,
     newTel:'',
     flag:true,
     indexIphone:60,
     codemsg: '获取验证码',
     flagKong:false,
     codeTel:'',
     flagKongCode:false,
     newEmil:'',
     emailCode:'',
     indexEmilFlag:60,
     codemsgEmill: '获取验证码',
     emailFlag:true,
     disabledFlag:false,
     disabledFlagEmil:false,
     flagJB:true//是否是教师
     

    }
  },

  mounted () {
    let self = this
    self.$ajax('post', self.HOST + '/tr/trUser/web/getUserInfo', {}, function (res) {
      if (res.success) {
        if (res.data != null) {
          if (res.data.userType == 4) {
            // userType == 4 是专家
            self.flagJB = false
          }
        }
        self.name = res.obj.name
        self.num = res.obj.userId
        self.iphone = res.obj.mobile 
        if (res.obj.gender == 1) {
          self.sex = '男'
        } else {
          self.sex = '女'
        }
        if (res.obj.email == null || res.obj.email == '') {
          self.email = '未设置'
          self.flagEmil = true
        } else {
          self.email = res.obj.email
        } 
      }
    })
    this.$store.commit('footer_tab', {
          path: this.$route.meta.myPath,
          show: true
    })
  },
   methods: {
    //  三个页面切换
    changeFlag(num){
      this.flagNum=num
      this.flagKong=false
      this.flagKongCode=false
      this.disabledFlag=false
      this.disabledFlagEmil=false
     this.$store.commit('footer_tab', {
          path:this.$route.meta.myPath ,
          show: true
        })
      if(num==2){
         this.changeState()
          this.newTel = ''
          this.codeTel = ''
          this.codemsg = '获取验证码'
          this.flag = true
          this.indexIphone = 60,
          clearInterval(this.countdownTimerIphone)

      }else if(num==3){
          this.changeState()
          this.newEmil = ''
          this.emailCode = ''
          this.codemsgEmill = '获取验证码',
          this.indexEmilFlag=60
          this.emailFlag = true
          clearInterval(this.countdownTimer)
      }
    },
    changeState (){
      this.$store.commit('footer_tab', {
          path: this.$route.meta.myPath,
          show: false
    })
    },
    // 更改手机号-----点击获取验证码
       getCodeTel () {
      // 获取验证码
        let self = this
        let reg = /1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}/
        if (!reg.test(self.newTel)) {
          self.flagKong=true;
          Toast({
            message: '请输入正确手机号',
            // iconClass: 'mintui mintui-success'
          });
          return
        }
        // if (self.newTel=="") {
        //   self.flagKong=true;
        //   return
        // }
        self.flagKong=false;
        self.indexIphone = 60
        if (self.flag) {
          self.flag = false
          self.countdownTimerIphone = setInterval(function () {
            if (self.indexIphone <= 0) {
              self.flag = true
              self.disabledFlag=false
              self.codemsg = '获取验证码'
              self.indexIphone = 60
              clearInterval(self.countdownTimerIphone)
            } else {
              self.disabledFlag=true
              self.codemsg = '重新获取(' + (--self.indexIphone) + ')'
            }
          }, 1000)
          let newdata = {
            phoneNumber: self.newTel
          }
          self.$ajax('post', self.HOST + '/tr/trUser/web/sendPhoneVC', newdata, function (res) {
            if (res.success) {
              // 获取成功
              Toast({
                message: '成功获取验证码',
                iconClass: 'mintui mintui-success'
              });
            } else {
               // 获取失败
               Toast({
                message: '获取验证码失败',
                // iconClass: 'mintui mintui-success'
              });
            }
          })
        }
      },

     edit_sure () {
    //  修改手机号
      let self = this
      let reg = /1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}/
        if (!reg.test(self.newTel)) {
          self.flagKong=true;
          Toast({
            message: '请输入正确手机号',
            // iconClass: 'mintui mintui-success'
          });
          return
        }  
      if (self.codeTel === '') {
         self.flagKongCode=true;
        Toast({
          message: '手机号不能为空',
          // iconClass: 'mintui mintui-success'
        });
          return
      }
      self.flagKong=false;
      self.flagKongCode=false;
      let newData = {
        phoneNumber: self.newTel,
        code: self.codeTel
      }
      self.$ajax('post', self.HOST + '/tr/trUser/web/editUserPhoneByIdV15', newData, function (res) {
        if (res.success) {
          self.flagNum = 1
          self.iphone = self.newTel
          Toast({
            message: '手机号更改成功',
            iconClass: 'mintui mintui-success'
          });
          self.$router.push({path: '/me'})
        } else {
         Toast({
          message: '手机号更改失败',
          // iconClass: 'mintui mintui-success'
        });
        self.$router.push({path: '/me'})
        }
      })
    },


     getEmailCode () {
      // 获取验证码
      let self = this
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(self.newEmil)) {
        this.flagKong=true
        Toast({
          message: '请输入正确邮箱',
          // iconClass: 'mintui mintui-success'
        });
        return
      }
       this.flagKong=false

       self.indexEmilFlag = 60
      if (self.emailFlag) {
        self.emailFlag = false
        // 计时器暂停（清除定时器）  
       
        self.countdownTimer = setInterval(function () {
          if (self.indexEmilFlag <= 0) {
            self.emailFlag = true
            self.disabledFlagEmil=false
            self.codemsgEmill = '获取验证码'
            self.indexEmilFlag = 60
             clearInterval(self.countdownTimer)
          } else {
            self.disabledFlagEmil=true
            self.codemsgEmill = '重新获取(' + (--self.indexEmilFlag) + ')'
          }
        }, 1000)
        let newdata = {
          email: self.newEmil
        }
        self.$ajax('post', self.HOST + '/tr/trExpert/web/sendExpertEmailVC', newdata, function (res) {
          if (res.success) {
            Toast({
              message: '成功获取验证码',
              iconClass: 'mintui mintui-success'
            });
          } else {
            Toast({
              message: '验证码获取失败',
              // iconClass: 'mintui mintui-success'
            });
          }
        })
      }
    },
    edit_sureEmil () {
      //  修改邮箱
      let self = this
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(self.newEmil)) {
        this.flagKong=true
        Toast({
          message: '请输入正确邮箱',
          // iconClass: 'mintui mintui-success'
        });
        return
      }
      if (self.emailCode === '') {
        this.flagKongCode=true
        Toast({
          message: '邮箱不能为空',
          // iconClass: 'mintui mintui-success'
        });
        return
      }
      this.flagKong=false
      this.flagKongCode=false

      let newData = {
        email: self.newEmil,
        code: self.emailCode
      }

      self.$ajax('post', self.HOST + '/tr/trUser/web/editUserEmailByIdV15', newData, function (res) {
        if (res.success) {
          Toast({
            message: '修改邮箱成功',
            iconClass: 'mintui mintui-success'
          });
          self.email = self.newEmil
          self.flagNum = 1
        } else {
          Toast({
            message: '修改邮箱失败',
            // iconClass: 'mintui mintui-success'
          });
        }
      })
    },



   }
 
}
</script>
<style scoped>
.editas {
  min-height: 100vh;
  width: 100% !important;
  padding: 0 10%;
  background: #fff;
}
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

input::-webkit-input-placeholder {
	color: #888;
}

input::input-placeholder {
	color: #888;
}
th,h5,h4,h3{
  font-weight: normal;
}
.bgFFF{
  background-color: #fff
}
.bgffbb03{
  background-color: #ffbb03
}
.bg70ad47{
  background-color: #70ad47
}
.bg5b9bd5{
  background-color: #5b9bd5
}
.bged7d31{
  background-color: #ed7d31
}
/* // 我的 */
.header_top{
  padding-top: 2rem;
  background-color: #70ad47
}
.header_top .header_title{
  padding: 0 15px;
  background: #fff url(../../assets/images/mebj.png) no-repeat left top;
  background-size: 100%
}

.header_top .imgBox{
   position: relative;
    top: -25px;
    width: 25%;
    text-align: center
}
.header_top .imgBox img{
  display: inline-block;
  width: 100%;
}
.header_top .imgBox .iconfont{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    color: #fff;
    font-size: 0.8rem;
    height: 1rem
}
.baseInfo h5{
  color:#333;
  font-size: 0.3rem;
  line-height: 1.6;
  margin-bottom: 5px
}
.baseInfo p{
  color:#999;
  font-size: 0.24rem;
  line-height: 1;
}

.header_top .my_content{
  position: relative;
  top: -15px;
  padding: 0 5px
}
.mylist{
  padding-top: 25px
}
.mylist .list-row-lable,
.mylist .list-row-box {
    line-height: 16px;
    font-size: 0.26rem;
     padding: 12px 0; 
}
.mylist .list-row-lable {
    float: left;
    width: 46%;
    color: #333
}
.mylist .list-row-lable .iconfont{
font-size: 16px
}
.icon_yellow{
  color: #ffc12e
}
.icon_blue{
  color: #5b9bd5
}
.icon_orange{
  color: #ed7d31
}
.icon_perpo{
  color: #7a7caa
}
.icon_gray{
  color: #d8d8d8
}
.mylist .list-row-box{
    float: right;
    width: 54%;
    color: #999;
    text-align: right;
}
.editas{
  padding-top:1.2rem ;
  width: 80%;
  margin: 0 auto
}
.editas li{
  margin-bottom: 0.22rem
}
.editas .title{
    line-height: 0.28rem;
    text-align: center;
    font-size: 0.28rem;
    margin-bottom: 0.4rem;
}
.editas input{
    width: 100%;
    padding: 7px 10px;
    height: 0.68rem;
    line-height: 17px;
    color: #555;
    border: 1px solid #dbdbdb;
    outline: 0;
    background-color: transparent;
    border-radius: 0;
    -webkit-appearance: none;
    appearance: none;
}
.editas input.red{
border: 1px solid red;
}
.code-box input{
	float: left;
	width: 58.62%;
}
.code-box button{
	float: right;
	width: 37.93%;
}
.buttonGroup button{
  float: left;
  width: 48%
}
.buttonGroup  .floatR{
  float: right
}
.editas button{
    border-color:#70ad47 ;
    background-color: #70ad47;
    color: white;
    font-size: 0.28rem;
    height: 0.68rem
}
.editas button.btn{
    border-color:#70ad47 ;
    background-color: #fff;
    color: #70ad47;
}
</style>
