<template>
  <div class="app" style="height: 100%;overflow-y: scroll;">
    <div class="w_item">
      <!-- 头部链接切换 -->
       <div class="flexLink clearfix">
        <ul>
          <li >
            <a class="bgffbb03" href="javascript:void(0)" v-tap="{fn: function () {$router.push({path: '/zgsjfx/sjhx'})}}">
              <h5>数据画像</h5>
              <p>5层画像</p>
            </a>
          </li>
          <li >
            <a class="bg70ad47"  href="javascript:void(0)" v-tap="{fn: function () {$router.push({path: '/zgsjfx/jsc'})}}">
              <h5>驾驶舱</h5>
              <p>频繁变化数据</p>
            </a>         
          </li>
          <li >
            <a class="bg5b9bd5"  href="javascript:void(0)" v-tap="{fn: function () {$router.push({path: '/index/zgzjpt'})}}">
              <h5>专家平台</h5>
              <p>专家答疑与建议</p>
            </a>
          </li>
          <li >
            <a class="bged7d31"  href="javascript:void(0)" v-tap="{fn: function () {$router.push({path: '/newslist'})}}">
              <h5>预警通知</h5>
              <p>目标和计划消息</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 头部切换 end-->

      <!-- 预警通知  -->
      <div class="w_marquee clearfix">
        <div class="noticL">
          <i class="iconfont">&#xe6e8;</i>
          <p>预警通知</p>
        </div>
        <div class="noticR" v-tap="{fn: function () {$router.push({path: '/newslist'})}}">
          <template>    
            <vue-seamless-scroll :data="marqueeData" :class-option="optionSingleHeightTime" class="seamless-warp" >
                <ul class="item">
                    <li v-for="(item,index) in marqueeData" :key="index">
                      <a href="javascript:void(0)" v-text="item.content" :key="index"></a>
                    </li>
                </ul>
            </vue-seamless-scroll>
          </template>
       
        </div>
      </div>
      <!-- 预警通知 end -->
    </div>
    <!-- item end -->

    <div class="w_item">
      <!-- 标题 -->
      <div class="view_cell">
          <span class="view_cell_icon"><i class="iconfont">&#xe62b;</i></span> 目标与计划
          <a class="w_more" href="javascript:void(0)"   @click="$router.push({path: '/list'})">查看更多>> </a>
      </div>
      <!-- 标题 end-->

      <!-- 列表 -->
      <div class="w_list">
        <template v-for="item in targetList">
            <div class="w_list_item" :key="item.id">
              <div class="view_cell">
                <div class="father_box">
                  <a href="javascript:void(0)" class="link" @click="showNextFn(item.id)">
                      <h5 class="w_pull-right">
                        <span class="font_hidden">{{item.target_name}}</span>
                        <i class="iconfont" v-if="flagShowNext">&#xe667;</i>
                        <i class="iconfont" v-else>&#xe62e;</i>
                      </h5>
                      <!-- <p class="progress">
                        <i class="iconfont">&#xe695;</i>
                        <mt-progress :value="60" :bar-height="5"></mt-progress>
                        60%</p> -->
                      <p class="time_box"><i class="iconfont">&#xe64c;</i>{{item.start_time}} - {{item.end_time}}</p>
                      <p class="state state_yellow" :class="item.styleName">{{item.result_type}}</p>
                  </a>
                  <div class="detailLink">
                    <a href="javascript:void(0)"  @click="$router.push({path: '/targetDetail/' + item.id})">查看详情</a>
                  </div>  
                </div>
                <div class="nextBox">
                  <transition name="slide-fade">
                    <template v-if="showNext === item.id">
                       <div>
                         <!-- 目标下的计划列表 -->
                        <template v-for="planitem in planList">
                          <div class="child_box" :key="planitem.id">
                              <a href="javascript:void(0)" class="link"  @click="$router.push({path: '/planDetail/' + planitem.id})">
                                  <h5 class="w_pull-right">
                                    <span class="font_hidden">{{planitem.plan_name}}</span>
                                    <i class="iconfont">&#xe62e;</i>
                                  </h5>
                                  <p class="progress">
                                    <i class="iconfont">&#xe695;</i>
                                    
                                    <mt-progress :value="planitem.progress - 0"  :bar-height="5"></mt-progress>
                                    {{planitem.progress - 0}}%</p>
                                  <p class="time_box"><i class="iconfont">&#xe64c;</i>{{planitem.start_time}} -  {{planitem.end_time}}</p>
                                  <p class="state state_yellow" :class="planitem.styleName">{{planitem.result_type}}</p>
                              </a>
                              <div class="table_style">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>1月</th>
                                        <th>2月</th>
                                        <th>3月</th>
                                        <th>4月</th>
                                        <th>5月</th>
                                        <th>6月</th>
                                        <th>7月</th>
                                        <th>8月</th>
                                        <th>9月</th>
                                        <th>10月</th>
                                        <th>11月</th>
                                        <th>12月</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                         <template v-for="jdItem in planitem.month">
                                          <td :key="jdItem.month">
                                            <template v-if="jdItem.monthStatus">
                                              <span class="round round_yellow" v-if="jdItem.monthStatus === 2"></span>
                                              <span class="round round_black" v-if="jdItem.monthStatus === 4"></span>
                                              <span class="round round_green" v-if="jdItem.monthStatus === 1"></span>
                                              <span class="round round_red" v-if="jdItem.monthStatus === 3"></span>
                                            </template>
                                            <template v-else>
                                              <span class="round"></span>
                                            </template>
                                          </td>
                                        </template>
                                      </tr>
                                    </tbody>
                                  </table>
                              </div>
                              <div class="link_group">
                                  <a href="javascript:void(0)" class="green_link"  @click="showReportPogressPlan(planitem)">填报进度</a>
                                  <a href="javascript:void(0)" class="submit_link" @click="showSh(planitem.id)">提交审核</a>
                              </div>
                            </div>
                        </template>
                          <!-- 字目标列表 -->
                        <template v-for="(targetItem,index) in childTargetList">
                          <div class="father_box child_box" :key="targetItem.id" @click="$router.push({path: '/targetDetail/' + targetItem.id})">
                            <a href="javascript:void(0)" class="link" >
                            <h5 class="w_pull-right">
                             子目标{{index+1}}： {{targetItem.target_name}}
                              <i class="iconfont">&#xe62e;</i>
                            </h5>
                            <p class="time_box"><i class="iconfont">&#xe64c;</i>{{targetItem.start_time}} - {{targetItem.end_time}}</p>
                            <!-- <p class="state state_yellow">{{targetItem.result_type}}</p> -->
                            <p class="state state_yellow" :class="targetItem.styleName">{{targetItem.result_type}}</p>
                            </a>
                            <!-- <div class="detailLink">
                              <a href="javascript:void(0)" @click="$router.push({path: '/targetDetail/' + targetItem.id})">查看详情</a>
                            </div>   -->
                          </div>
                        </template>
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


    <!-- 经费 -->
    <!-- <div class="w_item">
      <div class="view_cell view_cell_other">
        <span class="view_cell_icon"><i class="iconfont">&#xe626;</i></span>  分科目经费使用比例
      </div>
     <div class="view_cell view_cell_other paddingTop0">
      <div class="table_funds">
        <table>
          <thead>
            <tr>
              <th align="left">名称</th>
              <th>总计</th>
              <th>使用情况</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>院校资料档案费</td>
              <td>￥2240</td>
              <td> <mt-progress :value="60" :bar-height="5"></mt-progress> 60%</td>
            </tr>
            <tr>
              <td>院校资料档案费</td>
              <td>￥2240</td>
              <td> <mt-progress :value="60" :bar-height="5"></mt-progress> 60%</td>
            </tr>
          </tbody>
        </table>
      </div>
     </div>
    </div> -->
      <!-- 经费end -->

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
      marqueeData: [],//消息列表
      showNext: '',
      planList:[],
      childTargetList:[],
      targetList:[],
      childTargetList: [],
       resultTypeObj: {
        '未开始': 'state_gray',
        '进行中': 'state_yellow',
        '已完成': 'state_green',
        '已延期': 'state_orang',
        '延期完成': 'state_blue'
      },
      nowMonthStatus:0,
      flagShowNext:true,

    }
  },
  computed: {
    optionSingleHeightTime () {
        return {
          singleHeight: 24,
          waitTime: 2500,
          limitMoveNum: 2
        }
    }
  },
   mounted () {
    let self = this
    self.$ajax('post', self.HOST + '/tr/autognosis/web/autognosiShow', {}, function (res) {
      if (res.success) {
        let defaultDepId = res.obj[0].deptId
        self.deptId = defaultDepId
        // 消息通知
        self.targetNoticeFn()
        // 目标列表
        self.targetListFn()

      } else {
           // error
          alert('error')
      }
    })
  },
   methods: {
    // 目标的通知请求
    targetNoticeFn () {
      let self = this
      let newData = {
        messageStatus: 0,
        deptId: self.deptId, // 计划归属
        pageNumber: 1,
        pageSize: 6
      }
      self.$ajaxMore('post', self.HOST + '/tr/trUser/web/getUserMessageInfo', newData, function (res) {
        if (res.success) {
          self.marqueeData = []
          self.marqueeData = res.obj
        } else {
          // error
          alert('error')
        }
      })
    }, 
    
    
    // 目标的列表-初始化请求
    targetListFn () {
      let self = this
      let newData = {
        targetClass: 5, // 目标分类 1：我创建的 2：我负责的 3：我审核的 4：我创建或我负责
        deptId: self.deptId, // 计划归属
        pageNumber: 1, // 页码
        pageSize: 6,
        resultType: 6, // 完成情况 1：未开始；2：进行中；3：已完成; 4:已延期; 5:延期完成; 6:全部
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        searchName: '', // 查询条件
        pageNumber: 1, // 页码
        pageSize: 6// 每页显示条数
      }
      self.ajaxListTargetList(newData)
    },

    //  目标的列表-ajax请求
    ajaxListTargetList (newData) {
      let self = this
      self.$ajaxMore('post', self.HOST + '/tr/trTarget/web/getTargetRootList', newData, function (res) {
        if (res.success) {
          self.targetList = []
          // self.targetList = res.obj
           for (let item of res.obj) {
              item.styleName = self.resultTypeObj[item.result_type]
              self.targetList.push(item)
            }
        } else {
          // error
          alert('error')
        }
      })
    },
    
    showNextFn(id){
      //  console.log('id',id)
      if (this.showNext === id) {
        // 关闭
        this.flagShowNext=true
        this.showNext = ''
        return
      }
      this.flagShowNext=false
      this.showNext = id
      // 进行ajax请求
      // 获取计划列表
      let data = {
          targetId: id,
          deptId: '',
          pageNumber: 1,
          pageSize: 1000
        }
        this.getPlanList(data)
        // 获取目标列表
        let plandata = {
        deptId: '',
        parentId: id, // 父目标ID
        pageNumber: 1, // 页码
        pageSize: 1000// 每页显示条数
      }
      this.getChildTargetList(plandata)
    },
    // 请求计划列表
    getPlanList (data) {
       this.planList = []
      this.$ajaxMore('post', this.HOST + '/tr/trPlan/web/getPlanLists', data, (res) => {
        if (res.success) {         
          for (let item of res.obj) {
            item.styleName = this.resultTypeObj[item.result_type]
            this.planList.push(item)
          }
        } else {
          // error
          alert('error')
        }
      })
    },
    // 请求子目标
    getChildTargetList (data) {
      this.childTargetList = []
      this.$ajaxMore('post', this.HOST + '/tr/trTarget/web/getTargetList', data, (res) => {
        if (res.success) {         
          for (let item of res.obj) {
            item.styleName = this.resultTypeObj[item.result_type]
            this.childTargetList.push(item)
          }
        } else {
          alert('失败')
        }
      })
    },
  //  填报进度
  showReportPogressPlan(row){
     let nowData=''
     if(row.month.length>0){
       nowData=row.month[new Date().getMonth()].monthStatus  
     }else{
       nowData=0
     }
      // console.log(nowData)  
      this.$router.push({path: '/reportProgress/' +row.id+ '/'+nowData})
  },
  // 提交审核
  showSh (id) {
      this.$router.push({
        path: '/tjsh/' + id
      })
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
  font-size: 0.3rem;
  margin-bottom: 0.1rem;
  /* line-height: 0.32rem; */
}
.flexLink p{
  font-size: 0.2rem;
  /* line-height: 0.16rem; */
}
/* 预警通知 */
.w_marquee .noticL{
  float: left;
  width: 25%
}
.w_marquee .noticL .iconfont{
  font-size: 0.6rem;
  color: #f56c6c;
  vertical-align: middle
}
.w_marquee .noticL p{
  display: inline-block;
  font-size: 0.28rem;
  line-height: 1.6;
  color: #f56c6c;
  width: 40%;
  vertical-align: middle
}
.w_marquee .noticR{
  float: left;
  width: 75%;
}

/* 标题通用 */
.view_cell{
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 22px;
    padding: 11px 10px;
    font-size: 0.28rem;
    color: #555
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
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  background-color: #70ad47;
  vertical-align: 1px;
}
.view_cell .view_cell_icon .iconfont{
  /* line-height: 0.28rem; */
  font-size: 0.24rem;
  color: #fff
}
/* // 查看更多 */
.w_more{
float: right;
font-size: 0.2rem;
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
  /* line-height: 0.26rem; */
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
    /* line-height: 0.22rem; */
    color: #adadad;
    /* vertical-align: top; */
    margin-right: 3px;
}
.w_list_item .state{
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 12px;
    line-height: 12px;
    padding: 3px 5px;  
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
  border:1px solid #333;
  background: #333;
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

/* .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
} */
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
    width: 100%;
}
.noticR .seamless-warp li{
    height: 24px;
   line-height: 24px
}
.noticR .seamless-warp li a{
  display: inline-block;
  width: 95%;
   font-size: 0.22rem;
   color: #666;
   white-space: nowrap;
   text-overflow:ellipsis;
   overflow:hidden;
}
.font_hidden {
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  font-size: 0.28rem;
}
.time_box {
  font-size: 0.24rem;
}
</style>