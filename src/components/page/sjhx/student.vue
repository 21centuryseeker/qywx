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
              <div class="a_item_title">学生人数</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_02}}<span>%</span></div>
              <div class="a_item_title">体质健康优秀率</div>
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
    <div class="chart_box" style="height: 8.2rem;">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_010" class="chart_box_item" style="height: 8rem;"></div>
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
      tableList: []
    }
  },
  // watch: {
  //   isActive () {
  //     this.getAllData(this.isActive)
  //   }
  // },
  mounted () {
    this.$ajaxGet(this.baseUrl, {id: 53}, (res) => {
      if (res.success) {
        this.value_1_01 = res.data.value1
        this.value_1_02 = res.data.value2
      }
    })
    this.$ajaxGet(
      this.baseUrl,
      {id: 54},
      res => {
        if (res.success) {
        this.showMap(document.getElementById('chart_001'), res.data.title, res.data.data)
      } else {
          
        }
      }
    )
    this.getOneLineBar(66, 'chart_002', -30)
    this.getPie(56, 'chart_003')
    this.getOneLineBar(57, 'chart_004')
    this.getDataZoom(58, 'chart_005', {y2: 100, y: 80})
    this.getDataZoom(59, 'chart_006', {y2: 100, y: 80})
    this.getDataZoom(60, 'chart_007', {y2: 100, y: 80})
    this.getPie(61, 'chart_008')
    this.getPie(62, 'chart_009')
    this.getDataZoom(63, 'chart_010', {y2: 180, y: 80})
  },
  methods: {
    convertData: function (data) {
      var geoCoordMap = {
        '安阳市': [114.352482,36.103442],
        '鹤壁市': [114.295444,35.748236],
        '濮阳市': [115.041299,35.768234],
        '新乡市': [113.883991,35.302616],
        '焦作市': [113.238266,35.23904],
        '济源市': [112.590047,35.090378],
        '三门峡市': [111.194099,34.777338],
        '洛阳市': [112.434468,34.663041],
        '郑州市': [113.665412,34.757975],
        '开封市': [114.341447,34.797049],
        '商丘市': [115.650497,34.437054],
        '许昌市': [113.826063,34.022956],
        '平顶山市': [113.307718,33.735241],
        '漯河市': [114.026405,33.575855],
        '周口市': [114.649653,33.620357],
        '南阳市': [112.540918,32.999082],
        '驻马店市': [114.024736,32.980169],
        '信阳市': [114.075031,32.123274]
      }
      var res = []
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    showMap (ele, title, data) {
      let myChart = this.$echarts.init(ele, null, {renderer: 'svg'})
      let option = {
        title: {
          show: true,
          // left: '2%',
          text: title,
          textStyle: {
            // 标题内容的样式
            fontStyle: 'normal', // 主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
            fontWeight: 'normal', // 可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
            fontFamily: '微软雅黑', // 主题文字字体，默认微软雅黑
            fontSize: this.$ChartUt.$rem * 0.28 // 主题文字字体大小，默认为18px
          },
          padding: [this.$ChartUt.$rem * 0.43, 0, this.$ChartUt.$rem * 0.28, this.$ChartUt.$rem * 0.21]
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            // var value = (params.value + '').split('.')
            // value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            if (params.data) {
              return params.name + ':' + params.data.value[2] + '人'
            } else {
              // return '无数据'
            }
          }
        },
        visualMap: {
            min: 0,
            max: 150,
            show: false,
            text:['High','Low'],
            realtime: false,
            calculable: true,
            inRange: {
                 color: ['lightskyblue','yellow', 'orangered']
            }
        },
        geo: {
          map: 'henan',
          roam: false,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            coordinateSystem: 'geo',
            type: 'map',
            // type: 'scatter',
            // name: '地域分布',
            // roam: true,
            data: this.convertData(data),
            map: 'henan',
            symbolSize: 8,
            symbolRotate: 35,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                fontSize: 10,
                color: '#666'
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#F06C00'
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
    getOneLineBar (id, dom, rot) {
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
            customattrs: {xrotate: (rot? rot : xrotate)}
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