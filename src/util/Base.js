/**
 * 基础工具类
 * 李珂
 * likenamehaojie@hotmail.com
 */
class Base {
  /**
   * 始终保持this指向是当前类
   * @param target
   * @returns {*}
   */
  static selfish (target) {
    const cache = new WeakMap();
    const handler = {
      get (target, key) {
        const value = Reflect.get(target, key);
        if (typeof value !== 'function') {
          return value
        }
        if (!cache.has(value)) {
          cache.set(value, value.bind(target))
        }
        return cache.get(value)
      }
    };
    const proxy = new Proxy(target, handler);
    return proxy
  }
  static getJob () {
    let promist = new Promise((resolve, reject) => {
      // 获取用户的所有职务
      this.$ajax('post', this.HOST + '/tr/autognosis/web/autognosiShow', {}, (res) => {
        if (res.success) {
          // console.log("getJOB",res.obj);
          this.job = res.obj[0].deptId + ',' + res.obj[0].roleId;

          // console.log("TEST",this.job);
          //  获取用户在某一职务下的自我分析记录
          // this.getChart()
          // this.getTreeHtml()
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

  }
}

export default Base
