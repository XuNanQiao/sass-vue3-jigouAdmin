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
  import { Note } from '/@/utils/note/note';
  import chooseOrganization from '/@/views/publicComponent/chooseOrganization.vue';
  import { useModal } from '/@/components/Modal';
  let note = new Note();

  const columns = [
    {
      title: '入驻商名称',
      dataIndex: 'name',
    },
    {
      title: '入驻商 电话',
      dataIndex: 'mobile',
    },
    {
      title: '入驻时间',
      dataIndex: 'addTime',
    },
  ];
  const data: any[] = [];
  export default defineComponent({
    name: 'NoteDrawer',
    components: { BasicDrawer, BasicForm, chooseOrganization },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref();
      // 组件回传数据
      const jgids = ref([]);
      // 向组件传值
      const ids = ref();

      const isjg = (isjg: number) => isjg == 0;
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: [
          {
            field: 'noteNumber',
            label: '设置条数',
            component: 'Input',
            required: true,
            colProps: { lg: 20, md: 24 },
          },
          {
            field: 'notePrice',
            label: '设置价格',
            component: 'Input',
            required: true,
            colProps: { lg: 20, md: 24 },
          },
          {
            field: 'isShow',
            label: '是否显示',
            component: 'RadioGroup',
            defaultValue: '1',
            componentProps: {
              options: [
                { label: '是', value: 0 },
                { label: '否', value: 1 },
              ],
            },
          },
          {
            field: 'isjg',
            label: '是否指定机构',
            component: 'RadioGroup',
            defaultValue: '1',
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
            ifShow: ({ values }) => isjg(values.isjg),
            label: ' ',
            slot: 'f3',
            colProps: {
              span: 8,
            },
          },
          {
            field: 'field1',
            component: 'Input',
            ifShow: ({ values }) => isjg(values.isjg),
            label: ' ',
            slot: 'f1',
            colProps: {
              span: 24,
            },
          },
        ] /* formSchema */,
        showActionButtonGroup: false,
      });
      /* 打开弹窗事件 */
      const [registerMenu, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        data = JSON.parse(JSON.stringify(data));
        ids.value = data.item;
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (!unref(isUpdate)) {
        } else {
          if (data.item.tenantId) {
            jgids.value = data.item.tenantId.split(',').map(Number);
            data.item.tenantId = data.item.tenantId.split(',');
            data.item.isjg = 0;
          } else {
            data.item.isjg = 1;
          }
          setFieldsValue({
            ...data.item,
          });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (values.isjg == 0) {
            values.tenantId = unref(jgids).join(',');
          }
          if (!unref(isUpdate)) {
            // 添加短信包
            await note.addNotePackage(values);
          } else {
            // 编辑短信包
            values.id = unref(ids).id;
            await note.updateNotePackage(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
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
        registerForm,
        register,
        handleSubmit,
        getTitle,
        data,
        isjigous,
        handleSuccess,
        jgids,
        columns,
      };
    },
  });
</script>
