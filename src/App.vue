<!--
 * @Author: 南桥几许
 * @Date: 2022-06-08 10:25:33
 * @LastEditTime: 2022-07-07 17:00:49
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\App.vue
 * 
-->
<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
<style lang="less">
  .vben-basic-table-form-container {
    padding: 0px !important;
  }
</style>
