import Vue from 'vue'
import axios from 'axios'
import { axiosUrl } from './config.js'// 引入配置的公共接口
axios.defaults.baseURL = axiosUrl// axios的基地址
Vue.prototype.$http = axios// 挂载axios到vue原型的$http属性下

Object.assign(Vue.prototype,{ // vue的原型合并axios和axiosUrl
  _ajax : axios,
  _api  : axiosUrl
})
