<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-07 17:37:45
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\imageCourse\index.vue
 * 
-->
<template>
  <div>
    <KindSearch :search="kindSearch" :kindSchemas="kindSchemas" @submit="submit" />
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增课程</a-button>
      </template>

      <template #name="{ record }">
        <div class="tabNameImg">
          <img class="rowImg" :src="record.thumbnail" alt="" />
          <span class="text">{{ record.name }}</span>
        </div>
      </template>
      <template #showStatus="{ record }">
        <a-switch
          v-model:checked="record.showStatus"
          :checkedValue="1"
          :unCheckedValue="0"
          @change="showChange(record)"
        />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '章节管理',
              color: 'success',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '课程资料',
              onClick: handleData.bind(null, record),
            },
            {
              label: '课程模考',
              onClick: handleExam.bind(null, record),
            },
            {
              label: '评价',
              onClick: handleEvaluate.bind(null, record),
            },
            {
              label: '编辑',
              color: 'warning',
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

  import AddVideo from './addCourse.vue';
  import KindSearch from '/@/components/view/kindSearch.vue';
  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, AddVideo, KindSearch },
    setup() {
      /*    7 音频 8图文  10 面授     */
      const type = 8;
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
        api: courseClient.getImageTextTeachList,
        beforeFetch: (t: any) => {
          t.name = state.kindVal.name;
          t.kindId = state.kindVal.kind;
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
          { title: '图文课名称', dataIndex: 'name', slots: { customRender: 'name' } },
          // { title: "所属大类", dataIndex: "kindName", align: "left" },
          { title: '所属项目', dataIndex: 'kindName', align: 'left' },
          { title: '所属课程名', dataIndex: 'courseName', align: 'left' },
          { title: '修改前价格', dataIndex: 'priceAgo' },
          { title: '课程价格', dataIndex: 'price', width: 100 },
          { title: '添加时间', dataIndex: 'createTime', width: 170 },
          {
            title: '上架状态',
            dataIndex: 'showStatus',
            width: 100,
            slots: { customRender: 'showStatus' },
          },
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
      /* 添加课程 */
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
          type: type,
        });
      }
      /* 编辑课程 */
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          type: type,
          isUpdate: true,
        });
      }
      /* 添加编辑课程成功 */
      function handleSuccess() {
        reload();
      }
      /* 删除课程 */
      function handleDelete(record: Recordable) {
        courseClient.deleteImageTextTeach(record.id).then((res) => {
          reload();
        });
      }
      /* 章节管理 */
      function handleMenu(record: Recordable) {
        
        router.push({
          path: '/know/course/chatView',
          query: {
            id: record.id,
            type: record.types,
            title: record.name,
            kid: record.courseId,
            kind: record.kindId,
          },
        });
        // router.push(`/know/course/videoChat?id=${record.id}`);
      }
      /* 评价 */
      function handleEvaluate(record: Recordable) {
        router.push(`/know/score/stuComment?typeId=${record.id}&type=8`);
      }
      /* 课程资料 */
      function handleData(record: Recordable) {
        router.push(`/know/course/courseData?typeId=${record.id}&type=4&docType=3`);
      }
      /* 课程模考 */
      function handleExam(record: Recordable) {
        router.push({
          path: '/know/course/courseExam',
          query: {
            id: record.id,
            type: 4,
            cKid: record.kid,
            kind: record.kind,
            title: record.name,
          },
        });
      }
      function showChange(record: Recordable) {
        courseClient.updateImageTextTeachState(record.id).then((res) => {
          reload();
        });
      }
      return {
        ...toRefs(state),
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
        showChange,
        handleData,
        handleExam,
      };
    },
  });
</script>
