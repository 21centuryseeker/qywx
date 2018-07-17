<template>
  <div style="min-height: 100vh;background: #fff;">
    <div class="tjsh_box">
      <div class="div_left">标准</div>
      <div class="div_right">{{targetStand}}{{unit}}</div>
    </div>
    <div class="tjsh_box">
      <div class="div_left">实际完成</div>
      <div class="div_right">{{completeValue}}{{unit}}</div>
    </div>
    <div class="tjsh_box">
      <div class="div_left">时间</div>
      <div class="div_right">{{myTime || '无'}}</div>
    </div>
    <div class="tjsh_box">
      <div class="div_left">当前状态</div>
      <div class="div_right">{{checkStatusName[zhuangtai]}}</div>
    </div>
    <div class="tjsh_box">
      <div class="div_left">说明</div>
      <div class="div_right">
        <template v-if="flag !== 1 && flag !== 3">
          {{shuoming || '无'}}
        </template>
        <template v-else>
          <textarea name="" id="" cols="30" rows="10" class="tjsh_textarea" v-model="shuoming"></textarea>          
        </template>
      </div>
    </div>
    <div class="tjsh_box">
      <div class="div_left">附件</div>
      <div class="div_right">
        <form id="form_upload" v-if="flag === 1 || flag === 3">
          <a href="javascript:void(0)" class="upload_a">选择文件</a>
          <input type="file" id="file_upload" class="upload_input" @change="fileChange">
        </form>
        <!-- 接收文件的list -->
        <div class="upload_list">
          <template v-if="flag === 1 || flag === 3">
            <div class="item" v-for="(item, index) in fileList" :key="index" @touchstart="touchEle(index, $el)" @touchmove="touchmove" @touchend="touchend">
              <a :href="item.fileUrl">
          <span class="info">
            <template v-if="iconObj[item.fileType]">
              <i v-html="iconObj[item.fileType]"></i>
            </template>
            <template v-else>
              <i><i class="iconfont" style="font-size: 0.34rem;color: #ccc;">&#xe643;</i></i>
            </template>
            {{item[fileName] ? item[fileName] : item['oldFileName'] ? item['oldFileName'] : item['fileName']}}</span>
          <span class="state">
            <i class="iconfont" v-if="flag === 1 || flag === 3">&#xe648;</i>
            </span>
            </a>
        </div>
          </template>
          <template v-else>
            <div class="item" v-for="(item, index) in fileList" :key="index" >
              <a :href="item.fileUrl">
          <span class="info">
            <template v-if="iconObj[item.fileType]">
              <i v-html="iconObj[item.fileType]"></i>
            </template>
            <template v-else>
              <i><i class="iconfont" style="font-size: 0.34rem;color: #ccc;">&#xe643;</i></i>
            </template>
            {{item[fileName] ? item[fileName] : item['oldFileName'] ? item['oldFileName'] : item['fileName']}}</span>
          <span class="state">
            </span>
            </a>
        </div>
          </template>
    </div>
      </div>
    </div>
    <div style="text-align: center" v-if="flag ===1 || flag === 3">
      <button class="doSure" @click="doSure">提交</button>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { clearTimeout } from 'timers'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      targetStand: '',
      unit: '',
      completeValue: '',
      myTime: '',
      zhuangtai: '',
      fileList: [],
      flag: 1,
      shuoming: '',
      timeoutflag: '',
      touchFlag: false,
      formData: {fileSource: 2},
      fileName: 'fileName',
      iconObj: {
        '.xlsx': '<i class="iconfont" style="font-size: 0.34rem;color: #5ca35b;">&#xe71b;</i>',
        '.xls': '<i class="iconfont" style="font-size: 0.34rem;color: #5ca35b;">&#xe71b;</i>',
        '.png': '<i class="iconfont" style="font-size: 0.34rem;color: #4aab8f;">&#xe611;</i>',
        '.jpg': '<i class="iconfont" style="color: #4aab8f;font-size: 0.34rem;">&#xe611;</i>',
        '.jpeg': '<i class="iconfont" style="color: #4aab8f;font-size: 0.34rem;">&#xe611;</i>',
        '.gif': '<i class="iconfont" style="color: #4aab8f;font-size: 0.34rem;">&#xe611;</i>',
        '.pdf': '<i class="iconfont" style="color: #ee6a71;font-size: 0.34rem;">&#xe69b;</i>',
        '.doc': '<i class="iconfont" style="color: #5185ba;font-size: 0.34rem;">&#xe618;</i>',
        '.docx': '<i class="iconfont" style="color: #5185ba;font-size: 0.34rem;">&#xe618;</i>',
        '.wmv': '<i class="iconfont" style="color: #6b7d8f;font-size: 0.34rem;">&#xe613;</i>',
        '.mp4': '<i class="iconfont" style="color: #6b7d8f;font-size: 0.34rem;">&#xe613;</i>',
        '.rm': '<i class="iconfont" style="color: #6b7d8f;font-size: 0.34rem;">&#xe613;</i>',
        '.rmvb': '<i class="iconfont" style="color: #6b7d8f;font-size: 0.34rem;">&#xe613;</i>',
        '.avi': '<i class="iconfont" style="color: #6b7d8f;font-size: 0.34rem;">&#xe613;</i>',
        '.3gp': '<i class="iconfont" style="color: #6b7d8f;font-size: 0.34rem;">&#xe613;</i>'
      },
      checkStatusName: [
        '',
        '未提交',
        '已提交',
        '审核不通过',
        '审核通过'
      ],
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$ajax('post', this.HOST + '/tr/planAudit/web/getPlanDetail', {planId: this.$route.params.id}, (res) => {
        this.targetStand = res.obj.planStand || '无'
        this.unit = res.obj.unit
        this.completeValue = res.obj.completeValue
        this.myTime = ''
        this.zhuangtai = res.obj.check_status
        this.shuoming = res.obj.audit_desc
        this.fileList = res.obj.fileList || []
        this.flag = res.obj.check_status
      })
    },
    doSure () {
      let data = {
        planId: this.$route.params.id,
        auditDesc: this.shuoming,
        files: this.fileList
      }
      this.$ajaxMore('post', this.HOST + '/tr/planAudit/web/submitPlanAudit', data, (res) => {
        if (res.success) {
          Toast({
            message: res.msg,
            iconClass: 'icon icon-success'
          })
          this.getDetail()
        } else {
          Toast({
            message: res.msg,
            iconClass: 'icon icon-error'
          })
          this.getDetail()
        }
      })
    },
    touchEle (index, el) {
      this.touchFlag = true
      window.clearTimeout(this.timeoutflag)
      this.timeoutflag = setTimeout(() => {
        this.touchend2(index)
      },1500)
    },
    touchmove () {
      window.clearTimeout(this.timeoutflag)
      this.touchFlag = false
    },
    touchend () {
      window.clearTimeout(this.timeoutflag)
      this.touchFlag = false
    },
    touchend2 (index) {
      if (this.touchFlag) {
        MessageBox({
          title: '提示',
          message: '你确认删除该附件?',
          showCancelButton: true
        }).then((action) => {
          if (action === 'confirm') {
            this.fileList.splice(index, 1)            
          }
        }).catch((action) => {
          // console.log(action)
          // clearTimeout(this.timeoutflag)
        })
      }
    },
    fileChange () {
      this.upload()
    },
    upload () {
      let form_data = document.getElementById('form_upload')
      let file = document.getElementById('file_upload')
      if (!file.files.length) {
        return
      }
      let obj = file.files[0]
      if (obj.size / (1024 * 1024) > 10) {
        // 提示文件过大无法上传
        alert('文件大于10m,无法上传哦')
        return
      }
      let data = new FormData()
      for (let key in this.formData) {
        data.append(key, this.formData[key])
      }
      data.append('file', file.files[0], file.files[0].name)
      const xhr = new XMLHttpRequest()
      xhr.open('post', this.HOST + '/tr/uploadFile/web/uploadFile', true);
      // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
      xhr.send(data)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let res = JSON.parse(xhr.responseText)
          this.fileList.push(res.successList[0])
          file.value = ''
          return xhr.responseText
        }
      }
    }
  }
}
</script>
<style scoped>
div.tjsh_box {
  font-size: 0;
  padding: 0 0.35rem;
  min-height: 0.8rem;

}
  div.div_left {
    width: 1.9rem;
    display: inline-block;
    vertical-align: top;
    min-height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #888;
  }
  div.div_right {
    width: 4.56rem;
    display: inline-block;
    vertical-align: top;
    min-height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: #333;
  }
  #form_upload {
    position: relative;
  }
  .upload_a {
    width: 1.6rem;
    height: 0.52rem;
    box-sizing: border-box;
    border-radius: 0.04rem;
    border: 1px solid #afdf8f;
    text-align: center;
    line-height: 0.5rem;
    color: #70ad47;
    background: #eaf5e3;
    display: block;
    margin-top: 0.15rem;
    font-size: 0.24rem;
  }
  .upload_input {
    width: 1.6rem;
    height: 0.52rem;
    overflow: hidden;
    top: 0rem;
    left: 0;
    position: absolute;
    opacity: 0;
  }
  .upload_list .info {
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80%;
  padding-right: 20px;
}
.upload_list .item {
  position: relative;
}
.upload_list .info>i {
  margin-right: 10px;
}
.upload_list .state {
  margin-left: 20px;
  position: absolute;
  right: 5px;
  color:#57a026;
}
.upload_list .item:hover .el-icon-success:before {
    content: "\E60F";
}
.upload_list .item:hover {
  background: #e0e0e0;
  cursor: pointer;
}
.tjsh_textarea {
  width: 4.6rem;
  height: 3.64rem;
  resize: none;
  border-radius: 0.04rem;
  border: 1px solid #dedede;
  box-sizing: border-box;
}
.doSure {
  width: 6.52rem;
  height: 0.64rem;
  background: #70ad47;
  color: #fff;
  border-radius: 0.04rem;
  border: 0;
  margin-top: 0.9rem;
}
</style>
