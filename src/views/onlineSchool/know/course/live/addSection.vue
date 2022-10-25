<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-12 14:15:18
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\live\addSection.vue
 * 
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    title="添加/编辑-章节"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, toRefs, unref, reactive } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import dayjs, { Dayjs } from 'dayjs';
  import moment, { Moment } from 'moment';
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
        isUpdate: false,
        id: null,
        CourseId: null,
        courseTitle: null,
        type: null,
        LabelOptions: [],
      });
      /* 表格初始化 */
      const [
        registerForm,
        { validateFields, resetFields, setFieldsValue, getFieldsValue, validate },
      ] = useForm({
        labelWidth: '8em',
        schemas: [
          {
            field: 'Title',
            label: '视频名称',
            required: true,
            component: 'Input',
          },
          {
            field: 'StartTime',
            label: '直播时间',
            required: true,
            component: 'RangePicker',
            componentProps: {
              format: 'YYYY-MM-DD HH:mm:ss',
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              showTime: true /* : { format: 'HH:mm:ss' } */,
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
            field: 'ccOrAli',
            label: '回放配置',
            required: true,
            component: 'RadioGroup',
            defaultValue: 1,
            componentProps: {
              options: [
                { label: 'cc', value: 1 },
                { label: '阿里', value: 2 },
              ],
            },
          },
          {
            field: 'aliVideoUrl',
            label: '阿里播放vid',
            component: 'Input',
            ifShow: ({ values }) => {
              return values.ccOrAli == 2;
            },
          },
          {
            field: 'AliVideoId',
            label: '阿里播放地址',
            component: 'Input',
            ifShow: ({ values }) => {
              return values.ccOrAli == 2;
            },
          },
          {
            field: 'RecordId',
            label: 'CC回放ID',
            component: 'Input',
            ifShow: ({ values }) => {
              return values.ccOrAli == 1;
            },
          },
          {
            field: 'CcRomid',
            label: '直播间ID',
            component: 'Input',
            ifShow: ({ values }) => {
              return values.ccOrAli == 1;
            },
          },
          {
            field: 'CcLiveid',
            label: '直播ID',
            component: 'Input',
            ifShow: ({ values }) => {
              return values.ccOrAli == 1;
            },
          },
          {
            field: 'TrialVideo',
            label: '试听链接',
            component: 'Input',
          },
          {
            field: 'label',
            label: '配置',
            component: 'Select',
            colProps: {
              span: 10,
            },
            componentProps: {
              options: toRefs(state).LabelOptions,
              fieldNames: {
                label: 'title',
                value: 'id',
              },
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
        ],
        fieldMapToTime: [['StartTime', ['StartTime', 'EndTime'], 'YYYY-MM-DD HH:mm:ss']],
        /* formSchema */
        showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await getLabeList();
        await resetFields();
        await setDrawerProps({ confirmLoading: false });
        state.isUpdate = !!data?.isUpdate;
        state.CourseId = data?.CourseId;
        state.courseTitle = data?.CourseTitle;
        if (state.isUpdate) {
          state.id = data?.id;
          state.record = data?.record;
          const record = { ...data.record };
          record.Orders = Number(record.orders);
          record.label = Number(record.label);
          record.Title = record.title;
          record.AliVideoUrl = record.aliVideoUrl;
          record.AliVideoId = record.aliVideoId;
          record.CcRomid = record.ccRomid;
          record.CcLiveid = record.ccLiveid;
          record.RecordId = record.recordId;
          record.TrialVideo = record.trialVideo;
          record.ksTime = record.ksTime;
          record.StartTime = [
            dayjs('2022-02-15 12:30:00', 'YYYY-MM-DD HH:mm:ss'),
            dayjs('2022-02-15 12:40:00', 'YYYY-MM-DD HH:mm:ss'),
          ];
          record.ccOrAli = record.AliVideoUrl || record.AliVideoId ? 2 : 1;

          await setFieldsValue({
            ...record,
          });
        } else {
          await setFieldsValue({
            StartTime: [
              '2022-02-15 12:30:00',
              '2022-02-15 12:40:00',
              /*  dayjs('2022-02-15 12:30:00', 'YYYY-MM-DD HH:mm:ss'),
              dayjs('2022-02-15 12:40:00', 'YYYY-MM-DD HH:mm:ss'), */
            ],
          });
        }
      });

      /* 获取配置列表 */
      async function getLabeList() {
        courseClient.selectLabelList().then((res) => {
          state.LabelOptions = res.data;
        });
      }
      /* 提交 */
      async function handleSubmit() {
        try {
          let data = await validate();
          const time = [...data.StartTime];
          data.StartTime = time[0];
          data.EndTime = time[1];
          if (state.isUpdate) {
            data.id = state.id;
            await courseClient.liveshowplaybackUpdate(data);
          } else {
            data.LiveId = state.CourseId;
            await courseClient.liveshowplaybackAdd(data);
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
