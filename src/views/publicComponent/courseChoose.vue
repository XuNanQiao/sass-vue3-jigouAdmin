<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-28 09:40:20
 * @LastEditors: 南桥几许
 * @LastEditTime: 2022-07-12 18:45:36
 * @FilePath: \organization\src\views\publicComponent\courseChoose.vue
-->
<template>
  <BasicModal
    width="70%"
    v-bind="$attrs"
    @register="register"
    showFooter
    title="选择课程"
    @ok="handleSubmit"
  >
    <!-- <a-table
      :data-source="data"
      :columns="columns"
     
      :pagination="false"
    /> -->
    <a-tabs v-model:activeKey="activeKey" @change="handleSuccess">
      <a-tab-pane v-for="item in coursePackage" :key="item.value" :tab="item.label" />
    </a-tabs>
    <BasicTable
      @register="registerTable"
      :rowSelection="{
        preserveSelectedRowKeys: true,
        type: 'checkbox',
        selectedRowKeys: selectedRowKeys,
        getCheckboxProps: getCheckboxProps,
        onChange: onSelectChange,
      }"
    />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import dataList from '/@/utils/dataList';
  type Key = string | number;
  export default defineComponent({
    components: { BasicModal, BasicTable },
    setup(_, { emit }) {
      const activeKey: any = ref(1);
      const ifClass: any = ref(true);
      const docIds: any = ref();
      const productLine: any = ref(1);
      const state = reactive<{
        coursePackage: object[];
        selectedRowKeys: Key[];
        loading: boolean;
      }>({
        coursePackage: dataList.coursePackage,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      });
      /* 初始化表格 */
      const [registerTable, { reload }] = useTable({
        title: '',
        api: courseClient.getCourse,
        beforeFetch: (t: any) => {
          t.types = unref(activeKey);
        },
        fetchSetting: {
          // 传递到后台的当前页面的字段名
          pageField: 'pageNum',
          //后台显示的每页的数字字段名称
          sizeField: 'pageSize',
          //接口返回的表单数据的字段名
          listField: 'rows',
          // 接口字段名返回的表总数
          totalField: 'total',
        },
        /**列配置
         * slots：自定义的插槽 */
        columns: [
          {
            title: '课程名称',
            dataIndex: 'name',
          },
          {
            title: '价格',
            dataIndex: 'mobile',
          },
          {
            title: '年份',
            dataIndex: 'addTime',
          },
          {
            title: '学习阶段',
            dataIndex: 'addTime',
          },
        ],
        /* 表单配置，参考表单组件的 Props */
        formConfig: {
          labelWidth: '6em',
          schemas: [
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
                span: 6,
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
                span: 6,
              },
            },
          ],
        },
        /* 使用搜索表单	 */
        useSearchForm: false,
        /* 显示表格设置工具	 */
        showTableSetting: true,
        //bordered: true,
        showIndexColumn: true,
      });

      /* 打开弹窗事件 */
      const [register, { setModalProps, closeModal }] = useModalInner((data: any) => {
        docIds.value = data?.docIds;
        productLine.value = data?.productLine;
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
      /* 添加编辑录播成功 */
      function handleSuccess() {
        reload();
      }
      /* 当前选中 */
      const onSelectChange = (selectedRowKeys: Key[]) => {
        state.selectedRowKeys = selectedRowKeys;
      };
      /* 是否可选 */
      function getCheckboxProps(record) {
        if (unref(ifClass)) {
          /* 知识套餐直播点播 */
          if (unref(activeKey) == 1) {
            if (unref(docIds).zb) {
              return unref(docIds).zb.indexOf(record.id) > -1 ? false : true;
            } else {
              return true;
            }
          } else if (unref(activeKey) == 2) {
            if (unref(docIds).db) {
              return unref(docIds).db.indexOf(record.id) > -1 ? false : true;
            } else {
              return true;
            }
          } else if (unref(activeKey) == 3) {
            if (unref(docIds).audio) {
              return unref(docIds).audio.indexOf(record.id) > -1 ? false : true;
            } else {
              return true;
            }
          } else if (unref(activeKey) == 4) {
            if (unref(docIds).image) {
              return unref(docIds).image.indexOf(record.id) > -1 ? false : true;
            } else {
              return true;
            }
          } else if (unref(activeKey) == 5) {
            if (unref(docIds).face) {
              return unref(docIds).face.indexOf(record.id) > -1 ? false : true;
            } else {
              return true;
            }
          }
        } else {
          if (unref(docIds)) {
            return unref(docIds).indexOf(record.courseId) > -1 ? false : true;
          } else {
            return true;
          }
        }
        return {
          disabled: record.id.includes(unref(docIds)),
        };
      }
      return {
        activeKey,
        registerTable,
        ...toRefs(state),
        onSelectChange,
        onMounted,
        handleSubmit,
        register,
        handleSuccess,
        /*  */
        getCheckboxProps,
      };
    },
  });
</script>
