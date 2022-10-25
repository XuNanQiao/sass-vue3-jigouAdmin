<!--
 * @Description: 
 * @Version: 2.0
 * @Author: xuchaoxin
 * @Date: 2022-06-20 10:27:43
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-06-28 10:58:22
-->
<template>
  <div class="mainbox">
    <div class="dtop">
      <el-button class="addnote" type="primary" size="mini" @click="handleCreat()"
        >添加短信价格
      </el-button>
    </div>
    <div class="notemo">
      <div v-for="(item, index) in state.nodeList" :key="index" class="boxs">
        <div class="box_timg"></div>
        <div class="msglist">
          <div>
            <span>短信条数</span><span>{{ item.noteNumber }}条</span>
          </div>
          <div>
            <span>价格</span><span>￥{{ item.notePrice }}</span>
          </div>
          <div>
            <span>是否展示</span>
            <span class="clears">
              <el-radio-group size="small" @change="upStatus(item)" v-model="item.isShow">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </span>
          </div>
          <div @click="updatanote(item)"> 修改 </div>
        </div>
      </div>
    </div>
    <NoteDrawer width="30%" @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive } from 'vue';
  import './index.less';
  import NoteDrawer from './NoteDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { Note } from '/@/utils/note/note';
  let note = new Note();
  // 页面加载时
  onMounted(async () => {
    getNotePackageList();
  });

  const state = reactive({
    nodeList: [],
    loading: false,
  });
  // 短信包列表
  async function getNotePackageList() {
    state.loading = true;
    await note.getNotePackageList({ pageSize: 9999, pageNum: 1, isShow: undefined }).then((res) => {
      state.nodeList = res.rows;
    });
    state.loading = false;
  }
  /*修改短信包状态/*/
  async function upStatus(row: any) {
    await note.updateNotePackageShow({ id: row.id });
    getNotePackageList();
  }
  /* 初始化弹窗 */
  const [registerDrawer, { openDrawer }] = useDrawer();
  function handleCreat() {
    openDrawer(true, {
      isUpdate: false,
    });
  }
  function updatanote(item: any) {
    openDrawer(true, {
      isUpdate: true,
      item: item,
    });
  }
  // 新增/编辑 成功回调
  function handleSuccess() {
    getNotePackageList();
  }
</script>
