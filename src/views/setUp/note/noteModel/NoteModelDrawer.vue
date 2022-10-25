<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-28 17:58:53
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-06-29 15:40:23
 * @FilePath: \edub_tob_jxyZ\src\views\setUp\note\noteModel\NoteModelDrawer.vue
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
      <template #Content="{ model, field }">
        <Tinymce v-model="model[field]" width="100%" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Note } from '/@/utils/note/note';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { formSchema } from './tableData';
  let note = new Note();

  export default defineComponent({
    name: 'NoteDrawer',
    components: { BasicDrawer, BasicForm, Tinymce },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref();
      const datas = ref();
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
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
            await note.addEntrantsNoteTemplate(values);
          } else {
            // 修改入驻商模板
            values.id = unref(datas).id;
            await note.updateEntrantsNoteTemplate(values);
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
