<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-28 09:40:20
 * @LastEditors: 南桥几许
 * @LastEditTime: 2022-06-29 11:58:03
 * @FilePath: \organization\src\views\publicComponent\chooseOrganization.vue
-->
<template>
  <BasicModal v-bind="$attrs" @register="register" showFooter title="选择机构" @ok="handleSubmit">
    <a-table
      :data-source="data"
      :columns="columns"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :pagination="false"
    />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
  import { publicData } from '/@/utils/publicData';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  let publicDatas = new publicData();

  type Key = string | number;
  export default defineComponent({
    components: { BasicModal },
    setup(_, { emit }) {
      const data: any = ref([]);
      const state = reactive<{
        selectedRowKeys: Key[];
        loading: boolean;
      }>({
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      });
      const columns = [
        {
          title: '入驻商名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '入驻商电话',
          dataIndex: 'mobile',
        },
        {
          title: '入驻时间',
          dataIndex: 'addTime',
        },
      ];
      // 页面加载时
      onMounted(async () => {
        state.loading = true;
        getListAll();
        state.loading = false;
      });
      async function getListAll() {
        await publicDatas.getListAll({}).then((res) => {
          for (let item of res.msg) {
            item.key = item.eId;
          }
          data.value = res.msg;
        });
      }
      const onSelectChange = (selectedRowKeys: Key[]) => {
        
        state.selectedRowKeys = selectedRowKeys;
      };
      /* 打开弹窗事件 */
      const [register, { setModalProps, closeModal }] = useModalInner((data: any) => {
        state.selectedRowKeys = data.tenantId.map(Number);
        setModalProps({ confirmLoading: false });
      });
      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success', state.selectedRowKeys);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return {
        columns,
        ...toRefs(state),
        onSelectChange,
        data,
        onMounted,
        getListAll,
        handleSubmit,
        register,
      };
    },
  });
</script>
