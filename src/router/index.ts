export const routes= [
      { path: '/login', component: 'login',title:'登录' },
      {
        path: '/',
        component: '@/layouts/index',
        routes: [
          { path: '/index', component: '@/pages/index',title:'首页' },
          { path: '/products', component: '@/pages/Products',title:'Products' },
        ],
      }, 
    ]
