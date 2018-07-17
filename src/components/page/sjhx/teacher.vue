<template>
  <!-- <div v-swipeleft="swipeleft"> -->
  <div>
        <!-- 基本情况 -->
      <div class="jbqk_box">
        <div class="box_header"><span class="box_header_span"></span><span>基本情况</span></div>
        <div class="box_container flex_box">
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #ffc000;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_01}}<span>人</span></div>
              <div class="a_item_title">在职教职工人数</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_02}}<span>人</span></div>
              <div class="a_item_title">男总数</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_03}}<span>人</span></div>
              <div class="a_item_title">女总数</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_04}}:1</div>
              <div class="a_item_title">生师比</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #a5a5a5;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_05}}</div>
              <div class="a_item_title">教学事故</div>
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
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_003" class="chart_box_item"></div>
    </div>
    <!-- 各专业部毕业生人数分布情况 -->
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_004" class="chart_box_item"></div>
    </div>
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_005" class="chart_box_item"></div>
    </div>
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_006" class="chart_box_item"></div>
    </div>
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_007" class="chart_box_item"></div>
    </div>
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_008" class="chart_box_item"></div>
    </div>
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_009" class="chart_box_item"></div>
    </div>
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_010" class="chart_box_item"></div>
    </div>
    <!-- 表格 -->
    <div class="table_div">
      <table class="table_box" border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <td>德育机构名称</td>
            <td>机构成员</td>
            <td>担任职务</td>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in tableList">
            <tr :key="index">
              <td>{{item.value1}}</td>
              <td>{{item.value2}}</td>
              <td>{{item.value3}}</td>
            </tr>
          </template>
        </tbody>
      </table>
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
      value_1_04: '',
      value_1_05: '',
      tableList: []
    }
  },
  // watch: {
  //   isActive () {
  //     this.getAllData(this.isActive)
  //   }
  // },
  mounted () {
    this.$ajaxGet(this.baseUrl, {id: 40}, (res) => {
      if (res.success) {
        this.value_1_01 = res.data.value1
        this.value_1_02 = res.data.value2
        this.value_1_03 = res.data.value4
        this.value_1_04 = res.data.value6
        this.value_1_05 = res.data.value7
      }
    })
    //  获取当前学年教职工职称级别统计
    this.getPie(41, 'chart_001')
    this.getPie(42, 'chart_002')
    this.getLine(43, 'chart_003')
    this.getPie(44, 'chart_004')
    this.getOneLineBar(45, 'chart_005')
    this.getOneLineBar(46, 'chart_006')
    this.getDataZoom(47, 'chart_007', {y2: 80})
    this.getPie(48, 'chart_008')
    this.getSubText(49, 50, 'chart_009')
    this.getDataZoom(51, 'chart_010', {y2: 80, y: 80})
    // 表格
    this.$ajaxMore(
      'post',
      this.HOST + '/tr/GroupPortrait/web/getPortraitInfoByCon',
      {id: 52,
        pageSize: 1,
        pageLength: 10},
      res => {
        if (res.success) {
          this.tableList = res.data.data
        } else {
          
        }
      }
    )
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
    },
    getDataZoom (id, dom, grid) {
      this.$ajaxGet(
        this.baseUrl,
        {id: id},
        res => {
          if (res.success) {
            this.$ChartUtil.drawChart(dom, res.data.title, res.data.legend, '', res.data.series, res.data.xAxis, true, {
              yAxis: [
                {
                  type: 'value',
                  name: '（' + res.data.unit + '）'
                }
              ],
              tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{c0}人'
              },
              legend: {
                y: '20',
                data: res.data.legend
              },
              grid: grid
            }, this)
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }
      )
    },
    getOneLineBar (id, dom) {
      this.$ajaxGet(
        this.baseUrl,
        {id: id},
        res => {
          if (res.success) {
            let xrotate
            if (res.data.xAxis.length > 6) {
              xrotate = -30
            } else {
              xrotate = 0
            }
            this.$ChartUtil.drawChart(dom, res.data.title, res.data.legend, '', res.data.series, res.data.xAxis, false, {legend: {
              y: '20',
              data: res.data.legend
            },
            yAxis: [
              {
                type: 'value',
                name: '（' + res.data.unit + '）'
              }
            ],
            tooltip: {
              trigger: 'axis',
              formatter: '{b}<br/>{c0}人'
            },
            grid: {
              x: 30,
              x2: 30,
              y: 80,
              y2: 50
            },
            customattrs: {xrotate: xrotate}
            }, this)
          } else {
            
          }
        }
      )
    },
    getLine (id, dom) {
      this.$ajaxGet(
        this.baseUrl,
        {id: id},
        res => {
          if (res.success) {
            let series = []
            for (let key in res.data.series) {
              series.push({
                type: 'line',
                name: key,
                data: res.data.series[key]
              })
            }
            this.$ChartUtil.drawChart(
              dom,
              res.data.title,
              res.data.legend,
              this.$ChartUt.VERTICAL,
              series,
              res.data.xAxis,
              false,
              {
                yAxis: [
                  {
                    type: 'value',
                    name: '（' + res.data.unit + '）'
                  }
                ],
                grid: {
                  x: 30,
                  x2: 90,
                  y: 80,
                  y2: 20
                },
                tooltip: {
                  trigger: 'axis',
                  formatter: '{b}<br/>{a0}:{c0}人<br/>{a1}:{c1}人<br/>{a2}:{c2}人<br/>{a3}:{c3}人<br/>{a4}:{c4}人'
                },
                customattrs: {xrotate: 0}
              },
              this
            )
          } else {
            
          }
        }
      )
    },
    // 获取有二级标题的
    getSubText (id1, id2, dom) {
      this.$ajaxGet(this.baseUrl, {id: id1}, (res1) => {
        if (res1.success) {
          this.$ajaxGet(this.baseUrl, {id: id2}, (res) => {
            if (res.success) {
              this.$ChartUtil.drawChart(
              dom,
              res.data.title,
              [],
              this.$ChartUt.VERTICAL,
              res.data.series,
              res.data.xAxis,
              false,
              {
                title: {
                  text: res.data.title,
                  subtext: res1.data.title+':' + res1.data.value1 + '',
                }, 
                yAxis : (res.data.unit ? [
                  {
                    type : 'value',
                    name :'（'+(res1.data.unit)+'）'
                  }
                ] : [{
                    type : 'value',
                    name :''
                  }]),
                tooltip : {
                  trigger: 'axis',
                  formatter : '{b}<br/>{c0}人'
                },
                grid: {
                  x: 30,
                  y: 100,
                  x2: 30,
                  y2: 60
                }
              },
              this
            )
            }
          })
        }
      })
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