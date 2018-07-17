<template>
  <!-- <div> -->
    <div style="background: #fff;padding-top: 1.14rem;height: 100%;box-sizing: border-box;overflow-y: scroll;">
      <div class="top_div"></div>
      <a href="javascript:void(0)" class="add_new_chart" @click="addNewTable">
        <i class="iconfont">&#xe612;</i>
        <span>自定义分析</span>
      </a>
      <!-- 表格的容器 -->
      <div class="table_father_box">
        <template v-for="(item, index) in tableList">
        <div class="table_item" :key="index">
          <table>
            <tbody>
              <tr>
                <td width="1.78rem">
                  <div style="width: 1.78rem">
                    <table width="1.78rem" border="1" cellspacing="0" cellpadding="0" class="table_left">
                      <tbody>
                        <tr>
                          <td width="1.78rem">
                            <div style="width: 1.78rem" class="common_title_div">
                              <!-- <i class="del_box" @click="delTable(item.tableId, index)">
                                <i class="iconfont">&#xe635;</i>
                              </i> -->
                              <button @click="addNewRow(item.tableId, item)">添加要素</button>
                            </div>
                          </td>
                        </tr>
                        <template v-for="(ysItem, ysIndex) in item.rowslist">
                        <tr :key="ysIndex">
                          <td width="1.78rem">
                            <div style="width: 1.78rem" class="common_title_div_2">
                              <i class="del_box" @click="delRow(ysItem.rowCode,item.tableId, ysIndex)">
                                <i class="iconfont">&#xe635;</i>
                              </i>
                              {{ysItem.row_name}}
                            </div>
                          </td>
                        </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td>
                  <div style="width: 5.38rem;overflow-x: scroll" class="scroll_table_box">
                    <table border="1" cellspacing="0" cellpadding="0">
                      <tbody>
                        <tr>
                          <template v-for="(ztItem, ztIndex) in item.colslist">
                          <td :key="ztIndex">
                            <div style="width: 1.8rem;" class="common_title_div">
                              <i class="del_box" @click="delCol(ztItem.colsCode,item.tableId, ztIndex)">
                                <i class="iconfont">&#xe635;</i>
                              </i>
                              {{ztItem.colsName}}
                            </div>
                          </td>
                          </template>
                          <td>
                            <div style="width: 1.8rem;" class="common_title_div">
                              <button class="bigBtn" @click="addNewCol(item.tableId, item)">添加分析对象</button>
                            </div>
                          </td>
                        </tr>
                        <template v-for="(ysItem, ysIndex) in item.rowslist">
                        <tr :key="ysIndex">
                          <template v-for="(detailItem, detailIndex) in item.reslist">
                          <td :key="detailIndex">
                            <div style="width: 1.8rem;" class="common_title_div_2">
                              {{detailItem[ysItem.rowCode]}}
                            </div>
                          </td>
                          </template>
                          <td>
                            <div style="width: 1.8rem;" class="common_title_div_2"></div>
                          </td>
                        </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      </div>
    </div>
  <!-- </div> -->
</template>
<script>
import { Toast, Indicator } from 'mint-ui'
export default {
  data () {
    return {
      tableList: []
    }
  },
  watch: {
    '$route' () {
      this.getAllTable()
    }
  },
  mounted () {
    // 获取历史
    this.getAllTable()
  },
  methods: {
    getAllTable () {
      // Indicator.open()
      this.tableList = []
      if (this.$route.params.type - 0 >= 4) {
        this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/getCourseByCon', {tableType: this.$route.params.type}, (res) => {
          if (res.success) {
            this.tableList = res.obj
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
          // Indicator.close()
        })
      } else if (this.$route.params.type - 0 === 2) {
        this.$ajaxMore('post', this.HOST + '/tr/ComparativeAnalysis/web/getHistoricalComparaData_zz', {}, (res) => {
          if (res.success) {
            for (let item of res.obj) {
              let arr = []
              for (let item1 of item.colslist) {
                for (let item2 of item.reslist) {
                  if (item1.colsCode === item2.xh) {
                    arr.push(item2)
                  }
                }
              }
              item.reslist = arr
            }
            this.tableList = res.obj
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
          // Indicator.close()
        })
      } else if (this.$route.params.type - 0 === 1) {
        this.$ajaxMore('post', this.HOST + '/tr/factorAnalysis/web/getHistoryInfo', {}, (res) => {
          if (res.success) {
            this.tableList = res.obj
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
          // Indicator.close()
        })
      }
    },
    addNewCol (tableId, item) {
      if (this.$route.params.type - 0 == 1) {
        let obj = {}
        for (let val of item.rowslist) {
          obj[val.rowCode] = 1
        }
        sessionStorage.setItem('teacherGroup', JSON.stringify(obj))
      }
      this.$router.push({path: '/zgsjfx/zzzd/ysdbfx/' + this.$route.params.type + '/2/' + tableId});
    },
    addNewRow (tableId, item) {
      if (this.$route.params.type - 0 == 1) {
        let obj = {}
        for (let val of item.rowslist) {
          obj[val.rowCode] = 1
        }
        sessionStorage.setItem('teacherGroup', JSON.stringify(obj))
      }
      this.$router.push({path: '/zgsjfx/zzzd/ysdbfx/' + this.$route.params.type + '/3/' + tableId});
    },
    addNewTable () {
      if (this.$route.params.type - 0 == 1) {
        sessionStorage.setItem('teacherGroup','{}')
      }
      this.$router.push({path: '/zgsjfx/zzzd/ysdbfx/' + this.$route.params.type + '/1/-1'})
    },
    delTable (tableId, index) {
      if (this.$route.params.type - 0 === 1) {
        this.$ajax('post', this.HOST + '/tr/factorAnalysis/web/delTable', {tableId: tableId}, (res) => {
          if (res.success) {
            this.getAllTable()
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
        })
      } else {
        let data = {
          tableId: tableId
        }
        this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/delCols', data, (res) => {
          if (res.success) {
            this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/delRows', data, (res) => {
              if (res.success) {
                this.getAllTable()
              } else {
                Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
              }
            })
          } else {
            
          }
        })
      }
    },
    delRow (row, tableId, index) {
      let data = {
        rowCode: row,
        tableId: tableId
      }
      if (this.$route.params.type - 0 === 1) {
        this.$ajax('post', this.HOST + '/tr/factorAnalysis/web/delRows', data, (res) => {
          if (res.success) {
            this.getAllTable()
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
        })
      } else {
          this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/delRows', data, (res) => {
          if (res.success) {
            this.getAllTable()
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
        })
      }
    },
    delCol (col, tableId, index) {
      let data = {
        colsCode: col,
        tableId: tableId
      } 
      if (this.$route.params.type - 0 === 1) {
        this.$ajax('post', this.HOST + '/tr/factorAnalysis/web/delCols', data, (res) => {
          if (res.success) {
            this.getAllTable()
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
      })
      } else {
        this.$ajax('post', this.HOST + '/tr/ComparativeAnalysis/web/delCols', data, (res) => {
          if (res.success) {
            this.getAllTable()
          } else {
            Toast({
              message: res.msg,
              // iconClass: 'mintui mintui-success'
            });
          }
        })
      }
    },
  }
}
</script>
<style scoped>
.add_new_chart {
  width: 6.4rem;
  height: 1.26rem;
  box-sizing: border-box;
  border: 1px solid #eee;
  background: #f9f9f9;
  display: block;
  text-align: center;
  color: #70ad47;
  align-items: center;
  display: flex;
  justify-content: center;
  /* margin-top: 0.36rem; */
  margin: 0.4rem auto;
}
.add_new_chart span {
  font-size: 0.28rem;
  margin-left: 0.35rem;
}
.add_new_chart i.iconfont {
  font-size: 0.56rem;
}
div.table_item {
  display: flex;
  align-items: center;
}
div.item_left {
  width: 1.78rem;
}
div.item_right {
  width: 5.41rem;
  overflow-x: scroll;
  font-size: 0;
}
ul {
  border-top: 1px solid #dedede;
}
li {
  position: relative;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}
.common_title_div {
  height: 1.24rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.common_title_div_2 {
  height: 0.74rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.del_box {
  position: absolute;
  width: 0.36rem;
  height: 0.36rem;
  top: 0;
  right: 0;
  background: linear-gradient(to top right,transparent 0%, transparent 50%,#bdd7ad 50%, #bdd7ad 100%);
  color: #fff;
}
.del_box i {
  position: absolute;
  color: #fff;
  right: 0.02rem;
  top: 0.02rem;
  font-size: 0.13rem;
}
.item_right_child {
  font-size: 0;
  width: auto;
}
.item_right_ul {
  width: 1.8rem;
  display: inline-block;
}
.item_right td {
  width: 1.8rem;
}
.item_right td button {
  width: 1.8rem;
}
table {
  border-spacing: 0;
  border-color: #dedede;
  border-collapse: collapse;
  border: 0;
}
table div {
  font-size: 0.22rem;
  color: #333;
}
table table td {
  box-sizing: border-box;
}
.scroll_table_box .del_box {
  background: linear-gradient(to top right,transparent 0%, transparent 50%,#cbcbcb 50%, #cbcbcb 100%);
}
table button {
  border: 1px solid #77b150;
  font-size: 0.18rem;
  color: #fff;
  width: 1.06rem;
  height: 0.42rem;
  box-sizing: border-box;
  border-radius: 0.04rem;
  background: #77b150;
}
table button.bigBtn {
  width: 1.6rem;
}
.table_left {
  background: #f4f9f1;
}
</style>
