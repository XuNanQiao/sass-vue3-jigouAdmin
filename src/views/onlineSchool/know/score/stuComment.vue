<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-07 11:40:26
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\score\stuComment.vue
 * 
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '随堂讲义',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '随堂资料',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '随堂测试',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '学员评分',
              color: 'success',
              onClick: handleMenu.bind(null, record),
            },
            {
              label: '编辑',
              color: 'warning',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { ScoreClient } from '/@/utils/onlineSchool/know/scoreClient';
  let scoreClient = new ScoreClient();
  import { useDrawer } from '/@/components/Drawer';
  import dataList from '/@/utils/dataList';
  const typeId = ref(); //当前课程id
  const type = ref(); //当前课程id
  const route = useRoute();
  typeId.value = route.query.typeId;
  type.value = route.query.type;

  /* 初始化表格 */
  const [registerTable, { reload }] =  useTable({
        
    title: '',
    api: scoreClient.getStudentEvaluateList,
    beforeFetch: (t: any) => {
      t.typeId = unref(typeId);
      t.type = unref(type);
      if (t.startTime) {
        const time = [...t.startTime];
        t.startTime = time[0];
        t.endTime = time[1];
      }
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
    indentSize: 25,
    /**列配置
     * slots：自定义的插槽 */
    columns: [
      { title: '学员名称', dataIndex: 'usertitle' },
      { title: '评价内容', dataIndex: 'content' },
      { title: '评价时间', dataIndex: 'addTime' },
      { title: '评价状态', dataIndex: 'isCheck' },
    ],
    /* 表单配置，参考表单组件的 Props */
    formConfig: {
      labelWidth: '6em',
      schemas: [
        {
          field: 'isCheck',
          label: '评价状态',
          required: true,
          component: 'Select',
          componentProps: {
            options: dataList.shList,
          },
        },
        {
          field: 'startTime',
          component: 'RangePicker',
          label: '评价时间',
          colProps: {
            span: 6,
          },
          componentProps: {
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD',
          },
        },
        {
          field: 'content',
          component: 'Input',
          label: '搜索',
          componentProps: {
            placeholder: '请输入评价关键词',
          },
          colProps: {
            span: 6,
          },
        },
      ],
    },
    rowKey: 'id',
    /* 使用搜索表单	 */
    useSearchForm: true,
    /* 显示表格设置工具	 */
    showTableSetting: true,
    //bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 500,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  /* -----------添加-节-弹窗 --------------------- */
  /* 初始化弹窗 */
  const [registerDrawer, { openDrawer }] = useDrawer();
  /* 添加章节 */
  function handleCreate(record: Recordable) {
    openDrawer(true, {
      isUpdate: false,
      CourseId: unref(id),
      groupId: unref(groupId),
    });
  }
  /* -------------------------------- */
  /* 编辑章节 */
  function handleEdit(record: Recordable) {
    /* 编辑章节 */
    openDrawer(true, {
      record,
      id: record.id,
      CourseId: unref(id),
      GroupId: record.groupId,
      isUpdate: true,
    });
  }
  /* 添加编辑章节成功 */
  function handleSuccess() {
    reload();
  }
  /* 删除章节 */
  function handleDelete(record: Recordable) {
    courseClient.deleteImageTeachChapter(record.id).then((res) => {
      reload();
    });
  }

  function handleMenu() {}
</script>
