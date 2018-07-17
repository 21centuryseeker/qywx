<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    '$route' (to, from) {
      // console.log(this.$mytimer)
      // window.clearTimeout(this.$mytimer)
    }
  },
  mounted () {


    // let data = {
    //   username: '068',
    //   password: '25f9e794323b453885f5181f1b624d0b'
    // };
    // this.$ajax('post', this.HOST + '/tr/trLogin/web/loginByCookie', data, function (res) {
    //   if (res.success) {

    //   }
    // })



  }
}
</script>

<style>
html .mint-tabbar > .mint-tab-item.is-selected {
  background-color: transparent;
}
html body .mint-indicator-mask {
  z-index: 10000000000;
}
html body .flex_box {
  padding-bottom: 10px !important;
}
  .box_header {
    height: 1rem;
    background: #fff;
    line-height: 1rem;
    font-size: 0.28rem;
    color: #555;
    padding-left: 0.47rem;
  }
  .box_header_span {
    display: inline-block;
    height: 0.24rem;
    width: 0.08rem;
    border-radius: 0.04rem;
    background: #70ad47;
    vertical-align: top;
    margin-top: 0.3rem;
    margin-right: 0.13rem;
  }
  .chart_box {
    margin-top: 0.2rem;
    height: auto;
    background: #fff;
  }
  .chart_box_item {
    height: 4.9rem;
    padding: 0 0.44rem;
    box-sizing: border-box;
  }
  .mint-navbar.is-fixed{
    z-index: 10!important;
  }
  .select {
  font-size: 0.24rem;
}
.table-step span {
  line-height: 15px;
  font-size: 0.24rem!important;
}
.fixed_bottom_box .step_box {
  font-size: 0.2rem;
}
.mint-msgbox-confirm {
  color: #70ad47;
}
</style>
