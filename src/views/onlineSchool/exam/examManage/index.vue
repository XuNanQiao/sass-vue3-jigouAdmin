<template>
  <div>
    <KindSearch :search="kindSearch" @submit="submit" />
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增试卷</a-button>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '试题管理',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '试卷预览',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '编辑试看',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '修改',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <examManageDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { createVNode, defineComponent, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { examManage } from '/@/utils/onlineSchool/examManage/examManage';
  let examManagea = new examManage();
  import { useDrawer } from '/@/components/Drawer';
  import KindSearch from '/@/components/view/kindSearch.vue';
  import { getBasicColumns } from './tableData';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import examManageDrawer from './examManageDrawer.vue';
  import { Modal } from 'ant-design-vue';
  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, KindSearch, examManageDrawer },
    setup() {
      const state = reactive({
        active: false,
        opened: false,
        kindSearch: {
          shooleShow: true,
          kindShow: true,
          zyShow: true,
          classShow: true,
        },

        kindVal: {} as any,
      });
      /* 初始化表格 */
      const [registerTable, { reload }] =  useTable({
        
        title: '',
        api: examManagea.getQuestionPaperList,
        beforeFetch: (t: any) => {
          t.kindId = state.kindVal.kind;
          t.zyId = state.kindVal.zyId;
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
        columns: getBasicColumns(),
        /* 表单配置，参考表单组件的 Props */

        /* 使用搜索表单	 */
        useSearchForm: false,
        /* 显示表格设置工具	 */
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 200,
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
      /* 添加考点 */
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }
      /* 编辑考点 */
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      /* 添加编辑考点成功 */
      function handleSuccess() {
        reload();
      }
      /* 删除考点 */
      function handleDelete(record: Recordable) {
        Modal.confirm({
          title: '警告',
          icon: createVNode(ExclamationCircleOutlined),
          content: '删除后该条数据将不存在，您是否确认操作',
          okText: '确认',
          cancelText: '取消',
          async onOk() {
            await examManagea.deleteQuestionPaper({ id: record.id });
            reload();
          },
        });
      }

      /* 添加录播 */
      function handleMenu(record: Recordable) {
        openMenu(true, {
          record,
        });
      }
      async function switchChange(record: any) {
        await examManagea.updateShowStatus({ id: record.id });
        reload();
      }
      return {
        ...state,
        submit,
        registerTable,
        registerDrawer,
        registerMenu,
        handleMenu,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        getBasicColumns,
        switchChange,
      };
    },
  });
</script>
