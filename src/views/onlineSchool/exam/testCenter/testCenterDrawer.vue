<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-07-01 11:47:36
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-07-01 15:56:27
 * @FilePath: \edub_tob_jxyZ\src\views\onlineSchool\exam\testCenter\testCenterDrawer.vue
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
      <template #difficultyLevel="{ model, field }">
        <a-rate v-model:value="model[field]" />
      </template>
      <template #vedio="{ model, field }">
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
      <template #orderNum="{ model, field }">
        <a-input-number id="inputNumber" v-model:value="model[field]" :min="0" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Upload } from 'ant-design-vue';
  import { testCenter } from '/@/utils/onlineSchool/testCenter/testCenter';
  let testCentera = new testCenter();

  export default defineComponent({
    name: 'NoteDrawer',
    components: { BasicDrawer, BasicForm, Upload },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref();
      const datas = ref();
      const [
        registerForm,
        { resetFields, setFieldsValue, getFieldsValue, validateFields, validate },
      ] = useForm({
        labelWidth: 150,
        schemas: [
          {
            field: 'kindId',
            label: '所属项目',
            required: true,
            component: 'Select',
            defaultValue: 1,
            componentProps: {
              options: '',
            },
          },
          {
            field: 'stage',
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
            field: 'courseId',
            label: '所属章节',
            required: true,
            component: 'Select',
            defaultValue: 1,
            componentProps: {
              options: '',
            },
          },
          {
            field: 'describePlace',
            label: '考点描述和教材位置',
            required: true,
            component: 'Input',
          },
          {
            field: 'difficultyLevel',
            label: '难度等级',
            required: true,
            component: 'Input',
            slot: 'difficultyLevel',
          },
          {
            field: 'vedio',
            label: '视频讲解',
            slot: 'vedio',
            component: 'Input',
          },
          {
            field: 'mImg',
            label: '视频封面',
            slot: 'mImg',
            component: 'Input',
          },
          {
            field: 'orderNum',
            label: '排序',
            slot: 'orderNum',
            component: 'Input',
          },
          {
            field: 'showStatus',
            label: '是否显示',
            component: 'RadioGroup',
            componentProps: {
              options: [
                { label: '是', value: 0 },
                { label: '否', value: 1 },
              ],
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
            await testCentera.addExamPlace(values);
          } else {
            // 修改入驻商模板
            values.roomId = unref(datas).roomId;
            await testCentera.updateExamPlace(values);
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
      return {
        registerMenu,
        registerForm,
        handleSubmit,
        getTitle,
        handleChange,
      };
    },
  });
</script>
