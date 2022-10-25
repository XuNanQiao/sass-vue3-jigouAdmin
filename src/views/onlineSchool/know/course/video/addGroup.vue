<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-01 15:29:33
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\video\addGroup.vue
 * 
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    title="添加/编辑-章节组"
    width="30%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #Title="{}">
        <span>{{ courseTitle }}</span>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, toRefs, unref, reactive } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import dataList from '/@/utils/dataList';
  import { useModal } from '/@/components/Modal';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicDrawer,
      BasicForm,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const state = reactive({
        isUpdate: false,
        id: null,
        CourseId: null,
        courseTitle: null,
        type: null,
      });
      /* 表格初始化 */
      const [
        registerForm,
        { validateFields, resetFields, setFieldsValue, getFieldsValue, validate },
      ] = useForm({
        labelWidth: '8em',
        schemas: [
          {
            field: 'CourseTitle',
            label: '课程名称',
            slot: 'Title',
            component: 'Input',
          },
          {
            field: 'Title',
            label: '章名称',
            required: true,
            component: 'Input',
            colProps: {
              span: 13,
            },
          },
          {
            field: 'Orders',
            label: '排序',
            component: 'InputNumber',
            defaultValue: 1,
            required: true,
            componentProps: {
              placeholder: '请输入排序',
            },
            colProps: {
              span: 16,
            },
          },
        ] /* formSchema */,
        showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        state.isUpdate = !!data?.isUpdate;
        state.CourseId = data?.CourseId;
        state.courseTitle = data?.CourseTitle;
        if (state.isUpdate) {
          state.id = data?.id;
          data.record.Orders = Number(data.record.orders);
          data.record.Title = data.record.title;
          setFieldsValue({
            id: data.record.id,
            ...data.record,
          });
        }
      });

      /* 提交 */
      async function handleSubmit() {
        try {
          await validate();
          let data = getFieldsValue();
          if (state.isUpdate) {
            data.id = state.id;
            await courseClient.videocoursegroupUpdate(data);
          } else {
            data.CourseId = state.CourseId;
            await courseClient.videocoursegroupAdd(data);
          }
          /*   tenantId: userInfo.tenantId,*/
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        ...toRefs(state),
        registerMenu,
        registerForm,
        handleSubmit,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep(.ant-input-number) {
    width: 50% !important;
  }
</style>
