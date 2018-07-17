<template>

  <div class="content-lantu lk-protect1">
    <div class="header">
      <mt-header :title="titleName" class="m-header">
        <router-link :to="$route.fullPath" slot="left">
          <mt-button icon="back" @click="getDpartment">上一级</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="middle-content">
      <table width="100%">
        <tr>
          <td width="35%" style="vertical-align:top">
            <div class="middle-left fontMidd">
              <div  @click="selectDepart(val.did,val.name, '', val.isManager)" v-for="(val,key) of departList" :key="key" :id="val.did"  :data-id="val.did">
                  <mt-cell  class="cell-part cell-part-left "
                            :title="val.name"
                            :class="[activeId==val.did?'no_right_border':'']"
                  >
                    <!--<span slot="title" >{{val.name}}</span>-->
                  </mt-cell>



              </div>

            </div>
          </td>
          <td width="65%">
            <div class="middle-right">
              <div v-for="(val,key) of leftList" :key="key"  @click="selectDepart(val.id,val.label,val.flag, isManager)" >
             <mt-cell class="cell-part" is-link
                       :data-id="val.id">
                <div slot="title" class="div_all" >
                  <div  class="title_" :class="[(val.flag=='dept') ? 'title_':'title_memeber']" style="">
                    <i v-if="val.flag=='dept'" class="iconfont">&#xe600;</i>
                    <i v-else class="iconfont member">&#xe6bc;</i>  </div>
                  <div class="title-info"> {{val.label}}</div>
                </div>
              </mt-cell>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "select-depart",
      data: function () {
        return {
          departList: [],
          leftList:[],
          titleName:"",
          activeId:'',
          currentDepId:'',
          isManager: 0,
        }
      },
        methods: {
          selectDepart: function (id,name,flag, isManager) {
            isManager !== undefined ? this.isManager = isManager : ''
            this.titleName = name
            console.log(id)
            if(flag==undefined){
              this.activeId = id;
              this.getMemberByDepartId(this.currentDepId, isManager);
            }else{
              if(flag == 'dept'){//如果是部门则加载该部门下的所有成员或子部门
                this.activeId = id;
                this.getMemberByDepartId(id, isManager);
              }else{//跳转到选择页面
                this.$router.push({
                  path:'/zggzyl-list'
                  ,query:{userId:id,deptId:this.activeId,name: window.escape(name)}
                })

              }
            }

          },
          getMemberByDepartId: function (did, isManager) {
            this.$ajax('get', this.HOST + '/tr/doubleStrands/web/getUserByDeptid?deptId=' + did + '&isManager=' + isManager, {}, (data) => {
              console.log('4444', data)
              let flag = data.success
              if (flag === true) {
                let objDep = data.data
                let secondDepList = objDep.list
                this.leftList = secondDepList
              }
            })
          },
          getDpartment: function () {
            this.$ajax('get', this.HOST + '/tr/doubleStrands/web/getDoubleStrands', {}, (data) => {
              console.log(data)
              let flag = data.success
               if (flag === true) {
                let objDep = data.data
                console.log(objDep)
                let deptList = objDep.deptList
                var newDepList = []
                for (let [key,secondDep] of deptList.entries()) {

                  var dep = {}
                  dep.name = secondDep.label
                  dep.did = secondDep.id
                  dep.flag = (secondDep.flag) ? secondDep.flag : 'dept'
                  dep.isManager = secondDep.isManager //  cjs修改
                  this.currentDepId = secondDep.id
                  this.currentDep = dep
                  newDepList.push(dep)
                  if(key === 0){
                    this.titleName = secondDep.label
                    this.leftList = secondDep.children
                    this.activeId = secondDep.id
                    this.currentDepId = secondDep.id
                    this.isManager = secondDep.isManager
                  }
                }
                this.departList = newDepList;
               }
            })
          }
        },
        mounted: function () {
         this.getDpartment();
        },
    }

</script>

<style>
  .content-lantu  .header{
    /* position: fixed; */
    position: relative;

    top: 0px;
    width: 100%;
    z-index: 2;
    padding: 0.1rem;
    background-color: #f3f3f3;
  }
  .content-lantu .header .m-header{
    background: none;
    color: #888;
    font-size: 0.26rem;

  }
  .lk-protect1 .middle-content{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* padding-bottom: 40px; */
    padding-top: 48px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .content-lantu .cell-part{
    height: 55px;
  }
  .content-lantu .cell-part i{
    font-size: 0.6rem;
    line-height:50px;
    color: #ffbf33;
  }
  .content-lantu .cell-part i.member{
    color: #d4d4d4;
  }
  .content-lantu .header .iconfont{
    display: block;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg);
  }

  .content-lantu .middle-content tr:first-child  .cell-part-left{
    background-color: #f3f3f3;
    border-right:solid 1px #e4e4e4
  }
  .content-lantu .no_right_border{
    border-right: none!important;
    background-color: white!important;
  }
  .content-lantu .title_{
    display: inline-block;
    /* background-color: #ffbf33;
    border-radius: 45px;
    height: 45px;
    width: 45px; */
    text-align: center;
  }

  .member{

  }
 .content-lantu .title-info{
    display: inline-block;
    padding-left: 10px;
    position: absolute;
    top: 30%;
    font-size: 0.26rem
  }
 .content-lantu .div_all{
    position: relative;
    top: 5px;
    height: 50px;
  }
  .content-lantu .title_memeber{
    display: inline-block;
    /* background-color: #d4d4d4;
    border-radius: 45px;
    height: 45px;
    width: 45px; */
    text-align: center;
  }
  .content-lantu div[class=mint-cell-wrapper]{
    background-image: none!important;
  }
  .fontMidd .mint-cell-text{
    font-size: 0.26rem
  }
  .lk-protect1 .middle-left.fontMidd, .lk-protect1 .middle-right {   /* cjs */
    height: 100vh;
    padding-top: 105px;
    padding-bottom: 55px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .lk-protect1  .middle-content {   /* cjs */
    -webkit-transform: translateY(-52px);
    -moz-transform: translateY(-52px);
		-ms-transform: translateY(-52px);
		-o-transform: translateY(-52px);
    transform: translateY(-52px);
  }
</style>
