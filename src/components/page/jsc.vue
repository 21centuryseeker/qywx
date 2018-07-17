<template>
  <div>
      <!-- chart容器 -->
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_001" class="chart_box_item"></div>
    </div>
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_002" class="chart_box_item"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      baseUrl: this.HOST + '/tr/GroupPortrait/web/getPortraitInfoById',
    }
  },
  mounted () {
    this.$ajax(
        'post',
        this.HOST + '/tr/trCockpit/web/getChartDataById',
        {
          chartId: 1
        },
        res => {
          if (res.success) {
            let series = [
              {
                name: '学生人数',
                type: 'bar',
                data: res.obj.datay2List
              },
              {
                name: '教师人数',
                type: 'bar',
                data: res.obj.datay1List
              }
            ]
            this.$ChartUtil.drawChart('chart_001', res.obj.title, [], '', series, res.obj.dataxList, false, {
              grid: {
                  x: 50,
                  y: 80,
                  x2: 30,
                  y2: 40
                },
              yAxis : [
                {
                  type : 'value',
                  name :'（人）'
                }
              ],
              tooltip : {
                trigger: 'axis',
                formatter : '{b}<br/>{a0}:{c0}人<br/>{a1}:{c1}人'
              },
              legend: {
                data: ['学生人数', '教师人数'],
                y: 50
              },
            }, this)
          }
        }
      )
      this.$ajax(
        'post',
        this.HOST + '/tr/trCockpit/web/getChartDataById',
        {
          chartId: 2
        },
        res => {
          if (res.success) {
            let series = [
              {
                name: '学生人数',
                type: 'bar',
                data: res.obj.datayList
              }
            ]
            this.$ChartUtil.drawChart('chart_002', res.obj.title, [], '', series, res.obj.dataxList, false, {
              grid: {
                  x: 50,
                  y: 80,
                  x2: 30,
                  y2: 40
                },
              yAxis : [
                {
                  type : 'value',
                  name :'（人）'
                }
              ],
              tooltip : {
                trigger: 'axis',
                formatter : '{b}<br/>{c0}人'
              },
            }, this)
          }
        }
      )
  },
  methods: {
    
  }
}
</script>
<style scoped>
.chart_box {
  position: relative;
}
  .chart_box .box_header {
    height: 0.94rem;
    background: #fff;
    line-height: 0.94rem;
    font-size: 0.28rem;
    color: #555;
    padding-left: 0.47rem;
    position: absolute;
  }
  .box_header_span+span {
    font-size: 0.28rem;
  }
  .box_header_span {
    display: inline-block;
    height: 0.24rem;
    width: 0.08rem;
    border-radius: 0.04rem;
    background: #70ad47;
    vertical-align: top;
    margin-top: 0.37rem;
    margin-right: 0.13rem;
  }
  .flex_box {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
  }
  .a_to_div {
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: 0.06rem;
    /* background: pink; */
    margin: 0.07rem;
    text-align: center;
  }
  .a_to_div2 {
    display: block;
    width: 3rem;
    height: 3rem;
    border-radius: 0.06rem;
    /* background: pink; */
    margin: 0.07rem;
    text-align: center;
  }
  /* .inline_flex_box {
    display: inline-flex;
  } */
  .box_container {
    background: #fff;
    padding: 0 0.36rem;
  }
  .chart_box {
    margin-bottom: 0.2rem;
    height: 5.5rem;
    background: #fff;
    margin-top: 0;
  }
  .chart_box_item {
    height: 4.9rem;
    padding: 0 0.44rem;
    box-sizing: border-box;
  }
  .a_item_num, .a_item_title {
    color: #fff;
  }
  .a_item_num {
    font-size: 0.48rem;
    height: 0.88rem;
    line-height: 0.88rem;
    padding-top: 0.2rem;
  }
  .a_item_title {
    font-size: 0.22rem;
  }
  .a_item_num span {
    font-size: 0.22rem;
  }
  .baceee {
    background: #eee;
  }
  .baceee .a_item_num {
    color: #70ad47;
  }
  .baceee .a_item_title {
    color: #999;
  }
  .marginTop02rem {
    margin-top: 0.2rem;
  }
</style>