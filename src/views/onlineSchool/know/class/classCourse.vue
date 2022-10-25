<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-12 15:56:00
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\class\classCourse.vue
 * 
-->
<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" @change="handleSuccess">
      <a-tab-pane v-for="item in coursePackage" :key="item.value" :tab="item.label" />
    </a-tabs>
    <BasicTable @register="registerTable" @edit-end="handleEditEnd">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加课程</a-button>
      </template>

      <template #title="{ record }">
        <div class="tabNameImg">
          <img class="rowImg" :src="record.img" alt="" />
          <span class="text">{{ record.title }}</span>
        </div>
        <!-- <span> {{ typeEnum[record.type] }}</span> -->
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
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
    <courseChoose @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRefs } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useModal } from '/@/components/Modal';
  import dataList from '/@/utils/dataList';
  import courseChoose from '/@/views/publicComponent/courseChoose.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Progress } from 'ant-design-vue';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, courseChoose },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const activeKey = ref(1);

      const state = reactive({
        sId: null,
        coursePackage: dataList.coursePackage,
        id: route.query.id ? Number(route.query.id) : null,
        productLine: route.query.productLine ? Number(route.query.productLine) : null,
        learningPhase: route.query.learningPhase ? Number(route.query.learningPhase) : null,
      });

      /* 初始化表格 */
      const [registerTable, { reload }] = useTable({
        title: '',
        api: courseClient.ClassesCoursePageList,
        beforeFetch: (t: any) => {
          t.type = unref(activeKey);
          t.classesId = state.id;
        },
        afterFetch: (t: any) => {
          console.log(t, '=========t');

          state.sId = t;
          return t.rows;
        },
        fetchSetting: {
          // 传递到后台的当前页面的字段名
          pageField: 'pageNum',
          //后台显示的每页的数字字段名称
          sizeField: 'pageSize',
          //接口返回的表单数据的字段名
          listField: 'data',
          // 接口字段名返回的表总数
          totalField: 'total',
        },
        /**列配置
         * slots：自定义的插槽 */
        columns: [
          // { title: '视频课程名称', dataIndex: 'title', slots: { customRender: 'title' } },
          { title: '辅导课程名称', dataIndex: 'title', slots: { customRender: 'title' } },
          { title: '课程名', dataIndex: 'kcName' },
          { title: '辅导项目', dataIndex: 'kindName' },
          {
            title: '所属阶段',
            dataIndex: 'courseProductLine',
            width: 100,
            ifShow: () => {
              return state.productLine == 3;
            },
          },
          { title: '所属年份', dataIndex: 'yearName', width: 100 },
          { title: '添加时间', dataIndex: 'addTime', width: 170 },
          {
            title: '排序',
            dataIndex: 'cOrder',
            width: 150,
            edit: true,
            editRule: true,
            editComponent: 'InputNumber',
            editComponentProps: {
              step: 1,
              precision: 0,
              min: 0,
            },
          },
        ],
        /* 表单配置，参考表单组件的 Props */
        formConfig: {
          labelWidth: '6em',
          schemas: [
            {
              field: 'yearName',
              label: '所属年份',
              required: true,
              component: 'DatePicker',
              componentProps: {
                picker: 'year',
                format: 'YYYY',
                valueFormat: 'YYYY',
              },
              colProps: {
                span: 6,
              },
            },
            {
              field: 'semester',
              label: '所属期数',
              component: 'Select',
              componentProps: {
                showSearch: true,
                options: dataList.semester,
              },
              colProps: {
                span: 6,
              },
            },
          ],
        },
        /* 使用搜索表单	 */
        useSearchForm: true,
        /* 显示表格设置工具	 */
        showTableSetting: true,
        //bordered: true,
        showIndexColumn: true,
        actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          align: undefined,
        },
      });

      /* -----------添加--弹窗 --------------------- */
      /* 初始化弹窗 */
      const [registerDrawer, { openModal }] = useModal();
      /* 添加录播 */
      function handleCreate() {
        openModal(true, {
          ids: state.sId,
          productLine: state.productLine,
        });
      }

      /* 添加编辑录播成功 */
      function handleSuccess() {
        reload();
      }
      /* 删除录播 */
      function handleDelete(record: Recordable) {
        if (state.id)
          courseClient.deleteClassesCourse(state.id, record.type, record.courseId).then((res) => {
            reload();
          });
      }
      /* 排序 */
      function handleEditEnd({ record, index, key, value }: Recordable) {
        if (state.id)
          courseClient
            .updateClassesCourse({
              classesId: state.id,
              type: record.type,
              courseId: record.courseId,
              id: record.id,
              order: value,
            })
            .then((res) => {
              reload();
            });
        console.log(record, index, key, value);
      }
      return {
        ...toRefs(state),
        activeKey,
        registerTable,
        registerDrawer,
        handleCreate,
        handleDelete,
        handleSuccess,
        handleEditEnd,
      };
    },
  });
</script>
