/*
 * @Author: 南桥几许
 * @Date: 2022-06-08 10:25:33
 * @LastEditTime: 2022-06-29 14:01:55
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\main.ts
 *
 */
import '/@/design/index.less';
import '/@/assets/less/main.less';
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';
/* 全局方法 */
import comFun from '/@/utils/comFun';

/* 全局组件 */
// import KindSearch from '/@/components/view/kindSearch.vue';
/* ------------ */
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// Importing on demand in local development will increase the number of browser requests by around 20%.
// This may slow down the browser refresh speed.
// Therefore, only enable on-demand importing in production environments .
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();
  app.config.globalProperties.$comFun = comFun;

  // app.component('KindSearch', KindSearch);
  app.use(ElementPlus);
  app.use(Antd);
  app.mount('#app');
}

bootstrap();
