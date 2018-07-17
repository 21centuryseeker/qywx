<template>
  <div>
    <!--部门选择-->
    <div class="depart-select" @click="goSelectDept">
      <span >{{selectName?selectName:'我的部门'}}&nbsp;<i class="iconfont">&#xe758;</i></span>
    </div>
    <!--部门选择 end-->
    <!-- item end -->

    <div class="w_item">

      <!-- 列表 -->
      <div class="w_list">
        <template>
            <div class="w_list_item">
              <div v-if="!planList || !planList.length" style="text-align: center;font-size: 0.22rem;background: #f3f3f3;margin-top: 2rem;color: #666;">暂无数据</div>
              <div class="view_cell" v-for="(val1,key) of planList" :key="key">
                <div class="father_box">
                  <a href="javascript:void(0)" class="link" @click="showNextFn(val1.id)">
                      <h5 class="w_pull-right">
                        {{val1.targetName}}
                        <i class="iconfont">&#xe667;</i>
                        <!-- <i class="iconfont">&#xe62e;</i> -->
                      </h5>
                      <p><i class="iconfont">&#xe64c;</i>{{val1.targetInfo.startTime + ' - ' + val1.targetInfo.endTime }}</p>
                      <!-- <p class="state state_yellow">{{val1.resultType}}</p> -->
                      <p class="state state_yellow" :class="resultTypeObj[val1.resultType]">{{val1.resultType}}</p>
                  </a>
                  <div class="detailLink">
                    <a href="javascript:void(0)"  @click="$router.push({path: '/targetDetail/' + val1.id})">查看详情</a>
                  </div>
                </div>
                <div class="nextBox">
                  <transition name="slide-fade">
                    <template v-if="showNext==val1.id">
                      <div class="child_box" v-for="(val,key1) of targetPlanList" :key="key1+'77'">
                        <a href="#" class="link">
                            <h5 class="w_pull-right">
                              {{val.planName}}
                              <i class="iconfont">&#xe62e;</i>
                            </h5>
                            <p class="progress">
                              <i class="iconfont">&#xe695;</i>

                              <mt-progress :value="val.planinfo.progress" :bar-height="5"></mt-progress>
                              {{val.planinfo.progress}}%</p>
                            <p><i class="iconfont">&#xe64c;</i>{{val.planinfo.startTime + ' - ' + val.planinfo.endTime }}</p>
                            <!-- <p class="state state_yellow">{{val.resultType}}</p> -->
                            <p class="state state_yellow" :class="resultTypeObj[val.resultType]">{{val.resultType}}</p>
                        </a>
                      </div>
                      </template>
                  </transition>
                </div>
              </div>
            </div>
        </template>
      </div>
      <!-- 列表 end-->
    </div>
    <!-- item end -->

  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      deptId:1,//部门id
      TargetNumType: 0,
      flagSort:true,
      newTime:'',
      newTime2:'',
      planList: [],
      targetPlanList: [],
      resultTypeObj: {
        '未开始': 'state_gray',
        '进行中': 'state_yellow',
        '已完成': 'state_green',
        '已延期': 'state_orang',
        '延期完成': 'state_blue'
      },
      marqueeData: [
        { 'title': '无缝滚动第一行无缝滚动第一行'},
        { 'title': '无缝滚动第一行无缝滚动第2行无缝滚动第一行无缝滚动第2行'},
        { 'title': '无缝滚动第一行无缝滚动第3行'},
        { 'title': '无缝滚动第一行无缝滚动第4行'},
        { 'title': '无缝滚动第一行无缝滚动第5行'},
        { 'title': '无缝滚动第一行无缝滚动第6行'},
        ],//消息列表
      showNext: true,
      selectName:''

    }
  },
  computed: {
    optionSingleHeightTime () {
        return {
          singleHeight: 24,
          waitTime: 2500
        }
    }
  },
   mounted () {
    let self = this;
     let selectUserId = this.$route.query.userId;
     let did = this.$route.query.deptId;
     if(selectUserId != undefined){ //获取用户目标
      this.getUserPlan({
        pid:did,
        did:selectUserId
      })
      this.selectName = window.unescape(this.$route.query.name)
     }
  },
   methods: {
     isShow: function (id){
       alert(id)
     },
     getTargetInfo: function (aname) {
       this.targetPlanList = [];
       this.$ajax('get', this.HOST + '/tr/doubleStrands/web/getPlansByCrn?targetId= ' + aname, {}, (obj) => {
         let flag = obj.success;
         if (flag === true) {
           for (let item of obj.obj) {
            //  console.log(item);
             let styleName = this.resultTypeObj[item.resultType];
             item.styleName = styleName;
             if (item.planinfo.progress === null) {
               item.planinfo.progress = 0
             } else {
               item.planinfo.progress = parseInt(item.planinfo.progress)
             }
             // this.planList.push(item)
             this.targetPlanList.push(item);
            //  console.log("plan",this.targetPlanList)
           }
         }
       })
     },
    // 目标的通知请求
     getUserPlan (data) {
       this.$ajax('get', this.HOST + '/tr/doubleStrands/web/getTargetListByUserId?deptId= ' + data.pid + ' &userId= ' + data.did, {}, (obj) => {
        //  console.log('进度', obj);
         let flag = obj.success;
         if (flag === true) {
           for (let item of obj.obj) {
             let styleName = this.resultTypeObj[item.resultType];
             if (item.targetInfo.progress === null) {
               item.targetInfo.progress = 0
             } else {
               item.targetInfo.progress = parseInt(item.targetInfo.progress)
             }
             item.styleName = styleName;
             this.planList.push(item)
           }
            // if(obj.obj.length>0){
            //   this.selectName=obj.obj[0].targetInfo.managerName
            // }else{
            //   this.selectName=''
            // }
            
          //  console.log("777",this.planList)
         }
       })
     },
     goSelectDept() {
       this.$router.push({
         path:'/index/zggzyl'
       })
     },
    // 目标的列表-初始化请求
    targetListFn () {
      let self = this;
      let newData = {
        targetClass: 2, // 目标分类 1：我创建的 2：我负责的 3：我审核的 4：我创建或我负责
        deptId: self.deptId, // 计划归属
        pageNumber: 1, // 页码
        pageSize: 6,
        resultType: self.TargetNumType,
        descStr: self.flagSort,
        startTime: self.newTime,
        endTime: self.newTime2
      };
      self.ajaxListTargetList(newData)
    },

    //  目标的列表-ajax请求
    ajaxListTargetList (newData) {
      let self = this;
      self.$ajaxMore('post', self.HOST + '/tr/trTarget/web/getTargetList', newData, function (res) {
        if (res.success) {


        } else {

        }
      })
    },

    showNextFn(id){
       this.showNext = id;
       this.getTargetInfo(id)
      // for(let i = 0;i<document.getElementsByClassName("child_box").length;i++){
      //   document.getElementsByClassName("child_box")[i].style.visibility="hidden";
      // }
      // if(!this.showNext){
      //   //  进行ajax请求有数据的时候
      //   this.showNext=true
      //   //  没有数据 就 this.showNext=false
      // }else{
      //   this.showNext=false
      // }
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
.paddingTop0{
  padding-top: 0!important;
}
.flexLink .bgffbb03,
.flexLink .bg70ad47,
.flexLink .bg5b9bd5,
.flexLink .bged7d31{
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 25%
}
.flexLink .bgffbb03{
  background-size: 36%;
 background-image: url(../../assets/images/ico1.png)
}
.flexLink .bg70ad47{
 background-image: url(../../assets/images/ico2.png)
}
.flexLink .bg5b9bd5{
 background-image: url(../../assets/images/ico3.png)
}
.flexLink .bged7d31{
 background-image: url(../../assets/images/ico4.png)
}
.w_item{
  background-color: #fff;
  margin-bottom: 15px;
}
.flexLink,.w_marquee {
  padding: 10px
}
.flexLink li{
  text-align: center;
  float: left;
  list-style: none;
  width: 50%;

}
.flexLink li>a {
  display: block;
  padding: 16px 0;
  margin: 3px;
  border-radius: 9px;
  color: #fff
}
.flexLink h5{
  font-size: 16px;
  line-height: 32px;
}
.flexLink p{
  font-size: 10px;
  line-height: 16px;
}
/* 预警通知 */
.w_marquee .noticL{
  float: left;
  width: 25%
}
.w_marquee .noticL .iconfont{
  font-size: 36px;
  color: #f56c6c;
  vertical-align: middle
}
.w_marquee .noticL p{
  display: inline-block;
  font-size: 15px;
  line-height: 1.6;
  color: #f56c6c;
  width: 40%;
  vertical-align: middle
}
.w_marquee .noticR{
  float: left;
  width: 75%
}

/* 标题通用 */
.view_cell{
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 22px;
    padding: 5px 10px;
    font-size: 14px;
    color: #555;
    border-bottom: 1px solid #e4e4e4;
}
.view_cell:after {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 1px;
    content: '';
    left: 0;
    background-color: #e4e4e4;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
}
.view_cell.view_cell_other:after {
    height: 0px;
}
.view_cell .view_cell_icon{
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background-color: #70ad47;
  vertical-align: 1px;
}
.view_cell .view_cell_icon .iconfont{
  line-height: 14px;
  font-size: 14px;
  color: #fff
}
/* // 查看更多 */
.w_more{
float: right;
color: #70ad47
}

/* 目标与计划 */
.w_list .w_list_item:last-child .view_cell:after{
height: 0;
}
.w_list_item .view_cell,
.w_list_item .link{
  position: relative;
  display: block
}
.w_list_item .w_pull-right{
  position: relative;
  font-size: 0.28rem;
  color: #333;
  font-weight: normal;
  /* line-height: 26px; */
  padding-right: 25px;
  white-space: nowrap;
  text-overflow:ellipsis;
   overflow:hidden;
}
.w_list_item .w_pull-right i{
    font-size: 0.26rem;
    line-height: 1;
    position: absolute;
    top: 50%;
    right: 10px;
    display: inline-block;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    text-decoration: none;
    color: #adadad;
    -webkit-font-smoothing: antialiased;
}
.w_list_item p{
  color: #999
}
.w_list_item .progress .mt-progress{
  width: 40%;
  height: 5px;
  display: inline-block;
  border-radius: 5px;
}
.w_list_item p i{
    font-size: 0.24rem;
    /* line-height: 22px; */
    color: #adadad;
    /* vertical-align: top; */
    margin-right: 3px;
}
.w_list_item .state{
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 0.24rem;
     line-height: 1.6;
    padding: 0 5px;
    border: 1px solid;
    border-radius: 3px;
}
.father_box .state{
  bottom: 0
}
.w_list_item .state_yellow{
  border-color: #ffc000;
  color: #ffc000
}
.w_list_item .state_gray{
  border-color: #a5a5a5;
  color: #a5a5a5
}
.w_list_item .state_green{
  border-color: #61b231;
  color: #61b231
}
.w_list_item .state_orang{
  border-color: #ed7d31;
  color: #ed7d31
}
.w_list_item .state_blue{
  border-color: #4472c4;
  color: #4472c4
}
.w_list_item  .detailLink{
  text-align: center;
  padding: 5px 10px
}
.w_list_item  .detailLink a{
    display: inline-block;
    background-color: #f5f5f5;
    border-radius: 8px;
    color:#979797;
    padding: 6px 10px;
     font-size:0.2rem;
    line-height: 12px;
   text-align: center;
}
.father_box{
    margin-bottom: 10px;
}

/* 计划 */
.child_box {
  padding: 8px 0;
  border-radius: 5px;
  margin-bottom: 8px;
 background-color: #f9f9f9
}
.child_box .link{
padding-left: 10px
}
.child_box .table_style{
  padding: 10px
}
.child_box .table_style table{
  width: 100%;
  border: 1px solid #e4e4e4;
  border-collapse: collapse
}
.child_box .table_style table td{
  border: 1px solid #e4e4e4;
  padding: 3px 0;
  border-collapse: collapse;
  text-align: center;
  padding: 5px 0;
  line-height: 1
}
.child_box .table_style table th{
   border: 1px solid #e1eed9;
   background-color: #f4f9f1;
   color: #526069;
   font-size: 0.16rem;
   padding: 5px 0;
}
.child_box .table_style .round{
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  line-height: 16px;
}
.round_green{
  background-color: #70ad47;
   border:1px solid #70ad47
}
.round_yellow{
  background-color: #fec000;
   border:1px solid #fec000
}
.round_red{
  background-color: #e96c72;
   border:1px solid #e96c72
}
.round_black{
  background-color: #f9f9f9;
  border:1px solid #333
}

/* 按钮组合 */
.link_group{
  text-align: center;
  padding: 8px 0
}
.link_group a{
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 0.24rem;
    margin-right: 10px;
    text-align: center;
}
.link_group .green_link{
  color: #70ad47;
  background-color: #eaf5e3;
  border: 1px solid #afdf8f;
}
.link_group .submit_link{
  color: #ed7b34;
  background-color: #ffede2;
  border: 1px solid #ffbe96;
}

/* 经费 */
.table_funds table{
  width: 100%;
  border-collapse: collapse
}
.table_funds table th,
.table_funds table td{
    padding: 5px 6px;
    font-size: 12px;
    line-height: 1.5;
    border-collapse: collapse;
}
.table_funds table th{
  background-color: #f4f9f1;
  border: none;
  color: #70ad47;
  border-top: 1px solid #e1eed9;
  border-bottom: 1px solid #e1eed9
}
.table_funds table td{
  border: none;
  text-align: center;
  color: #888;
}
.table_funds table tr td:first-child{
  text-align: left;
  width: 40%
}
.table_funds table td .mt-progress{
  width: 60%;
  display: inline-block;
  height: 5px;
}



.slide-fade-enter-active {
  animation: bounce-in .5s;
}
.slide-fade-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(0.1);
  }
  20% {
    transform: scale(0.2);
  }
  30% {
    transform: scale(0.3);
  }
  40% {
    transform: scale(0.4);
  }
  50% {
    transform: scale(0.5);
  }
  60% {
    transform: scale(0.6);
  }
  70% {
    transform: scale(0.7);
  }
  80% {
    transform: scale(0.8);
  }
  90% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.noticR .seamless-warp {
    height: 48px;
    overflow: hidden;
}
.noticR .seamless-warp li{
    height: 24px;
   line-height: 24px
}
.noticR .seamless-warp li a{
  display: inline-block;
  width: 95%;
   font-size: 10px;
   color: #666;
   white-space: nowrap;
   text-overflow:ellipsis;
   overflow:hidden;
}
  .depart-select{
    text-align: center;
    padding: 0.2rem 0;
  }
  .depart-select .iconfont{
    font-size: 1em;
  }
  .depart-select span{
    font-size: 0.3rem;
    color: #888;
  }
</style>
