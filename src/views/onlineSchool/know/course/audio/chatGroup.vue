<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-07 11:39:40
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\audio\chatGroup.vue
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
              label: '管理节',
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
    <addGroup @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useDrawer } from '/@/components/Drawer';
  import addGroup from './addGroup.vue';
  const checkedKeys = ref<Array<string | number>>([]); //当前选中列
  const tenantId = ref(); //创建入驻商
  const kind = ref();
  const id = ref(); //当前课程id
  const kid = ref(); //当前辅导课程id
  const title = ref(); //当前课程title
  const type = ref(); //当前辅导课程类型 直播录播
  const router = useRouter();
  const route = useRoute();
  tenantId.value = route.query.tenantId;
  kind.value = route.query.kind;
  id.value = route.query.id;
  kid.value = route.query.kid ? Number(route.query.kid) : undefined;
  title.value = route.query.title;
  type.value = route.query.type;
  /* 初始化表格 */
  const [registerTable, { reload }] =  useTable({
        
    title: '',
    api: courseClient.getAudioChapterList,
    beforeFetch: (t: any) => {
      
      t.faceId = unref(id);
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
      { title: '章节组名称', dataIndex: 'name' },
      { title: '创建时间', dataIndex: 'createTime' },
      { title: '排序', dataIndex: 'sort', width: '100' },
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
      width: 300,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  /* -----------添加-节-弹窗 --------------------- */
  /* 初始化弹窗 */
  const [registerDrawer, { openDrawer }] = useDrawer();
  /* 添加录播 */
  function handleCreate(record: Recordable) {
    openDrawer(true, {
      isUpdate: false,
      CourseId: unref(id),
      CourseTitle: unref(title),
      type: unref(type),
    });
  }
  /* -------------------------------- */
  /* 编辑录播 */
  function handleEdit(record: Recordable) {
    /* 编辑录播 */
    openDrawer(true, {
      record,
      id: record.id,
      CourseId: unref(id),
      GroupId: record.groupId,
      CourseTitle: unref(title),
      isUpdate: true,
    });
  }
  /* 添加编辑录播成功 */
  function handleSuccess() {
    reload();
  }
  /* 删除录播 */
  function handleDelete(record: Recordable) {
    courseClient.liveshowplaybackDelete(record.id).then((res) => {
      reload();
    });
  }

  /* 章节管理 */
  function handleMenu(record: Recordable) {
    
    router.push({
      path: '/know/course/audioSection',
      query: {
        id: unref(id),
        groupId: record.id,
        kid: unref(kid),
        kind: unref(kind),
      },
    });
    // router.push(`/know/course/videoChat?id=${record.id}`);
  }
</script>
