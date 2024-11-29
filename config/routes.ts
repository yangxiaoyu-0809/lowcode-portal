export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/editor',
  //   name: 'editor',
  //   icon: 'LayoutOutlined',
  //   layout: false,
  //   component: './Editor',
  // },
  {
    name: '编辑器',
    icon: 'table',
    path: '/lowcode',
    layout: false,
    hideInMenu: true,
    component: './lowcode',
  },
  {
    name: '页面管理',
    icon: 'table',
    path: '/pagesMg',
    component: './pagesMg',
  },
  // {
  //   path: '/preview',
  //   component: './Preview',
  // },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
