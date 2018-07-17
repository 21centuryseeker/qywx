<template>
<div style="float: left: width: 75%;">
  <template>
    <vue-seamless-scroll :data="marqueeData" :class-option="optionSingleHeightTime" class="seamless-warp">
        <ul class="item">
            <!-- <li v-for="item in listData">
                <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
            </li> -->
            <li v-for="(item,index) in marqueeData"  :key="index">
                      <a href="javascript:void(0)" v-text="item.content" :key="index"></a>
                    </li>
        </ul>
    </vue-seamless-scroll>
  </template>
    </div>
</template>
<style scoped>
    .seamless-warp {
        height: 30px;
        overflow: hidden;
    }
</style>
<script>
    export default {
        data () {
            return {
                listData: [{
                   'title': '无缝滚动第一行无缝滚动第一行',
                   'date': '2017-12-16'
                 }, {
                    'title': '无缝滚动第二行无缝滚动第二行',
                    'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第三行无缝滚动第三行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第四行无缝滚动第四行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第五行无缝滚动第五行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第六行无缝滚动第六行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第七行无缝滚动第七行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第八行无缝滚动第八行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第九行无缝滚动第九行',
                     'date': '2017-12-16'
                 }],
                 marqueeData: []
                }
            },
            computed: {
                optionSingleHeightTime () {
                    return {
                            singleHeight: 26,
                            waitTime: 2500
                        }
                }
             },
             mounted () {
    let self = this
    self.$ajax('post', self.HOST + '/tr/autognosis/web/autognosiShow', {}, function (res) {
      if (res.success) {
        let defaultDepId = res.obj[0].deptId
        self.deptId = defaultDepId
        // 消息通知
        self.targetNoticeFn()
      } else {
           // error
          alert('error')
      }
    })
  },
  methods: {
    targetNoticeFn () {
      let self = this
      let newData = {
        messageStatus: 0,
        deptId: self.deptId, // 计划归属
        pageNumber: 1,
        pageSize: 6
      }
      self.$ajaxMore('post', self.HOST + '/tr/trUser/web/getUserMessageInfo', newData, function (res) {
        if (res.success) {
          self.marqueeData = []
          self.marqueeData = res.obj
        } else {
          // error
          alert('error')
        }
      })
    }, 
  }
       }
</script>
