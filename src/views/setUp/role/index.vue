<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-07 11:40:37
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\setUp\role\index.vue
 * 
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #type="{ record }">
        <span> {{ typeEnum[record.type] }}</span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '权限配置',
              onClick: handleMenu.bind(null, record),
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
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    <RoleMenu @register="registerMenu" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Menu } from '/@/utils/setUp/menu';
  let menu = new Menu();
  import { entrantsType } from '/@/utils/enum';
  import dataList from '/@/utils/dataList';
  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';
  import RoleMenu from './RoleMenu.vue';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction, RoleMenu },
    setup() {
      const typeEnum = entrantsType;
      /* 初始化表格 */
      const [registerTable, { reload }] =  useTable({
        
        title: '',
        api: menu.getAllRole,
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
          { title: '角色名称', dataIndex: 'name', align: 'left' },
          { title: '角色备注', dataIndex: 'remark', align: 'left' },
          { title: '所属', dataIndex: 'type', slots: { customRender: 'type' } },
          { title: '创建时间', dataIndex: 'createTime' },
        ],
        /* 表单配置，参考表单组件的 Props */
        formConfig: {
          labelWidth: '6em',
          schemas: [
            {
              field: 'name',
              component: 'Input',
              label: '角色名称',
              colProps: {
                span: 6,
              },
              componentProps: {
                
                onChange: (e: any) => {},
              },
            },
            {
              field: 'type',
              component: 'Select',
              label: '角色类型',
              colProps: {
                span: 6,
              },
              componentProps: {
              showSearch: true,
                options: dataList.entrantsType,
              },
            },
          ],
        },
        /* 使用搜索表单	 */
        useSearchForm: true,
        /* 显示表格设置工具	 */
        showTableSetting: true,
        //bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 180,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          align: undefined,
        },
      });
      /* -------------弹窗 --------------------- */
      /* 初始化弹窗 */
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerMenu, { openDrawer: openMenu }] = useDrawer();
      /* 添加角色 */
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }
      /* 添加角色 */
      function handleMenu(record: Recordable) {
        openMenu(true, {
          record,
        });
      }
      /* 编辑角色 */
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      /* 删除角色 */
      function handleDelete(record: Recordable) {
        menu.deleteRole(record.id).then((res) => {
          reload();
        });
      }
      /* 添加角色成功 */
      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        typeEnum,
        registerDrawer,
        registerMenu,
        handleMenu,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
