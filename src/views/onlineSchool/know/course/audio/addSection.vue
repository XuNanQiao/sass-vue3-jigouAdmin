<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-05 16:27:58
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\audio\addSection.vue
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
    <BasicForm @register="registerForm">
      <template #audioFile="{ model, field }">
        <Upload
          v-model:file-list="fileList"
          name="upload"
          class="avatar-uploader"
          :max-count="1"
          :action="$comFun.uploadFile()"
          :before-upload="beforeUpload"
          @change="
            (file) => {
              handleChange(file, field);
            }
          "
        >
          <a-button> 上传文件 </a-button>
        </Upload>
      </template>
      <template #isAudition="{ model, field }">
        <a-radio-group v-model:value="model.isAudition" name="radioGroup">
          <a-radio :value="-1">试听本节</a-radio>
          <a-radio :value="1">
            <div class="flex">
              <div class="shrink">仅试听</div>
              <!--   <a-input-number
                id="inputNumber"
                v-model:value="model.auditionTime"
                :min="0"
                :step="1"
              /> -->
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
  import { Upload } from 'ant-design-vue';
  import type { UploadProps } from 'ant-design-vue';
  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      Upload,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const state = reactive({
        minute: 0,
        record: null,
        isUpdate: false,
        id: null,
        GroupId: null,
        CourseId: null,
        type: null,
        fileList: null as any,
      });
      /* 表格初始化 */
      const [
        registerForm,
        { validateFields, resetFields, setFieldsValue, getFieldsValue, validate },
      ] = useForm({
        labelWidth: '8em',
        schemas: [
          {
            field: 'name',
            label: '章名称',
            required: true,
            component: 'Input',
          },
          {
            field: 'audioFile',
            label: '上传文件',
            required: true,
            slot: 'audioFile',
            component: 'Input',
          },
          {
            field: 'attendDuration',
            label: '上课时长',
            component: 'InputNumber',
            defaultValue: 1,
            componentProps: {
              addonAfter: '分',
            },
            colProps: {
              span: 20,
            },
          },
          {
            field: 'isAudition',
            label: '课程试听',
            component: 'InputNumber',
            slot: 'isAudition',
            defaultValue: -1,
            colProps: {
              span: 8,
            },
          },
          {
            field: 'auditionTime',
            label: '',
            component: 'InputNumber',
            defaultValue: 1,
            componentProps: {
              addonAfter: '分钟',
              min: 0,
              step: 1,
            },
            colProps: {
              span: 16,
            },
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
              span: 8,
            },
          },
        ],
        /* formSchema */
        showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        await setDrawerProps({ confirmLoading: false });
        state.isUpdate = !!data?.isUpdate;
        state.GroupId = data?.groupId;
        state.CourseId = data?.CourseId;
        if (state.isUpdate) {
          state.id = data?.id;
          state.record = data?.record;
          state.fileList = [
            {
              uid: '1',
              name: data?.record.audioFile,
              status: 'done',
              // response: 'Server Error 500', //要显示的自定义错误消息
              url: data?.record.audioFile,
            },
          ];
          await setFieldsValue({
            ...data.record,
          });
        }
      });

      /* 提交 */
      async function handleSubmit() {
        try {
          let data = await validate();
          if (state.isUpdate) {
            data.id = state.id;

            await courseClient.updateAudioLesson(data);
          } else {
            data.faceId = state.CourseId;
            data.chapterId = state.GroupId;
            await courseClient.addAudioLesson(data);
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
      /* =========上传图片============== */
      async function handleChange(file, field) {
        

        if (file.file.status == 'done') {
          let data = await getFieldsValue();
          await setFieldsValue({
            ...data,
            [field]: file.file.response,
          });
          validateFields([field]);
        }
      }
      function beforeUpload() {}
      return {
        ...toRefs(state),
        registerMenu,
        registerForm,
        handleSubmit,
        handleChange,
        beforeUpload,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep(.ant-input-number) {
    width: 100% !important;
  }
</style>
