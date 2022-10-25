<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-07 10:13:59
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\courseData\addData.vue
 * 
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    title="添加/编辑"
    width="700px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #filePath="{ model, field }">
        <Upload
          name="upload"
          class="avatar-uploader"
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
      <template #isUpdateFilePath="{ model, field }">
        <a-textarea v-model:value="model.filePath" />
        <Upload
          name="upload"
          :max-count="1"
          class="avatar-uploader"
          :action="$comFun.uploadFile()"
          :before-upload="beforeUpload"
          @change="
            (file) => {
              handleChange(file, field);
            }
          "
        >
          <a-button class="mt-8"> 上传文件 </a-button>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, toRefs, unref, reactive } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { Upload } from 'ant-design-vue';
  import type { UploadProps } from 'ant-design-vue';
  import { log } from 'util';
  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicModal,
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
        typeId: 0,
        type: 1,
        docType: 0,
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
            field: 'filePath',
            label: '上传文件',
            required: true,
            slot: 'filePath',
            component: 'Input',
            ifShow: () => {
              return !state.isUpdate;
            },
          },
          {
            field: 'fileName',
            label: '文件名称',
            required: true,
            component: 'Input',
            ifShow: () => {
              return state.isUpdate;
            },
          },
          {
            field: 'filePath',
            label: '上传文件',
            required: true,
            slot: 'isUpdateFilePath',
            component: 'Input',
            ifShow: () => {
              return state.isUpdate;
            },
          },
        ],
        /* formSchema */
        showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        await setModalProps({ confirmLoading: false });
        state.isUpdate = !!data?.isUpdate;
        state.typeId = data?.typeId;
        state.docType = data?.docType;
        state.type = data?.type;
        if (state.isUpdate) {
          state.id = data?.id;
          state.record = data?.record;
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
            data.sectionId = state.typeId;
            data.docType = state.docType;
            data.courseType = state.type;
            await courseClient.curCourseDocsUpdate(data);
          } else {
            let params = {
              sectionId: state.typeId,
              docType: state.docType,
              courseType: state.type,
            };
            await courseClient.curCourseDocsAdd(params, state.fileList);
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
      async function handleChange(file, field) {
        if (file.file.status == 'done') {
          state.fileList = file.fileList.map((item) => {
            return {
              name: item.name,
              url: item.response,
            };
          });
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
