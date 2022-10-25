<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-06 16:13:42
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\courseDot\addDot.vue
 * 
-->
<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="打点配置"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #startTime="{ model }">
        <a-time-range-picker
          v-model:value="model.startTime"
          format="HH:mm:ss"
          valueFormat="HH:mm:ss"
          @change="timeChange"
        />
      </template>
      <template #coverUrl="{ model, field }">
        <Upload
          name="upload"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :action="$comFun.uploadUrl()"
          :before-upload="beforeUpload"
          @change="
            (file) => {
              handleChange(file, field);
            }
          "
        >
          <img v-if="model.coverUrl" :src="model.coverUrl" alt="avatar" />
          <div v-else>
            <!-- <LoadingOutlined v-if="loading" /> -->
            <PlusOutlined />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, toRefs, unref, reactive, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import { log } from 'console';

  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicModal,
      BasicForm,
      PlusOutlined,
      Upload,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const state = reactive({
        isUpdate: false,
        id: null,
        CourseId: null,
        type: null,
        knowList: [],
      });
      /* 表格初始化 */
      const [
        registerForm,
        { validateFields, resetFields, setFieldsValue, getFieldsValue, validate },
      ] = useForm({
        labelWidth: '8em',
        schemas: [
          {
            field: 'points',
            label: '知识点名称',
            required: true,
            component: 'Select',
            ifShow: () => {
              return true;
            },
            componentProps: {
              options: toRefs(state).knowList,
              mode: 'multiple',
              showSearch: true,
              fieldNames: {
                label: 'name',
                value: 'id',
              },
            },
          },
          {
            field: 'videoUrl',
            label: '视频地址',
            required: true,
            component: 'Input',
          },
          {
            field: 'startTime',
            component: 'Input',
            required: true,
            slot: 'startTime',
            label: '截取时间',
          },
          {
            field: 'coverUrl',
            label: '视频图片',
            slot: 'coverUrl',
            required: true,
            component: 'Input',
          },
          {
            field: 'sort',
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
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        await getKnow(data.kid);
        resetFields();
        setModalProps({ confirmLoading: false });
        state.isUpdate = !!data?.isUpdate;
        state.CourseId = data?.CourseId;
        state.type = data?.type;
        if (state.isUpdate) {
          state.id = data?.id;
          const record = { ...data.record };
          record.points = record.points.split(',').map(Number);
          record.startTime = [data.record.startTime, data.record.endTime];
          setFieldsValue({
            id: data.record.id,
            ...record,
          });
        }
      });
      async function getKnow(kid) {
        await courseClient.getLists(kid).then((res) => {
          state.knowList = res.data;
        });
      }
      /* 提交 */
      async function handleSubmit() {
        try {
          await validate();

          let data: any = getFieldsValue();
          data.videoType = state.type == '1' ? 'liveCourses' : 'videoCourses';
          data.lengthTime = 200;
          data.points = data.points.join(',');
          if (state.isUpdate) {
            data.id = state.id;
            await courseClient.updateData(data);
          } else {
            data.parentId = state.CourseId;
            await courseClient.addNew(data);
          }
          /*   tenantId: userInfo.tenantId,*/
          setModalProps({ confirmLoading: true });
          // TODO custom api
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      /* =========上传图片============== */
      function handleChange(file, field) {
        if (file.file.status == 'done') {
          let data = getFieldsValue();
          setFieldsValue({
            ...data,
            [field]: file.file.response.path,
          });
        }
        validateFields([field]);
      }
      function beforeUpload() {}
      function timeChange(time, timeString) {
        
      }
      return {
        ...toRefs(state),
        register,
        registerForm,
        handleSubmit,
        handleChange,
        beforeUpload,
        timeChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep(.ant-input-number) {
    width: 50% !important;
  }
</style>
