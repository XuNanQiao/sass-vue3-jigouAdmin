<!--
 * @Description: 
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-29 10:15:01
 * @LastEditors: 南桥几许
 * @LastEditTime: 2022-07-07 11:40:34
 * @FilePath: \organization\src\views\setUp\note\payList\index.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template v-if="LastNoteNum != null" #headerTop>
        <a-alert :message="`短信剩余${LastNoteNum}条`" type="info" show-icon />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { Note } from '/@/utils/note/note';
  let note = new Note();
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const Jgdata = ref();
      const LastNoteNum = ref();

      /* 初始化表格 */
      const [registerTable, { reload, getRawDataSource }] =  useTable({
        
        api: note.getNoteOrderList,
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
        /* 表单配置，参考表单组件的 Props */
        formConfig: {
          labelWidth: '6em',
          schemas: [
            {
              field: 'entrantsId',
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

        beforeFetch: (data) => {
          let a = getRawDataSource();
          // 接口请求前 参数处理
          if (data.entrantsId) {
            LastNoteNum.value = a.noteNumber;
          } else {
            LastNoteNum.value = null;
          }
        },

        /* 使用搜索表单	 */
        useSearchForm: true,
        //列配置
        columns: getBasicColumns(),
        /* 显示表格设置工具	 */
        showTableSetting: true,
        //bordered: true,
        showIndexColumn: false,
      });
      onMounted(async () => {
        await note.getListAll({}).then((res) => {
          Jgdata.value = res.msg;
        });
      });

      return {
        getBasicColumns,
        registerTable,
        LastNoteNum,
      };
    },
  });
</script>
