<template>
  <div class="vben-basic-table-form-container" ref="wrapRef" :class="getWrapperClass">
    <BasicForm @register="register" @submit="handleSubmit" />
    <!--  <template #[replaceFormSlotKey(item)]="data" v-for="item in getFormSlotKeys">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>  
    </BasicForm> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, toRaw, inject, watchEffect, watch } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import {
    getAllCollage,
    selectKindAll,
    selectTypeByCollageId,
    selectFieldExtendDetail,
    selectPKcExtendDetail,
    selectZhuanyeByKind,
    ZhuanyeSelectAll,
    getKindZidList,
  } from '/@/utils/onlineSchool/know/basics';
  const props = {
    /**
     * Specified role is visible
     * When the permission mode is the role mode, the value value can pass the role value.
     * When the permission mode is background, the value value can pass the code permission value
     * @default ''
     */
    search: {
      type: Object,
      default: () => {
        return {
          shooleShow: true,
          kindShow: true,
          stageShow: false,
          zyShow: false,
          classShow: false,
          kcShow: false,
        };
      },
    },
    kindSchemas: {
      type: Array,
      default: () => {
        return [];
      },
    },
  };

  export default defineComponent({
    components: {
      BasicForm,
    },
    props,
    emits: ['submit'],

    setup(props, { emit }) {
      watch(
        () => props.kindSchemas,
        (newProps) => {
          console.log(newProps, '+============newProps'); //查看新值
        },
      );
      const { shooleShow, kindShow, zyShow, classShow, stageShow, kcShow } = unref(props.search);
      const kindSchemas = unref(props.kindSchemas) as FormSchema[];
      console.log(kindSchemas, '-------------kindSchemas');

      const kindZyName = ref('所属专业');
      const stageName = ref('层次');
      const kindKcName = ref('课程名称');

      const schoolelist = ref();
      const kindlist = ref();
      const zylist = ref();
      const stageList = ref();
      const classlist = ref();
      const kclist = ref();
      let schemas: FormSchema[] = [
        {
          field: 'schooleId',
          component: 'Select',
          label: '所属大类:',
          ifShow: shooleShow,
          colProps: {
            span: 6,
          },
          componentProps: {
            showSearch: true,
            placeholder: '请选择所属大类',
            options: schoolelist,
            onChange: (e: any) => {
              setFieldsValue({
                kind: null,
                stageId: null,
                zyId: null,
                classId: null,
                kcId: null,
              });
              kindlist.value = [];
              stageList.value = [];
              zylist.value = [];
              classlist.value = [];
              kclist.value = [];
              getKind(e);
            },
          },
        },
        {
          field: 'kind',
          component: 'Select',
          label: '所属项目:',
          ifShow: kindShow,
          colProps: {
            span: 6,
          },
          componentProps: {
            showSearch: true,
            options: kindlist,
            onChange: async (e: any, options: any) => {
              setFieldsValue({
                stageId: null,
                zyId: null,
                classId: null,
                kcId: null,
              });
              stageList.value = [];
              zylist.value = [];
              classlist.value = [];
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
                stageList.value = [];
                kindKcName.value = '课程名称';
                kindZyName.value = '所属专业';
                stageName.value = '层次';
              }
              getZy(e);
              getKc();
              updateSchema({ field: 'zyId', label: unref(kindZyName) + ':' });
              updateSchema({ field: 'stageId', label: unref(stageName) + ':' });
              updateSchema({ field: 'kcId', label: unref(kindKcName) + ':' });
            },
          },
        },
        {
          field: 'stageId',
          component: 'Select',
          label: unref(stageName) + ':',
          ifShow: () => {
            return stageShow && unref(stageList).length > 0;
          },
          colProps: {
            span: 6,
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
                classId: null,
                kcId: null,
              });
              zylist.value = [];
              classlist.value = [];
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
          label: unref(kindZyName) + ':',
          ifShow: zyShow,
          colProps: {
            span: 6,
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
          field: 'classId',
          component: 'Select',
          label: '知识套餐:',
          ifShow: classShow,
          colProps: {
            span: 6,
          },
          componentProps: {
            showSearch: true,
            options: classlist,
            onChange: (e: any) => {},
          },
        },
        {
          field: 'kcId',
          component: 'Select',
          label: unref(kindKcName) + ':',
          ifShow: kcShow,
          colProps: {
            span: 6,
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
      ];
      if (shooleShow) {
        getSchoole();
      }
      if (kindShow) {
        getKind();
      }
      if (zyShow) {
        getZy();
      }

      if (kindSchemas) {
        schemas = schemas.concat(kindSchemas);
      }
      /* 表单初始化 */
      /*        const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange } =
        useTableForm(getProps, slots, fetch, getLoading); */
      const [register, { setFieldsValue, resetFields, getFieldsValue, updateSchema }] = useForm({
        schemas,
        compact: true,
        labelWidth: '6em',
        showActionButtonGroup: true,
        submitButtonOptions: { loading: false },
        showAdvancedButton: true,
      });
      // resetFields();
      if (kcShow) {
        getKc();
      }
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
      async function getKind(schooleId?: number) {
        let list: any = [];
        if (schooleId) {
          await selectTypeByCollageId(schooleId).then((res) => {
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
      function handleSubmit() {
        let data = getFieldsValue();
        data.kindZyName = unref(kindZyName);
        data.stageName = unref(stageName);
        data.kindKcName = unref(kindKcName);
        emit('submit', data);
      }
      return {
        register,
        handleSubmit,
        // getFormProps: getFormProps as any,
      };
    },
  });
</script>
<style lang="less" scoped>
  @border-color: #cecece4d;

  @prefix-cls: ~'@{namespace}-basic-table';

  [data-theme='dark'] {
    .ant-table-tbody > tr:hover.ant-table-row-selected > td,
    .ant-table-tbody > tr.ant-table-row-selected td {
      background-color: #262626;
    }
  }

  .@{prefix-cls} {
    max-width: 100%;

    &-row__striped {
      td {
        background-color: @app-content-background;
      }
    }

    &-form-container {
      padding: 16px;

      .ant-form {
        padding: 12px 10px 6px;
        margin-bottom: 16px;
        background-color: @component-background;
        border-radius: 2px;
      }
    }

    .ant-tag {
      margin-right: 0;
    }

    .ant-table-wrapper {
      padding: 6px;
      background-color: @component-background;
      border-radius: 2px;

      .ant-table-title {
        min-height: 40px;
        padding: 0 0 8px !important;
      }

      .ant-table.ant-table-bordered .ant-table-title {
        border: none !important;
      }
    }

    .ant-table {
      width: 100%;
      overflow-x: hidden;

      &-title {
        display: flex;
        padding: 8px 6px;
        border-bottom: none;
        justify-content: space-between;
        align-items: center;
      }

      //.ant-table-tbody > tr.ant-table-row-selected td {
      //background-color: fade(@primary-color, 8%) !important;
      //}
    }

    .ant-pagination {
      margin: 10px 0 0;
    }

    .ant-table-footer {
      padding: 0;

      .ant-table-wrapper {
        padding: 0;
      }

      table {
        border: none !important;
      }

      .ant-table-body {
        overflow-x: hidden !important;
        //  overflow-y: scroll !important;
      }

      td {
        padding: 12px 8px;
      }
    }

    &--inset {
      .ant-table-wrapper {
        padding: 0;
      }
    }
  }
</style>
