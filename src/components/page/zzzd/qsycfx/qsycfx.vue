<template>
  <div style="margin-top: 70px">
    <div style="background: #fff;height: 100%;box-sizing: border-box;overflow-y: scroll;border-bottom:1px solid #f3f3f3">
      <div class="top_div"></div>
      <a href="javascript:void(0)" @click="selectZhiBiao" class="add_new_chart">
        <i class="iconfont">&#xe612;</i>
        <span>自定义分析</span>
      </a>
    </div>
    <!-- chart容器 -->
    <div class="chart_box" v-for="(item, index) in chartDates" :key="index +'tme'">
      <div class="box_header"><span class="box_header_span"></span><span>{{item.title}}</span></div>
      <div class="chart_box_item"></div>
    </div>
  <!-- <div> -->

  </div>
  <!-- </div> -->
</template>
<script>
  import { Toast } from 'mint-ui';
export default {
  name:'sjxf-fx',
  data () {
    return {
      chartDates:[], //图表数据
      colorArr: ['#70ad47', '#ed7d31', '#ffc000',
        '#4472c4', '#dd6969', '#00a6a6',
        '#6c6fbf', '#62a8ea', '#ffb980',
        '#d56290'
      ],
      colorIndex: 0 // 颜色的随机颜色
    }
  },
  watch: {
    userId(val){
      console.log('当前使用者',val);
      this.chartDates = [];
      let {currentRoute}  = this.$router;
      let {path}  = currentRoute;
      this.$router.replace(path);
      this.processPageLogic()
    },
  },
  props: {
    userId: String,
  },
  mounted () {
     console.log(this.$router);
    //processPageLogic
    this.processPageLogic()
  },
  methods : {
    selectZhiBiao () {
      let {currentRoute}  = this.$router;
      let {path}  = currentRoute;
      this.$router.push({path: '/custom-fx/',query:{userId:this.userId,max:2,beforePath:path}})
    },
    processPageLogic () {
      //拿到参数
      let {addNew} = this.$route.query;
      if(addNew === undefined){  //加载历史数据
       this.getJob().then(()=>{
         this.getChart().then(this.showChart)
       })
      }else{//添加新的图表
        let param  = this.$route.query;
        this.getJob().then(()=>{
          this.addChartToDataBase(param)
        })

      }
    },
    getChart () {
      this.chartDates = [];
      let data = {
        deptId: this.job.split(',')[0],
        indexType: this.userId,
        reform_type: 2
      };
      let promist = new Promise((resolve, reject) => {
        this.$ajax('post', this.HOST + '/tr/autognosis/web/getHistoricalData', data, (res) => {
          if (res.success) {
            for (let item of res.obj) {
              this.$ajaxMore('post', this.HOST + '/tr/GM/web/forecast', item, (res1) => {
                if (res1.success) {
                  console.log(res1);
                  if (res.obj) {
                    res1.obj.data.id = item.id;
                    res1.obj.data.chartType = item.chartType;
                    this.chartDates.push(res1.obj.data);
                    setTimeout(() => {
                      resolve()
                    }, 150)
                  }
                } else {
                  this.$message({
                    type: 'error',
                    message: res1.msg
                  })
                }
              })
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      });
      return promist;


    },
    addChartToDataBase (param) {
        let data = {
          deptId: this.job.split(',')[0],
          indexType: this.userId,
          reform_type: 2
        };
         Object.assign(data, param); //合并对象
        this.$ajaxMore('post', this.HOST + '/tr/GM/web/forecast', data, (res) => {
          if (res.success) {
            // 执行成功的操作
            this.$ajaxMore('post', this.HOST + '/tr/autognosis/web/saveHistoricalData', data, (res) => {
              if (res.success) {
                Toast({
                  message: '添加成功',
                  position: 'middle',
                  duration: 3000
                });
                this.getChart().then(this.showChart)
              } else {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 3000
                });
              }
            })
          } else {
            Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
          }
        })

    },
    showChart () {
      this.colorIndex = 0;
      for (let i = 0; i < this.chartDates.length; i++) {
        this.showEveryChart(this.chartDates[i], document.getElementsByClassName('chart_box_item')[i])
      }
    },
    showEveryChart: function (data, ele) {
      let myChart = this.$echarts.init(ele);
      let option = {
        // color: this.colorArr[this.colorIndex],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['预测值', '实际值']
        },
        toolbox: {
          // show: true,
          // right: '30',
          // feature: {
          //   dataView: {show: true, readOnly: false},
          //   magicType: {show: false, type: ['line', 'bar']},
          //   restore: {show: true},
          //   saveAsImage: {show: true}
          // }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // xAxis: [
        //   {
        //     type: 'category',
        //     data: data.datax,
        //     axisTick: {
        //       alignWithLabel: true
        //     }
        //   }
        // ],
        // yAxis: [
        //   {
        //     type: 'value'
        //   }
        // ],
        series: [
          {
            name: '',
            // type: 'bar',
            // barWidth: '60%',
            color: '#ed7d31',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3 // 折线宽度
                }
              }
            }
            // data: data.datay
          },
          {
            name: '',
            // type: 'bar',
            // barWidth: '60%',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },

            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3 // 折线宽度
                }
              }
            }
            // data: data.datay
          }
        ]
      };
      data.chartType = 'line';
      if (data.chartType === 'bar') {
        // 柱形图
        for (let [key, item] of option.series.entries()) {
          item.type = 'bar';
          if (key === 0) {
            item.data = data.datay;
            item.name = '实际值'
          }
          if (key === 1) {
            item.data = data.datay1;
            item.name = '预测值';
            item.color = '#4472c4'
          }
        }
        // option.series.type = 'bar'
        option.xAxis = [
          {
            type: 'category',
            data: data.datax,
            axisTick: {
              alignWithLabel: true
            }
          }
        ];
        option.yAxis = [
          {
            type: 'value'
          }
        ];
        option.color = this.colorArr[this.colorIndex];
        // option.toolbox.feature.magicType = {show: false, type: ['bar', 'line']}
        if (this.colorIndex >= 9) {
          this.colorIndex = 0
        } else {
          this.colorIndex = this.colorIndex + 1
        }
      } else if (data.chartType === 'line') {
        // 折线图
        // option.series.type = 'line'
        for (let [key, item] of option.series.entries()) {
          item.type = 'line';
          if (key === 0) {
            item.data = data.datay;
            item.name = '实际值'
          }
          if (key === 1) {
            item.data = data.datay1;
            item.name = '预测值';
            item.color = '#70ad47'
          }
        }
        option.xAxis = [
          {
            type: 'category',
            data: data.datax,
            axisTick: {
              alignWithLabel: true
            }
          }
        ];
        option.yAxis = [
          {
            type: 'value'
          }
        ];
        option.color = this.colorArr[this.colorIndex];
        // option.toolbox.feature.magicType = {show: true, type: ['line', 'bar']}
        if (this.colorIndex >= 9) {
          this.colorIndex = 0
        } else {
          this.colorIndex = this.colorIndex + 1
        }
      } else if (data.chartType === 'pie') {
        // 饼图
        // option.series.type = 'pie'
        // option.series.radius = '55%'
        // option.series.center = ['50%', '50%']
        for (let item of option.series) {
          item.type = 'pie';
          item.radius = '70%';
          item.center = ['50%', '50%'];
          item.data = data.data
        }
        option.color = this.colorArr;
        option.tooltip = {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        }
      } else if (data.chartType === 'circle') {
        // 环形图
        for (let item of option.series) {
          item.type = 'pie';
          item.radius = ['50%', '70%'];
          item.center = ['50%', '50%'];
          item.data = data.data
        }
        option.color = this.colorArr;
        option.tooltip = {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        }
      } else if (data.chartType === 'funnel') {
        // 漏斗图
        for (let item of option.series) {
          item.type = 'funnel';
          item.data = data.data
        }
        option.color = this.colorArr;
        option.tooltip = {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        }
        // option.toolbox.feature.magicType = {show: true, type: ['line', 'bar']}
      }
      option.legend = {
        y: 30
      }
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    getJob: function () {
      let promist = new Promise((resolve, reject) => {
        // 获取用户的所有职务
        this.$ajax('post', this.HOST + '/tr/autognosis/web/autognosiShow', {}, (res) => {
          if (res.success) {
            console.log("getJOB",res.obj);
            this.job = res.obj[0].deptId + ',' + res.obj[0].roleId;

            console.log("TEST",this.job);
            //  获取用户在某一职务下的自我分析记录
            // this.getChart()
            // this.getTreeHtml()
            resolve();
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      });
      return promist;

    },
  }
}
</script>
<style scoped>
.add_new_chart {
  /* height: 1.26rem;
  box-sizing: border-box;
  border: 1px solid #eee;
  background: #f9f9f9;
  display: block;
  margin: 0 auto;
  text-align: center;
  color: #70ad47;
  align-items: center;
  display: flex;
  justify-content: center; */
  
      width: 6.4rem;
    height: 1.26rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #eee;
    background: #f9f9f9;
    display: block;
    text-align: center;
    color: #70ad47;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
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
.li_first {
  height: 1.24rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.del_box {
  position: absolute;
  width: 0.36rem;
  height: 0.36rem;
  background: pink;
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
.chart_box{
  margin-top:0;
  margin-bottom: 0.2rem;
  padding: 0.1rem 0;
}
</style>
