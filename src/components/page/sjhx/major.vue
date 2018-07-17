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
              <div class="a_item_title">专业</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_02}}<span>个</span></div>
              <div class="a_item_title">国家示范专业</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_03}}<span>个</span></div>
              <div class="a_item_title">省级示范专业</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_04}}<span>个</span></div>
              <div class="a_item_title">市级重点专业</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box bac5a9bd3" >
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_08}}<span>个</span></div>
              <div class="a_item_title">招生专业数</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #a5a5a5;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_05}}<span>个</span></div>
              <div class="a_item_title">新增专业数</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #a5a5a5;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_06}}<span>个</span></div>
              <div class="a_item_title">停招专业数</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #ed7d31;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_07}}<span>个</span></div>
              <div class="a_item_title">撤销专业数</div>
            </div>  
          </a>
        </div>
      </div>
      <!-- 各专业部 -->
      <!-- >>>>>>>> -->
      <template v-for="(item, index) in zybList">
        <div class="jbqk_box" :key="index" style="margin-top: 0.2rem;">
          <div class="box_header"><span class="box_header_span"></span><span>{{item.dept_name}}</span></div>
          <div class="box_container flex_box">
            <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #ffc000;">
              <div class="a_item_father">
                <div class="a_item_title">专业数</div>
                <div class="a_item_num">{{item.value1}}<span>个</span></div>
              </div>  
            </a>
            <a href="javascript:void(0)" class="a_to_div2 inline_flex_box baceee">
              <div class="a_item_father">
                <div class="a_item_title">教师数</div>
                <div class="a_item_num">{{item.value2}}<span>个</span></div>
              </div>  
            </a>
            <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #a5a5a5;">
              <div class="a_item_father">
                <div class="a_item_title">学生数</div>
                <div class="a_item_num">{{item.value3}}<span>个</span></div>
              </div>  
            </a>
            <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #70ad47;">
              <div class="a_item_father">
                <div class="a_item_title">实训室数量</div>
                <div class="a_item_num">{{item.value4}}<span>个</span></div>
              </div>  
            </a>
          </div>
        </div>
      </template>
      <!-- <<<<<<<<< -->
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
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_004" class="chart_box_item"></div>
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
      value_1_06: '',
      value_1_07: '',
      value_1_08: '',
      zybList: []
    }
  },
  // watch: {
  //   isActive () {
  //     this.getAllData(this.isActive)
  //   }
  // },
  mounted () {
    this.$ajaxGet(this.baseUrl, {id: 25}, (res) => {
      if (res.success) {
        this.value_1_01 = res.data.value1
        this.value_1_02 = res.data.value3
        this.value_1_03 = res.data.value4
        this.value_1_04 = res.data.value5
        this.value_1_05 = res.data.value6
        this.value_1_06 = res.data.value7
        this.value_1_07 = res.data.value8
        this.value_1_08 = res.data.value2
      }
    })
    this.$ajaxMore('post', '/tr/GroupPortrait/web/getPortraitInfoByCon', {id: 65,
      pageLength: 100,
      pageSize: 1}, (res) => {
      if (res.success) {
        this.zybList = res.data.data
      }
    })
    this.getOneLineBar(26, 'chart_001', -30)
    this.getTwoBarAndSub(30, 29, 'chart_002')
    this.getOneLineBar(31, 'chart_003', -30)
    this.getTwoBar(32, 'chart_004')
  },
  methods: {
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
    // 获取堆叠图
    getTwoBar (id, dom) {
      this.$ajaxGet(this.baseUrl, {
          id: id
        }, (res) => {
          if (res.success) {
            let series = []
            for (let key in res.data.series) {
              series.push({
                  type: 'bar',
                  name: key,
                  stack: 1,
                  data: res.data.series[key]
                })
            }
            this.$ChartUtil.drawChart(dom, res.data.title, res.data.legend, '', series, res.data.xAxis, false, {
              yAxis : [
                    {
                      type : 'value',
                      name :'（'+res.data.unit+'）'
                    }
                  ],
                  tooltip : {
                  trigger: 'axis',
                  formatter : '{b}<br/>{a0}:{c0}人<br/>{a1}:{c1}人'
              },
              legend: {
              y: '70',
              data: res.data.legend
            },
            grid: {
              y: 90,
              y2: 50
            }
            // yAxis: yAxis
            }, this)
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
    },
    getTwoBarAndSub (id1, id2, dom) {
      this.$ajaxGet(this.baseUrl, {
        id: id1
      }, (res) => {
        if (res.success) {
          let subtext
          this.$ajaxGet(
            this.baseUrl,
            {id: id2},
            res1 => {
              if (res1.success) {
                subtext='女生人数最多专业:'+res1.data.value1+'   男女比:'+res1.data.value2
                let series = []
                for (let key in res.data.series) {
                series.push({
                    type: 'bar',
                    name: key,
                    data: res.data.series[key]
                })
                }
                this.$ChartUtil.drawChart(dom, res.data.title, res.data.legend, '', series, res.data.xAxis, false, {
                title: {
                    text: res.data.title,
                    subtext: subtext,
                },
                yAxis : [
                  {
                    type : 'value',
                    name :'（'+res.data.unit+'）'
                  }
                ],
                tooltip : {
                    trigger: 'axis',
                    formatter : '{b}<br/>{a0}:{c0}人<br/>{a1}:{c1}人'
                },
                grid:{
                  y: 100,
                  y2: 50
                },
                legend: {
                  y: '70',
                  data: res.data.legend
                },
          // yAxis: yAxis
              }, this)
                } else {
                  
                }
              }
              )

        } else {
          
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
  .bac5a9bd3 {
    background: #5a9bd3;
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