<template>
  <div style="height:100vh;overflow: scroll;" class="target_list">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomDistance="bottomDistance" :bottomPullText='bottomText' @translate-change="translateChange" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
      <div style="min-height: 100vh;background: #fff;">
      <template v-for="item in targetList">
        <div class="w_list_item" :key="item.id">
              <div class="view_cell">
                <div class="father_box">
                  <a href="javascript:void(0)" class="link" @click="showNextFn(item.id)">
                      <h5 class="w_pull-right">
                        <span class="font_hidden">{{item.target_name}}</span>
                        <i class="iconfont" v-if="showNext !== item.id">&#xe667;</i>
                        <i class="iconfont" v-if="showNext === item.id">&#xe62e;</i>
                        <!-- <i class="iconfont">&#xe62e;</i> -->
                      </h5>
                      <p class="time_box"><i class="iconfont">&#xe64c;</i>{{item.start_time}} - {{item.end_time}}</p>
                      <p class="state state_yellow" :class="resultTypeObj[item.result_type]">{{item.result_type}}</p>
                  </a>
                  <div class="detailLink">
                    <a href="javascript:void(0)" @click="$router.push({path: '/targetDetail/' + item.id})">查看详情</a>
                  </div>  
                </div>
                <div class="nextBox">
                  <transition name="slide-fade">
                    <template v-if="showNext === item.id">
                      <div>
                        <template v-for="planitem in planList">
                      <div class="child_box" :key="planitem.id">
                        <a href="javascript:void(0)" class="link" @click="$router.push({path: '/planDetail/' + planitem.id})">
                            <h5 class="w_pull-right">
                              <span class="font_hidden">{{planitem.plan_name}}</span>
                              <i class="iconfont">&#xe62e;</i>
                              <!-- <i class="iconfont">&#xe62e;</i> -->
                            </h5>
                            <p class="progress">
                              <i class="iconfont">&#xe695;</i>
                              
                              <mt-progress :value="planitem.progress - 0" :bar-height="5"></mt-progress>
                              {{planitem.progress - 0}}%</p>
                            <p class="time_box"><i class="iconfont">&#xe64c;</i>{{planitem.start_time}} - {{planitem.end_time}}</p>
                            <p class="state state_yellow"  :class="resultTypeObj[planitem.result_type]">{{planitem.result_type}}</p>
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
                          <a href="javascript:void(0)" class="green_link" @click="showReportPogressPlan(planitem)">填报进度</a>
                          <a href="javascript:void(0)" class="submit_link" @click="showSh(planitem.id)">提交审核</a>
                      </div>
                      </div>
                      </template>
                      <!-- 字目标列表 -->
                      <template v-for="targetItem in childTargetList">
                        <div class="father_box child_box" :key="targetItem.id"  @click="$router.push({path: '/targetDetail/' + targetItem.id})">
                        <a href="javascript:void(0)" class="link" >
                        <h5 class="w_pull-right">
                          <span class="font_hidden">{{targetItem.target_name}}</span>
                          <i class="iconfont">&#xe62e;</i>
                        </h5>
                        <p class="time_box"><i class="iconfont">&#xe64c;</i>{{targetItem.start_time}} - {{targetItem.end_time}}</p>
                        <p class="state state_yellow"  :class="resultTypeObj[targetItem.result_type]">{{targetItem.result_type}}</p>
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
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">
          <mt-spinner type="triple-bounce" color="#70ad47" style="margin: 0 auto;display: inline-block;margin-top: 5px;"></mt-spinner>
        </span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'pull' }">↑</span>
        <span v-show="bottomStatus === 'loading'">
          <mt-spinner type="triple-bounce" color="#70ad47" style="margin: 0 auto;display: inline-block;margin-top: 5px;"></mt-spinner>
        </span>
      </div>
      <div v-if="allLoaded" class="no_more_data">
        <div class="no_more_data_line"></div>
        <span class="no_more_data_span">没有更多了哦</span>
      </div>
    </mt-loadmore> 
  </div>
</template>
<script>
// import tjshCommon from './tjshCommon.vue'
import { Toast } from 'mint-ui'
export default {
  components: {  },
  data () {
    return {
      showNext: '',
      bottomText: '上拉加载更多...',
      bottomDistance: 70,
      topStatus: 'loading',
      bottomStatus: '',
      allLoaded: false,
      pageSize: 10,
      currentPage: 1,
      targetList: [],
      planList: [],
      childTargetList: [],
      // common
      fileList: [],
      targetStand: '',
      unit: '',
      completeValue: '',
      zhuangtai: '',
      myTime: '',
      flag: false,
      shuoming: '',
      resultTypeObj: {
        '未开始': 'state_gray',
        '进行中': 'state_yellow',
        '已完成': 'state_green',
        '已延期': 'state_orang',
        '延期完成': 'state_blue'
      },
    }
  },
  mounted () {
    // 获取计划列表
    let data = {
      targetClass: 5,
      descStr: 'true',
      pageNumber: this.currentPage,
      pageSize: this.pageSize
    }
    this.refreshDom(data)
  },
  methods: {
    //  填报进度
  showReportPogressPlan(row){
    let nowData=row.month[new Date().getMonth()].monthStatus  
     if(nowData){
        nowData = row.month[new Date().getMonth()].monthStatus
      }else{
       nowData=0
      }
       this.$router.push({path: '/reportProgress/' +row.id+ '/'+nowData})
  },
    showSh (id) {
      // 获取目标详情
      this.$router.push({
        path: '/tjsh/' + id
      })
    },
    refreshDom (data,func) {
      this.$ajaxMore(
        'post',
        this.HOST + '/tr/trTarget/web/getTargetRootList',
        data,
        (res) => {
          if (res.success) {
            if (res.obj && res.obj.length) {
              this.targetList = [...this.targetList, ...res.obj]
              this.allLoaded = false
            } else {
              this.allLoaded = true
            }
            if (func) {
              func()
            }
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
        }
      )
    },
    handleTopChange(status) {
        // this.moveTranslate = 1;
        this.topStatus = status;
      },
      handleBottomChange(status) {
        // this.moveTranslate = 1;
        this.bottomStatus = status;
      },
      translateChange(translate) {
        // const translateNum = +translate;
        // this.translate = translateNum.toFixed(2);
        // this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
    showNextFn(id){
      if (this.showNext === id) {
        // 关闭
        this.showNext = ''
        return
      }
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
    getPlanList (data) {
      this.$ajaxMore('post', this.HOST + '/tr/trPlan/web/getPlanLists', data, (res) => {
        if (res.success) {
          this.planList = res.obj
        } else {
          // error
          Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
        }
      })
    },
    getChildTargetList (data) {
      this.$ajaxMore('post', this.HOST + '/tr/trTarget/web/getTargetList', data, (res) => {
        if (res.success) {
          this.childTargetList = res.obj
        } else {
          Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
        }
      })
    },
    loadTop () {
      // 刷新数据
      this.currentPage = 1
      this.showNext = ''
      this.targetList = []
      let data = {
        targetClass: 5,
        descStr: 'true',
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
      }
      this.refreshDom(data, () => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadBottom() {
      // 加载更多数据
      this.currentPage++
      let data = {
      targetClass: 5,
      descStr: 'true',
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
    }
    this.refreshDom(data, () => {
      this.$refs.loadmore.onBottomLoaded()
    })
    }
  }
}
</script>
<style scoped>
/* .target_list .mint-loadmore {
  height: 100vh;
} */
.target_list .loading-background{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transition: .2s linear;
  }
  .target_list .mint-spinner-snake {
    margin: 0 auto;
  }
th,h5 {
  font-weight: normal;
}
body {
  background: #fff;
}

/* 标题通用 */
.view_cell{
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 22px;
    padding: 11px 10px;
    font-size:  0.28rem;
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
  line-height: 26px;
}
.w_list_item .w_pull-right i{
    font-size: inherit;
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
    font-size: 0.26rem;
    line-height: 22px;
    color: #adadad;
    vertical-align: top;
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
    font-size: 0.2rem;
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

/* .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to  {
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
.font_hidden {
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  font-size: 0.28rem;
}
.father_box .state{
  bottom: 0
}
.no_more_data {
  height: 31px;
  line-height: 31px;
  text-align: center;
  position: relative;
}
.no_more_data_line {
  height: 1px;
  position: absolute;
  background: #e0e0e0;
  top: 15px;
  width: 100%;
  z-index: 2;
}
.no_more_data_span {
  font-size: 0.14rem;
  position: relative;
  z-index: 3;
  padding: 0 5px;
  background: #f3f3f3;
}
.time_box {
  font-size: 0.24rem;
}
.mint-loadmore-bottom span, .mint-loadmore-top span {
  font-size: 0.4rem
}
</style>
