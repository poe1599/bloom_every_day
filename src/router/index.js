import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:()=>import ('../views/FrontLayout.vue'),
      children:[
        { //首頁內容區
          path:'',
          component:()=>import('../views/HomeView.vue')
        },
        {
          path: 'news',
          component: () => import('../views/NewsPage.vue')
        }
      ]

    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../views/HomeView.vue')
    // },
    // {
    //  
    // }
  ]
})

export default router
