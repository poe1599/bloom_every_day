import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        { //首頁內容區
          path: '',
          component: () => import('../views/front/HomeView.vue')
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
          path: 'products',
          component: () => import('../views/front/ProductsView.vue')

        },
        {
          path: 'products/:id',
          component: () => import('../views/front/ProductView.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/front/CartView.vue')
        },
        {
          path: 'cartCheck',
          component: () => import('../views/front/CartCheckView.vue')
        },

        {
          path: 'cartPay/:id',
          component: () => import('../views/front/CartPayView.vue')
        },


      ],

    },
    {
      path: '/logIn',
      name:'toLogin',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/DashboardView.vue'),
      children:[
        {
          path:'articles',
          component:()=>import('../views/admin/AdminArticles.vue')
        },
        {
          path:'products',
          component:()=>import('../views/admin/AdminProducts.vue')
        },
        {
          path:'orders',
          component:()=>import('../views/admin/AdminOrders.vue')
        }
      ]

    },

  ]
})

export default router
