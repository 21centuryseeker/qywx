<template>
  <div class="content-fx" >
    <div class="header">
      <table class="table-step">
        <tr>
          <td  :class="[ctab==1?'step_activite':'step_no_activite']" ><div @click="changeTap(1)"><span class="num_info">1</span>&nbsp;<span>选择指标</span></div></td>
          <td  :class="[ctab==2?'step_activite':'step_no_activite']"><div @click="changeTap(2)"><span class="num_info">2</span>&nbsp;<span>选择时间</span></div></td>
          <td :class="[ctab==3?'step_activite':'step_no_activite']"><div @click="changeTap(3)"><span class="num_info">3</span>&nbsp;<span>图表类型</span></div></td>
        </tr>
      </table>
      <mt-navbar v-model="selected" v-if="ctab==1">
        <mt-tab-item id="1">从指标库选取</mt-tab-item>
        <mt-tab-item id="2">自定义指标</mt-tab-item>
      </mt-navbar>
    </div>
    <div class="middle-content" :class="{'middle-content1':ctab==1}">
      <div v-show="ctab==1" >

        <table width="100%" id="ttable">
        <tr id="t7">
          <td width="35%" style="vertical-align:top;overflow-y: auto">
            <div class="middle-left" >
              <div  @click="selectDepart(val.id,val.label)" v-for="(val,key) of departList" :key="key" :id="val.id"  :data-id="val.id">
                <mt-cell  class="cell-part cell-part-left "
                          :title="val.label"
                          :class="[activeId==val.id?'no_right_border':'']"
                >
                </mt-cell>
              </div>
            </div>
          </td>
          <td width="65%"  >
            <div class="middle-right" style="height: 100vh;background-color: #fff;" >
              <ul id="ttt" style="" class="ul_list1"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="loading"
                :infinite-scroll-distance="pageSize">
                <div v-for="(val,key) in leftList" :key="key"  @click="selectZbiao(val.id,val.indexName,val.isenable)">
                  <mt-cell class="cell-part" is-link>
                    <div slot="title" class="div_all" >
                      <table width="100%" style="text-align: left">
                        <tr>
                          <td width="13%">
                            <span class="mint-radio">
                               <input type="radio" class="mint-radio-input" value="optionA">
                                <span class="mint-radio-core" :class="{'s_mint-radio-core':val.id==czb,'no_author':val.isenable == 0}">
                                 </span>
                             </span>
                          </td>
                          <td >
                            <span :class="{'no_author':val.isenable == 0}">
                              {{val.indexName}}
                            </span>
                          </td>
                        </tr>
                      </table>

                    </div>
                  </mt-cell>
                </div>
              </ul>
            </div>
          </td>
        </tr>
      </table>
    </div>
      <div v-show="ctab==2">
        <mt-radio
          title="请选择"
          v-model="timeType"
          :options="[ '近三个月', '近六个月','近三年','近五年','自定义']">
        </mt-radio>
        <div v-show="shouCustom">
          <div><mt-field label="开始时间" placeholder="Input birthday" type="date" v-model="startTime"></mt-field></div>
          <div><mt-field label="结束时间" placeholder="Input birthday" type="date" v-model="endTime"></mt-field></div>
        </div>

      </div>
      <div v-show="ctab==3">
        <!--<mt-radio class="mradio"-->
          <!--title="请选择要"-->
          <!--v-model="timeType"-->
          <!--:options="[ '拆线图', '柱状图']">-->
        <!--</mt-radio>-->
        <p style="color: #888;    padding: 8px;">请选择</p>
        <table width="100%" style="background-color: white;text-align: center">

          <tr @click="changeType('line')">
            <td width="8%">
                    <span class="mint-radio" style="display: inline-block">
                      <input type="radio" class="mint-radio-input" value="optionA">
                      <span class="mint-radio-core"  :class="{'s_mint-radio-core':'line'==imgType}">
                      </span>
                    </span>
            </td>
            <td td width="18%">
                <div ><img src="../../../../assets/chart/zhexian.png" style="height: 30px;width: 30px;"></div>
            </td>
            <td style="text-align: left">
                <span>折线图</span>
            </td>
          </tr>
          <tr @click="changeType('bar')">
            <td width="8%">
                    <span class="mint-radio" style="display: inline-block">
                      <input type="radio" class="mint-radio-input" value="optionA">
                      <span class="mint-radio-core" :class="{'s_mint-radio-core':'bar'==imgType}">
                      </span>
                    </span>
            </td>
            <td td width="18%">
              <div ><img src="../../../../assets/chart/zhuxing.png" style="height: 30px;width: 30px;"></div>
            </td>
            <td style="text-align: left">
              <span>柱状图</span>
            </td>
          </tr>
        </table>

      </div>
    </div>
    <div class="fx-fotter" style=" ">
      <table width="100%">
        <tr>
          <td>
            <mt-button v-if="ctab==2||ctab==3" size="large" @click="go(-1)" class="up_step">上一步</mt-button>
          </td>
          <td>
            <mt-button v-if="ctab==1||ctab==2" size="large" @click="go(1)">下一步</mt-button>
            <mt-button v-if="ctab==3 " size="large" @click="back()">确定</mt-button>
          </td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  import Tab from "vux/src/components/tab/tab";
  export default {
    name: "custom-fx",
    components: {Tab},
    data: function () {
      return {
        imgType:'折线图',  //图类型
        startTime:'',    //如果是自定义  则为开始时间
        endTime:'',     //如果是自定义  则为结束时间
        timeType:'',    //时间类型
        timeTypeId:'',  //时间类型ID
        ctab:1,
        czb:'',        //当前选中的指标
        indexName:'',  //当前选中的指标名称
        departList: [],
        leftList:[],
        titleName:"",
        activeId:'',
        currentDepId:'',
        step2:0,
        step1:1,
        user: 1,
        job: '',
        currentPage: 1,
        pageSize: 15,
        totalSize: 0,
        loading:true,
        shouCustom:false, //是否显示自定义时间
        selected:"1",
        zhibiaoUrl:'/tr/trIndex/web/getMyIndexList',   //默认的指标加载URL
        maxStep:3
    }
    },
    watch :{
      /**
       * 时间类型
       * @param val
       */
      timeType(val){

        switch (val){
          case '近三个月':
            this.timeTypeId = '2';
                break;
          case '近六个月':
            this.timeTypeId = '2';
                break;
          case '近三年':
            this.timeTypeId = '3';
                break;
          case '近五年':
            this.timeTypeId = '3';
                break;
          case '自定义':
            this.timeTypeId = '1';
            this.shouCustom = true;
                break;
        }
        //解析时间类型转换为时间
        this.paseTimeType()


      },
      selected(val){
        this.leftList = [];
        this.departList = [];
        window.scrollTo(0,0);
        switch (val){
          case "1":
            this.zhibiaoUrl = '/tr/trIndex/web/getMyIndexList';
            this.getJob().then(this.getTreeHtml);
            break;
          case "2":
            let item = {
                id:-999,
                label:'自定义指标'
            };
            this.departList.push(item);
            this.activeId = -999;
            this.zhibiaoUrl = '/tr/autognosis/web/getCustomIndexList';
            this.getZhiBiaoById(void(0),1,this.zhibiaoUrl);
            break;
        }
      }
    },
    methods: {
      paseTimeType () {
        if (this.timeType === '自定义') {
          //在这里不做任何操作
          // this.startTime = this.mydateFormat.dateCodeYmd(this)
          // this.endTime = this.mydateFormat.dateCodeYmd(this.value6[1])
        }else if(this.timeType.indexOf('月')>=0){
          let month;
          if(this.timeType === '近三个月'){
            month = 2;
          }else if(this.timeType === '近六个月'){
            month = 5;
          }
          let datestr = new Date(new Date().getFullYear()
            + '-'
            + (new Date().getMonth() + 1)).getTime() - 28 * 24 * 60 * 60 * 1000 * month;
          this.startTime = new Date(datestr).getFullYear()
            + '-'
            + ((new Date(datestr).getMonth() + 1) < 10 ? ('0' + (new Date(datestr).getMonth() + 1)) : (new Date(datestr).getMonth() + 1));
          this.endTime = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1))
        } else {
          let year;
          if(this.timeType === '近三年'){
            year = 2;
          }else if(this.timeType === '近五年'){
            year = 4;
          }
          // 选择的是年
          this.startTime = new Date().getFullYear() - year;
          this.endTime = new Date().getFullYear()
        }
      },
      back () {
        if(this.czb === ''){
          Toast({
            message: '指标不能为空，请返回第一步选择指标',
            position: 'middle',
            duration: 3000
          });
          return
        }
        if(this.startTime === '' || this.endTime === ''){
          Toast({
            message: '开始时间与结束时间不能为空，请返回第二步选择起止时间',
            position: 'middle',
            duration: 3000
          });
          return
        }
        console.log("当前指标",this.czb);
        console.log("当前时间类型",this.timeType);
        console.log("开始时间与结束时间",this.startTime +' ' + this.endTime);
        console.log("图类型",this.imgType);
        let queryParam = {
          indexId:this.czb,
          indexName: this.indexName,
          startTime :this.startTime,
          endTime :this.endTime,
          timeType:this.timeTypeId,
          chartType : this.imgType,
          addNew:true
        };
        this.$router.push({
          path:'/zgsjfx/zzzd/sjxlfx',
          query:queryParam
        })
      },
      getCustomZhiBiao (obj) {
        this.$ajax(
          'post',
          this.HOST + this.zhibiaoUrl,
          obj,
          (res) =>{
            if (res.success) {
              console.log("CUSTOM-ZHIBIAO",res);
              this.totalPage = res.data.totalPage;
              for(let item of res.obj){
                this.leftList.push(item)
              }
            } else {
              // self.$message({
              //   message: res.msg,
              //   type: 'error'
              // })
            }
          }
        )
      },
      changeType (typeName) {
        this.imgType = typeName
      },
      changeTap (num) {
        this.ctab =num
      },
      go(num)  {
        if(num>0){
          if(this.ctab==3){

          }else{
            this.ctab +=num
          }
        }else{
          if(this.ctab==1){

          }else{
            this.ctab +=num
          }
        }
      } ,
      loadMore() {
        this.loading = true;
        console.log("HAH");
        if(this.totalPage<=this.currentPage){
          console.log("已经没有数据了");
          return
        }
        let start = ++this.currentPage;
        this.getZhiBiaoById(this.activeId,start,this.zhibiaoUrl);
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
      getTreeHtml () {
        console.log("JOGJOG",this.job);
        // 获取指标树形控件
        this.$ajax(
          'post',
          this.HOST + '/tr/trIndex/web/getMyIndexTypeList1',
          { deptId: this.job.split(',')[0], treeId: this.user },
           (res) =>{
            if (res.success) {
              console.log("TREE",res);
              let list = res.obj[0].children;
              this.departList = list;
              for(let [key,val] of list.entries()){
                if(key === 0){
                  this.activeId = val.id;
                  this.getZhiBiaoById(val.id,1,this.zhibiaoUrl)
                }
              }

            } else {

            }
          }
        )
      },
      selectZbiao : function (id,indexName,isenable){
        if(isenable == 0){
          return
        }
        this.czb = id;
        this.indexName = indexName

      },
      selectDepart: function (id,name,flag) {
        window.scrollTo(0,0);
        console.log("改变了当前激活ID");
        this.activeId = id;
        if(id === -999){
          return
        }
        this.currentPage = 1;
        this.leftList = [];
        this.getZhiBiaoById(id,this.currentPage)

      },
      getZhiBiaoById: function (id,start,url) {
        this.currentPage = start;
        let obj = {
          deptId: this.job.split(',')[0],
          typeId: id,
          // indexName: self.indexName,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        };
        if(id === undefined){
          this.getCustomZhiBiao(obj)
        }else{
          this.getZhiBiao(obj)
        }



      },
      getZhiBiao: function (param){
        this.$ajaxMore(
          'post',
          this.HOST + this.zhibiaoUrl ,
          param,
          (res) =>{
            if (res.success) {
              console.log("ZHIBIAO",res);
              this.totalPage = res.data.totalPage;
              for(let item of res.obj){
                this.leftList.push(item)
              }
            } else {
              // self.$message({
              //   message: res.msg,
              //   type: 'error'
              // })
            }
          }
        )
      }
    },
    mounted: function () {
      this.user = this.$route.query.userId; //切换用户属性
      let {max=3}  = this.$route.query;
      this.max = max;
      this.getJob().then(this.getTreeHtml);
    },
  }

</script>

<style>
  .btn_wrap {
    padding: 0 1rem;
    margin-top: 2rem;
  }
  .content-fx  .header{
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
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
  .middle-content {
    padding-top: 50px;
  }
  .middle-content1 {
    padding-top: 100px;
  }
  .content-fx .middle-content tr:first-child  .cell-part-left{
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
    top: 2px;
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
  }

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
  .step_activite{
    background-color: #70ad47;
  }

  .step_activite div span:nth-child(1){
    color: #70ad47;
  }
  .step_activite div span:nth-child(2){
    color: white;
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

  .middle-left{
    position: fixed;
    width: 35%;
  }
  .s_mint-radio-core{
    background-color: #70ad47;
    border-color: #70ad47;
  }
  .s_mint-radio-core::after{
    content: '';
    background: url("../../../../assets/chart/zhexian.png") no-repeat ;/*兼容没测*/
    border-radius: 100%;
    top: 5px;
    left: 5px;
    color: red;
    position: absolute;
    width: 8px;
    height: 8px;
    -webkit-transition: -webkit-transform .2s;
    transition: -webkit-transform .2s;
    transition: transform .2s;
    transition: transform .2s, -webkit-transform .2s;
    -webkit-transform: scale(0);
    transform: scale(0)
  }
  .fx-fotter{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .fx-fotter button{
    background-color: #70ad47;
    color: white;
  }
  .fx-fotter label{
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
  }
  .up_step{
    background-color: #bbb!important;
  }
  .content-fx  .mint-radio::after{
    content: ' ';
    position: absolute;
    top:8px;
    left: 8.5px;
    background: white;
    border-radius: 7px;
    width: 7px;
    height: 7px;


  }
  .content-fx .mint-radio-core{
    vertical-align: baseline!important;
  }
  .content-fx  .mint-radio-input:checked + .mint-radio-core{
    background-color: #70ad47;
    border-color: #70ad47;
  }
  .content-fx .ul_list1{
    padding-bottom:48px
  }
  .content-fx .ul_list{
    padding-bottom:30px
  }
  .content-fx .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid #70ad47;
    color: #70ad47;
  }
  .content-fx .mint-radio-label{
    vertical-align: super;
  }
  .content-fx .no_author{
    color: gray;
  }
</style>
