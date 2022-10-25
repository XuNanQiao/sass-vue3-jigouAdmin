<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-07-01 11:47:36
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-07-07 09:44:43
 * @FilePath: \edub_tob_jxyZ\src\views\onlineSchool\exam\examManage\examManageDrawer.vue
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
    <BasicForm @register="registerForm" @submit="handleSubmit">
      <template #mImg="{ model, field }">
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
          <img v-if="model.Img" :src="model.Img" alt="avatar" />
          <div v-else>
            <!-- <LoadingOutlined v-if="loading" /> -->
            <PlusOutlined />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </Upload>
      </template>
      <template #jsnum="{ model, field }">
        <a-input-number id="inputNumber" v-model:value="model[field]" :min="0" />
      </template>
      <template #f3="{}">
        <a-button @click="isjigous()" type="primary"> 选择机构 </a-button>
      </template>
      <template #f1="{}">
        <a-alert :message="`已选择了${jgids.length}个机构`" type="info" />
      </template>
    </BasicForm>
    <chooseOrganization width="50%" @register="register" @success="handleSuccess" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Upload } from 'ant-design-vue';
  import chooseOrganization from '/@/views/publicComponent/chooseOrganization.vue';
  import { useModal } from '/@/components/Modal';
  import { examManage } from '/@/utils/onlineSchool/examManage/examManage';
  let examManagea = new examManage();

  export default defineComponent({
    name: 'NoteDrawer',
    components: { BasicDrawer, BasicForm, Upload, chooseOrganization },
    emits: ['success', 'register'],

    setup(_, { emit }) {
      const isUpdate = ref();
      const datas = ref();
      // 组件回传数据
      const jgids = ref([]);
      // 向组件传值
      const ids = ref();
      const isjg = (isPush: number) => isPush == 0;
      const [
        registerForm,
        { resetFields, setFieldsValue, getFieldsValue, validateFields, validate },
      ] = useForm({
        labelWidth: 150,
        schemas: [
          {
            field: 'name',
            label: '试卷名称',
            required: true,
            component: 'Input',
          },
          {
            field: 'typeId',
            label: '试卷类型',
            required: true,
            component: 'Select',
            componentProps: {
              options: '',
            },
          },
          {
            field: 'kindId',
            label: '项目分类',
            required: true,
            component: 'Select',
            defaultValue: 1,
            componentProps: {
              options: '',
            },
          },
          {
            field: 'majorId',
            label: '所属专业',
            required: true,
            component: 'Select',
            defaultValue: 1,
            componentProps: {
              options: '',
            },
          },
          {
            field: 'chapterId',
            label: '课程名称',
            required: true,
            component: 'Select',
            defaultValue: 1,
            componentProps: {
              options: '',
            },
          },
          {
            field: 'particularYear',
            label: '年份',
            required: true,
            component: 'Input',
          },
          {
            field: 'passScore',
            label: '及格分数',
            required: true,
            component: 'Input',
            slot: 'jsnum',
          },
          {
            field: 'examTime',
            label: '考试时间',
            required: true,
            component: 'Input',
            slot: 'jsnum',
          },
          {
            field: 'paperPrice',
            label: '试卷售价',
            required: true,
            component: 'Input',
            slot: 'jsnum',
          },
          {
            field: 'originalPrice',
            label: '试卷原价',
            component: 'Input',
            slot: 'jsnum',
          },
          {
            field: 'introduction',
            label: '试卷简介',
            component: 'Input',
          },

          {
            field: 'mImg',
            label: '缩略图',
            slot: 'mImg',
            component: 'Input',
          },

          {
            field: 'isPush',
            label: '指定机构',
            component: 'RadioGroup',
            defaultValue: 1,
            componentProps: {
              options: [
                { label: '是', value: 0 },
                { label: '否', value: 1 },
              ],
            },
          },
          {
            field: 'field3',
            component: 'Input',
            ifShow: ({ values }) => isjg(values.isPush),
            label: ' ',
            slot: 'f3',
            colProps: {
              span: 8,
            },
          },
          {
            field: 'field1',
            component: 'Input',
            ifShow: ({ values }) => isjg(values.isPush),
            label: ' ',
            slot: 'f1',
            colProps: {
              span: 24,
            },
          },
        ],
        /* formSchema */ showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        data = JSON.parse(JSON.stringify(data));
        datas.value = data.record;

        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (!unref(isUpdate)) {
        } else {
          setFieldsValue({
            ...data.record,
          });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (!unref(isUpdate)) {
            // 添加入驻商模板
            await examManagea.addQuestionPaper(values);
          } else {
            // 修改入驻商模板
            // values.roomId = unref(datas).roomId; (未改)
            await examManagea.updateQuestionPaper(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
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
      /* 初始化弹窗 */
      const [register, { openModal }] = useModal();
      function isjigous() {
        openModal(true, ids);
      }
      function handleSuccess(val: any) {
        jgids.value = val;
      }
      return {
        registerMenu,
        isjigous,
        register,
        registerForm,
        handleSubmit,
        getTitle,
        handleChange,
        handleSuccess,
        jgids,
      };
    },
  });
</script>
