// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Loading from 'muse-ui-loading';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import MuseUI from 'muse-ui';
import Message from 'muse-ui-message';
import Toast from 'muse-ui-toast';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import './css/app.css';
import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import PageHome from './PageHome.vue';
import vuce from './components/vuce.vue';
import Personal from './components/Personal.vue';
Vue.use(MuseUI);
Vue.use(Message);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(VueRouter);
Loading.config({
  overlayColor: 'hsla(0,0%,0%,.349)', // 背景色
  size: 36,
  color: 'primary', // color
  className: ''
})
Toast.config({
  position: 'bottom', // 弹出的位置
  time: 1500, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: 'check_circle', // 成功信息图标
  infoIcon: 'info', // 信息信息图标
  warningIcon: 'priority_high', // 提醒信息图标
  errorIcon: 'warning'
});
Vue.config.productionTip = false
const routes = [{
    path: '/',
    component: Login
  },
  {
    path: '/Login',
    component: Login
  }, {
    path: '/PageHome',
    component: PageHome
  }, {
    path: '/vuce',
    component: vuce
  }, {
    path: '/Personal',
    component: Personal
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, form, next) => { //路由判断，是否登陆
  let path_ary = ['/Login', '/', '/vuce']
  let is_ = false;
  for (let i in path_ary) {
    is_ = to.path === path_ary[i] ? true : false
    if(is_) {
      next();
      break;
    }
  }
  if (!is_) {
    if (JSON.parse(localStorage.getItem('user_id')) != null && JSON.parse(localStorage.getItem('user_id')) != undefined && JSON.parse(localStorage.getItem('user_id'))._id.length > 0) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
