<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-28 09:40:20
 * @LastEditors: 南桥几许
 * @LastEditTime: 2022-07-07 11:40:29
 * @FilePath: \organization\src\views\publicComponent\chooseKecheng.vue
-->
<template>
  <BasicModal v-bind="$attrs" @register="register" showFooter title="选择机构" @ok="handleSubmit">
    <KindSearch :search="kindSearch" :kindSchemas="kindSchemas" @submit="submit" />
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  import KindSearch from '/@/components/view/kindSearch.vue';
  let courseClient = new CourseClient();
  export default defineComponent({
    components: { BasicModal, BasicTable, KindSearch },
    setup(_, { emit }) {
      const data: any = ref([]);
      const kindVal: any = ref();
      const kindSearch: any = {
        shooleShow: true,
        kindShow: true,
        zyShow: false,
        classShow: false,
      };
      const kindSchemas: any = [
        {
          field: 'name',
          component: 'Input',
          label: '搜索:',
          colProps: {
            span: 6,
          },
          componentProps: {
            
            onChange: (e: any) => {},
          },
        },
      ];
      const kcId: any = ref();
      const kcData: any = ref();
      /* 打开弹窗事件 */
      const [register, { setModalProps, closeModal }] = useModalInner((data: any) => {
        setModalProps({ confirmLoading: false });
      });

      /* 初始化表格 */
      const [registerTable, { reload }] =  useTable({
        
        title: '',
        api: courseClient.getKengchengList,
        beforeFetch: (t: any) => {
          if (unref(kindVal)) {
            t.kind = unref(kindVal).name;
            t.kcName = unref(kindVal).kind;
          }
        },
        fetchSetting: {
          // 传递到后台的当前页面的字段名
          //  pageField: 'pageNum',
          //后台显示的每页的数字字段名称
          // sizeField: 'pageSize',
          //接口返回的表单数据的字段名
          listField: 'data',
          // 接口字段名返回的表总数
          // totalField: 'total',
        },
        /**列配置
         * slots：自定义的插槽 */
        columns: [
          { title: '课程名称', dataIndex: 'kcName', key: 'name' },
          { title: '所属项目', dataIndex: 'kindName' },
          { title: '层次', dataIndex: 'kcStage' },
        ],
        /* 分页信息配置，为 false 不显示分页	 */
        pagination: false,
        /* 使用搜索表单	 */
        useSearchForm: false,
        /* 显示表格设置工具	 */
        showTableSetting: false,
        //bordered: true,
        showIndexColumn: false,
        rowKey: 'id',
        rowSelection: {
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            kcId.value = selectedRowKeys[0];
            kcData.value = selectedRows[0];
          },
        },
      });
      /* -----------搜索 --------------------- */
      function submit(value) {
        kindVal.value = value;
        reload();
      }
      /* 提交 */
      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success', unref(kcId), unref(kcData));
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return {
        data,
        kindSearch,
        kindSchemas,
        submit,
        register,
        handleSubmit,
        registerTable,
      };
    },
  });
</script>
