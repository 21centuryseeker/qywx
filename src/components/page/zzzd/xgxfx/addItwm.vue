<template>
  <div class="xgxfx_add content-fx">
     <div class="step_box header">
      <table class="table-step">
        <tr>     
         <td  :class="[isFirst==1?'step_activite':'step_no_activite']" ><div @click="changeTap(1)"><span class="num_info">1</span>&nbsp;<span>选择分析对象</span></div></td>
          <td  :class="[isFirst==2?'step_activite':'step_no_activite']"><div @click="changeTap(2)"><span class="num_info">2</span>&nbsp;<span>选择指标</span></div></td>
        </tr>
      </table>
       <mt-navbar v-model="selected" v-if="isFirst==2">
        <mt-tab-item id="1">从指标库选取</mt-tab-item>
        <mt-tab-item id="2">自定义指标</mt-tab-item>
      </mt-navbar>
      </div>
      <!-- header end -->

     <div class="middle-content my_dialog_container" :class="{'middle-content1':isFirst==1}">
        <template v-if="isFirst == 1">
            <ul class="containerGroup">
              <li>
                <div class="lable_title">专业大类</div>
                <select class="select" v-model="valueYx"  placeholder="请选择" filterable @change="selectYXFn">
                  <template v-for="(item, index) in optionsYx">
                  <option :value="item.id" :key="index">{{item.deptName}}</option>
                  </template>
                </select>
              </li>
                <li v-if="this.type!=1">
                <div class="lable_title">专业名称</div>
                  <select class="select" v-model="valueZy" :disabled="flagZY" placeholder="请选择" filterable @change="selectZYFn">
                  <template v-for="(item, index) in optionsZy">
                  <option :value="item.id" :key="index">{{item.dept_name}}</option>
                  </template>
                </select>
              </li>
                <li v-if="this.type==2">
                <div class="lable_title">班级名称</div>
                  <select class="select" v-model="valueBj" :disabled="flagBJ" placeholder="请选择" filterable>
                  <template v-for="(item, index) in optionsBj">
                  <option :value="item.id" :key="index">{{item.name}}</option>
                  </template>
                </select>
              </li>
              <li v-if="this.type==5">
                <div class="lable_title">课程名称</div>
                  <select class="select" v-model="valueKc" :disabled="flagKc" placeholder="请选择" filterable >
                  <template v-for="(item, index) in optionsKc">
                    <option :value="item.kcdm" :key="index">{{item.kcmc}}</option>
                  </template>
                </select>
              </li>
            </ul>
        </template>
        <template v-if="isFirst == 2">
          <div id="ttable" class="clearfix scollBox">
          <div class="scollLeft">
              <div class="middle-left">
                <ul>
                  <li  @click="selectFirst(val.id)" v-for="(val,key) of departList" :key="key" :id="val.id"  :data-id="val.id">
                    <mt-cell  class="cell-part cell-part-left firstTitle "
                            :title="val.label"
                            :class="[activeIdFater==val.id?'greenText':'']"
                            >
                    </mt-cell>
                    <ol v-if="activeIdFater==val.id">
                      <li  @click.stop="selectDepart(item.id,item.label)"  v-for="(item,index) of val.children" :key="index" :id="item.id"  :data-id="item.id">
                        <mt-cell class="cell-part cell-part-left listMt"
                            :title="item.label"
                            :class="[activeId==item.id?'no_right_border':'']">

                        </mt-cell>
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>
          </div>
          <div class="scollRight">
            <div v-if="noDataFlag" class="noData">暂无数据</div>
              <div v-else class="middle-right" style="height: 100vh" >
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
                              <span class="mint-checkbox">
                                <input type="checkbox" class="mint-checkbox-input" value="optionA">
                                  <span class="mint-checkbox-core" :class="{'s_mint-checkbox-core': czb.indexOf(val.id) >=0,'no_author':val.isenable == 0}">
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
          </div>
        </div>
       
         
        </template>
     </div>
     <!-- middle-content end -->

     <div class="fx-fotter" style=" ">
      <table width="100%">
        <tr>
          <td>
            <mt-button v-if="isFirst==2" size="large" @click="nextStep(-1)" class="up_step">上一步</mt-button>
          </td>
          <td>
            <mt-button v-if="isFirst==1" size="large" @click="nextStep(1)">下一步</mt-button>
            <mt-button v-if="isFirst==2 " size="large" @click="addSure">确&nbsp;&nbsp;定</mt-button>
          </td>
        </tr>
      </table>
    </div>
    <!-- fx-fotter end -->
     
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      job:'',//部门id
      type:1,//角色
      isFirst:1,//第一步
      optionsYx: [],
      valueYx: '',
      optionsZy: [],
      valueZy: '',
      optionsBj: [],
      valueBj: '',
      optionsKc: [],
      valueKc: '',
      inputData: {},
      flagZY: true,
      flagBJ: true,
      flagKc:true,
      departList:[],
      leftList:[],
        activeId:'',
        currentDepId:'',
        step2:0,
        step1:1,
        user: 1,

        currentPage: 1,
        pageSize: 15,
        totalSize: 0,
        loading:true,
        shouCustom:false, //是否显示自定义时间
        selected:"1",
        zhibiaoUrl:'/tr/trIndex/web/getMyIndexList2',   //默认的指标加载URL
        maxStep:3,
        totalPage:0,
        noDataFlag:false,
         czb:[],        //当前选中的指标
         activeIdFater:'',
         wFirst:2
    }
  },
  watch: {
    // // 监听路由变化
    // '$route' (to, from) {
    //     this.type = this.$route.params.type
    // }
    selected(val){
        this.leftList = [];
        this.departList = [];
        window.scrollTo(0,0);
        switch (val){
          case "1":
            this.zhibiaoUrl = '/tr/trIndex/web/getMyIndexList2';
            this.getJob().then(this.getTreeHtml);
            break;
          case "2":
            let item = {
                id:-999,
                label:'自定义指标'
            };
            this.departList.push(item);
            this.activeIdFater = -999;
            this.zhibiaoUrl = '/tr/autognosis/web/getCustomIndexList';
            this.getZhiBiaoById(void(0),1,this.zhibiaoUrl);
            break;
        }
      }
  },
  mounted(){
    this.type = this.$route.params.type  
    let {max=3}  = this.$route.query;
    this.max = max;
    this.getJob().then(this.getTreeHtml);
    // 调用院系
    this.getYxFn()
      
     
  },
  methods: {
      changeTap (num) {
        this.isFirst =num
        // if(num==2){
        //    if(this.wFirst<3){
        //      this.wFirst++
        //     //  this.getJob().then(this.getTreeHtml)
        //    }
        // }
       
      },
     // 获取院系
    getYxFn () {
      let self = this
      let dataNew = {
        searchName: ''
      }
      this.$ajax('post', this.HOST + '/tr/trDept/web/getIsDeptList', {}, (res) => {
        if (res.success) {
          self.optionsYx = res.obj
         
        } else {
          // self.$message({
          //   message: res.msg,
          //   type: 'error'
          // })
        }
      }
      )
    },
    selectYXFn(){
      this.flagZY = true
      this.flagBJ = true
      this.flagKc=true
      this.valueZy = ''
      this.valueBj = ''
      this.valueKc=""
      this.getZyFn()
    },
    // 获取专业
    getZyFn () {
      let self = this
      let dataNew = {
        yxdm: this.valueYx,
        searchName: '',
        tableId: ''
      }
      self.$ajax('post', this.HOST + '/tr/trCA/web/getZyByYX', dataNew,
        function (res) {
          if (res.success) {
            self.flagZY = false
            self.optionsZy = res.obj
          } else {
            // self.$message({
            //   message: res.msg,
            //   type: 'error'
            // })
          }
        }
      )
    },
    selectZYFn(){
       if(this.type!=5){
        this.flagBJ = true
        this.valueBj = ''
        this.getBjFn()
      }else{
        this.flagKc = true
        this.valueKc = ''
        this.getKcFn()
      }
    },
    // 获取班级
    getBjFn () {
      let self = this
      let dataNew = {
        zydm: self.valueZy,
        searchName: ''
      }
      self.$ajax('post', this.HOST + '/tr/trCA/web/getClassByZy', dataNew,
        function (res) {
          if (res.success) {
            self.flagBJ = false
            // console.log('banji ',res.obj)
            self.optionsBj = res.obj
          } else {
           
          }
        }
      )
    },
     // 获取课程
    getKcFn () {
      let self = this
      let dataNew = {
        zydm: self.valueZy,
        searchName: ''
      }
      self.$ajax('post', this.HOST + '/tr/trCA/web/getKcByZy', dataNew,
        function (res) {
          if (res.success) {
            self.flagKc = false
            // console.log('课程',res.obj)
            self.optionsKc = res.obj
          } else {
            // self.$message({
            //   message: res.msg,
            //   type: 'error'
            // })
          }
        }
      )
    },
    // 下一步
    nextStep(){
     if (this.isFirst < 2) {
        this.isFirst++
        // this.getJob().then(this.getTreeHtml);
      } else {
        this.isFirst = 1
      }
    },

    getJob: function () {
        let promist = new Promise((resolve, reject) => {
          // 获取用户的所有职务
          this.$ajax('post', this.HOST + '/tr/autognosis/web/autognosiShow', {}, (res) => {
            if (res.success) {  
              this.job = res.obj[0].deptId
              resolve();
            } else {
              // this.$message({
              //   message: res.msg,
              //   type: 'error'
              // })
            }
          })
        });
        return promist;

      },
    // 左侧树形结构
        // 第二步树形结构的数据
    getTreeHtml () {

      let self = this
      // 获取指标树形控件
      self.$ajax(
        'post',
        self.HOST + '/tr/trIndex/web/getMyIndexTypeList1',
        { deptId: self.job },
        function (res) {
          if (res.success) {
            self.departList=res.obj
            self.activeIdFater=res.obj[0].id;
            self.activeId = res.obj[0].children[0].id;
             self.getZhiBiaoById( self.activeId,1)
          } else {
            // self.$message({
            //   type: 'error',
            //   message: res.msg
            // })
          }
        }
      )
    },
    selectDepart: function (id,name,flag) {
        window.scrollTo(0,0);
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
          deptId: this.job,
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
       getCustomZhiBiao (obj) {
        this.$ajax(
          'post',
          this.HOST + this.zhibiaoUrl,
          obj,
          (res) =>{
            if (res.success) {  
                if(res.data){
                this.totalPage = res.data.totalPage;
              }
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
       getZhiBiao: function (param){
        this.$ajaxMore(
          'post',
          this.HOST + this.zhibiaoUrl ,
          param,
          (res) =>{
            if (res.success) {
              // console.log("ZHIBIAO",res);
              // console.log( res.data)
              if(res.data){
                this.totalPage = res.data.totalPage;
              }

              if(res.obj){
                this.noDataFlag=false
                for(let item of res.obj){
                  this.leftList.push(item)
                }
              }else{
                 this.noDataFlag=true
              }
            } else {
              // Toast({
              //   message: '请选择俩个指标',
              //   // iconClass: 'mintui mintui-success'
              // });
            }
          }
        )
      },
      // 多选
      selectZbiao : function (id,indexName,isenable){
        if(isenable == 0){
          return
        }
        if (this.czb.indexOf(id) >= 0) {
          this.czb.splice(this.czb.indexOf(id), 1)
        } else {
          this.czb.push(id)
        }
        this.indexName = indexName

      },
      // 第一级别的点击事件
      selectFirst(id){
        if(this.activeIdFater==id ){
            this.activeIdFater=0
        }else{
          this.activeIdFater=id 
        }
      },

    addSure(){
       if (this.czb.length>2) {
          Toast({
            message: '请选择俩个指标',
            // iconClass: 'mintui mintui-success'
          });
          return
      }
       if (this.czb.length<2) {
          Toast({
            message: '请选择俩个指标',
            // iconClass: 'mintui mintui-success'
          });
          return
      }
      // 根据类型来请求数据
      if (this.czb.length==2) {
        //  传过去指标相关信息 
        // 请求数据
        let self=this
        let data1 = {
            indexType:self.type, 
            indexId1:self.czb[0],
            indexId2:self.czb[1],
            yxdm:self.valueYx,
            zydm:self.valueZy,
            bjdm:self.valueBj,
            kcdm:self.valueKc
        };
       self.$ajaxMore(
          'post',
          self.HOST + '/tr/trCA/web/setHistoryParam',
          data1,
          function (res) {
            if (res.success) {
              self.$router.go(-1)
            } else {
             Toast({
                message: res.msg,
                // iconClass: 'mintui mintui-success'
              });
            }
          }
        )
     
      }
    },
    loadMore(){
       this.loading = true;
        if(this.totalPage<=this.currentPage){
          console.log("已经没有数据了");
          return
        }
        let start = ++this.currentPage;
        this.getZhiBiaoById(this.activeId,start,this.zhibiaoUrl);
    }
  }
}
</script>

<style scoped>
.clearfix {
	*zoom: 1;
}

.clearfix:after {
	display: block;
	clear: both;
	content: " ";
	height: 0;
	visibility: hidden;
}
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul,
li,
table,
caption,
thead,
tbody,
tfoot,
tr,
td,
th,
label,
input,
button,
select,
option,
img {
	margin: 0;
	padding: 0;
	font-family: "Microsoft Yahei", "微软雅黑", "Helvetica Neue", Helvetica, Arial, sans-serif;
	border: 0;
}
table,
caption,
thead,
tbody,
tfoot,
tr,
td,
th{
    border-collapse: collapse
}
.my_dialog_container .containerGroup{
  width: 5.6rem;
  margin: 0 auto;
}
.my_dialog_container .lable_title {
  margin-bottom: 0.25rem;
  padding-top: 0.48rem;
  font-size: 0.28rem;
  color: #555;
}
 .my_dialog_container  .select {
  width: 5.6rem;
  height: 0.68rem;
  background: #fff;
  border: 1px solid #dedede;
}
 .xgxfx_add{
  height: 100%;
  background-color: #fff
} 
.mint-checklist {
  padding-top: 0.2rem;
} 
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
    padding-top: 1.5rem;
  }
  .content-fx .middle-content   .cell-part-left{
    background-color: #f3f3f3;
    border-right:solid 1px #e4e4e4;
    position: relative;
    left: 1px;
  }
  .content-fx .no_right_border{
    /* border-right: none!important; */
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
    /* position: fixed;
    width: 35%;
    height: 100vh;
    overflow-y: auto */
  }
  .s_mint-checkbox-core{
    background-color: #70ad47;
    border-color: #70ad47;
  }
  .s_mint-checkbox-core::after{
  border-color: #fff;
    -webkit-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1); 
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
  .content-fx .mint-checkbox-core{
    vertical-align: baseline!important;
  }
  .content-fx  .mint-checkbox-input:checked + .mint-checkbox-core{
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
  .scollBox{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-bottom: 40px;
    padding-top: 88px;
    box-sizing: border-box
  }
  .scollLeft,
  .scollRight{
    float: left;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box
  }
   .scollLeft{
     width: 35%;
     background-color: #f3f3f3;
    /* border-right: solid 1px #e4e4e4; */
   }
    .scollRight{
     width: 65%
   }
   .firstTitle{
     color: #999;
     font-size: 0.24rem;
     border-bottom: 1px solid #e4e4e4
   }
   .listMt{
     color: #555;
     font-size: 0.24rem
   }
   .noData{
     padding: 2rem 0;
    text-align: center;
   }
  .greenText{
    color: #70ad47
  }
  .middle-content .middle-left {   /* cjs */
    height: 100vh;
    box-sizing: border-box;
    padding-bottom: 142px;
    overflow-y: scroll;
  }
  .fx-fotter {   /* cjs */
    background: #fff;
  }
</style>
