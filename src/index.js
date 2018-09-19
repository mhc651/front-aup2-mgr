import Vue from 'vue'
import VueRouter from 'vue-router'

import router from './router'
import index from './index.vue'

import util from './util'
import miment from 'miment'
Vue.prototype.post = util.post
Vue.prototype.upload = util.upload
Vue.prototype.postWithOldToken = util.postWithOldToken
Vue.prototype.miment = miment

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

Vue.use(ElementUI);
Vue.use(VueRouter)
new Vue({
    el: '#app',
    router,
    render: v => v(index)
})