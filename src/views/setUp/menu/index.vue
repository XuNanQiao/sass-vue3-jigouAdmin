<!--
 * @Author: 南桥几许
 * @Date: 2022-06-09 14:47:48
 * @LastEditTime: 2022-06-21 09:46:47
 * @LastEditors: 隐世浮华
 * @Description: 
 * @FilePath: \edub_tob_jxyZ\src\views\setUp\menu\index.vue
 * 
-->

<template>
  <div>
    <BasicTable
      v-if="data.length > 0"
      title=""
      isTreeTable
      :showIndexColumn="false"
      :dataSource="data"
      :columns="columns"
      :loading="loading"
      :striped="true"
      :bordered="true"
      showTableSetting
      :pagination="false"
      :actionColumn="actionColumn"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleCreat(null)"> 新增菜单 </a-button>
      </template>
      <template #icon="{ record }">
        <Tag class="iconfont" :class="record.icon" />
      </template>
      <template #type="{ record }">
        <Tag> {{ record.type == 1 ? '菜单' : '按钮' }} </Tag>
      </template>
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { Menu } from '/@/utils/setUp/menu';
  import MenuDrawer from './MenuDrawer.vue';
  let menu = new Menu();
  import { createVNode, defineComponent, onMounted, reactive, toRefs } from 'vue';
  import {
    BasicTable,
    ColumnChangeParam,
    TableAction,
    ActionItem,
    EditRecordRow,
    BasicColumn,
  } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { Tag, Modal } from 'ant-design-vue';
  import { useDrawer } from '/@/components/Drawer';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    components: { BasicTable, TableAction, Tag, MenuDrawer },
    setup() {
      const state = reactive({
        data: [],
        loading: false,
        columns: getBasicColumns(),
        actionColumn: {
          width: 220,
          title: 'Action',
          dataIndex: 'action',
          fixed: 'right',
          slots: { customRender: 'action' },
        },
      });

      // 页面加载时
      onMounted(async () => {
        state.loading = true;
        await menu.getFuKindList().then((res) => {
          state.data = res.data;
          haveChilden(state.data);
        });
        state.loading = false;
      });
      // 获取菜单
      async function getFuKindList() {
        state.loading = true;
        await menu.getFuKindList().then((res) => {
          state.data = res.data;
          haveChilden(state.data);
        });
        state.loading = false;
      }
      function haveChilden(array: any) {
        for (let item of array) {
          item.children = item.children.length > 0 ? item.children : null;
          if (item.children) {
            haveChilden(item.children);
          }
        }
      }
      /* ==================操作============ */

      function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: '添加子菜单',
              onClick: handleCreat.bind(null, record),
            },
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              onClick: handledel.bind(null, record),
            },
          ];
        }
      }
      /* 初始化弹窗 */
      const [registerDrawer, { openDrawer }] = useDrawer();
      function handleCreat(record: any) {
        

        openDrawer(true, {
          isHaveParent: record ? record.id : 0,
          isUpdate: false,
          record,
        });
      }
      // 编辑
      function handleEdit(record: any) {
        openDrawer(true, {
          isUpdate: true,
          record,
        });
      }
      // 删除
      async function handledel(record: any) {
        Modal.confirm({
          title: '警告',
          icon: createVNode(ExclamationCircleOutlined),
          content: '删除后该菜单将不存在，您是否确认操作',
          okText: '确认',
          cancelText: '取消',
          async onOk() {
            await menu.deleteSysMenu(record.id);
            getFuKindList();
          },
        });
      }
      // 新增/编辑 成功回调
      function handleSuccess() {
        getFuKindList();
      }
      return {
        ...toRefs(state),
        createActions,
        getBasicColumns,
        handleCreat,
        registerDrawer,
        handleEdit,
        handledel,
        getFuKindList,
        handleSuccess,
      };
    },
  });
</script>
