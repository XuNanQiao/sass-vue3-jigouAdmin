<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerMenu"
    showFooter
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" @submit="handleSubmit" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Note } from '/@/utils/note/note';
  import { formSchema } from './tableData';
  let note = new Note();

  export default defineComponent({
    name: 'SignDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref();
      const datas = ref();
      const Jgdata = ref();
      const Modeldata = ref();
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: [
          {
            field: 'tenantId',
            label: '入驻商',
            component: 'Select',
            componentProps: {
              placeholder: '选择入驻商',
              fieldNames: {
                label: 'name',
                value: 'eId',
              },
              options: Jgdata,
            },
            required: true,
            colProps: { lg: 20, md: 24 },
          },
          {
            field: 'templateId',
            label: '模板',
            component: 'Select',
            componentProps: {
              fieldNames: {
                label: 'templateName',
                value: 'id',
              },
              options: Modeldata,
              placeholder: '选择模板',
            },
            required: true,
            colProps: { lg: 20, md: 24 },
          },
          {
            field: 'signatureCode',
            label: '签名',
            component: 'Input',
            required: true,
            colProps: { lg: 20, md: 24 },
          },
          {
            field: 'signatureName',
            label: '签名名称',
            component: 'Input',
            required: true,
            colProps: { lg: 20, md: 24 },
          },
        ],
        /* formSchema */
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        await note.getListAll({}).then((res) => {
          Jgdata.value = res.msg;
        });
        await note.getEntrantsNoteTemplateList({}).then((res) => {
          Modeldata.value = res.rows;
        });
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
            // 入驻商签名
            await note.addEntrantsNoteSignature(values);
          } else {
            // 修改入驻商签名
            values.id = unref(datas).id;
            await note.updateEntrantsNoteSignature(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerMenu,
        registerForm,
        handleSubmit,
        getTitle,
      };
    },
  });
</script>
