<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreat(null)"> 添加签名 </a-button>
      </template>

      <template #type="{ record }">
        {{ types[record.type] }}
      </template>
      <template #action="{ record, column }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <SignDrawer width="40%" @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { createVNode, defineComponent, onMounted, ref } from 'vue';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { Modal } from 'ant-design-vue';
  import { useDrawer } from '/@/components/Drawer';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import SignDrawer from './SignDrawer.vue';
  import { types } from '/@/utils/enum';
  import { Note } from '/@/utils/note/note';
  let note = new Note();
  export default defineComponent({
    components: { BasicTable, TableAction, SignDrawer },
    setup() {
      const Jgdata = ref();
      /* 初始化表格 */
      const [registerTable, { reload }] =  useTable({
        
        api: note.getEntrantsNoteSignatureList,
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
        formConfig: {
          labelWidth: '6em',
          schemas: [
            {
              field: 'tenantId',
              component: 'Select',
              label: '选择入驻商',
              colProps: {
                span: 6,
              },
              componentProps: {
                fieldNames: {
                  label: 'name',
                  value: 'eId',
                },
                options: Jgdata,
              },
            },
          ],
        },
        /* 使用搜索表单	 */
        useSearchForm: true,
        //列配置
        columns: getBasicColumns(),
        /* 显示表格设置工具	 */
        showTableSetting: true,
        //bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 220,
          title: 'Action',
          dataIndex: 'action',
          fixed: 'right',
          slots: { customRender: 'action' },
        },
      });
      onMounted(async () => {
        await note.getListAll({}).then((res) => {
          Jgdata.value = res.msg;
        });
      });
      /* 初始化弹窗 */
      const [registerDrawer, { openDrawer }] = useDrawer();
      function handleCreat() {
        openDrawer(true, {
          isUpdate: false,
        });
      }
      // 编辑
      function handleEdit(record: any) {
        openDrawer(true, {
          isUpdate: true,
          record,
        });
      }

      // 删除
      async function handleDelete(record: any) {
        Modal.confirm({
          title: '警告',
          icon: createVNode(ExclamationCircleOutlined),
          content: '删除后该条数据将不存在，您是否确认操作',
          okText: '确认',
          cancelText: '取消',
          async onOk() {
            await note.deleteEntrantsNoteSignature({ id: record.id });
            reload();
          },
        });
      }
      // 新增/编辑 成功回调
      function handleSuccess() {
        reload();
      }
      return {
        getBasicColumns,
        handleCreat,
        registerDrawer,
        handleEdit,
        handleSuccess,
        types,
        handleDelete,
        registerTable,
      };
    },
  });
</script>
