<template>
  <!-- <div v-swipeleft="swipeleft"> -->
  <div>
        <!-- 基本情况 -->
      <div class="jbqk_box">
        <div class="box_header"><span class="box_header_span"></span><span>基本情况</span></div>
        <div class="box_container flex_box">
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #ffc000;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_01}}<span>个</span></div>
              <div class="a_item_title">课程总数</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_02}}<span>个</span></div>
              <div class="a_item_title">公共素质课</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_03}}<span>个</span></div>
              <div class="a_item_title">专业课</div>
            </div>
          </a>
        </div>
      </div>
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
      isActive: 1,
      baseUrl: this.HOST + '/tr/GroupPortrait/web/getPortraitInfoById',
      // 基本情况
      value_1_01: '',
      value_1_02: '',
      value_1_03: '',
      tableList: []
    }
  },
  // watch: {
  //   isActive () {
  //     this.getAllData(this.isActive)
  //   }
  // },
  mounted () {
    this.$ajaxGet(this.baseUrl, {id: 33}, (res) => {
      if (res.success) {
        this.value_1_01 = res.data.value1
        this.value_1_02 = res.data.value2
        this.value_1_03 = res.data.value3
      }
    })
    this.getPie(34, 'chart_001')
    this.getPie(36, 'chart_002')
  },
  methods: {
    // pie
    getPie (id, dom) {
      this.$ajaxGet(
        this.baseUrl,
        {id: id},
        res => {
          if (res.success) {
            res.data.series[0].radius = ['0%', '60%']
            res.data.series[0].center = ['50%', '60%']
            res.data.series[0].label = {
              normal: {
                show: true,
                formatter: '{b}({c}' + res.data.unit + ')'
              }
            }
            this.$ChartUtil.drawChartNoXY(dom, res.data.title, [], this.$ChartUt.VERTICAL, res.data.series, [], {}, this)
          } else {
            
          }
        }
      )
    }
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
    width: 3.1rem;
    height: 3.1rem;
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
    margin-top: 0.2rem;
    height: 5.5rem;
    background: #fff;
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
    /* line-height: 0.88rem; */
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
  .a_item_father {
    margin-top: 50%;
    transform: translateY(-50%)
  }
  .table_div {
    background: #fff;
    margin-top: 0.2rem;
  }
  .table_box {
    width: 100%;
    text-align: center;
    font-size: 0.24rem;
  }
  .table_box thead td {
    background: #f4f9f1;
    color: #70ad47;
    height: 0.52rem;
    border-top: 1px solid #e1eed9;
    border-bottom: 1px solid #e1eed9;
  }
  .table_box tbody td {
    color: #888;
    height: 0.52rem;
  }
</style>