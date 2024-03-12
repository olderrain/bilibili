export default [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/findPassword',
        component: () => import('@/views/findPassword/index.vue'),
        name: 'findPassword'
      },
      {
        path: '/account',
        component: () => import('@/views/account/index.vue'),
        name: 'account',
        redirect: '/account/home',
        children: [
          {
            path: 'home',
            component: () => import('@/views/account/home/index.vue'),
          },
          {
            path: 'setting',
            component: () => import('@/views/account/setting/index.vue'),
          },
          {
            path: 'face',
            component: () => import('@/views/account/face/index.vue'),
            redirect: '/account/face/vip',
            children: [
              {
                path: 'upload',
                component: () => import('@/views/account/face/upload/index.vue'),
              },
              {
                path: 'vip',
                component: () => import('@/views/account/face/vip/index.vue'),
              }
            ]
          },
          {
            path: 'blacklist',
            component: () => import('@/views/account/blacklist/index.vue'),
          },
          {
            path: 'coin',
            component: () => import('@/views/account/coin/index.vue'),
          },
        ]
      },
      {
        path: '/space',
        component: () => import('@/views/space/index.vue'),
        name: 'space',
        redirect: '/space/home',
        children: [
          {
            path: 'home',
            component: () => import('@/views/space/home/index.vue'),
          },
          {
            path: 'dynamic',
            component: () => import('@/views/space/dynamic/index.vue'),
          },
          {
            path: 'tougao',
            component: () => import('@/views/space/tougao/index.vue'),
          },
          {
            path: 'collection',
            component: () => import('@/views/space/collection/index.vue'),
          },
          {
            path: 'collector',
            component: () => import('@/views/space/collector/index.vue'),
          },
          {
            path: 'fans',
            component: () => import('@/views/space/fans/index.vue'),
            children: [
              {
                path: 'follow',
                component: () => import('@/views/space/fans/follow/index.vue'),
              },
              {
                path: 'fan',
                component: () => import('@/views/space/fans/fan/index.vue'),
              }
            ]
          },
        ]
      },
      {
        path: '/platform',
        component: () => import('@/views/platform/index.vue'),
        name: 'platform',
        redirect: '/platform/home',
        children: [
          {
            path: 'upload',
            component: () => import('@/views/platform/upload/index.vue'),
          },
          {
            path: 'home',
            component: () => import('@/views/platform/home/index.vue'),
          },
          {
            path: 'video-manager',
            component: () => import('@/views/platform/videoManager/index.vue'),
          },
          {
            path: 'mark-manager',
            component: () => import('@/views/platform/markManager/index.vue'),
          },
          {
            path: 'danmu-manager',
            component: () => import('@/views/platform/danmuManager/index.vue'),
          },
        ]
      },
      {
        path: '/dynamic',
        component: () => import('@/views/dynamic/index.vue'),
        name: 'dynamic',
      },
      {
        path: '/live',
        component: () => import('@/views/live/index.vue'),
        name: 'live',
      },
      {
        path: '/mylivingroom',
        component: () => import('@/views/myLivingRoom/index.vue'),
        name: 'mylivingroom',
      },
      {
        path: '/livingroom/:cid',
        component: () => import('@/views/livingRoom/index.vue'),
        name: 'livingroom',
      },
      {
        path: '/video/:videoId',
        component: () => import('@/views/video/index.vue'),
        name: 'video',
      },
      {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404'
      },
      {
        //任意路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
          title: '任意路由',
          hidden: true,
          icon: 'DataLine',
        },
      }
    ],
  },
]