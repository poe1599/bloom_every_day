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

import App from './App.vue'
import router from './router'




const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios) // 使用

// 使用全域註冊方式註冊 vue-loading 元件
app.component('VueLoading', Loading) 

app.mount('#app')
