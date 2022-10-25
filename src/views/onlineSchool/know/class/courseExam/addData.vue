<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-28 09:40:20
 * @LastEditors: 南桥几许
 * @LastEditTime: 2022-07-19 11:49:01
 * @FilePath: \organization\src\views\onlineSchool\know\class\courseExam\addData.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    showFooter
    title="添加资料"
    width="70%"
    @ok="handleSubmit"
  >
    <BasicTable
      @register="registerTable"
      :rowSelection="{
        preserveSelectedRowKeys: true,
        type: 'checkbox',
        selectedRowKeys: checkedKeys,
        getCheckboxProps: getCheckboxProps,
        onChange: onSelectChange,
      }"
    >
      <template #headerTop v-if="checkedKeys.length > 0">
        <a-alert type="info" show-icon>
          <template #message>
            <div class="flex-between">
              <span class="shrink">已选中{{ checkedKeys.length }}条数据</span>
              <div>
                <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
              </div>
            </div>
          </template>
        </a-alert>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { examManage } from '/@/utils/onlineSchool/examManage/examManage';
  let examClient = new examManage();
  import { getKechengList } from '/@/utils/onlineSchool/know/basics';
  export default defineComponent({
    components: { BasicModal, BasicTable },
    setup(_, { emit }) {
      const data: any = ref([]);
      const kind: any = ref();
      const zyId: any = ref();
      const ids: any = ref([]);
      const kcList: any = ref([]);
      const checkedKeys = ref<Array<string | number>>([]); //当前选中列

      /* 打开弹窗事件 */
      const [register, { setModalProps, closeModal }] = useModalInner((data: any) => {
        kind.value = data?.kind;
        zyId.value = data?.zyId;
        ids.value = data?.ids;
        getKc();
        setModalProps({ confirmLoading: false });
      });
      /* 课程列表 */
      async function getKc() {
        getKechengList(unref(kind)).then((res) => {
          kcList.value = res.msg;
        });
      }
      /* 初始化表格 */
      const [registerTable, { reload }] = useTable({
        title: '',
        api: examClient.getMaterialsPage,
        beforeFetch: (t: any) => {
          t.kind = unref(kind);
          t.zyId = unref(zyId);
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
          { title: '资料名称', dataIndex: 'name', align: 'left' },
          { title: '所属项目', dataIndex: 'kindName' },
          { title: '所属专业', dataIndex: 'zyName' },
          { title: '所属课程', dataIndex: 'kcName' },
        ],
        /* 分页信息配置，为 false 不显示分页	 */
        // pagination: false,
        /* 使用搜索表单	 */
        useSearchForm: true,
        /* 表单配置，参考表单组件的 Props */
        formConfig: {
          labelWidth: '6em',
          schemas: [
            {
              field: 'courseId',
              label: '课程名称',
              component: 'Select',
              colProps: {
                span: 6,
              },
              componentProps: {
                options: kcList,
                fieldNames: {
                  label: 'keName',
                  value: 'kid',
                },
              },
            },
            {
              field: 'name',
              component: 'Input',
              label: '试卷名称',
              colProps: {
                span: 6,
              },
            },
          ],
        },
        /* 显示表格设置工具	 */
        showTableSetting: false,
        //bordered: true,
        showIndexColumn: false,
        rowKey: 'id',
      });
      /* 提交 */
      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success', unref(checkedKeys));
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      /* 当前选中 */
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }
      /* 当前选中 */
      function getCheckboxProps(record) {
        return {
          disabled: record.id.includes(unref(ids)),
        };
      }
      return {
        data,
        register,
        handleSubmit,
        registerTable,
        onSelectChange,
        getCheckboxProps,
        checkedKeys,
      };
    },
  });
</script>
