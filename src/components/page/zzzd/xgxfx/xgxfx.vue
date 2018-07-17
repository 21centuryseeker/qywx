<template>
  <!-- <div> -->
    <div style="background: #fff;padding-top: 1.14rem;height: 100%;box-sizing: border-box;overflow-y: scroll;">
      <div class="top_div"></div>
      <div>
          <a href="javascript:void(0)" class="add_new_chart" @click="addNewXgxItem">
            <i class="iconfont">&#xe612;</i>
            <span>自定义分析</span>
          </a>
      </div>

      <!-- 表格的容器 -->
           <div class="warrpContent">
             <div style=" border-top:1px solid #f3f3f3;"> 
                <template v-for="item in content_xgx" class="warrpContentBorder">
                      <div class="xgx_content boxShadow" :key="item.id">
                        <span class="close_iBox">
                          <i class="iconfont close_i" @click="deleteItem(item.id)" title="删除分析项">&#xe635;</i>
                        </span>
                        <div class="xgx_title">
                          <span class="borderGreen"></span>
                          {{item.tableMap.tableTitle}}相关性分析  
                        </div>
                        <div class="item">
                          <!-- table表格 -->
                          <div class="xgx_table">
                              <div class="sti-tbl-container">
                                <table>
                                  <thead>
                                    <tr>
                                      <th width="40%">{{item.tableMap.name1}}</th>
                                      <th>{{item.tableMap.name2}}</th>
                                      <th>{{item.tableMap.name3}}</th>
                                    </tr>
                                  </thead>
                                    <tbody >
                                    <template v-for="(itemtr,indextr) in item.tableMap.tableData" >
                                        <tr :key="indextr">
                                            <td>{{itemtr.name}}</td>
                                            <td>{{itemtr.value1}}</td>
                                            <td>{{itemtr.value2}}</td>
                                        </tr>
                                    </template>
                                  </tbody>
                                </table>
                              </div>
                          </div>
                            <!-- echarts表格 -->
                          <div class="xgx_picBox ">
                            <div class="xgx_fx">相关系数<span class="xgx_blue">{{item.relaDegree}}</span></div>
                            <div class="xgx_pic"></div>     
                          </div>
                        </div>
                      </div>
                </template>
             </div>

      </div>
    </div>
  <!-- </div> -->
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      job:'',//id
      type:1,//角色
      content_xgx:[],//历史数据
      chartDates:[], //图表数据
      colorArr: ['#70ad47', '#70ad47', '#ed7d31', '#ffc000', '#4472c4', '#dd6969', '#00a6a6'],
      colorIndex: 0,
    }
  },
  mounted () {
     this.type = this.$route.params.type.toString()
    // 获取用户的所有职务
    this.$ajax('post', this.HOST + '/tr/autognosis/web/autognosiShow', {}, (res) => {
      if (res.success) {
        // this.jobItems = res.obj
        this.job = res.obj[0].deptId
        //  获取用户在某一职务下的自我分析记录
        this.historyFn()
      } else {
       Toast({
        message: '操作失败',
      });
      }
    })
  },
  watch: {
    // 监听路由变化
    '$route' (to, from) {
        this.type = this.$route.params.type
        this.historyFn()
    }
  },
  methods: {
    // 点击按钮添加自定义分析
    addNewXgxItem () {
      this.$router.push({path: '/zgsjfx/zzzd/xgxfx/addItwm/'+this.type})
    },
    // 获取历史纪录
        // 初始化页面
    historyFn () {
      let self = this
      this.content_xgx = []
      let dataNew = {
        deptId: self.job,
        type: self.type
      }
      self.$ajax('post', this.HOST + '/tr/trCA/web/getrAllRelaData', dataNew,
        function (res) {
          if (res.success) {
            if (res.obj) {
              self.content_xgx = res.obj
              // 将每一个的里面的图表放到一个对象里面   
              for (let item of res.obj) {
                let chartDatesArry = []
                for (let item1 of item.tableMap.tableData) {
                  chartDatesArry.push([item1.value1, item1.value2])
                }
                self.chartDates.push(chartDatesArry)
              }
              setTimeout(() => {
                self.xgx_picfn()
              }, 150)
            }
          } else {
            Toast({
              message: '操作失败',
            });
          }
        }
      )
    },
    // 绘制charts图
    xgx_picfn () {
      this.colorIndex = 0
      for (let i = 0; i < this.chartDates.length; i++) {
        if(this.colorIndex<7){
          this.colorIndex++
        }else{
          this.colorIndex--
        }
        this.showEveryChart(this.chartDates[i], document.getElementsByClassName('xgx_pic')[i])
      }
    },
    // 生成图表
    showEveryChart (data, ele) {
      let myChart = this.$echarts.init(ele)
      var option = {
        xAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true
          }
        ],
        toolbox: {
          // show: true,
          // feature: {
          //   mark: {show: true},
          //   dataZoom: {show: true},
          //   dataView: {show: true, readOnly: false},
          //   restore: {show: true},
          //   saveAsImage: {show: true}
          // }
        },
        animation: false,
        series: [
          {
            name: 'scatter1',
            type: 'scatter',
            symbolSize: 10,
            data: data,
            itemStyle: {
              normal: {
                color: this.colorArr[this.colorIndex]
              }
            }
          }
        ]
      }
     myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    // 删除这一项
    deleteItem(id){
      let data = {
        id: id
      }
      this.$ajax('post', this.HOST + '/tr/trCA/web/delHistoryParam', data, (res) => {
        if (res.success) {
         Toast({
          message: '操作成功',
          iconClass: 'mintui mintui-success'
        });
          // this.chartDates = []
          this.historyFn()
        } else {
           Toast({
              message: '操作失败',
            });
        }
      })
  }
  

  }
}
</script>
<style scoped>
.add_new_chart {
  width: 6.4rem;
  height: 1.26rem;
  box-sizing: border-box;
  border: 1px solid #eee;
  background: #f9f9f9;
  display: block;
  text-align: center;
  color: #70ad47;
  align-items: center;
  display: flex;
  justify-content: center;
  /* margin-top: 0.36rem; */
  margin: 0.4rem auto;
}
.add_new_chart span {
  font-size: 0.28rem;
  margin-left: 0.35rem;
}
.add_new_chart i.iconfont {
  font-size: 0.56rem;
}
div.table_item {
  display: flex;
  align-items: center;
}
div.item_left {
  width: 1.78rem;
}
div.item_right {
  width: 5.41rem;
  overflow-x: scroll;
  font-size: 0;
}
ul {
  border-top: 1px solid #dedede;
}
li {
  position: relative;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}
.common_title_div {
  height: 1.24rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.common_title_div_2 {
  height: 0.74rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.del_box {
  position: absolute;
  width: 0.36rem;
  height: 0.36rem;
  top: 0;
  right: 0;
  background: linear-gradient(to top right,transparent 0%, transparent 50%,#bdd7ad 50%, #bdd7ad 100%);
  color: #fff;
}
.del_box i {
  position: absolute;
  color: #fff;
  right: 0.02rem;
  top: 0.02rem;
  font-size: 0.13rem;
}
.item_right_child {
  font-size: 0;
  width: auto;
}
.item_right_ul {
  width: 1.8rem;
  display: inline-block;
}
.item_right td {
  width: 1.8rem;
}
.item_right td button {
  width: 1.8rem;
}
table {
  border-spacing: 0;
  border-color: #dedede;
  border-collapse: collapse;
  border: 0;
}
table div {
  font-size: 0.22rem;
  color: #333;
}
table table td {
  box-sizing: border-box;
}
.scroll_table_box .del_box {
  background: linear-gradient(to top right,transparent 0%, transparent 50%,#cbcbcb 50%, #cbcbcb 100%);
}
table button {
  border: 1px solid #dedede;
  font-size: 0.18rem;
  color: #77b150;
  width: 1.06rem;
  height: 0.42rem;
  box-sizing: border-box;
  border-radius: 0.04rem;
  background: transparent;
}
.table_left {
  background: #f4f9f1;
}
.xgx_picBox{
  /* background-color: #fff; */
position: relative;
}
.xgx_picBox .xgx_pic{
  height: 6rem;
}
  .xgx_picBox .xgx_fx{
    /* position: absolute;
    left: 30px;
    right: 0; */
    font-size: 0.26rem
  }
  .xgx_table{
    padding-bottom: 0.15rem
  }
    .xgx_table table{
     width: 100%;
     margin: 0 auto;
     text-align: center;
     border: 1px solid #ebeef5;
     border-collapse: collapse;
   }
   .xgx_table table th{
    color: #fff;
    background-color: #70ad47;
    line-height: 0.3rem;
    font-size: 0.14rem
   }
   .xgx_table table th,
   .xgx_table table td{
    font-size: 0.24rem;
     padding:5px;
     border: 1px solid #ebeef5;
     border-collapse: collapse;
     font-weight: normal;
     line-height: 1.4
   }
    .xgx_table table td{
      line-height: 1.6
    }
   .xgx_fx{
     position: absolute;
     left: 0;
     top: 0
   }
 .xgx_title  {
   position: relative;
    padding-left: 0.12rem;
   font-size: 0.28rem;
   padding-bottom: 0.2rem
 }
 .xgx_title span{
   position: absolute;
       left: 0;
    top: 0.04rem;
   display: inline-block;
   /* font-size: 0.26rem; */
   margin-bottom: 5px;
   /* border-left:0.08rem solid #70ad47; */
   height: 0.24rem;
    width: 0.08rem;
    border-radius: 0.04rem;
    background: #70ad47;
    vertical-align: middle
 }
  .warrpContent{
    background-color:#f3f3f3;
   
  }
  .warrpContentBorder{
     border-top: 1px solid #e4e4e4
  }
 .xgx_content{
    width: 94%;
    padding: 10px 3% 0 3%;
    background-color: #fff;
    margin-bottom: 0.2rem;
 }
 .close_iBox{
   display: block;
   text-align: right
 }
 .close_i{
   font-size: 0.36rem;
   /* float: right; */
   color: red
 }
 .xgx_blue{
   color: #70ad47;
   font-size: 0.3rem;
   font-weight: bold;
   padding-left: 5px
 }
</style>
