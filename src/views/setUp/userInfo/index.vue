<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-06-29 16:06:08
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\setUp\userInfo\index.vue
 * 
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增用户 </a-button>
      </template>
      <template #entrantstype="{ record }">
        <span> {{ typeEnum[record.entrantsType] }}</span>
      </template>
      <template #userType="{ record }">
        <span> {{ userTypeEnum[record.userType] }}</span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              onClick: handleMenu.bind(null, record),
            },

            {
              label: '修改密码',
              divider: true,
              onClick: handleEdit.bind(null, record),
              ifShow: () => {
                return record.platform == 1;
              },
            },
            {
              label: '编辑',
              divider: true,
              onClick: handleEdit.bind(null, record),
              ifShow: () => {
                return record.platform == 1;
              },
            },
            {
              label: '禁用',
              color: 'error',
              divider: true,
              onClick: handleEdit.bind(null, record),
              ifShow: () => {
                return record.platform == 1 && record.status == 0 ? true : false;
              },
            },
            {
              label: '启用',
              color: 'success',
              divider: true,
              onClick: handleEdit.bind(null, record),
              ifShow: () => {
                return record.platform == 1 && record.status == 1 ? true : false;
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <!--添加  -->
    <userAdd @register="registerDrawer" @success="handleSuccess" />
    <!-- <RoleMenu @register="registerMenu" @success="handleSuccess" /> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Menu } from '/@/utils/setUp/menu';
  let menu = new Menu();
  import { entrantsType, userType } from '/@/utils/enum';
  import dataList from '/@/utils/dataList';
  import { useDrawer } from '/@/components/Drawer';
  import userAdd from './userAdd.vue';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, userAdd, TableAction },
    setup() {
      const typeEnum = entrantsType;
      const userTypeEnum = userType;
      /* 初始化表格 */
      const [registerTable, { reload }] =  useTable({
        
        title: '',
        api: menu.getSysUserPageList,
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
          {
            title: '用户类型',
            dataIndex: 'entrantsType',
            width: 90,
            slots: { customRender: 'entrantstype' },
          },
          { title: '入驻商名称', dataIndex: 'entrantsName', align: 'left' },
          { title: '账号（不可改）', dataIndex: 'username', align: 'left' },
          { title: '昵称', dataIndex: 'nickname', align: 'left', width: 150 },
          { title: '手机号', dataIndex: 'phoneNum', width: 110 },
          {
            title: '登录类型',
            dataIndex: 'userType',
            width: 100,
            slots: { customRender: 'userType' },
          },
          { title: '微信号', dataIndex: 'wechatNum', width: 110 },
          { title: '权限角色', dataIndex: 'roleName' },
          { title: '状态', dataIndex: 'status', width: 100 },
          { title: '创建时间', dataIndex: 'createTime' },
          { title: '拥有学员', dataIndex: 'stuNum', width: 100 },
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
          width: 220,
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
      function handleDelete(record: Recordable) {}
      /* 禁用角色 */
      function handleDelete(record: Recordable) {}
      /* 添加角色成功 */
      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        typeEnum,
        userTypeEnum,
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
