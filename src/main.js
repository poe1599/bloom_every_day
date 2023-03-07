import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 載入 vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// 載入 vue-loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// 匯入自訂義 all.scss 檔
import './assets/all.scss'

// 引入 bootstrap.js
// import 'bootstrap'

// 引入 VeeValidate 元件跟功能
import {
    Field, Form, ErrorMessage, defineRule, configure,
  } from 'vee-validate';
  // 引入 VeeValidate 的驗證規則
  import AllRules from '@vee-validate/rules';
  // 引入 VeeValidate 的 i18n 功能
  import { localize, setLocale } from '@vee-validate/i18n';
  // 引入 VeeValidate 的繁體中文語系檔
  import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue'

// 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
  });
  

import router from './router'

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
  });
  setLocale('zh_TW');


const app = createApp(App)

app.use(createPinia())
app.use(router) // 套用方法 $router, $route，但不包含元件，因此每頁要重新引用 RouterView, RouterLink 元件
app.use(VueAxios, axios) // 使用

// 使用全域註冊方式註冊 vue-loading 元件
app.component('VueLoading', Loading) 

// 掛載 Global 的 VeeValidate 元件
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app')
