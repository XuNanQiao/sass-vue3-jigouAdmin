<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-30 09:57:00
 * @LastEditors: 南桥几许
 * @LastEditTime: 2022-07-12 14:09:17
 * @FilePath: \organization\src\views\ceshi\index.vue
-->
<template>
  <div class="mainbox">
    <a-button type="primary" @click="zc">用户注册</a-button>
    <a-button type="primary" @click="cjqz">创建群组</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { log } from 'console';
  import { onMounted, reactive } from 'vue';
  import { getUserInfo } from '/@/api/sys/user';
  import { Note } from '/@/utils/note/note';
  let note = new Note();
  // 页面加载时
  onMounted(async () => {
    getNotePackageList();
    let a = await getUserInfo();
    state.a = a.data;
  });
  function getNotePackageList() {}
  async function zc() {
    await note
      .register({
        tenantId: '1533366097988919298',
        userId: state.a.id,
        userName: state.a.nickname,
      })
      .then((res) => {
        state.token = res.data.access_token;
      });
  }
  async function cjqz() {
    await note.createGroup(
      {
        groupName: '666',
        userList: [state.a.id + '::' + state.a.nickname, '454::测试-gjh', '427::张永涛-123'],
      },
      state.token,
    );
  }
  const state = reactive({
    nodeList: [],
    loading: false,
    a: {},
    token: '',
  });
</script>
