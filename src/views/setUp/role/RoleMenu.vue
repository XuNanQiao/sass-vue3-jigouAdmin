<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-06-15 16:09:26
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\setUp\role\RoleMenu.vue
 * 
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    title="分配权限"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicTree
      v-model:value="model"
      :treeData="treeData"
      :checkedKeys="checkedKeys"
      :replaceFields="{ title: 'name', key: 'id' }"
      checkable
      toolbar
      title="菜单分配"
    />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { Menu } from '/@/utils/setUp/menu';
  let menu = new Menu();
  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const model = ref([]);
      const checkedKeys = ref([]);
      const roleId = ref<roleValueList>({});
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          if (unref(treeData).length === 0) {
            await menu.getFuKindList().then((val) => {
              treeData.value = val.data as any as TreeItem[];
            });
          }
        }
        roleId.value = { ...data.record };
        getMenu();
      });
      /* 获取当前角色绑定菜单 */
      async function getMenu() {
        const { id } = unref(roleId);
        try {
          menu.getMenuByRole(id).then((res) => {
            getId(res.data).then((ids) => {
              checkedKeys.value = ids;
            });
          });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      //获取id
      async function getId(data: any) {
        let ids: any = [];
        for (let item of data) {
          if (item.children && item.children.length > 0) {
            await getId(item.children).then((res) => {
              ids = ids.concat(res);
            });
          } else {
            if (item.select) {
              ids.push(item.id);
            }
          }
        }
        return ids;
      }
      async function handleSubmit() {
        const { id } = unref(roleId);
        try {
          menu.toRoleAssignMenu(id, unref(model).toString());
          setDrawerProps({ confirmLoading: true });

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerMenu,
        handleSubmit,
        treeData,
        checkedKeys,
        model,
      };
    },
  });
</script>
