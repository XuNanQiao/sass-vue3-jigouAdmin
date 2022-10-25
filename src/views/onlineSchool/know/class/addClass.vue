<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-12 11:31:31
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\class\addClass.vue
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
      <template #bigImg="{ model, field }">
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
              <img v-if="model.bigImg" :src="model.bigImg" alt="avatar" />
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
      <template #thumbnail="{ model, field }">
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
              <img v-if="model.thumbnail" :src="model.thumbnail" alt="avatar" />
              <div v-else>
                <PlusOutlined />
                <div class="ant-upload-text">上传图片</div>
              </div>
            </div>
            <div class="uploadBut">
              <a-button type="primary">点击上传</a-button>
              <div class="uploadTips">（仅支持图片格式 建议尺寸375*812px，且不超过3M）</div>
            </div>
          </div>
        </Upload>
      </template>
      <template #mImg="{ model, field }">
        <!--   list-type="picture-card" -->
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
              <img v-if="model.mImg" :src="model.mImg" alt="avatar" />
              <div v-else>
                <PlusOutlined />
                <div class="ant-upload-text">上传图片</div>
              </div>
            </div>
            <div class="uploadBut">
              <a-button type="primary">点击上传</a-button>
              <div class="uploadTips">（仅支持图片格式 建议尺寸 176*208px，且不超过3M）</div>
            </div>
          </div>
        </Upload>
      </template>
      <template #docImg="{ model, field }">
        <!--   list-type="picture-card" -->
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
              <img v-if="model[field]" :src="model[field]" alt="avatar" />
              <div v-else>
                <PlusOutlined />
                <div class="ant-upload-text">上传图片</div>
              </div>
            </div>
            <div class="uploadBut">
              <a-button type="primary">点击上传</a-button>
              <div class="uploadTips">（仅支持图片格式 建议尺寸 560*315px，且不超过3M）</div>
            </div>
          </div>
        </Upload>
      </template>
      <template #content="{ model, field }">
        <Tinymce v-model="model.content" width="100%" />
      </template>
      <template #orgIds="{ model, field }">
        <a-button @click="isjigous()">
          {{ model[field] ? `已选择${model[field].length}个机构` : '选择机构' }}
        </a-button>
      </template>
    </BasicForm>
    <chooseOrganization width="50%" @register="register" @success="handleSuccess" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import dataList from '/@/utils/dataList';
  import { useModal } from '/@/components/Modal';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import {
    getAllCollage,
    selectKindAll,
    selectTypeByCollageId,
    selectFieldExtendDetail,
    selectPKcExtendDetail,
    selectZhuanyeByKind,
    ZhuanyeSelectAll,
    getKindZidList,
    selectByType,
  } from '/@/utils/onlineSchool/know/basics';

  import { PlusOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import chooseOrganization from '/@/views/publicComponent/chooseOrganization.vue';
  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      Upload,
      PlusOutlined,
      chooseOrganization,
      Tinymce,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const record = ref<roleValueList>(); //初始数据
      const productLine = ref(1); //产品线
      const kindZyName = ref('所属专业');
      const stageName = ref('层次');
      const kindKcName = ref('课程名称');
      const schoolelist = ref();
      const kindlist = ref();
      const zylist = ref();
      const stageList = ref();
      const kclist = ref();
      const provinceList = ref();
      /* 表格初始化 */
      const [
        registerForm,
        { validateFields, resetFields, setFieldsValue, getFieldsValue, validate, updateSchema },
      ] = useForm({
        labelWidth: '8em',
        schemas: [
          {
            field: 'productLine',
            label: '套餐产品线',
            required: true,
            component: 'RadioGroup',
            ifShow: () => {
              return unref(productLine) != 3;
            },
            defaultValue: unref(productLine),
            componentProps: {
              options: dataList.productLine,
            },
          },
          {
            field: 'tiitle',
            label: '知识套餐名称',
            required: true,
            component: 'Input',
            colProps: {
              span: 13,
            },
          },
          {
            field: 'schoolId',
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
                  kind: null,
                  zStage: null,
                  zyId: null,
                  kcId: null,
                });
                kindlist.value = [];
                stageList.value = [];
                zylist.value = [];
                kclist.value = [];
                getKind(e);
              },
            },
          },
          {
            field: 'kind',
            component: 'Select',
            label: '所属项目:',
            colProps: {
              span: 12,
            },
            componentProps: {
              showSearch: true,
              options: kindlist,
              onChange: async (e: any, options: any) => {
                setFieldsValue({
                  zStage: null,
                  zyId: null,
                  kcId: null,
                });
                stageList.value = [];
                zylist.value = [];
                kclist.value = [];
                if (e) {
                  stageList.value = options.pStage ? JSON.parse(options.pStage) : [];
                  await selectFieldExtendDetail(e).then((res: any) => {
                    if (res.code == 200) {
                      kindZyName.value = res.data[0].zName ? res.data[0].zName : '所属专业';
                      stageName.value = res.data[0].zStage ? res.data[0].zStage : '层次';
                    }
                  });
                  await selectPKcExtendDetail(e).then((res: any) => {
                    if (res.code == 200) {
                      kindKcName.value = res.data.kcName ? res.data.kcName : '课程名称';
                    }
                  });
                } else {
                  kindKcName.value = '课程名称';
                  kindZyName.value = '所属专业';
                  stageName.value = '层次';
                }
                getZy(e);
                getKc();
                updateSchema({ field: 'zyId', label: unref(kindZyName) });
                updateSchema({ field: 'zStage', label: unref(stageName) });
                updateSchema({ field: 'kcId', label: unref(kindKcName) });
              },
            },
          },
          {
            field: 'zStage',
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
                  zyId: null,
                  kcId: null,
                });
                zylist.value = [];
                kclist.value = [];
                let data = getFieldsValue();
                await getZy(data?.kind);
                zylist.value = unref(zylist).filter((item: any) => {
                  return item.zStage == e;
                });
              },
            },
          },
          {
            field: 'zyId',
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
              onChange: (e: any) => {
                setFieldsValue({
                  kcId: null,
                });
                kclist.value = [];
                getKc(e);
              },
            },
          },
          {
            field: 'kcId',
            component: 'Select',
            label: unref(kindKcName),
            colProps: {
              span: 12,
            },
            componentProps: {
              showSearch: true,
              options: kclist,
              fieldNames: {
                label: 'kcName',
                value: 'id',
              },
              onChange: (e: any) => {},
            },
          },
          {
            field: 'province',
            component: 'Select',
            label: '省份',
            colProps: {
              span: 12,
            },
            ifShow: ({ values }) => {
              console.log(values, '=========values==formData');

              return values.kind == 1 || values.kind == 10 || values.kind == 9;
            },

            componentProps: {
              showSearch: true,
              options: provinceList,
              fieldNames: {
                label: 'lname',
                value: 'lanmuID',
              },
              onChange: (e: any) => {},
            },
          },
          {
            field: 'trialVideoConfig',
            label: '试听链接',

            component: 'Input',
            colProps: {
              span: 13,
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
            field: 'olderPrice',
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
            field: 'learningPhase',
            label: '套餐学习阶段',
            component: 'InputNumber',
            required: true,
            ifShow: () => {
              return unref(productLine) == 3;
            },
            componentProps: {
              addonAfter: '阶段',
              addonBefore: '共',
              step: 1,
              precision: 0,
            },
            colProps: {
              span: 12,
            },
          },

          {
            field: 'features',
            label: '课程服务',
            required: true,
            component: 'CheckboxGroup',
            componentProps: {
              options: dataList.featuresOptions,
            },
          },
          {
            field: 'bigImg',
            label: '套餐主图',
            slot: 'bigImg',
            required: true,
            component: 'Upload',
          },
          {
            field: 'thumbnail',
            label: '首页缩略图',
            slot: 'thumbnail',
            required: true,
            component: 'Upload',
          },
          {
            field: 'mImg',
            label: '移动端缩略图',
            slot: 'mImg',
            required: true,
            component: 'Upload',
          },

          {
            field: 'content',
            label: '知识套餐概述',
            required: true,
            slot: 'content',
            component: 'RadioButtonGroup',
          },
          /*  专属资料*/
          {
            field: 'exclusiveDocImg',
            label: '专属资料图片',
            slot: 'docImg',
            required: true,
            component: 'Upload',
            ifShow: () => {
              return unref(productLine) == 3;
            },
          },
          {
            field: 'exclusiveDoc',
            label: '专属资料文本',
            required: true,
            component: 'InputTextArea',
            ifShow: () => {
              return unref(productLine) == 3;
            },
            colProps: {
              span: 22,
            },
          },
          /*  专属题库*/
          {
            field: 'exclusiveQuesImg',
            label: '专属题库图片',
            slot: 'docImg',
            required: true,
            component: 'Upload',
            ifShow: () => {
              return unref(productLine) == 3;
            },
          },
          {
            field: 'exclusiveQues',
            label: '专属题库文本',
            required: true,
            component: 'InputTextArea',
            ifShow: () => {
              return unref(productLine) == 3;
            },
            colProps: {
              span: 22,
            },
          },
          /*  专属教材*/
          {
            field: 'exclusiveTextImg',
            label: '专属教材图片',
            slot: 'docImg',
            required: true,
            component: 'Upload',
            ifShow: () => {
              return unref(productLine) == 3;
            },
          },
          {
            field: 'exclusiveText',
            label: '专属教材文本',
            required: true,
            component: 'InputTextArea',
            ifShow: () => {
              return unref(productLine) == 3;
            },
            colProps: {
              span: 22,
            },
          },
          /*  专属考场*/
          {
            field: 'exclusiveRoomImg',
            label: '专属考场图片',
            slot: 'docImg',
            required: true,
            component: 'Upload',
            ifShow: () => {
              return unref(productLine) == 3;
            },
          },
          {
            field: 'exclusiveRoom',
            label: '专属考场文本',
            required: true,
            component: 'InputTextArea',
            ifShow: () => {
              return unref(productLine) == 3;
            },
            colProps: {
              span: 22,
            },
          },
          /*  专属教服*/
          {
            field: 'exclusiveServerImg',
            label: '专属教服图片',
            slot: 'docImg',
            required: true,
            component: 'Upload',
            ifShow: () => {
              return unref(productLine) == 3;
            },
          },
          {
            field: 'exclusiveServer',
            label: '专属教服文本',
            required: true,
            component: 'InputTextArea',
            ifShow: () => {
              return unref(productLine) == 3;
            },
            colProps: {
              span: 22,
            },
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
      getprovince();
      getSchoole();
      getKind();
      getZy();
      getKc();

      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        productLine.value = data?.productLine;
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          data.record.features = data.record.features ? data.record.features.split(',') : [];
          record.value = data.record;
          setFieldsValue({
            ...data.record,
          });
        } else {
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
          if (unref(isUpdate)) {
            data.id = unref(record)?.id;
            courseClient.editClass(data);
          } else {
            data.isPush = 0;
            courseClient.addClass(data);
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
      async function getZy(kind?: number) {
        let list: any = [];
        if (kind) {
          await selectZhuanyeByKind(kind).then((res) => {
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
      /* 获取课程*/
      async function getKc(zyId?: number) {
        let data = getFieldsValue();
        await getKindZidList({ kind: data?.kind, zyId: zyId }).then((res) => {
          kclist.value = res.data;
        });
      }
      /* 获取省份*/
      async function getprovince() {
        await selectByType(5).then((res) => {
          provinceList.value = res.msg;
        });
      }
      return {
        registerMenu,
        registerForm,
        handleSubmit,
        /* 选择机构 */
        register,
        isjigous,
        handleSuccess,
        /* 上传 */
        handleChange,
      };
    },
  });
</script>
