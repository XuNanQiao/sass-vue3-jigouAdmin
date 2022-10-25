<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-07 17:40:46
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\live\index.vue
 * 
-->
<template>
  <div>
    <KindSearch :search="kindSearch" :kindSchemas="kindSchemas" @submit="submit" />
    <a-tabs v-model:activeKey="activeKey" @change="handleSuccess">
      <a-tab-pane v-for="item in productLine" :key="item.value" :tab="item.label" />
    </a-tabs>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增课程</a-button>
      </template>

      <template #title="{ record }">
        <div class="tabNameImg">
          <img class="rowImg" :src="record.img" alt="" />
          <span class="text">{{ record.title }}</span>
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '章节管理',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '课程资料',
              onClick: handleData.bind(null, record),
              ifShow: () => {
                return record.productLine == '2';
              },
            },
            {
              label: '课程模考',
              onClick: handleExam.bind(null, record),
              ifShow: () => {
                return record.productLine == '2';
              },
            },
            {
              label: '评价',
              onClick: handleEvaluate.bind(null, record),
            },
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AddVideo @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRefs } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useDrawer } from '/@/components/Drawer';
  import { router } from '/@/router';
  import dataList from '/@/utils/dataList';

  import AddVideo from '../video/addVideo.vue';
  import KindSearch from '/@/components/view/kindSearch.vue';
  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, AddVideo, KindSearch },
    setup() {
      const type = 1;
      const activeKey = ref(1);
      const state = reactive({
        productLine: dataList.productLine,
        active: false,
        opened: false,
        kindSearch: {
          shooleShow: true,
          kindShow: true,
          zyShow: false,
          classShow: false,
        },
        kindSchemas: [
          {
            field: 'name',
            component: 'Input',
            label: '搜索:',
            colProps: {
              span: 6,
            },
            componentProps: {
              
              onChange: (e: any) => {},
            },
          },
        ],
        kindVal: {} as any,
      });
      /* 初始化表格 */
      const [registerTable, { reload }] = useTable({
        title: '',
        api: courseClient.getList,
        beforeFetch: (t: any) => {
          t.types = type;
          t.productLine = unref(activeKey);
          t.title = state.kindVal.name;
          t.kind = state.kindVal.kind;
        },
        fetchSetting: {
          // 传递到后台的当前页面的字段名
          pageField: 'pageNum',
          //后台显示的每页的数字字段名称
          sizeField: 'pageSize',
          //接口返回的表单数据的字段名
          listField: 'rows',
          // 接口字段名返回的表总数
          totalField: 'total',
        },
        /**列配置
         * slots：自定义的插槽 */
        columns: [
          { title: '视频课程名称', dataIndex: 'title', slots: { customRender: 'title' } },
          { title: '课时数', dataIndex: 'classPeriod' },
          { title: '所属项目/课程', dataIndex: 'kindName', align: 'left' },
          { title: '价格', dataIndex: 'price', width: 100 },
          { title: '添加时间', dataIndex: 'createtime', width: 170 },
        ],
        /* 表单配置，参考表单组件的 Props */

        /* 使用搜索表单	 */
        useSearchForm: false,
        /* 显示表格设置工具	 */
        showTableSetting: true,
        //bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 300,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          align: undefined,
        },
      });
      /* -----------搜索 --------------------- */
      function submit(value) {
        state.kindVal = value;
        reload();
      }
      /* -----------添加--弹窗 --------------------- */
      /* 初始化弹窗 */
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerMenu, { openDrawer: openMenu }] = useDrawer();
      /* 添加录播 */
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
          type: type,
        });
      }
      /* 编辑录播 */
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          type: type,
          isUpdate: true,
        });
      }
      /* 添加编辑录播成功 */
      function handleSuccess() {
        reload();
      }
      /* 删除录播 */
      function handleDelete(record: Recordable) {
        courseClient.videocourseDelete(record.id).then((res) => {
          reload();
        });
      }
      /* 章节管理 */
      function handleMenu(record: Recordable) {
        
        router.push({
          path: '/know/course/liveChat',
          query: {
            id: record.id,
            type: record.types,
            title: record.title,
            kid: record.kid,
            kind: record.kind,
            productLine: record.productLine,
          },
        });
        // router.push(`/know/course/videoChat?id=${record.id}`);
      }
      /* 课程资料 */
      function handleData(record: Recordable) {
        router.push(`/know/course/courseData?typeId=${record.id}&type=1&docType=3`);
      }
      /* 评价 */
      function handleEvaluate(record: Recordable) {
        router.push(`/know/score/stuComment?typeId=${record.id}&type=2`);
      }
      /* 课程模考 */
      function handleExam(record: Recordable) {
        router.push({
          path: '/know/course/courseExam',
          query: {
            id: record.id,
            type: 1,
            cKid: record.kid,
            kind: record.kind,
            title: record.name,
          },
        });
      }
      return {
        ...toRefs(state),
        activeKey,
        submit,
        registerTable,
        registerDrawer,
        registerMenu,
        handleMenu,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleEvaluate,
        handleData,
        handleExam,
      };
    },
  });
</script>
