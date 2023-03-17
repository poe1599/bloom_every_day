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
          component:()=>import('../views/front/HomeView.vue')
        },
        { //最新消息
          path: 'news',
          component: () => import('../views/front/NewsViews.vue')
        },
        { //最新消息單頁
          path: 'news/:id',
          component: () => import('../views/front/NewsView.vue')
        },
        {
          path:'products',
          component:()=>import('../views/front/ProductsView.vue')

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
