<template>
  <!-- <div v-swipeleft="swipeleft"> -->
  <div style="padding-top: 0.6rem;height: 90%;">
    <div class="sjhx_tab">
      <table>
        <tr>
          <template v-for="(item, index) in tabList">
            <td :key="index" @click="activeTap(item.num)" :class="{'active': isActive === item.num}">
              {{item.label}}
            </td>
          </template>
        </tr>
      </table>
    </div>
    <div v-if="isActive === 1" style="height: 100%;background: #fff;">
        <!-- 基本情况 -->
      <div class="jbqk_box">
        <div class="box_header"><span class="box_header_span"></span><span>基本情况</span></div>
        <div class="box_container flex_box">
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #ffc000;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_01}}<span>人</span></div>
              <div class="a_item_title">教职工总数</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_02}}<span>人</span></div>
              <div class="a_item_title">在校生总数</div>
            </div>
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_03}}<span>个</span></div>
              <div class="a_item_title">专业部数</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_04}}<span>个</span></div>
              <div class="a_item_title">教育特色项目</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #a5a5a5;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_1_05}}</div>
              <div class="a_item_title">固定资产(万元)</div>
            </div>  
          </a>
        </div>
      </div>
    </div>
    <!-- 人才培养 -->
    <div v-if="isActive === 2">
      <!-- chart容器 -->
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_szjg" class="chart_box_item"></div>
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
    </div>
    <!-- 素质教育 -->
    <div v-if="isActive === 3">
      <div class="jbqk_box marginTop02rem">
      <div class="box_header"><span class="box_header_span"></span><span>素质教育</span></div>
      <div class="box_container flex_box">
        <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #ffc000;">
          <div class="a_item_father">
            <div class="a_item_num">{{value_2_01}}<span>个</span></div>
            <div class="a_item_title">社团数</div>
          </div>  
        </a>
        <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
          <div class="a_item_father">
            <div class="a_item_num">{{value_2_02}}<span>个</span></div>
            <div class="a_item_title">四星级社团数</div>
          </div>  
        </a>
      </div>
    </div>
    <!-- 各社团人数规模统计 -->
    <div class="chart_box">
      <div class="box_header"><span class="box_header_span"></span></div>
      <div id="chart_005" class="chart_box_item"></div>
    </div>
    </div>
    <!-- 义务活动 -->
    <div v-if="isActive === 4">
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_006" class="chart_box_item"></div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_007" class="chart_box_item"></div>
      </div>
    </div>
    <!-- 专业建设 -->
    <div v-if="isActive === 5">
        <!-- 基本情况 -->
      <div class="jbqk_box">
        <div class="box_header"><span class="box_header_span"></span><span>专业建设</span></div>
        <div class="box_container flex_box">
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #ffc000;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_5_01}}<span>个</span></div>
              <div class="a_item_title">专业部</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_5_02}}<span>个</span></div>
              <div class="a_item_title">专业</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_5_03}}<span>个</span></div>
              <div class="a_item_title">国家示范专业</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_5_04}}<span>个</span></div>
              <div class="a_item_title">省级示范专业</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #a5a5a5;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_5_05}}<span>个</span></div>
              <div class="a_item_title">市级重点专业</div>
            </div>  
          </a>
        </div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_008" class="chart_box_item"></div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_009" class="chart_box_item"></div>
      </div>
    </div>
    <!-- 课程情况 -->
    <div v-if="isActive === 6">
        <!-- 基本情况 -->
      <div class="jbqk_box">
        <div class="box_header"><span class="box_header_span"></span><span>课程情况</span></div>
        <div class="box_container flex_box">
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #ffc000;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_6_01}}<span>个</span></div>
              <div class="a_item_title">课程总数</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_6_02}}<span>个</span></div>
              <div class="a_item_title">公共素质课</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_6_03}}<span>个</span></div>
              <div class="a_item_title">专业课</div>
            </div>  
          </a>
        </div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_010" class="chart_box_item"></div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_011" class="chart_box_item"></div>
      </div>
    </div>
    <!-- 教师概况 -->
    <div v-if="isActive === 7">
        <!-- 基本情况 -->
      <div class="jbqk_box">
        <div class="box_header"><span class="box_header_span"></span><span>教师概况</span></div>
        <div class="box_container flex_box">
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #ffc000;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_7_01}}<span>人</span></div>
              <div class="a_item_title">在职教职工人数</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_num">{{value_7_02}}<span>人</span></div>
              <div class="a_item_title">专任教师</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_7_03}}<span>人</span></div>
              <div class="a_item_title">外聘教师</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div inline_flex_box" style="background: #a5a5a5;">
            <div class="a_item_father">
              <div class="a_item_num">{{value_7_04}}</div>
              <div class="a_item_title">生师比</div>
            </div>  
          </a>
        </div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_012" class="chart_box_item"></div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_013" class="chart_box_item"></div>
      </div>
    </div>
    <!-- 资源建设 -->
    <div v-if="isActive === 8">
      <div class="jbqk_box">
        <div class="box_header"><span class="box_header_span"></span><span>资源建设</span></div>
        <div class="box_container flex_box">
          <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #ffc000;">
            <div class="a_item_father">
            <div class="a_item_title">学校占地面积</div>
              <div class="a_item_num">{{value_8_01}}<span>万㎡</span></div>
              <div class="a_item_num">{{value_8_02}}<span>㎡/生</span></div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div2 inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_title">校舍占地面积</div>
              <div class="a_item_num">{{value_8_03}}<span>万㎡</span></div>
              <div class="a_item_num">{{value_8_04}}<span>㎡/生</span></div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #a5a5a5;">
            <div class="a_item_father">
              <div class="a_item_title">纸质藏书</div>
              <div class="a_item_num">{{value_8_05}}<span>万册</span></div>
              <div class="a_item_num">{{value_8_06}}<span>册/生</span></div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_title">电子图书</div>
              <div class="a_item_num">{{value_8_07}}<span>万册</span></div>
              <div class="a_item_num">{{value_8_08}}<span>册/生</span></div>
            </div>  
          </a>
        </div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_014" class="chart_box_item"></div>
      </div>
      <div class="jbqk_box">
        <div class="box_header"><span class="box_header_span"></span><span>仪器设备</span></div>
        <div class="box_container flex_box">
          <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #ffc000;">
            <div class="a_item_father">
              <div class="a_item_title">总价值(万元)</div>
              <div class="a_item_num">{{value_8_09}}</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div2 inline_flex_box baceee">
            <div class="a_item_father">
              <div class="a_item_title">共拥有(件)</div>
              <div class="a_item_num">{{value_8_010}}</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #a5a5a5;">
            <div class="a_item_father">
              <div class="a_item_title">新增设备值(万元)</div>
              <div class="a_item_num">{{value_8_011}}</div>
            </div>  
          </a>
          <a href="javascript:void(0)" class="a_to_div2 inline_flex_box" style="background: #70ad47;">
            <div class="a_item_father">
              <div class="a_item_title">新增设备总价值（万元）</div>
              <div class="a_item_num">{{value_8_012}}</div>
            </div>  
          </a>
        </div>
      </div>
      <div class="chart_box">
        <div class="box_header"><span class="box_header_span"></span></div>
        <div id="chart_015" class="chart_box_item"></div>
      </div>
    </div>
    <!-- >>>>>> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      isActive: 1,
      tabList: [
        {
          label: '基本情况',
          num: 1
        },
        {
          label: '人才培养',
          num: 2
        },
        {
          label: '素质教育',
          num: 3
        },
        {
          label: '义务活动情况',
          num: 4
        },
        {
          label: '专业建设',
          num: 5
        },
        {
          label: '课程情况',
          num: 6
        },
        {
          label: '教师概况',
          num: 7
        },
        {
          label: '资源建设',
          num: 8
        }
      ],
      baseUrl: this.HOST + '/tr/GroupPortrait/web/getPortraitInfoById',
      // 基本情况
      value_1_01: '',
      value_1_02: '',
      value_1_03: '',
      value_1_04: '',
      value_1_05: '',
      // 素质教育
      value_2_01: '',
      value_2_02: '',
      // 专业建设
      value_5_01: '',
      value_5_02: '',
      value_5_03: '',
      value_5_04: '',
      value_5_05: '',
      // 课程情况
      value_6_01: '',
      value_6_02: '',
      value_6_03: '',
      // 教师概况
      value_7_01: '',
      value_7_02: '',
      value_7_03: '',
      value_7_04: '',
      // 资源建设
      value_8_01: '',
      value_8_02: '',
      value_8_03: '',
      value_8_04: '',
      value_8_05: '',
      value_8_06: '',
      value_8_07: '',
      value_8_08: '',
      value_8_09: '',
      value_8_010: '',
      value_8_011: '',
      value_8_012: ''
    }
  },
  // watch: {
  //   isActive () {
  //     this.getAllData(this.isActive)
  //   }
  // },
  mounted () {
     this.getBox_01()
  },
  methods: {
    // swipeleft (a, b) {
    //   this.isActive++
    // },
    activeTap (num) {
      document.getElementsByClassName('scrollTop')[0].scrollTop = 0
      this.isActive = num
      this.getAllData(num)
    },
    getAllData (num) {
      if (num === 1) {
        // 基本情况
        this.getBox_01()
      } else if (num === 2) {
        this.getBox_02()
      } else if (num === 3) {
        this.getBox_03()
      } else if (num === 4) {
        this.getBox_04()
      } else if (num === 5) {
        this.getBox_05()
      } else if (num === 6) {
        this.getBox_06()
      } else if (num === 7) {
        this.getBox_07()
      } else if (num === 8) {
        this.getBox_08()
      }
    },
    // 获取基本情况
    getBox_01 () {
      this.$ajaxGet(this.baseUrl, {id: 1}, (res) => {
        if (res.success) {
          this.value_1_01 = res.data.value1
          this.value_1_02 = res.data.value2
          this.value_1_03 = res.data.value3
          this.value_1_04 = res.data.value4
          this.value_1_05 = res.data.value5
        }
      })
    },
    // 获取人才培养
    getBox_02 () {
      this.getSubText(2, 3, 'chart_szjg')
      this.getSubText(4, 5, 'chart_002')
      this.getLine(6, 'chart_003')
      this.getPie(7, 'chart_004')
    },
    getBox_03 () {
      // 获取社团数和四星级社团数
      this.$ajaxGet(
        this.baseUrl,
        {
          id: 8
        },
        (res) => {
          if (res.success) {
            this.value_2_01 = res.data.value1
            this.value_2_02 = res.data.value2
          }
        }
      )
      // 获取各专业社团
      this.getTwoBarNoDie(9, 'chart_005', {y: 80, y2: 100}, true)
    },
    // 获取义务活动
    getBox_04 () {
      // 义务活动
      this.getPie(10, 'chart_006')
      this.getPie(11, 'chart_007')
    },
    // 获取专业建设
    getBox_05 () {
      this.$ajaxGet(
        this.baseUrl,
        {
          id: 12
        },
        (res) => {
          if (res.success) {
            this.value_5_01 = res.data.value1
            this.value_5_02 = res.data.value2
            this.value_5_03 = res.data.value3
            this.value_5_04 = res.data.value4
            this.value_5_05 = res.data.value5
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }
      )
      this.getOneLineBar(13, 'chart_008', -30)
      // 获取专业标志成果
      this.getPie(64, 'chart_009')
    },
    // 获取课程情况
    getBox_06 () {
      // 课程情况
      this.$ajaxGet(
        this.baseUrl,
        {
          id: 14
        },
        (res) => {
          if (res.success) {
            this.value_6_01 = res.data.value1
            this.value_6_02 = res.data.value2
            this.value_6_03 = res.data.value3
          } else {
            
          }
        }
      )
      this.getPie(15, 'chart_010')
      this.getLine(16, 'chart_011', 'bar')
    },
    // 获取教师概况
    getBox_07 () {
      this.$ajaxGet(
        this.baseUrl,
        {
          id: 17
        },
        (res) => {
          if (res.success) {
            this.value_7_01 = res.data.value1
            this.value_7_02 = res.data.value2
            this.value_7_03 = res.data.value3
            this.value_7_04 = res.data.value4
          } else {
            
          }
        }
      )
      this.getPie(18, 'chart_012')
      this.getPie(19, 'chart_013')
    },
    // 获取资源建设
    getBox_08 () {
      this.$ajaxGet(
        this.baseUrl,
        {
          id: 20
        },
        (res) => {
          if (res.success) {
            this.value_8_01 = res.data.value1
            this.value_8_02 = res.data.value2
            this.value_8_03 = res.data.value3
            this.value_8_04 = res.data.value4
            this.value_8_05 = res.data.value5
            this.value_8_06 = res.data.value6
            this.value_8_07 = res.data.value7
            this.value_8_08 = res.data.value8
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }
      )
      this.getPie(21, 'chart_014')
      this.$ajaxGet(
        this.baseUrl,
        {
          id: 22
        },
        (res) => {
          if (res.success) {
            this.value_8_09 = res.data.value1
            this.value_8_010 = res.data.value2
            this.value_8_011 = res.data.value3
            this.value_8_012 = res.data.value4
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }
      )

      this.$ajaxGet(
        this.baseUrl,
        {
          id: 23
        },
        (res) => {
          if (res.success) {
                let yAxis = [
                {
                  axisLabel: {formatter: "{value}"},
                  formatter: "{value} 万元",
                  name: "设备资产值("+res.data.unit.split('-')[0]+")",
                  position: 'left',
                  type: "value"
                },
                {
                  axisLabel: {formatter: "{value}"},
                  formatter: "{value}",
                  name: "生均设备值("+res.data.unit.split('-')[1]+")",
                  position: 'right',
                  type: "value"
                }
              ]
              let series = []
              for (let k in res.data.series) {
                if (k === '生均设备值') {
                  series.push({
                    name: k,
                    type: "line",
                    yAxisIndex: 1,
                    data: res.data.series[k]
                  })
                  continue
                }
                series.push({
                  name: k,
                  type: "bar",
                  stack: 1,
                  yAxisIndex: 0,
                  data: res.data.series[k]
                })
              }
              this.$ChartUtil.drawChart('chart_015', res.data.title, res.data.legend, this.$ChartUt.VERTICAL, series, res.data.xAxis, false, {
                grid: {
                  x: 50,
                  y: 120,
                  x2: 150,
                  y2: 20
                },
                tooltip : {
                    trigger: 'axis',
                    // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    // },
                      formatter : '{b}<br/>{a0}:{c0}万元<br/>{a1}:{c1}万元<br/>{a2}:{c2}万元/人'

                },
                legend: {
                  data: res.data.legend,
                  orient: 'vertical',
                  x: 'right',
                  y: '150px'
                },
                customattrs: {xrotate: 0},
                yAxis: yAxis
              }, this)
          } else {
            
          }
        }
      )

    },
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
                formatter: ('{b}({c}' + (res.data.unit || '') + ')')
              }
            }
            this.$ChartUtil.drawChartNoXY(dom, res.data.title, [], this.$ChartUt.VERTICAL, res.data.series, [], {}, this)
          } else {
            
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
    getLine (id, dom, type) {
      this.$ajaxGet(
        this.baseUrl,
        {id: id},
        res => {
          if (res.success) {
            let series = []
            for (let key in res.data.series) {
              series.push({
                type: (type? type : 'line'),
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
                  formatter: '{b}<br/>{a0}:{c0}人<br/>{a1}:{c1}人'
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
                    name :'（'+(res.data.unit)+'）'
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
    },
    // 获取多条柱不堆叠
    getTwoBarNoDie (id, dom, grid, ifdatazoom) {
      this.$ajaxGet(this.baseUrl, {
          id: id
        }, (res) => {
          if (res.success) {
            let series = []
            for (let key in res.data.series) {
              series.push({
                  type: 'bar',
                  name: key,
                  // stack: 1,
                  data: res.data.series[key]
                })
            }
            this.$ChartUtil.drawChart(dom, res.data.title, res.data.legend, '', series, res.data.xAxis, ifdatazoom, {
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
              y: '50',
              data: res.data.legend
            },
            grid: grid
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
</style>