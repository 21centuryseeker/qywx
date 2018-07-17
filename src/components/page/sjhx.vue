<template>
  <div>
    <!-- 基本情况 -->
    <div class="jbqk_box">
      <div class="box_header"><span class="box_header_span"></span><span>基本情况</span></div>
      <div class="box_container flex_box">
        <a href="javascript:void(0)" class="a_to_div inline_flex_box"></a>
        <a href="javascript:void(0)" class="a_to_div inline_flex_box"></a>
        <a href="javascript:void(0)" class="a_to_div inline_flex_box"></a>
        <a href="javascript:void(0)" class="a_to_div inline_flex_box"></a>
        <a href="javascript:void(0)" class="a_to_div inline_flex_box"></a>
      </div>
    </div>
    <!-- chart容器 -->
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span><span>办学条件</span></div>
      <div id="chart_szjg" class="chart_box_item"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    let res = {"success":true,"msg":"操作成功","obj":null,"data":{"id":"102","series":[{"name":"师资结构","data":[{"name":"专任教师","value":"90"},{"name":"省级以上名师","value":"80"},{"name":"外籍教师数量","value":"10"},{"name":"专业带头人","value":"60"},{"name":"校级以上专业（学科）带头人","value":"90"},{"name":"校级以上专业（学科）骨干教师","value":"20"},{"name":"骨干教师数量","value":"100"},{"name":"副高级以上职称教师","value":"50"},{"name":"实践教学专职指导教师","value":"840"},{"name":"校内实训教学专职指导教师","value":"90"},{"name":"双师型教师","value":"30"}],"type":"pie"}],"chartType":"2","title":"师资结构","legend":["专任教师","省级以上名师","外籍教师数量","专业带头人","校级以上专业（学科）带头人","校级以上专业（学科）骨干教师","骨干教师数量","副高级以上职称教师","实践教学专职指导教师","校内实训教学专职指导教师","双师型教师"]}}
        res.data.series[0].radius = ['0%', '60%']
        res.data.series[0].center = ['50%', '50%']
        res.data.series[0].label = {
          normal: {
            show: true
          }
        }
        let titleData = {
          text: res.data.title,
          textStyle: {
            color: '#555',
            fontSize: '0.3rem'
          },
          padding: [0, 0, 0, '0.35rem']
        }
        this.$ChartUtil.drawChartNoXY('chart_szjg', res.data.title, [], this.$ChartUt.VERTICAL, res.data.series, [], {
          title: {
            show: false
          }
        }, this)
  }
}
</script>
<style scoped>
  .box_header {
    height: 0.94rem;
    background: #fff;
    line-height: 0.94rem;
    font-size: 0.28rem;
    color: #555;
    padding-left: 0.47rem;
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
    background: pink;
    margin: 0.07rem;
  }
  .inline_flex_box {
    display: inline-flex;
  }
  .box_container {
    background: #fff;
    padding: 0 0.36rem;
  }
  .chart_box {
    margin-top: 0.2rem;
    height: 5.5rem;
    background: #fff;
  }
  .chart_box_item {
    height: 4.9rem;
    padding: 0 0.44rem;
    box-sizing: border-box;
  }
</style>