<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-05 16:01:31
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\video\addSection.vue
 * 
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    title="添加/编辑-章节"
    width="30%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #Title="{}">
        <span>{{ courseTitle }}</span>
      </template>
      <template #Audition="{ model, field }">
        <a-radio-group v-model:value="model.Audition" name="radioGroup">
          <a-radio :value="-1">试听本节</a-radio>
          <a-radio :value="1">
            <div class="flex">
              <div class="shrink">仅试听</div>
              <a-input-number id="inputNumber" v-model:value="minute" :min="0" :steo="1" />
              <div class="shrink">分钟</div>
            </div>
          </a-radio>
        </a-radio-group>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, toRefs, unref, reactive } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
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
        record: null,
        minute: 0,
        isUpdate: false,
        id: null,
        GroupId: null,
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
            label: '节名称',
            required: true,
            component: 'Input',
          },
          {
            field: 'VideoConfig',
            label: '录播链接',
            component: 'Input',
          },
          {
            field: 'VideoDuration',
            label: '录播时长',
            component: 'InputNumber',
            defaultValue: 1,
            componentProps: {
              addonAfter: '分',
            },
            colProps: {
              span: 16,
            },
          },
          {
            field: 'ksTime',
            label: '课时数',
            component: 'InputNumber',
            defaultValue: 1,
            colProps: {
              span: 16,
            },
          },
          {
            field: 'Audition',
            label: '录播试听',
            component: 'InputNumber',
            slot: 'Audition',
            defaultValue: -1,
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
        await resetFields();
        await setDrawerProps({ confirmLoading: false });
        state.isUpdate = !!data?.isUpdate;
        state.GroupId = data?.GroupId;
        state.CourseId = data?.CourseId;
        state.courseTitle = data?.CourseTitle;
        if (state.isUpdate) {
          state.id = data?.id;
          state.record = data?.record;
          state.minute = Number(data.record.audition) == -1 ? 0 : Number(data.record.audition);

          data.record.Orders = Number(data.record.orders);
          data.record.Title = data.record.title;
          data.record.VideoConfig = data.record.videoConfig;
          data.record.VideoDuration = data.record.videoDuration;
          data.record.Audition = Number(data.record.audition) == -1 ? -1 : 1;
          data.record.ksTime = data.record.ksTime;
          await setFieldsValue({
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
            data.minute = state.minute;
            await courseClient.videoUpdate(data);
          } else {
            data.minute = state.minute;
            data.CourseId = state.CourseId;
            data.GroupId = state.GroupId;
            await courseClient.videoAdd(data);
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
    width: 100% !important;
  }
</style>
