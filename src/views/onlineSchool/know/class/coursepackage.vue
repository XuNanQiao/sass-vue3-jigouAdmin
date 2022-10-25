<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-19 15:12:21
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\class\coursepackage.vue
 * 
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <template #isShow="{ record }">
        <a-switch
          v-model:checked="record.isShow"
          :checkedValue="1"
          :unCheckedValue="0"
          @change="showChange(record)"
        />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '课程管理',
              onClick: handClassCourse.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <addCoursepackage @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRefs } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useModal } from '/@/components/Modal';
  import { useRouter, useRoute } from 'vue-router';
  import addCoursepackage from './addCoursepackage.vue';
  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, addCoursepackage },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const state = reactive({
        productLine: Number(route.query.productLine),
        classId: Number(route.query.classId),
        learningPhase: Number(route.query.learningPhase),
      });

      /* 初始化表格 */
      const [registerTable, { reload }] = useTable({
        title: '',
        api: courseClient.getCoursePackageList,
        beforeFetch: (t: any) => {
          t.classesId = state.classId;
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
          { title: '课程包名称', dataIndex: 'name', align: 'left' },
          { title: '价格', dataIndex: 'price' },
          { title: '是否显示', dataIndex: 'isShow', width: 100, slots: { customRender: 'isShow' } },
          { title: '更新时间', dataIndex: 'createTime', width: 120 },
        ],
        /* 表单配置，参考表单组件的 Props */

        /* 使用搜索表单	 */
        useSearchForm: false,
        /* 显示表格设置工具	 */
        showTableSetting: true,
        //bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          align: undefined,
        },
      });
      /* -----------添加--弹窗 --------------------- */
      /* 初始化弹窗 */
      const [registerDrawer, { openModal }] = useModal();
      /* 添加 */
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
          classId: state.classId,
        });
      }

      /* 添加编辑成功 */
      function handleSuccess() {
        reload();
      }
      /* 删除 */
      function handleDelete(record: Recordable) {
        courseClient.deleteCoursePackage(record.id).then((res) => {
          reload();
        });
      }
      /* 更新知识套餐状态 */
      function showChange(record: Recordable) {
        courseClient.updateCoursePackageState(record.id, 2).then((res) => {
          reload();
        });
      }
      /* 套餐课程 */
      function handClassCourse(record: Recordable) {
        router.push({
          path: '/onlineSchool/class/classCourse',
          query: {
            id: record.id,
            title: record.tiitle,
            productLine: record.productLine,
            learningPhase: record.learningPhase,
          },
        });
        // router.push(`/know/course/videoChat?id=${record.id}`);
      }

      return {
        ...toRefs(state),
        registerTable,
        registerDrawer,
        showChange,
        handClassCourse,
        handleCreate,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
