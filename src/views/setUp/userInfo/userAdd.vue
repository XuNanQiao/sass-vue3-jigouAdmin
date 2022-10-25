<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-12 10:13:01
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\setUp\userInfo\userAdd.vue
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
    <BasicForm @register="registerForm">
      <template #headIcon="{}">
        <CropperAvatar :uploadApi="uploadApi" :value="registerForm.headIcon" />
      </template>
    </BasicForm>
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
  /* CropperImage,  */
  import { CropperAvatar } from '/@/components/Cropper';
  import { uploadApi } from '/@/api/sys/upload';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, CropperAvatar },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const record = ref<roleValueList>();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: [
          {
            field: 'userTypes',
            label: '用户类型',
            required: true,
            component: 'RadioGroup',
            componentProps: {
              options: dataList.entrantsType,
            },
          },
          {
            field: 'headIcon',
            label: '头像',
            required: true,
            component: 'Upload',
            slot: 'headIcon',
          },
          {
            field: 'username',
            label: '账号',
            required: true,
            component: 'Input',
          },
          {
            field: 'nickname',
            label: '昵称',
            required: true,
            component: 'Input',
          },
          {
            field: 'password',
            label: '密码',
            required: true,
            component: 'Input',
          },
          {
            field: 'phoneNum',
            label: '手机号',
            required: true,
            component: 'Input',
          },
          {
            field: 'status',
            label: '状态',
            component: 'RadioButtonGroup',
            defaultValue: '0',
            componentProps: {
              options: [
                { label: '启用', value: '0' },
                { label: '停用', value: '1' },
              ],
            },
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
      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

      async function handleSubmit() {
        try {
          const values = await validate();
          let userInfo = getInfo();
          if (unref(isUpdate)) {
            values.id = unref(record)?.id;
            menu.userEdit(values);
          } else {
            values.tenantId = userInfo.tenantId;
            menu.userAdd(values);
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
        uploadApi: uploadApi as any,
        getTitle,
      };
    },
  });
</script>
