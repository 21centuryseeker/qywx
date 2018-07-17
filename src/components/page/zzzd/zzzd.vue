<template>
  <div style="background: #fff;height: 100%; padding-top: 0.01rem; overflow-y: scroll;">
    <a href="javascript:void(0)" class="zzzd_item" @click="$router.push({path: '/zgsjfx/zzzd/sjxlfx'})">
      <span class="zzzd_i_span" style="background: #70ad47;box-shadow: 0 3px 3px #cce0be;">
        <i class="iconfont">&#xe67e;</i>        
      </span>
      <span class="zzzd_item_span">时间序列分析</span>
      <i class="iconfont gray_arrow">&#xe62e;</i>
    </a>
    <a href="javascript:void(0)" class="zzzd_item" @click="$router.push({path: '/zgsjfx/zzzd/ysdbfx/1'})">
      <span class="zzzd_i_span" style="background: #ed7d31;box-shadow: 0 3px 3px #f5d2ba;">
        <i class="iconfont">&#xe624;</i>        
      </span>
      <span class="zzzd_item_span">要素对比分析</span>
      <i class="iconfont gray_arrow">&#xe62e;</i>
    </a>
    <a href="javascript:void(0)" class="zzzd_item" @click="$router.push({path: '/zgsjfx/zzzd/xgxfx/1'})">
      <span class="zzzd_i_span" style="background: #ffc000;box-shadow: 0 3px 3px #fbe6c0;">
        <i class="iconfont">&#xe666;</i>        
      </span>
      <span class="zzzd_item_span">相关性分析</span>
      <i class="iconfont gray_arrow">&#xe62e;</i>
    </a>
    <a href="javascript:void(0)" class="zzzd_item" @click="$router.push({path: '/zgsjfx/zzzd/qsycfx'})">
      <span class="zzzd_i_span" style="background: #5b9bd5;box-shadow: 0 3px 3px #c5daed;">
        <i class="iconfont">&#xe610;</i>        
      </span>
      <span class="zzzd_item_span">趋势预测分析</span>
      <i class="iconfont gray_arrow">&#xe62e;</i>
    </a>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style scoped>
.zzzd_item {
  height: 2rem;
  background: #f9f9f9;
  width: 6.4rem;
  display: block;
  margin: 0 auto;
  border-radius: 0.04rem;
  margin-top: 0.28rem;
  border: 2px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zzzd_i_span {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #70ad47;
  text-align: center;
  line-height: 1.25rem;
  color: #fff;
}
.zzzd_i_span i {
  font-size: 0.5rem;
}
.gray_arrow {
  color: #d0d0d0;
  display: block;
}
.zzzd_item_span {
  display: block;
  color: #666;
  width: 1.97rem;
  margin: 0 1.5rem 0 0.45rem;
  text-align: left;
  font-size: 0.3rem;
}
</style>
