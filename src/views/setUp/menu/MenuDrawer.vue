<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Menu } from '/@/utils/setUp/menu';
  import { formSchema } from './tableData';
  let menu = new Menu();
  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref();
      const parentId = ref();
      const menulist = ref();
      const id = ref();
      const isMenu = (type: number) => type === 1;
      const isButton = (type: number) => type === 2;
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: [
          {
            field: 'type',
            label: '菜单类型',
            component: 'RadioButtonGroup',
            defaultValue: 1,
            componentProps: {
              options: [
                { label: '菜单', value: 1 },
                { label: '按钮', value: 2 },
              ],
            },
            colProps: { lg: 24, md: 24 },
          },
          {
            field: 'name',
            label: '菜单名称',
            component: 'Input',
            required: true,
            colProps: { lg: 24, md: 24 },
          },

          {
            field: 'parentId',
            label: '上级菜单',
            component: 'Cascader',
            dynamicDisabled: () => {
              return !unref(isUpdate);
            },
            componentProps: {
              fieldNames: {
                label: 'name',
                value: 'id',
                children: 'children',
              },
              options: menulist,
              changeOnSelect: true,
            },
          },
          {
            field: 'path',
            label: '路径',
            component: 'Input',
          },
          {
            field: 'url',
            label: '文件路径',
            component: 'Input',
          },
          {
            field: 'sort',
            label: '排序',
            ifShow: ({ values }) => isMenu(values.type),
            component: 'InputNumber',
            required: true,
          },
          {
            field: 'icon',
            label: '图标',
            component: 'Input',
            ifShow: ({ values }) => isMenu(values.type),
          },
          {
            field: 'remark',
            label: '备注',
            component: 'Input',
          },
          {
            field: 'permissionValue',
            label: '按钮权限值',
            ifShow: ({ values }) => isButton(values.type),
            component: 'InputNumber',
            required: true,
          },

          {
            field: 'isCache',
            label: '是否缓存',
            component: 'RadioButtonGroup',
            defaultValue: '0',
            componentProps: {
              options: [
                { label: '否', value: '0' },
                { label: '是', value: '1' },
              ],
            },
          },
        ] /* formSchema */,
        showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        parentId.value = data.record ? data.record.parentId : 0;
        // data.record.parentId = [145, 444, 445];
        let res = await menu.getFuKindList();
        menulist.value = res.data;
        id.value = data.record.id;
        if (!unref(isUpdate)) {
          data.record.parentId = data.record.id ? data.record.id : 0;
        }
        setFieldsValue({
          ...data.record,
        });
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
      async function handleSubmit() {
        try {
          const values = await validate();

          setDrawerProps({ confirmLoading: true });

          if (!unref(isUpdate)) {
            values.parentId = values.parentId ? values.parentId[values.parentId.length - 1] : null;
            await menu.addMenu(values);
          } else {
            values.parentId = values.parentId ? values.parentId : null;
            values.id = unref(id);
            await menu.editMenu(values);
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerMenu,
        registerForm,
        handleSubmit,
        getTitle,
      };
    },
  });
</script>
