<template>
  <div style="height:100vh;overflow: scroll;" class="target_list">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomDistance="bottomDistance" :bottomPullText='bottomText' @translate-change="translateChange" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
      <div style="min-height: 100vh;background: #fff;">
      <template v-for="item in targetList">
        <div class="w_list_item" :key="item.id">
              <div class="view_cell"  @click="showDetail(item)" @touchstart="touchstart(item.id)" @touchmove="touchmove" @touchend="touchend">
                <div class="father_box">
                  <a href="javascript:void(0)" class="link">
                      <h5 class="w_pull-right">
                        <span class="font_hidden">{{item.content}}</span>
                        <!-- <i class="iconfont" v-if="showNext !== item.id">&#xe667;</i> -->
                        <!-- <i class="iconfont" v-if="showNext === item.id">&#xe62e;</i> -->
                        <i class="iconfont" >&#xe62e;</i>
                      </h5>
                      <p class="time_box"><i class="iconfont">&#xe64c;</i>{{item.create_time}}</p>
                      <p class="state state_yellow" :class="typeSelect[item.message_type]">{{typeSelect[item.message_type]['label']}}</p>
                  </a>
                  <!-- <div class="detailLink">
                    <a href="javascript:void(0)" @click="$router.push({path: '/targetDetail/' + item.id})">查看详情</a>
                  </div>   -->
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
import { MessageBox, Toast } from 'mint-ui'
import { clearTimeout } from 'timers';
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
      typeSelect: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '系统通知'
        }, {
          value: '2',
          label: '预警通知'
        }, {
          value: '3',
          label: '专家答疑'
        }, {
          value: '4',
          label: '目标与计划'
        }],
        isMove: false,
        isEnd: false,
        url: ''
    }
  },
  mounted () {
    // window.clearTimeout(this.$mytimer)
    this.url = this.$route.path
    // 获取计划列表
    let data = {
      startTime: '',
      endTime: '',
      descStr: 'true',
      pageNumber: this.currentPage,
      pageSize: this.pageSize
    }
    this.refreshDom(data)
  },
  methods: {
    touchstart (id) {
      this.isMove = false
      this.isEnd = false
      // window.clearTimeout(this.$mytimer)
      this.$mytimer = setTimeout( () => {
        if (!this.isMove && this.$route.path === this.url && this.$mytimer && !this.isEnd) {
          this.longTap(id)
        }
      },1000)
    },
    touchmove () {
      this.isMove = true
    },
    touchend () {
      this.isEnd = true
    },
    longTap (v, e) {
      MessageBox({
          title: '提示',
          message: '你确认删除该条通知?',
          showCancelButton: true
        }).then((action) => {
          if (action === 'confirm') {
            // 执行删除操作
            this.$ajax('post', '/tr/trUser/web/delBatchMessage?list=' + v, {},  (res) => {
              if (res.success) {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                })
                this.targetList = []
                let data = {
                  startTime: '',
                  endTime: '',
                  descStr: 'true',
                  pageNumber: 1,
                  pageSize: this.pageSize
                }
                this.refreshDom(data)
              } else {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 3000
                })
              }
            })
          }
        }).catch((action) => {
          // console.log(action)
          // clearTimeout(this.timeoutflag)
        })
    },
    showDetail (v) {
      // console.log(a)
      // let v = a.v
      // let self = this
      // self.type = v.reform_type
      // self.reformId = v.reform_id
      // self.Id = v.id
      // self.userType = v.userType
      // self.messStaue = v.message_status // 未读已读状态

      // if (self.messStaue - 0 === 1) {
        if (v.reform_type - 0 === 1) {
          if (v.userType - 0 === 1) {
            this.$router.push({path: '/targetDetail/' + v.reform_id})
          } else {
            this.$router.push({path: '/targetDetail/' + v.reform_id})
          }
        } else if (v.reform_type - 0 === 2) {
          if (v.userType - 0 === 1) {
            this.$router.push({path: '/planDetail/' + v.reform_id})
          } else if (v.userType - 0 === 2) {
            this.$router.push({path: '/planDetail/' + v.reform_id})
          } else if (v.userType - 0 === 3) {
            this.$router.push({path: '/planDetail/' + v.reform_id})
          } else if (v.userType - 0 === 4) {
            this.$router.push({path: '/planDetail/' + v.reform_id})
          }
        } else {
          this.$router.push({path: '/index/zgzjpt'})
        }
      // } else {
      // 1系统通知 2预警通知 3 专家答疑 4 目标与计划
      // reform_type 1 目标 2 计划 3专家答疑
            // if (self.type - 0 === 1) {
            //   if (self.userType - 0 === 1) {
            //     self.$router.push({path: '/targetDetail/' + self.reformId})
            //   } else {
            //     self.$router.push({path: '/shTargetDetail/' + self.reformId})
            //   }
            // } else if (self.type - 0 === 2) {
            //   if (self.userType - 0 === 1) {
            //     self.$router.push({path: '/wfzPlanDetail/' + self.reformId})
            //   } else if (self.userType - 0 === 2) {
            //     self.$router.push({path: '/wshPlanDetail/' + self.reformId})
            //   } else if (self.userType - 0 === 3) {
            //     self.$router.push({path: '/wcyPlanDetail/' + self.reformId})
            //   } else if (self.userType - 0 === 4) {
            //     self.$router.push({path: '/wjdPlanDetail/' + self.reformId})
            //   }
            // } else {
            //   self.$router.push({path: '/zgzjdyyjy'})
            // }
      // }
    },
    refreshDom (data,func) {
      this.$ajaxMore(
        'post',
        '/tr/trUser/web/getUserMessageInfo',
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
    loadTop () {
      // 刷新数据
      this.currentPage = 1
      // this.showNext = ''
      this.targetList = []
      let data = {
        startTime: '',
        endTime: '',
        descStr: 'true',
        pageNumber: this.currentPage,
        pageSize: this.pageSize
      }
      this.refreshDom(data, () => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadBottom() {
      // 加载更多数据
      this.currentPage++
      let data = {
        startTime: '',
        endTime: '',
        descStr: 'true',
        pageNumber: this.currentPage,
        pageSize: this.pageSize
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
    font-size: 14px;
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
  font-size: 14px;
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
    font-size: 12px;
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
    font-size: 12px;
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
   font-size: 10px;
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
    font-size: 12px;
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
