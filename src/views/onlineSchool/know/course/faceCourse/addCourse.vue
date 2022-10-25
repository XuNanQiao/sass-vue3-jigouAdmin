<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-05 17:03:54
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\faceCourse\addCourse.vue
 * 
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    title="添加/编辑"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #pcimg="{ model, field }">
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
          <img v-if="model.pcimg" :src="model.pcimg" alt="avatar" />
          <div v-else>
            <!-- <LoadingOutlined v-if="loading" /> -->
            <PlusOutlined />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </Upload>
      </template>
      <template #mimg="{ model, field }">
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
          <img v-if="model.mimg" :src="model.mimg" alt="avatar" />
          <div v-else>
            <PlusOutlined />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </Upload>
      </template>

      <template #coordinate="{ model, field }">
        <div class="flex">
          <a-input v-model:value="model.coordinate" placeholder="Basic usage" />
          <a-button class="shrink ml-8" type="primary" @click="openData">打开地图</a-button>
        </div>
      </template>
      <template #courseId="{ model, field }">
        <!-- <a-button @click="openKecheng">选择课程名</a-button> -->
        <a-button @click="openKecheng">{{ model[field] ? kcData?.kcName : '选择课程名' }}</a-button>
      </template>

      <template #Content="{ model, field }">
        <Tinymce v-model="model.Content" width="100%" />
      </template>
      <template #orgIds="{ model, field }">
        <a-button @click="isjigous()">
          {{ model[field] ? `已选择${model[field].length}个机构` : '选择机构' }}
        </a-button>
      </template>
    </BasicForm>
    <chooseOrganization width="50%" @register="register" @success="handleSuccess" />
    <chooseKecheng width="50%" @register="registerKecheng" @success="keChengSuccess" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import dataList from '/@/utils/dataList';
  import { useModal } from '/@/components/Modal';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { Menu } from '/@/utils/setUp/menu';
  let menu = new Menu();
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import chooseOrganization from '/@/views/publicComponent/chooseOrganization.vue';
  import chooseKecheng from '/@/views/publicComponent/chooseKecheng.vue';
  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      Upload,
      PlusOutlined,
      chooseOrganization,
      chooseKecheng,
      Tinymce,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      /*    7 音频 8图文  10 面授     */

      const isUpdate = ref(true);
      const record = ref<roleValueList>(); //初始数据
      const teacherList = ref(); //授课老师列表
      const kcData = ref(); //辅导课程名称
      /* 表格初始化 */
      const [
        registerForm,
        { validateFields, resetFields, setFieldsValue, getFieldsValue, validate },
      ] = useForm({
        labelWidth: '8em',
        schemas: [
          {
            field: 'name',
            label: '面授课程名称',
            required: true,
            component: 'Input',
            colProps: {
              span: 13,
            },
          },
          {
            field: 'courseId',
            label: '课程名',
            slot: 'courseId',
            required: true,
            component: 'Input',
          },
          {
            field: 'lecturerId',
            label: '所属讲师',
            required: true,
            component: 'Select',
            colProps: {
              span: 13,
            },
            componentProps: {
              options: teacherList,
              showSearch: true,
              fieldNames: {
                label: 'userName',
                value: 'id',
              },
            },
          },
          {
            field: 'yearName',
            label: '所属年份',
            required: true,
            component: 'DatePicker',
            componentProps: {
              picker: 'year',
              format: 'YYYY',
              valueFormat: 'YYYY',
            },
            colProps: {
              span: 12,
            },
          },
          {
            field: 'semester',
            label: '所属期数',
            component: 'Select',
            componentProps: {
              showSearch: true,
              options: dataList.semester,
            },
            colProps: {
              span: 12,
            },
          },
          {
            field: 'price',
            label: '现价',
            required: true,
            component: 'InputNumber',
            componentProps: {
              addonAfter: '元',
            },
            colProps: {
              span: 12,
            },
          },
          {
            field: 'originalPrice',
            label: '原价',
            component: 'InputNumber',
            componentProps: {
              addonAfter: '元',
            },
            colProps: {
              span: 12,
            },
          },
          {
            field: 'pcimg',
            label: '缩略图标',
            slot: 'pcimg',
            component: 'Input',
          },
          {
            field: 'mimg',
            label: '移动端缩略图',
            slot: 'mimg',
            component: 'Input',
          },
          {
            field: 'attendPlace',
            label: '上课地点',
            required: true,
            component: 'Input',
            colProps: {
              span: 15,
            },
          },
          {
            field: 'coordinate',
            label: '地图坐标',
            slot: 'coordinate',
            required: true,
            component: 'Input',
            colProps: {
              span: 15,
            },
          },
          {
            field: 'validity',
            label: '课程有效期',
            required: true,
            component: 'InputNumber',
            componentProps: {
              addonAfter: '年',
            },
            colProps: {
              span: 12,
            },
          },

          {
            field: 'summary',
            label: '课程介绍',
            required: true,
            component: 'InputTextArea',
          },

          {
            field: 'isPush',
            label: '指定机构',
            component: 'RadioButtonGroup',
            defaultValue: 0,
            componentProps: {
              options: [
                { label: '全部机构', value: 0 },
                { label: '指定机构', value: 1 },
              ],
            },
          },
          {
            field: 'orgIds',
            label: '选择机构',
            required: true,
            component: 'Input',
            slot: 'orgIds',
            ifShow: (value: any) => {
              return value.values.isPush == 1;
            },
          },
        ] /* formSchema */,
        showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await getTeacher();
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          record.value = data.record;
          getkcDetail(data.record.courseId);
          data.record.lecturerId = String(data.record.lecturerId);
          setFieldsValue({
            ...data.record,
          });
        } else {
          record.value = undefined;
        }
      });
      //获取辅导课程详情
      async function getkcDetail(kid: number) {
        courseClient.selectKecheng(kid).then((res) => {
          kcData.value = res.data;
        });
      }
      /* 获取授课老师列表 */
      async function getTeacher() {
        await menu.selectTerList({ isOffice: 1, terType: 1 }).then((res) => {
          teacherList.value = res.msg;
        });
      }
      /* 提交 */
      async function handleSubmit() {
        try {
          let data = await validate();
          data.kindId = unref(kcData).kind;
          if (unref(isUpdate)) {
            data.id = unref(record)?.id;
            courseClient.updateFaceTeach(data);
          } else {
            courseClient.addFaceTeach(data);
          }
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      /* =========选择机构============== */
      /* 初始化弹窗 */
      const [register, { openModal }] = useModal();
      function isjigous() {
        openModal(true, {
          // record: ids,
        });
      }
      function handleSuccess(val: any) {
        let data = getFieldsValue();
        setFieldsValue({
          ...data,
          orgIds: val,
        });
      }
      /* =========选择课程============== */
      /* 初始化弹窗 */
      const [registerKecheng, { openModal: openKechengModal }] = useModal();
      function openKecheng() {
        openKechengModal(true, {
          // record: ids,
        });
      }
      function keChengSuccess(val: any, Data: any) {
        kcData.value = Data;

        let data = getFieldsValue();
        setFieldsValue({
          ...data,
          courseId: val,
        });
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
      /* =========打开地图============= */
      function openData() {
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html', '_blank');
      }
      return {
        registerMenu,
        registerForm,
        handleSubmit,
        /* 选择机构 */
        register,
        isjigous,
        handleSuccess,
        /* 选择课程 */
        registerKecheng,
        openKecheng,
        keChengSuccess,
        kcData,
        /* 上传 */
        handleChange,
        beforeUpload,
        openData,
      };
    },
  });
</script>
