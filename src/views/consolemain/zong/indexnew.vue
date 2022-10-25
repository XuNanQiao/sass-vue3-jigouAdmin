<!--
 * @Author: 南桥几许
 * @Date: 2022-06-08 17:06:46
 * @LastEditTime: 2022-06-09 09:24:17
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\consolemain\zong\indexnew.vue
 * 
-->
<template>
  <div > 总后台册饿水水水水 
    <div class="iconfont iconshanchu1 "></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
