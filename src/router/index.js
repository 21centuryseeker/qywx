import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from '../store/store'
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      meta: {
        title: '诊改工作台',
        isshowSubTitle: false,
        requireAuth: false
      }
    },
    {
      path: '*',
      redirect: '/index',
      meta: {
        title: '诊改工作台',
        isshowSubTitle: false,
        requireAuth: false
      }
    },
    {
      path: '/index',
      redirect: '/index/zggzt',
      meta: {
        title: '诊改工作台',
        isshowSubTitle: false,
        requireAuth: false
      }
    },
    {
      path: '/ask_zj',
      component: resolve => require(['../components/page/zjpt_commit.vue'], resolve),
      meta: {
        title: '提问',
        requireAuth: false,
        myPath: '/ask_zj'
      }
    },
    {
      path: '/edit_phone',
      component: resolve => require(['../components/grzx/edit_phone.vue'], resolve),
      meta: {
        title: '编辑手机号',
        requireAuth: false,
        myPath: '/edit_phone'
      }
    },
    {
      path: '/edit_email',
      component: resolve => require(['../components/grzx/edit_email.vue'], resolve),
      meta: {
        title: '编辑邮箱',
        requireAuth: false,
        myPath: '/edit_phone'
      }
    },
    {
      path: '/select-depart',
      component: resolve => require(['../components/zggzt/select-depart.vue'], resolve),
      meta: {
        title: '诊改工作台',
        isshowSubTitle: false,
        requireAuth: false
      }
    },
    {
      path: '/custom-fx',
      component: resolve => require(['../components/page/zzzd/sjxlfx/custom-fx.vue'], resolve),
      meta: {
        title: '自定义分析内容',
        isshowSubTitle: false,
        requireAuth: false
      }
    },
    {
      path: '/index',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/zggzt/Workbench.vue'], resolve),
          meta: {
            title: '诊改工作台',
            requireAuth: false,
            myPath: '/index',
            mychildPath: 'zggzt'
          }
        },
        // 首页的子路由
        {
          path: '/index/zggzt',
          component: resolve => require(['../components/zggzt/Workbench.vue'], resolve),
          meta: {
            title: '诊改工作台',
            requireAuth: false,
            myPath: '/index',
            mychildPath: 'zggzt'
          }
        },
        {
          path: '/zggzyl-list',
          component: resolve => require(['../components/zggzt/work-view-one-place.vue'], resolve),
          meta: {
            title: '诊改工作一览',
            // isshowSubTitle: false,
            requireAuth: false,
            myPath: '/index',
            mychildPath: 'zggzyl'
          }
        },
        {
          path: '/reportProgress/:id/:monthStatus',
          component: resolve => require(['../components/common/reportProgress.vue'], resolve),
          meta: {
            title: '诊改工作台',
            requireAuth: false,
            myPath: '/index',
            mychildPath: 'zggzt'
          }
        },
        {
          path: '/index/zggzyl',
          component: resolve => require(['../components/zggzt/select-depart.vue'], resolve),
          meta: {
            title: '诊改工作一览',
            requireAuth: false,
            myPath: '/index',
            mychildPath: 'zggzyl'
          }
        },
        {
          path: '/index/zgzjpt',
          component: resolve => require(['../components/page/zjpt.vue'], resolve),
          meta: {
            title: '诊改专家平台',
            requireAuth: false,
            myPath: '/index',
            mychildPath: 'zgzjpt'
          }
        },
        // 诊改数据分析的子路由
        {
          path: '/zgsjfx',
          component: resolve => require(['../components/page/detail.vue'], resolve),
          meta: {
            title: '诊改数据分析',
            requireAuth: false,
            myPath: '/zgsjfx',
            // mychildPath: 'jsc'
          },
        },
        {
          path: '/zgsjfx/jsc',
          component: resolve => require(['../components/page/jsc.vue'], resolve),
          meta: {
            title: '驾驶舱',
            myPath: '/zgsjfx',
            // mychildPath: 'jsc'
          },
        },
        {
          path: '/zgsjfx/sjhx',
          component: resolve => require(['../components/page/sjhx/sjhxCommon.vue'], resolve),
          meta: {
            title: '数据画像',
            myPath: '/zgsjfx',
            // mychildPath: 'sjhx'
          },
          children: [
            {
              path: '/',
              component: resolve => require(['../components/page/sjhx/school.vue'], resolve),
              meta: {
                title: '数据画像',
                myPath: '/zgsjfx',
                // mychildPath: 'sjhx'
              }
            },
            {
              path: '/zgsjfx/sjhx/major',
              component: resolve => require(['../components/page/sjhx/major.vue'], resolve),
              meta: {
                title: '数据画像',
                myPath: '/zgsjfx',
                // mychildPath: 'sjhx'
              }
            },
            {
              path: '/zgsjfx/sjhx/class',
              component: resolve => require(['../components/page/sjhx/class.vue'], resolve),
              meta: {
                title: '数据画像',
                myPath: '/zgsjfx',
                // mychildPath: 'sjhx'
              }
            },
            {
              path: '/zgsjfx/sjhx/teacher',
              component: resolve => require(['../components/page/sjhx/teacher.vue'], resolve),
              meta: {
                title: '数据画像',
                myPath: '/zgsjfx',
                // mychildPath: 'sjhx'
              }
            },
            {
              path: '/zgsjfx/sjhx/student',
              component: resolve => require(['../components/page/sjhx/student.vue'], resolve),
              meta: {
                title: '数据画像',
                myPath: '/zgsjfx',
                // mychildPath: 'sjhx'
              }
            }
          ]
        },
        {
          path: '/zgsjfx/zzzd',
          component: resolve => require(['../components/page/zzzd/zzzd.vue'], resolve),
          meta: {
            title: '自主诊断',
            myPath: '/zgsjfx',
            // mychildPath: 'zzzd'
          }
        },
        {
          path: '/zgsjfx/zzzd/',
          component: resolve => require(['../components/page/zzzd/zzzdCommon.vue'], resolve),
          meta: {
            title: '自主诊断',
            myPath: '/zgsjfx',
            // mychildPath: 'zzzd'
          },
          children: [
            {
              path: '/zgsjfx/zzzd/sjxlfx',
              component: resolve => require(['../components/page/zzzd/sjxlfx/sjxlfx.vue'], resolve),
              meta: {
                id:1,
                title: '时间序列分析',
                myPath: '/zgsjfx',
                // mychildPath: 'zzzd'
              }
            },
            {
              path: '/zgsjfx/zzzd/qsycfx',
              component: resolve => require(['../components/page/zzzd/qsycfx/qsycfx.vue'], resolve),
              meta: {
                id:4,
                title: '趋势预测分析',
                myPath: '/zgsjfx',
                // mychildPath: 'zzzd'
              }
            }
          ]},
        // 要素对比分析
        {
          path: '/zgsjfx/zzzd/ysdbfx/:type',
          component: resolve => require(['../components/page/zzzd/ysdbfx/ysdbfxCommon.vue'], resolve),
          meta: {
            title: '要素对比分析',
            myPath: '/zgsjfx',
            // mychildPath: 'zzzd'
          }
        },
        {
          path: '/zgsjfx/zzzd/ysdbfx/:type/:state/:tableId',
          component: resolve => require(['../components/page/zzzd/ysdbfx/addCommon.vue'], resolve),
          meta: {
            title: '自定义分析',
            myPath: '/ysdbfx'
          }
        },
        // 相关性对比分析
        {
          path: '/zgsjfx/zzzd/xgxfx/:type',
          component: resolve => require(['../components/page/zzzd/xgxfx/xgxfxCommon.vue'], resolve),
          meta: {
            title: '相关性对比分析',
            myPath: '/zgsjfx',
            // mychildPath: 'zzzd'
          }
        },
        {
          path: '/zgsjfx/zzzd/xgxfx/addItwm/:type',
          component: resolve => require(['../components/page/zzzd/xgxfx/addItwm.vue'], resolve),
          meta: {
            title: '自定义分析',
            myPath: '/xgxfx'
          }
        },
       
        // 我的子路由
        {
          path: '/me',
          component: resolve => require(['../components/grzx/grzx.vue'], resolve),
          meta: {
            title: '我的',
            requireAuth: false,
            myPath: '/me'
          }
        },
        {
          path: '/planDetail/:id',
          component: resolve => require(['../components/page/planDetail.vue'], resolve),
          meta: {
            title: '详情',
            requireAuth: false,
            myPath: '/planDetail'
          }
        },
        {
          path: '/targetDetail/:id',
          component: resolve => require(['../components/page/detail.vue'], resolve),
          meta: {
            title: '详情',
            requireAuth: false,
            myPath: '/targetDetail'
          }
        },
        {
          path: '/list',
          component: resolve => require(['../components/page/list.vue'], resolve),
          meta: {
            title: '目标列表',
            requireAuth: false,
            myPath: '/list'
          }
        },
        {
          path: '/newslist',
          component: resolve => require(['../components/page/newslist.vue'], resolve),
          meta: {
            title: '消息列表',
            requireAuth: false,
            myPath: '/newslist'
          }
        },
        {
          path: '/tjsh/:id',
          component: resolve => require(['../components/page/tjshCommon.vue'], resolve),
          meta: {
            title: '提交审核',
            requireAuth: false,
            myPath: '/tjsh'
          }
        },
        {
          path: '/login',
          component: resolve => require(['../components/page/login.vue'], resolve),
          meta: {
            title: '登陆',
            requireAuth: false,
            myPath: '/login'
          }
        },
        {
          path: '/work',
          component: resolve => require(['../components/zggzt/Workbench.vue'], resolve),
          meta: {
            title: '我的',
            requireAuth: false,
            myPath: '/me'
          }
        }

      ]
    }
  ]
});
router.afterEach((router) => {
  try {
    document.getElementsByClassName('scrollTop')[0].scrollTop = 0
  } catch (e) {

  }
})
router.beforeEach((to, from, next) => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    // 苹果手机
    let $body = document.getElementsByTagName('body')[0]
    document.title = to.meta.title
    // let $iframe = document.createElement('iframe')
    // $iframe.src="./static/img/favicon.ico"
    // $iframe.style.display = 'none'
    // $iframe.onload = function () {
    //   setTimeout(function() {
    //     $iframe.remove();
    // }, 9)
    // }
    // $body.appendChild($iframe)
  } else {
    // 安卓手机
    document.title = to.meta.title
  }
  if (['/index', '/zgsjfx', '/me'].indexOf(to.meta.myPath) >= 0) {
    store.commit('footer_tab', {
      path: to.meta.myPath,
      show: true
    })
  } else {
    store.commit('footer_tab', {
      path: '/index',
      show: false
    })
  }
  if (to.meta.mychildPath) {
    store.commit('header_tab', {
      path: to.meta.mychildPath,
      show: true
    })
  } else {
    store.commit('header_tab', {
      path: 'zggzt',
      show: false
    })
  }
  next()
});
export default router
