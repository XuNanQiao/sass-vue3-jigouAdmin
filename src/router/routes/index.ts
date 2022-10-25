import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};
export const localModuleList: AppRouteModule[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/sys/login/Login.vue'),
    meta: {
      title: t('routes.basic.login'),
    },
  },
  /*  设置 */
  {
    path: '/setUp',
    name: 'SetUp',
    component: LAYOUT,
    redirect: '/setUp',
    meta: {
      orderNo: 10,
      icon: 'ion:grid-outline',
      title: '设置',
    },
    children: [
      {
        path: '/menu',
        name: '菜单',
        component: () => import('/@/views/setUp/menu/index.vue'),
        meta: {
          title: '菜单',
        },
      },
      {
        path: '/role',
        name: '角色权限',
        component: () => import('/@/views/setUp/role/index.vue'),
        meta: {
          title: '角色权限',
        },
      },
      {
        path: '/dept',
        name: '部门',
        component: () => import('/@/views/setUp/dept/index.vue'),
        meta: {
          title: '部门',
        },
      },
      {
        path: '/userInfo',
        name: '用户',
        component: () => import('/@/views/setUp/userInfo/index.vue'),
        meta: {
          title: '用户',
        },
      },
      {
        path: '/note/priceSet/index',
        name: 'note/priceSet/index',
        component: () => import('/@/views/setUp/note/priceSet/index.vue'),
        meta: {
          title: '购买短信',
        },
      },
      {
        path: '/note/noteModel/index',
        name: 'note/noteModel/index',
        component: () => import('/@/views/setUp/note/noteModel/index.vue'),
        meta: {
          title: '短信模板',
        },
      },
      {
        path: '/note/payList/index',
        name: 'note/payList/index',
        component: () => import('/@/views/setUp/note/payList/index.vue'),
        meta: {
          title: '购买记录',
        },
      },
      {
        path: '/note/sign/index',
        name: 'note/sign/index',
        component: () => import('/@/views/setUp/note/sign/index.vue'),
        meta: {
          title: '签名管理',
        },
      },
    ],
  },
  /*  网校管理 */
  {
    path: '/onlineSchool',
    name: 'onlineSchool',
    component: LAYOUT,
    redirect: '/onlineSchool/know/video',
    meta: {
      orderNo: 10,
      icon: 'ion:grid-outline',
      title: '网校管理',
    },
    children: [
      {
        path: '/onlineSchool/know',
        name: '/onlineSchool/know',
        // component: LAYOUT,
        // component: getParentLayout(),
        component: () => import('/@/views/thisRouter.vue'),
        // redirect: '/onlineSchool/know/course/video',
        meta: {
          title: '知识项目',
        },
        children: [
          {
            path: '/know/course/video',
            name: '/know/course/video',
            component: () => import('/@/views/onlineSchool/know/course/video/index.vue'),
            meta: {
              title: '录播课',
            },
          },
          {
            path: '/know/course/ceshi',
            name: '/know/course/ceshi',
            component: () => import('/@/views/ceshi/index.vue'),
            meta: {
              title: '测试',
            },
          },
          {
            path: '/know/course/videoChat',
            name: '/know/course/videoChat',
            component: () => import('/@/views/onlineSchool/know/course/video/videoChat.vue'),
            meta: {
              title: '录播课章节',
              hideMenu: true,
            },
          },
          {
            path: '/know/course/courseDot',
            name: '/know/course/courseDot',
            component: () => import('../../views/onlineSchool/know/course/courseDot/index.vue'),
            meta: {
              title: '视频打点',
              hideMenu: true,
            },
          },
          {
            path: '/know/course/live',
            name: '/know/course/live',
            component: () => import('/@/views/onlineSchool/know/course/live/index.vue'),
            meta: {
              title: '直播课',
            },
          },
          {
            path: '/know/course/liveChat',
            name: '/know/course/liveChat',
            component: () => import('/@/views/onlineSchool/know/course/live/liveChat.vue'),
            meta: {
              title: '直播课章节',
              hideMenu: true,
            },
          },
          {
            path: '/know/course/imageCourse',
            name: '/know/course/imageCourse',
            component: () => import('/@/views/onlineSchool/know/course/imageCourse/index.vue'),
            meta: {
              title: '图文课',
            },
          },
          {
            path: '/know/course/chatView',
            name: '/know/course/chatView',
            component: () => import('/@/views/onlineSchool/know/course/imageCourse/chatView.vue'),
            meta: {
              title: '课程章节',
              hideMenu: true,
            },
          },
          {
            path: '/know/course/audio',
            name: '/know/course/audio',
            component: () => import('/@/views/onlineSchool/know/course/audio/index.vue'),
            meta: {
              title: '音频课',
            },
          },
          {
            path: '/know/course/audioGroup',
            name: '/know/course/audioGroup',
            component: () => import('/@/views/onlineSchool/know/course/audio/chatGroup.vue'),
            meta: {
              title: '音频课章节组',
              hideMenu: true,
            },
          },
          {
            path: '/know/course/audioSection',
            name: '/know/course/audioSection',
            component: () => import('/@/views/onlineSchool/know/course/audio/audioSection.vue'),
            meta: {
              title: '音频课章节组',
              hideMenu: true,
            },
          },
          {
            path: '/know/course/faceCourse',
            name: '/know/course/faceCourse',
            component: () => import('/@/views/onlineSchool/know/course/faceCourse/index.vue'),
            meta: {
              title: '面授课',
            },
          },
          {
            path: '/know/course/faceSection',
            name: '/know/course/faceSection',
            component: () => import('/@/views/onlineSchool/know/course/faceCourse/faceSection.vue'),
            meta: {
              title: '授课大纲',
              hideMenu: true,
            },
          },
          {
            path: '/know/score/stuComment',
            name: '/know/score/stuComment',
            component: () => import('/@/views/onlineSchool/know/score/stuComment.vue'),
            meta: {
              title: '评论',
              hideMenu: true,
            },
          },
          {
            path: '/know/course/courseData',
            name: '/know/course/courseData',
            component: () => import('/@/views/onlineSchool/know/course/courseData/index.vue'),
            meta: {
              title: '课程资料',
              hideMenu: true,
            },
          },
          {
            path: '/know/course/courseExam',
            name: '/know/course/courseExam',
            component: () => import('/@/views/onlineSchool/know/course/courseExam/index.vue'),
            meta: {
              title: '课程模考',
              hideMenu: true,
            },
          },
        ],
      },
      {
        path: '/onlineSchool/class',
        name: '/onlineSchool/class',
        // component: LAYOUT,
        // component: getParentLayout(),
        component: () => import('/@/views/thisRouter.vue'),
        // redirect: '/onlineSchool/know/course/video',
        meta: {
          title: '知识套餐',
        },
        children: [
          {
            path: '/onlineSchool/class/index',
            name: '/onlineSchool/class/index',
            component: () => import('/@/views/onlineSchool/know/class/index.vue'),
            meta: {
              title: '知识套餐',
            },
          },
          {
            path: '/onlineSchool/class/vipClass',
            name: '/onlineSchool/class/vipClass',
            component: () => import('/@/views/onlineSchool/know/class/index.vue'),
            meta: {
              title: 'VIP套餐',
            },
          },
          {
            path: '/onlineSchool/class/coursepackage',
            name: '/onlineSchool/class/coursepackage',
            component: () => import('/@/views/onlineSchool/know/class/coursepackage.vue'),
            meta: {
              title: '套餐课程包',
              hideMenu: true,
            },
          },
          {
            path: '/onlineSchool/class/classCourse',
            name: '/onlineSchool/class/classCourse',
            component: () => import('/@/views/onlineSchool/know/class/classCourse.vue'),
            meta: {
              title: '套餐课程',
              hideMenu: true,
            },
          },
          {
            path: '/know/class/courseExam',
            name: '/know/class/courseExam',
            component: () => import('/@/views/onlineSchool/know/class/courseExam/index.vue'),
            meta: {
              title: '专属题库',
              hideMenu: true,
            },
          },
          {
            path: '/know/class/classTeaching',
            name: '/know/class/classTeaching',
            component: () => import('/@/views/onlineSchool/know/class/classTeaching/index.vue'),
            meta: {
              title: '专属教材',
              hideMenu: true,
            },
          },
          {
            path: '/onlineSchool/teachingMaterial/index',
            name: '/onlineSchool/teachingMaterial/index',
            component: () => import('/@/views/onlineSchool/know/teachingMaterial/index.vue'),
            meta: {
              title: '自研教材',
            },
          },
        ],
      },
      {
        path: '/exam',
        name: 'examPage',
        // component: LAYOUT,
        // component: getParentLayout(),
        component: () => import('/@/views/thisRouter.vue'),
        // redirect: '/onlineSchool/know/course/video',
        meta: {
          title: '考试管理',
        },
        children: [
          {
            path: '/exam/testCenter',
            name: 'testCenter',
            component: () => import('/@/views/onlineSchool/exam/testCenter/index.vue'),
            meta: {
              title: '考点管理',
            },
          },
          {
            path: '/exam/examManage',
            name: 'examManage',
            component: () => import('/@/views/onlineSchool/exam/examManage/index.vue'),
            meta: {
              title: '试卷管理',
            },
          },
          {
            path: '/exam/exambag',
            name: 'exambag',
            component: () => import('/@/views/onlineSchool/exam/exambag/index.vue'),
            meta: {
              title: '试卷包管理',
            },
          },
        ],
      },
    ],
  },
];

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList, ...localModuleList];

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  ...localModuleList,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
