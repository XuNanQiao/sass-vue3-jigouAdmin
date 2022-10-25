<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-10 14:32:14
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\imageCourse\chatView.vue
 * 
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增章节</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '随堂讲义',
              onClick: handleDoc.bind(null, record, 2),
            },
            {
              label: '随堂资料',
              onClick: handleDoc.bind(null, record, 1),
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
    <addSection @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  import addSection from './addSection.vue';
  let courseClient = new CourseClient();
  import { useDrawer } from '/@/components/Drawer';
  const checkedKeys = ref<Array<string | number>>([]); //当前选中列
  const tenantId = ref(); //创建入驻商
  const kind = ref();
  const id = ref(); //当前课程id
  const kid = ref(); //当前辅导课程id
  const title = ref(); //当前课程title
  const type = ref(); //当前辅导课程类型
  const router = useRouter();
  const route = useRoute();
  tenantId.value = route.query.tenantId;
  kind.value = route.query.kind;
  id.value = route.query.id;
  kid.value = route.query.kid ? Number(route.query.kid) : undefined;
  title.value = route.query.title;
  type.value = route.query.type;
  /* 初始化表格 */
  const [registerTable, { reload }] = useTable({
    title: '',
    api: courseClient.getImageTeachChapterList,
    beforeFetch: (t: any) => {
      
      t.teachId = unref(id);
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
      { title: '章节名称', dataIndex: 'name' },
      { title: '创建时间', dataIndex: 'createTime' },
      { title: '排序', dataIndex: 'sort', width: 100 },
    ],
    /* 表单配置，参考表单组件的 Props */
    formConfig: {
      labelWidth: '6em',
      schemas: [
        {
          field: 'startTime',
          component: 'RangePicker',
          label: '创建时间',
          colProps: {
            span: 6,
          },
          componentProps: {
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD',
          },
        },
        {
          field: 'name',
          component: 'Input',
          label: '搜索',
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
      align: 'right',
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
      CourseTitle: unref(title),
      type: unref(type),
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
      CourseTitle: unref(title),
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
  function handleDoc(record: Recordable, docType: number) {
    router.push(`/know/course/courseData?typeId=${record.id}&type=4&docType=${docType}`);
  }
</script>
