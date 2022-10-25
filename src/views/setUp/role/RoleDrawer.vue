<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-06-16 14:24:19
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\setUp\role\RoleDrawer.vue
 * 
-->
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
  import dataList from '/@/utils/dataList';
  let menu = new Menu();
  import { getInfo } from '/@/utils/cookies';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const record = ref<roleValueList>({});

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: [
          {
            field: 'type',
            label: '角色类型',
            required: true,
            component: 'RadioGroup',
            componentProps: {
              options: dataList.entrantsType,
            },
          },
          {
            field: 'entrantsType',
            label: '入驻商类型',
            required: true,
            component: 'RadioGroup',
            ifShow: ({ values }) => {
              return values.type == 2;
            },
            componentProps: {
              options: dataList.orgType,
            },
          },
          {
            field: 'name',
            label: '角色名称',
            required: true,
            component: 'Input',
          },
          {
            field: 'remark',
            label: '角色备注',
            component: 'InputTextArea',
          },
        ] /* formSchema */,
        showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        record.value = data.record;
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          let userInfo = getInfo();
          if (unref(isUpdate)) {
            values.id = unref(record).id;
            menu.updateSysRole(values);
          } else {
            values.tenantId = userInfo.tenantId;
            menu.addSysRole(values);
          }
          /*   tenantId: userInfo.tenantId,*/
          setDrawerProps({ confirmLoading: true });

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
