<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-12 12:00:58
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\teachingMaterial\addMaterial.vue
 * 
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    title="新增/编辑"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #faceImg="{ model, field }">
        <Upload
          name="upload"
          :show-upload-list="false"
          :action="$comFun.uploadUrl()"
          :before-upload="$comFun.imgurlBeforeUpload"
          @change="
            (file) => {
              handleChange(file, field);
            }
          "
        >
          <div class="flex">
            <div class="uploadCard shrink">
              <img v-if="model.faceImg" :src="model.faceImg" alt="avatar" />
              <div v-else>
                <PlusOutlined />
                <div class="ant-upload-text">上传图片</div>
              </div>
            </div>
            <div class="uploadBut">
              <a-button type="primary">点击上传</a-button>
              <div class="uploadTips">（仅支持图片格式 建议尺寸1920*360px，且不超过3M）</div>
            </div>
          </div>
        </Upload>
      </template>
      <template #netFilePath="{ model, field }">
        <Upload
          v-model:file-list="fileList"
          name="upload"
          class="avatar-uploader"
          :max-count="1"
          :action="$comFun.uploadFile()"
          @change="
            (file) => {
              handleFile(file, field);
            }
          "
        >
          <a-button> 上传文件 </a-button>
        </Upload>
      </template>

      <template #textBookNote="{ model, field }">
        <Tinymce v-model="model.textBookNote" width="100%" />
      </template>
      <template #chapterText="{ model, field }">
        <Tinymce v-model="model.chapterText" width="100%" />
      </template>
      <!--  <template #chapterText="{ model, field }">
        <Tinymce v-model="model.chapterText" width="100%" />
      </template> -->
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Tinymce } from '/@/components/Tinymce/index';

  import { TeachingMaterialClient } from '/@/utils/onlineSchool/know/teachingMaterial';
  let teachingMaterialClient = new TeachingMaterialClient();
  import { Menu } from '/@/utils/setUp/menu';
  let menu = new Menu();
  import {
    getAllCollage,
    selectKindAll,
    selectTypeByCollageId,
    selectFieldExtendDetail,
    selectZhuanyeByKind,
    ZhuanyeSelectAll,
  } from '/@/utils/onlineSchool/know/basics';

  import { PlusOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      Upload,
      PlusOutlined,
      Tinymce,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const record = ref<roleValueList>(); //初始数据
      const productLine = ref(1); //产品线
      const kindZyName = ref('所属专业');
      const stageName = ref('层次');
      const schoolelist = ref();
      const kindlist = ref();
      const zylist = ref();
      const stageList = ref();
      const teacherList = ref();
      const fileList = ref();

      /* 表格初始化 */
      const [
        registerForm,
        { validateFields, resetFields, setFieldsValue, getFieldsValue, validate, updateSchema },
      ] = useForm({
        labelWidth: '8em',
        schemas: [
          {
            field: 'textbookName',
            label: '教材名称',
            required: true,
            component: 'Input',
            colProps: {
              span: 13,
            },
          },
          {
            field: 'bigKindId',
            component: 'Select',
            label: '所属大类:',
            colProps: {
              span: 12,
            },
            componentProps: {
              showSearch: true,
              placeholder: '请选择所属大类',
              options: schoolelist,
              onChange: (e: any) => {
                setFieldsValue({
                  kindId: null,
                  stageName: null,
                  zhuanyeId: null,
                });
                kindlist.value = [];
                stageList.value = [];
                zylist.value = [];
                getKind(e);
              },
            },
          },
          {
            field: 'kindId',
            component: 'Select',
            required: true,
            label: '所属项目',
            colProps: {
              span: 12,
            },
            componentProps: {
              showSearch: true,
              options: kindlist,
              onChange: async (e: any, options: any) => {
                setFieldsValue({
                  stageName: null,
                  zhuanyeId: null,
                });
                stageList.value = [];
                zylist.value = [];
                if (e) {
                  stageList.value = options.pStage ? JSON.parse(options.pStage) : [];
                  await selectFieldExtendDetail(e).then((res: any) => {
                    if (res.code == 200) {
                      kindZyName.value = res.data[0].zName ? res.data[0].zName : '所属专业';
                      stageName.value = res.data[0].stageName ? res.data[0].stageName : '层次';
                    }
                  });
                } else {
                  kindZyName.value = '所属专业';
                  stageName.value = '层次';
                }
                getZy(e);
                updateSchema({ field: 'zhuanyeId', label: unref(kindZyName) });
                updateSchema({ field: 'stageName', label: unref(stageName) });
              },
            },
          },
          {
            field: 'stageName',
            component: 'Select',
            label: unref(stageName),
            ifShow: () => {
              if (unref(stageList)) {
                return unref(stageList).length > 0;
              } else {
                return false;
              }
            },
            colProps: {
              span: 12,
            },
            componentProps: {
              showSearch: true,
              options: stageList,
              fieldNames: {
                label: 'name',
                value: 'name',
              },
              onChange: async (e: any, options: any) => {
                setFieldsValue({
                  zhuanyeId: null,
                });
                let data = getFieldsValue();
                await getZy(data?.kindId);
                zylist.value = unref(zylist).filter((item: any) => {
                  return item.zStage == e;
                });
              },
            },
          },
          {
            field: 'zhuanyeId',
            required: true,
            component: 'Select',
            label: unref(kindZyName),
            colProps: {
              span: 12,
            },

            componentProps: {
              showSearch: true,
              options: zylist,
              fieldNames: {
                label: 'zName',
                value: 'zId',
              },
              onChange: (e: any) => {},
            },
          },
          {
            field: 'teacherId',
            required: true,
            label: '研发老师',
            component: 'Select',
            componentProps: {
              options: teacherList,
              fieldNames: {
                label: 'userName',
                value: 'id',
              },
            },
            colProps: {
              span: 12,
            },
          },

          {
            field: 'bookVersion',
            label: '教材版本',
            required: true,
            component: 'DatePicker',
            componentProps: {
              picker: 'year',
              format: 'YYYY',
              valueFormat: 'YYYY',
            },
            colProps: {
              span: 13,
            },
          },
          {
            field: 'datetime',
            // field: '[researchStarttime, researchEndtime]',
            component: 'RangePicker',
            required: true,
            label: '研发日期',
            componentProps: {
              format: 'YYYY-MM-DD',
              valueFormat: 'YYYY-MM-DD',
            },
          },
          {
            field: 'faceImg',
            label: '教材封面',
            slot: 'faceImg',
            required: true,
            component: 'Upload',
          },
          {
            field: 'textBookNote',
            label: '教材简介',
            required: true,
            slot: 'textBookNote',
            component: 'RadioButtonGroup',
          },
          {
            field: 'chapterText',
            label: '编辑目录',
            required: true,
            slot: 'chapterText',
            component: 'Input',
          },
          {
            field: 'netFileUrl',
            required: true,
            label: '网盘地址',
            component: 'Input',
            colProps: {
              span: 13,
            },
          },
          {
            field: 'netFilePath',
            label: '上传教材',
            slot: 'netFilePath',
            required: true,
            component: 'Upload',
          },
          {
            field: 'totalChar',
            label: '总字数',
            component: 'InputNumber',
            componentProps: {
              addonAfter: '字',
              step: 1,
              precision: 0,
              min: 0,
            },
            colProps: {
              span: 13,
            },
          },
          {
            field: 'tryRead',
            label: '试看教材',
            required: true,
            component: 'InputNumber',
            componentProps: {
              addonAfter: '页',
              step: 1,
              precision: 0,
              min: 0,
            },
            colProps: {
              span: 13,
            },
          },
        ] /* formSchema */,
        showActionButtonGroup: false,
        // fieldMapToTime: [['datetime', ['researchStarttime', 'researchEndtime'], 'YYYY-MM-DD']],
      });
      getSchoole();
      getKind();
      getZy();
      getTeacher();
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        productLine.value = data?.productLine;
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          data.record.datetime = [data.record.researchStarttime, data.record.researchEndtime];
          data.record.teacherId = data.record.teacherId ? String(data.record.teacherId) : '';
          fileList.value = [
            {
              uid: '1',
              name: data?.record.netFilePath,
              status: 'done',
              // response: 'Server Error 500', //要显示的自定义错误消息
              url: data?.record.netFilePath,
            },
          ];

          record.value = data.record;
          setFieldsValue({
            ...data.record,
          });
        } else {
          fileList.value = [];
          record.value = undefined;
          setFieldsValue({
            kcType: data.type,
            productLine: data.productLine,
          });
        }
      });
      /* 提交 */
      async function handleSubmit() {
        try {
          let data = await validate();
          data.researchStarttime = data.datetime[0];
          data.researchEndtime = data.datetime[1];

          if (unref(isUpdate)) {
            data.id = unref(record)?.id;
            teachingMaterialClient.updateSelfResrarchTextBook(data);
          } else {
            teachingMaterialClient.addSelfResrarchTextBook(data);
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
      function handleChange(file, field) {
        if (file.file.status == 'done') {
          let data = getFieldsValue();
          setFieldsValue({
            ...data,
            [field]: file.file.response.path,
          });
          validateFields([field]);
        }
      }
      async function handleFile(file, field) {
        if (file.file.status == 'done') {
          let data = await getFieldsValue();
          await setFieldsValue({
            ...data,
            [field]: file.file.response,
          });
          validateFields([field]);
        }
      }
      /* ================================== */
      /* 获取大类 */
      async function getSchoole() {
        await getAllCollage().then((res) => {
          res.msg.forEach((item) => {
            item.label = item.pName;
            item.value = item.pKind;
          });
          schoolelist.value = res.msg;
          return res.msg;
        });

        return null;
      }
      /* 获取项目*/
      async function getKind(schoolId?: number) {
        let list: any = [];
        if (schoolId) {
          await selectTypeByCollageId(schoolId).then((res) => {
            list = res.msg;
          });
        } else {
          await selectKindAll().then((res) => {
            list = res.msg;
          });
        }
        list.forEach((item) => {
          item.label = item.pName;
          item.value = item.pKind;
        });
        kindlist.value = list;
      }
      /* 获取专业*/
      async function getZy(kindId?: number) {
        let list: any = [];
        if (kindId) {
          await selectZhuanyeByKind(kindId).then((res) => {
            list = res.msg;
          });
        } else {
          await ZhuanyeSelectAll().then((res) => {
            list = res.msg;
          });
        }
        list.forEach((item) => {
          item.label = item.pName;
          item.value = item.pKind;
        });
        zylist.value = list;
      }
      /* 获取授课老师列表 */
      async function getTeacher() {
        await menu.selectTerList({ isOffice: 1 }).then((res) => {
          teacherList.value = res.msg;
        });
      }
      return {
        registerMenu,
        registerForm,
        handleSubmit,
        /* 上传 */
        handleChange,
        handleFile,
        fileList,
      };
    },
  });
</script>
