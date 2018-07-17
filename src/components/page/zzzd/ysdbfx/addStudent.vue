<template>
  <div class="content-fx">
    <div class="header" v-if="$route.params.tableId - 0 === -1">
      <table class="table-step">
        <tr>
          <td class="step_no_activite" :class="{active: isFirst === 1}" v-tap="{fn: changeTab, state: 1}"><span class="num_info">1</span>&nbsp;<span>选择分析对象</span></td>
          <td class="step_no_activite" :class="{active: isFirst === 2}" v-tap="{fn: changeTab, state: 2}"><span class="num_info">2</span>&nbsp;<span>选择要素</span></td>
        </tr>
      </table>
    </div>
    <div v-if="$route.params.state - 0 === 1">
      <div class="middle-content" v-if="isFirst === 1">
      <div class="content_item">
        <div class="item_name">专业大类</div>
        <div>
          <select class="select" @change="yxChange" v-model="yxValue" placeholder="请选择">
            <template v-for="(item, index) in yxList">
            <option :value="item.dm" :key="index">{{item.mc}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="content_item">
        <div class="item_name">专业</div>
        <div>
          <select class="select" v-model="zyValue" :disabled="isZyDisabled" placeholder="请选择" @click="zyClick" @change="zyChange">
            <template v-for="(item, index) in zyList">
            <option :value="item.dm" :key="index">{{item.mc}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="content_item">
        <div class="item_name">班级</div>
        <div>
          <select class="select" v-model="bjValue" :disabled="isBjDisabled" placeholder="请选择" @click="bjClick" @change="bjChange">
            <template v-for="(item, index) in bjList">
            <option :value="item.id" :key="index">{{item.name}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="content_item">
        <div class="item_name">学生</div>
        <div>
          <select class="select" v-model="xsValue" :disabled="isXsDisabled" placeholder="请选择" @click="xsClick">
            <template v-for="(item, index) in xsList">
            <option :value="item.name" :key="index">{{item.name}}</option>
            </template>
          </select>
        </div>
      </div>
    </div>
    <div class="middle-content" v-if="isFirst === 2">
      <mt-checklist
        title=""
        v-model="itemValue"
        :options="itemOptions">
      </mt-checklist>
    </div>
    </div>

    <div v-if="$route.params.state - 0 === 2">
      <div class="middle-content">
      <div class="content_item">
        <div class="item_name">专业大类</div>
        <div>
          <select class="select" @change="yxChange" v-model="yxValue" placeholder="请选择">
            <template v-for="(item, index) in yxList">
            <option :value="item.dm" :key="index">{{item.mc}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="content_item">
        <div class="item_name">专业</div>
        <div>
          <select class="select" v-model="zyValue" :disabled="isZyDisabled" placeholder="请选择" @click="zyClick" @change="zyChange">
            <template v-for="(item, index) in zyList">
            <option :value="item.dm" :key="index">{{item.mc}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="content_item">
        <div class="item_name">班级</div>
        <div>
          <select class="select" v-model="bjValue" :disabled="isZyDisabled" placeholder="请选择" @click="bjClick" @change="bjChange">
            <template v-for="(item, index) in bjList">
            <option :value="item.id" :key="index">{{item.name}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="content_item">
        <div class="item_name">学生</div>
        <div>
          <select class="select" v-model="xsValue" :disabled="isZyDisabled" placeholder="请选择" @click="xsClick">
            <template v-for="(item, index) in xsList">
            <option :value="item.name" :key="index">{{item.name}}</option>
            </template>
          </select>
        </div>
      </div>
    </div>
    </div>

    <div v-if="$route.params.state - 0 === 3">
    <div class="middle-content">
      <mt-checklist
        title=""
        v-model="itemValue"
        :options="itemOptions">
      </mt-checklist>
    </div>
    </div>

    <div class="fixed_bottom_box" v-if="isFirst === 1 && $route.params.state - 0 === 1">
      <!-- <a href="javascript:void(0)" class="step_box" @click="nextStep">下一步</a> -->
      <mt-button v-if="ctab==max " size="large" @click="nextStep">下一步</mt-button>
    </div>
    <div class="fixed_bottom_box" v-if="isFirst === 2 || $route.params.state - 0 !== 1">
      <!-- <a href="javascript:void(0)" class="step_box" @click="doSure">确定</a> -->
      <mt-button v-if="ctab==max " size="large" @click="doSure">确定</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
  export default {
    name: "custom-fx",
    data: function () {
      return {
        yxList: [],
        zyList: [],
        bjList: [],
        xsList: [],
        isFirst: 1,
        yxValue: '',
        zyValue: '',
        bjValue: '',
        xsValue: '',
        isZyDisabled: true,
        isBjDisabled: true,
        isXsDisabled: true,
        itemValue: [],
        itemOptions: [
        {
          label: '籍贯',
          value: 'JGDM',
          disabled: false
        },
        {
          label: '是否在校',
          value: 'SFZX',
          disabled: false
        },
        {
          label: '政治面貌',
          value: 'ZZMMDM',
          disabled: false
        },
        {
          label: '专业',
          value: 'ZYDM',
          disabled: false
        },
        {
          label: '学籍状态',
          value: 'XJZT',
          disabled: false
        },
        {
          label: '性别代码',
          value: 'XBDM',
          disabled: false
        },
        {
          label: '民族',
          value: 'MZDM',
          disabled: false
        }
        ],
      majorGroupObj: {
        'JGDM': '籍贯',
        'SFZX': '是否在校',
        'ZZMMDM': '政治面貌',
        'ZYDM': '专业',
        'XJZT': '学籍状态',
        'XBDM': '性别代码',
        'MZDM': '民族'
      },
      state: this.$route.params.state - 0,
      tableId: this.$route.params.tableId - 0 !== -1 ? this.$route.params.tableId : ''
      }
    },
    methods: {
      changeTab (data) {
        this.isFirst = data.state
      },
      doSure () {
        if (this.state === 1) {
          // 自定义
          if (!this.zyValue) {
          Toast({
              message: '课程不能为空',
              position: 'middle',
              duration: 3000
            });
          return
        }
        if (!this.itemValue.length) {
          Toast({
              message: '要素不能为空',
              position: 'middle',
              duration: 3000
            });
          return
        }
        let yAxis = []
        for (let item of this.itemValue) {
          yAxis.push({
            rowCode: item,
            rowName: this.majorGroupObj[item]
          })
        }
        let data = {
          yAxis: yAxis,
          xAxis: this.xsValue,
          tableType: 2
        }
        this.$ajaxMore('post', this.HOST + '/tr/ComparativeAnalysis/web/addRowAndCell', data, (res) => {
          if (res.success) {
            // 跳到
            this.$router.push({
              path: '/zgsjfx/zzzd/ysdbfx/2'
            })
          } else {
            Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
          }
        })
        } else if (this.state === 2) {
          // 选择分析对象
        let data = {
          tableId: this.tableId,
          xAxis: this.xsValue,
          tableType: 2
        }
          this.$ajaxMore('post', this.HOST + '/tr/ComparativeAnalysis/web/addCourseColsByCon', data, (res) => {
        if (res.success) {
          this.$router.push({
              path: '/zgsjfx/zzzd/ysdbfx/2'
            })
        } else {
          Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
        }
      })
        } else if (this.state === 3) {
          // 选择要素
          let yAxis = []
          for (let item of this.itemValue) {
          yAxis.push({
            rowCode: item,
            rowName: this.majorGroupObj[item]
          })
        }
        let data = {
          tableId: this.tableId,
          yAxis: yAxis,
          tableType: 2
        }
        this.$ajaxMore('post', this.HOST + '/tr/ComparativeAnalysis/web/addCourseRowsByCon', data, (res) => {
        if (res.success) {
          this.$router.push({
              path: '/zgsjfx/zzzd/ysdbfx/2'
          })
        } else {
          Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
        }
      })
        }
      },
      nextStep () {
        if (this.zyValue === '') {
          Toast({
              message: '课程不能为空',
              position: 'middle',
              duration: 3000
            });
          return
        }
        this.isFirst = 2
      },
      zyClick () {
        // if (this.yxValue === '') {
        //   MessageBox('提示', '请选择课程性质')
        // }
      },
      bjClick () {
        // if (this.yxValue === '') {
        //   MessageBox('提示', '请选择课程性质')
        // }
      },
      xsClick () {
        // if (this.yxValue === '') {
        //   MessageBox('提示', '请选择课程性质')
        // }
      },
      yxChange () {
        this.getZy({
          yxdm: this.yxValue,
          tableId: this.tableId
        })
      },
      zyChange () {
        this.getStudentBjByMajor({
          zydm: this.zyValue
        })
      },
      bjChange () {
        this.getStudentBybj({
          bjdm: this.bjValue,
          tableType: 2,
          tableId: this.tableId
        })
      },
      // 获取专业大类
      getYx () {
        this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/getProfessionAllYx', {}, (res) => {
          if (res.success) {
            this.yxList = res.obj
          } else {
            Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
          }
        })
      },
      getZy (data) {
        this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/getProfessionByCon', data, (res) => {
          if (res.success) {
            this.isZyDisabled = false
            this.zyList = res.obj
          } else {
            Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
          }
        })
      },
      getStudentBjByMajor (data) {
      this.$ajax('post', this.HOST + '/tr/trCA/web/getClassByZy', data || {}, (res) => {
        if (res.success) {
          this.isBjDisabled = false
          this.bjList = res.obj
        } else {
          Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
        }
      })
    },
    getStudentBybj (data) {
      this.$ajaxMore('post', this.HOST + '/tr/ComparativeAnalysis/web/getStuInfo', data || {}, (res) => {
        if (res.success) {
          this.isXsDisabled = false
          this.xsList = res.obj
        } else {
          Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
        }
      })
    },
      onValuesChange () {

      },
      pickerSure () {

      },
    },
    mounted () {
      this.getYx()
    },
  }

</script>

<style scoped>
  .btn_wrap {
    padding: 0 1rem;
    margin-top: 2rem;
  }
  .content-fx .header .m-header{
    background: none;
    color: #888;

  }
  .content-fx .cell-part{
    height: 55px;
  }
  .content-fx .cell-part i{
    font-size: 30px;
    line-height:45px;
    color: white;
  }
  .content-fx .header .iconfont{
    display: block;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg);
  }

  /* .content-fx .middle-content tr:first-child  .cell-part-left{
    background-color: #f3f3f3;
    border-right:solid 1px #e4e4e4
  }
  .content-fx .no_right_border{
    border-right: none!important;
    background-color: white!important;
  }
  .content-fx .title_{
    display: inline-block;
    background-color: #ffbf33;
    border-radius: 45px;
    height: 45px;
    width: 45px;
    text-align: center;
  }

  .member{

  }
  .content-fx .title-info{
    display: inline-block;
    padding-left: 10px;
    position: absolute;
    top: 30%;
  }
  .content-fx .div_all{
    position: relative;
    top: 5px;
    height: 55px;
  }
  .content-fx .title_memeber{
    display: inline-block;
    background-color: #d4d4d4;
    border-radius: 45px;
    height: 45px;
    width: 45px;
    text-align: center;
  }
  .content-fx div[class=mint-cell-wrapper]{
    background-image: none!important;
  } */

  .content-fx .table-step{
    width:100% ;
    height: 50px;
    text-align: center;
    background-color:white;
  }
    .content-fx .table-step,
   .content-fx .table-step tr,
   .content-fx .table-step td {
     border-collapse: collapse;
   }
  .content-fx .table-step td{
    width:33.33% ;

  }
  .num_info{
    width: 15px;
    display: inline-block;
    border-radius: 15px;
    background-color: white;
  }
  .step_no_activite{
    background-color: #f4f4f4;
  }
  .step_no_activite .num_info{
    color: white;
    background-color: #d4d4d4;
  }
    .step_no_activite.active{
    background-color: #70ad47;
  }

  .step_no_activite.active {
    color: white;
  }
  .step_no_activite.active .num_info{
    color: #70ad47;
    background-color: #fff;
  }
  .fixed_bottom_box {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    height: 0.96rem;
    width: 100%;
    box-shadow: 0 -3px 3px #dcdcdc;
  }
  .step_box {
    display: block;
    width: 6.52rem;
    height: 0.64rem;
    line-height: 0.64rem;
    text-align: center;
    background: #70ad47;
    color: #fff;
    border-radius: 0.04rem;
    margin: 0.16rem auto;
  }
  .select {
    width: 5.6rem;
    height: 0.68rem;
    background: #fff;
    border: 1px solid #dedede;
  }
  div.middle-content {
    width: 5.6rem;
    margin: 0 auto;
  }
  div.item_name {
    margin-bottom: 0.25rem;
    padding-top: 0.48rem;
    font-size: 0.28rem;
    color: #555;
  }
  .content-fx {
    height: 100%;
    background: #fff;
  }
  .mint-checklist {
    padding-top: 0.2rem;
  }
</style>
