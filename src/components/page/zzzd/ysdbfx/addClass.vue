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
        <div class="item_name">课程性质</div>
        <div>
          <select class="select" @change="yxChange" v-model="yxValue" placeholder="请选择">
            <template v-for="(item, index) in yxList">
            <option :value="item.dm" :key="index">{{item.mc}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="content_item">
        <div class="item_name">课程</div>
        <div>
          <select class="select" v-model="zyValue" :disabled="isZyDisabled" placeholder="请选择" @click="zyClick">
            <template v-for="(item, index) in zyList">
            <option :value="item.mc" :key="index">{{item.mc}}</option>
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
        <div class="item_name">课程性质</div>
        <div>
          <select class="select" @change="yxChange" v-model="yxValue" placeholder="请选择">
            <template v-for="(item, index) in yxList">
            <option :value="item.dm" :key="index">{{item.mc}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="content_item">
        <div class="item_name">课程</div>
        <div>
          <select class="select" v-model="zyValue" :disabled="isZyDisabled" placeholder="请选择" @click="zyClick">
            <template v-for="(item, index) in zyList">
            <option :value="item.mc" :key="index">{{item.mc}}</option>
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
        isFirst: 1,
        yxValue: '',
        zyValue: '',
        isZyDisabled: true,
        itemValue: [],
        itemOptions: [
          {
          label: '总课时数',
          value: 'zkss',
          disabled: false
        },
        {
          label: '实践课程课时数',
          value: 'sjkc_kss',
          disabled: false
        },
        {
          label: '教材名称',
          value: 'jcmc',
          disabled: false
        },
        {
          label: '授课年级',
          value: 'sknj',
          disabled: false
        },
        {
          label: '考试方法',
          value: 'ksff',
          disabled: false
        }
        ],
      majorGroupObj: {
        'zkss': '总课时数',
        'sjkc_kss': '实践课程课时数',
        'jcmc': '教材名称',
        'sknj': '授课年级',
        'ksff': '考试方法'
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
          xAxis: this.zyValue,
          tableType: 5
        }
        this.$ajaxMore('post', this.HOST + '/tr/ComparativeAnalysis/web/addRowAndCell', data, (res) => {
          if (res.success) {
            // 跳到
            this.$router.push({
              path: '/zgsjfx/zzzd/ysdbfx/5'
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
          xAxis: this.zyValue,
          tableType: 5
        }
          this.$ajaxMore('post', this.HOST + '/tr/ComparativeAnalysis/web/addCourseColsByCon', data, (res) => {
        if (res.success) {
          this.$router.push({
              path: '/zgsjfx/zzzd/ysdbfx/5'
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
          tableType: 5
        }
        this.$ajaxMore('post', this.HOST + '/tr/ComparativeAnalysis/web/addCourseRowsByCon', data, (res) => {
        if (res.success) {
          this.$router.push({
              path: '/zgsjfx/zzzd/ysdbfx/5'
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
          MessageBox('提示', '请选择课程')
          return
        }
        this.isFirst = 2
      },
      zyClick () {
        if (this.yxValue === '') {
          MessageBox('提示', '请选择课程性质')
        }
      },
      yxChange () {
        this.getZy({
          dm: this.yxValue,
          yxdm: '',
          zydm: '',
          tableId: this.tableId
        })
      },
      // 获取专业大类
      getYx () {
        this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/getAllKcxz', {}, (res) => {
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
        this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/getKcByCon', data, (res) => {
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
