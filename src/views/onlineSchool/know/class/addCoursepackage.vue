<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-19 15:00:33
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\class\addCoursepackage.vue
 * 
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    title="新增/编辑"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
   import { BasicModal, useModalInner } from '/@/components/Modal';
 /*  import { BasicModal, useDrawerInner } from '/@/components/Drawer'; */
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();

  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicModal,
      BasicForm,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const classesId = ref();

      /* 表格初始化 */
      const [
        registerForm,
        { validateFields, resetFields, setFieldsValue, getFieldsValue, validate, updateSchema },
      ] = useForm({
        labelWidth: '8em',
        schemas: [
          {
            field: 'name',
            label: '课程包名称',
            required: true,
            component: 'Input',
            colProps: {
              span: 13,
            },
          },
        ] /* formSchema */,
        showActionButtonGroup: false,
      });

      /* 打开弹窗事件 */
      const [registerMenu, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        classesId.value = data?.classesId;
        isUpdate.value = !!data?.isUpdate;
      });
      /* 提交 */
      async function handleSubmit() {
        try {
          let data = await validate();
          data.classesId = unref(classesId);
          courseClient.addCoursePackage(data);
          /*   tenantId: userInfo.tenantId,*/
          setModalProps({ confirmLoading: true });
          // TODO custom api
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerMenu,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>
