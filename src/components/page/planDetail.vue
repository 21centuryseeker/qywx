<template>
<div class="app" style="min-height: 100%;background: #fff;">
        <div class="top_box">
            <i class="iconfont">&#xe62b;</i><span class="title">{{targetName}}</span>
        </div>
        <!-- 主题信息 -->
        <div class="detail_container">
            <div>
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">计划详情</mt-tab-item>
                    <mt-tab-item id="2">审核历史</mt-tab-item>
                </mt-navbar>
                <!-- tab-container -->
                <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                  <!--详情-->
                <ul class="ul_detail ul_common_box">
                    <li>
                        <span class="name_left">计划描述</span>
                        <span class="content_right">{{targetInfo || '无'}}</span>
                    </li>
                    <li>
                        <span class="name_left">所属目标</span>
                        <span class="content_right">{{targetName || '无'}}</span>
                    </li>
                    <li>
                        <span class="name_left">创建人</span>
                        <span class="content_right">{{creator_name || '无'}}</span>
                    </li>
                    <li>
                        <span class="name_left">所属部门</span>
                        <span class="content_right">{{deptName || '无'}}</span>
                    </li>
                    <li>
                        <span class="name_left">监督人</span>
                        <span class="content_right">
                          <template v-for="(item, index) in jdNames">
                            {{index === jdNames.length - 1 ? item : item + ','}}
                          </template>
                          <!-- {{JSON.stringify(jdNames).slice(1, -1)}} -->
                        </span>
                    </li>
                    <li>
                        <span class="name_left">参与人</span>
                        <span class="content_right">
                          <template v-for="(item, index) in cyNames">
                            {{index === cyNames.length - 1 ? item : item + ','}}
                          </template>
                          <template  v-if="!cyNames.length" >无</template>
                        </span>
                    </li>
                    <li>
                        <span class="name_left">起止时间</span>
                        <span class="content_right">{{startTime + '至' + endTime}}</span>
                    </li>
                    <li>
                        <span class="name_left">审核方式</span>
                        <span class="content_right">{{checkObj[checkType]}}</span>
                    </li>
                    <li v-if="checkType - 0 !== 1">
                        <span class="name_left">审核人</span>
                        <span class="content_right">{{checkUserName || '无'}}</span>
                    </li>
                    <li v-if="listFile.length">
                        <span class="name_left">附件</span>
                        <span class="content_right file_box">
                          <template v-for="item in listFile">
                            <div :key="item.fileUrl">
                              <a :href="item.fileUrl">
                                <template v-if="iconObj[item.fileType]">
                                  <span v-html="iconObj[item.fileType]" class="download_i"></span>
                                </template>
                                <template v-if="!iconObj[item.fileType]">
                                  <i class="iconfont" style="font-size: 34px;color:#999">&#xe643;</i>
                                </template>
                                <!-- <i class="iconfont"></i> -->
                                <span class="file_child">{{item.oldFileName}}</span>
                              </a>
                            </div>
                            </template>
                        </span>
                    </li>
                    <li v-if="indexName">
                        <span class="name_left">指标</span>
                        <span class="content_right">{{indexName}}</span>
                    </li>
                    <li v-if="indexName">
                        <span class="name_left">考核标准</span>
                        <span class="content_right">{{indexName + khbz[targetStandContion - 0] + targetStand}}{{unit?unit:''}}</span>
                    </li>
                    <li v-if="indexName">
                        <span class="name_left">标准描述</span>
                        <span class="content_right">{{targetStandInfo || '无'}}</span>
                    </li>
                    <li v-if="indexName && listWarn.length">
                        <span class="name_left">预警设置</span>
                        <span class="content_right yj_box">
                          <template v-for="item in listWarn">
                            <div :key="item.waringNum"><i class="iconfont" style="color: #f7ab7c;">&#xe6e8;</i><span>
                            {{(item.waring_time?mydateFormat.dateCodeYmd(item.waring_time):'即时通知') + '&nbsp;&nbsp;&nbsp;' + indexName + khbz[item.warning_contion] + item.waring_num}}  
                            </span></div>
                          </template>  
                            <!-- <div><i class="iconfont" style="color: #f7ab7c;">&#xe6e8;</i><span>时间提醒: 2018-03-16</span></div> -->
                        </span>
                    </li>
                </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                  <!--历史-->
                <ul class="history_box ul_common_box">
                  <template v-for="(item, index) in history_list">
                    <template v-if="index === 0">
                      <li class="new_li" :key="index">
                        <span class="history_left">
                            <!-- &lt;!&ndash;<i class="i_line"></i><br/>&ndash;&gt; -->
                            <i class="iconfont" style="font-size: 0.55rem;">&#xe6a3;</i><br/>
                            <span class="year">{{item.create_time.slice(0, item.create_time.indexOf('-'))}}</span><br/>
                            <span class="date">{{item.create_time.slice(item.create_time.indexOf('-')+1)}}</span>
                        </span>
                        <span class="history_right">
                            <div>
                                <span class="span_status">{{item.audit_status}}</span>:
                                <span>{{item.audit_desc && item.audit_desc.trim() !== '' ? item.audit_desc.trim() : '无'}}</span>
                            </div>
                            <span>{{item.create_time}}</span>
                        </span>
                    </li>
                    </template>
                    <template v-else>
                      <li :key="index">
                        <span class="history_left">
                            <i class="i_line"></i><br/>
                            <i class="i_circle"></i><br/>
                            <span class="year">{{item.create_time.slice(0, item.create_time.indexOf('-'))}}</span><br/>
                            <span class="date">{{item.create_time.slice(item.create_time.indexOf('-')+1)}}</span>
                        </span>
                        <span class="history_right">
                            <div>
                                <span class="span_status">{{item.audit_status}}</span>:
                                <span>{{item.audit_desc && item.audit_desc.trim() !== '' ? item.audit_desc.trim() : '无'}}</span>
                            </div>
                            <span>{{item.create_time}}</span>
                        </span>
                    </li>
                    </template>
                  </template>
                </ul>
                <img src="../../assets/empty.jpg" alt="" v-if="!history_list.length" style="width: 100%;">
                </mt-tab-container-item>
                </mt-tab-container>
                <!-- <div class="btn_box">
                    <div class="top_btn active" data-box="ul_detail">目标详情 </div>
                    <div class="top_btn" data-box="history_box">审核历史</div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import Toast from 'mint-ui'
export default {
  data () {
    return {
      selected: '1',
      fileName: 'oldFileName',
      formData: {fileSource: '1'},
      checkUserName: '',
      creator_name: '', // 创建人
      isDisabled: false,
      myTime: '',
      completeValue: '',
      jdName: '',
      cyName: '',
      jdNames: [],
      cyNames: [],
      planName: '',
      history_list: [],
      auditDesc: '',
      auditStatus: 3,
      role_type: '',
      fileListSh: [],
      isEdit: false,
      textarea: '',
      uploadUrl: this.HOST + '/tr/uploadFile/web/uploadFile',
      data: {
        fileSource: '4' // 目标上传是为'1', 计划上传时为'2'
      },
      fileSuccessList: [],
      fileList: [],
      fileListOld: [],
      activeName: 'first',
      check_status: '',
      waringTime: '',
      listWarn: [],
      targetName: '',
      targetInfo: '',
      startTime: '',
      endTime: '',
      deptName: '', // 所属部门
      listFile: '',
      indexName: '',
      checkType: '',
      targetStandContion: '',
      targetStand: '',
      targetStandInfo: '',
      unit: '',
      checkObj: {
        '1': '自动审核',
        '2': '创建人审核',
        '3': '第三方审核'
      },
      khbz: [
        '',
        '大于等于',
        '大于',
        '等于',
        '小于等于',
        '小于'
      ],
      checkStatusName: [
        '',
        '未提交',
        '已提交',
        '审核不通过',
        '审核通过'
      ],
      iconObj: {
        '.xlsx': '<i class="iconfont" style="font-size: 34px;color: #5ca35b;">&#xe71b;</i>',
        '.xls': '<i class="iconfont" style="font-size: 34px;color: #5ca35b;">&#xe71b;</i>',
        '.png': '<i class="iconfont" style="font-size: 34px;color: #4aab8f;">&#xe611;</i>',
        '.jpg': '<i class="iconfont" style="color: #4aab8f;font-size: 34px;">&#xe611;</i>',
        '.jpeg': '<i class="iconfont" style="color: #4aab8f;font-size: 34px;">&#xe611;</i>',
        '.gif': '<i class="iconfont" style="color: #4aab8f;font-size: 34px;">&#xe611;</i>',
        '.pdf': '<i class="iconfont" style="color: #ee6a71;font-size: 34px;">&#xe69b;</i>',
        '.doc': '<i class="iconfont" style="color: #5185ba;font-size: 34px;">&#xe618;</i>',
        '.docx': '<i class="iconfont" style="color: #5185ba;font-size: 34px;">&#xe618;</i>',
        '.wmv': '<i class="iconfont" style="color: #6b7d8f;font-size: 34px;">&#xe613;</i>',
        '.mp4': '<i class="iconfont" style="color: #6b7d8f;font-size: 34px;">&#xe613;</i>',
        '.rm': '<i class="iconfont" style="color: #6b7d8f;font-size: 34px;">&#xe613;</i>',
        '.rmvb': '<i class="iconfont" style="color: #6b7d8f;font-size: 34px;">&#xe613;</i>',
        '.avi': '<i class="iconfont" style="color: #6b7d8f;font-size: 34px;">&#xe613;</i>',
        '.3gp': '<i class="iconfont" style="color: #6b7d8f;font-size: 34px;">&#xe613;</i>'
      }
    }
  },
  mounted () {
    // 获取详情和审核历史
    this.getDetail()
    this.getHistory()
  },
  methods: {
    getDetail () {
      let self = this
      this.$ajax('post', this.HOST + '/tr/planAudit/web/getPlanDetail', {planId: this.$route.params.id}, (res) => {
      if (res.success) {
        self.creator_name = res.obj.creator_name
        self.planName = res.obj.plan_name
        self.targetName = res.obj.target_name
        self.deptName = res.obj.dept_name
        self.targetInfo = res.obj.plan_content
        self.startTime = res.obj.start_time
        self.endTime = res.obj.end_time
        self.listFile = res.obj.fileListForAdd
        self.jdName = res.obj.supervisors
        self.jdNames = res.obj.supervisors.split(',')
        self.cyName = res.obj.joins
        self.cyNames = (res.obj.joins === '' ? '' : res.obj.joins.split(','))
        self.indexName = res.obj.indexName
        self.checkType = res.obj.checkTypeId.toString()
        self.targetStandContion = res.obj.planStandContion
        self.targetStand = res.obj.planStand
        self.targetStandInfo = res.obj.planStandInfo
        self.listWarn = res.obj.warn
        self.check_status = res.obj.check_status
        self.role_type = res.obj.planType
        self.checkUserName = res.obj.check_user_name + '(' + res.obj.check_user_id + ')'
        // 实际完成
        self.unit = res.obj.unit
        self.completeValue = res.obj.completeValue
        if (res.obj.resultType - 0 === 1) {
          self.isDisabled = true
        }
      } else {
        Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
      }
    })
    },
    getHistory () {
      this.$ajax('post', this.HOST + '/tr/planAudit/web/getHistroySubmitInfo', {planId: this.$route.params.id}, (res) => {
        if (res.success) {
          this.history_list = res.obj
        } else {
          Toast({
              message: res.msg,
              position: 'middle',
              duration: 3000
            });
        }
      })
    }
  }
}
</script>

<style scoped>
body {background: #f3f3f3;}
        div.top_box {padding: 0.3rem 0.4rem;box-sizing: border-box;font-size: 0;}
        div.detail_container>div {font-size: 0;background: #fff;/*border-bottom: 1px solid #e4e4e4;*/}
        /*top_box*/
        div.top_box {/*height: 1rem;*//*line-height: 1rem;*/font-size: 0.3rem;}
        div.top_box i {font-size: 0.3rem;background: #70ad47;color: #fff;padding: 0.03rem 0.05rem;border-radius: 4px;box-shadow: 0 0 3px #ccc;}
        span.title {margin-left: 0.2rem;font-size: 0.3rem;color: #555;word-break: break-all}
        /*详情*/
        ul.ul_detail li {font-size: 0;padding: 0.24rem 0;}
        ul.ul_detail li>span {display: inline-block;}
        span.name_left {width: 1.46rem;text-align: right;color: #888;font-size: 0.26rem;vertical-align: top;}
        span.content_right {padding-left: 0.6rem;width: 5.12rem;box-sizing: border-box;color: #444;font-size: 0.26rem;}
        /*颜色*/
        span.file_box {line-height: 0.59rem;}
        /* span.file_box i {margin-right: 0.15rem;} */
        span.file_child {color: #888;display: inline-block;width: 3.5rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
        i.pdf {color: #ee6a71;font-size: 0.59rem;}
        i.word,i.doc,i.docx,i.xls {color: #ee6a71;font-size: 0.59rem;}
        i.image,i.jpg,i.png,i.gif {color: #3ea362;font-size: 0.59rem;}
        i.video {color: #a652e2;font-size: 0.59rem;}
        i.iconfj {font-size: 0.59rem;}
        span.yj_box div {height: 0.48rem;}

        /*审核历史*/
        ul.history_box li {font-size: 0;height: 1.5rem;}
        span.history_left, span.history_right {display: inline-block;font-size: 0.28rem;vertical-align: top;}
        /* span.history_left {font-size: 0;} */
        span.history_left {width: 1.5rem;text-align: center;}
        ul.history_box {padding-top: 0.4rem;}
        ul.history_box li {color: #999;}
        span.history_right>div {color: #444;}
        ul.history_box li.new_li {color: #70ad47;}
        ul.history_box li.new_li span.history_right>div {color: #70ad47;}
        i.i_line {display: inline-block;width: 1px;background: #b6b6b6;height: 0.46rem;vertical-align: top;}
        span.year, span.date {font-size: 0.24rem;}
        span.span_status {font-size: 0.26rem;}
        span.span_status+span {font-size: 0.26rem;}
        span.history_right>span {font-size: 0.2rem;}
        span.history_right {line-height: 0.5rem;padding-top: 0.2rem;}
        li.new_li span.history_right {padding-top: 0;}
        span.history_right div {padding-top: 0.2rem;}
        i.i_circle {display: inline-block;width: 0.2rem;height: 0.2rem;box-sizing: border-box;border: 1px solid #999;border-radius: 100%;}

        /* ul.history_box {display: none;} */
        .mint-navbar .mint-tab-item.is-selected {
  color: #70ad47 !important;
}
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #70ad47;
}
.mint-navbar {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 0.2rem;
}
</style>
