<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-10 14:34:12
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\video\videoChat.vue
 * 
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="gtoupCreate"> 新增章节组</a-button>
      </template>

      <template #addTime="{ record }">
        <div> {{ record.groupId ? record.addTime : record.createTime }} </div>
        <!-- <span> {{ typeEnum[record.type] }}</span> -->
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '添加节',
              onClick: handleCreate.bind(null, record),
              ifShow: () => {
                return !record.groupId;
              },
            },
            {
              label: '视频打点',
              onClick: handleDot.bind(null, record),
              ifShow: () => {
                return record.groupId;
              },
            },
            {
              label: '随堂讲义',
              onClick: handleDoc.bind(null, record, 2),
              ifShow: () => {
                return record.groupId;
              },
            },
            {
              label: '随堂资料',
              onClick: handleDoc.bind(null, record, 1),
              ifShow: () => {
                return record.groupId;
              },
            },
            {
              label: '随堂测试',
              onClick: handleMenu.bind(null, record),
              ifShow: () => {
                return record.groupId;
              },
            },
            {
              label: '学员评分',
              color: 'success',
              onClick: handleMenu.bind(null, record),
              ifShow: () => {
                return record.groupId;
              },
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
    <videoGroupAdd @register="groupDrawer" @success="handleSuccess" />
    <videoChatAdd @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useDrawer } from '/@/components/Drawer';
  import videoGroupAdd from './addGroup.vue';
  import videoChatAdd from './addSection.vue';
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
  const [registerTable, { reload }] = useTable({
    title: '',
    isTreeTable: true,
    api: courseClient.getChildrenList,
    beforeFetch: (t: any) => {
      t.courseId = unref(id);
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
    // 指定树形结构的列名
    childrenColumnName: 'list',
    indentSize: 25,
    /**列配置
     * slots：自定义的插槽 */
    columns: [
      { title: '章节名称', dataIndex: 'title', align: 'left' },
      { title: '创建时间', dataIndex: 'addTime', slots: { customRender: 'addTime' } },
      { title: '时长', dataIndex: 'videoDuration' },
      { title: '排序', dataIndex: 'orders', width: 200 },
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
          field: 'title',
          component: 'Input',
          label: '搜索',
          colProps: {
            span: 6,
          },
        },
      ],
    },
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
      align: 'right',
    },
  });
  /* -----------添加-章节组-弹窗 --------------------- */
  /* 初始化弹窗 */
  const [groupDrawer, { openDrawer: openGroup }] = useDrawer();
  /* 添加录播 */
  function gtoupCreate(record: Recordable) {
    openGroup(true, {
      isUpdate: false,
      CourseId: unref(id),
      CourseTitle: unref(title),
    });
  }

  /* -----------添加-节-弹窗 --------------------- */
  /* 初始化弹窗 */
  const [registerDrawer, { openDrawer }] = useDrawer();
  /* 添加录播 */
  function handleCreate(record: Recordable) {
    openDrawer(true, {
      isUpdate: false,
      CourseId: unref(id),
      GroupId: record.id,
      CourseTitle: unref(title),
      type: 2,
    });
  }
  /* -------------------------------- */
  /* 编辑录播 */
  function handleEdit(record: Recordable) {
    if (record.groupId) {
      /* 编辑录播 */
      openDrawer(true, {
        record,
        id: record.id,
        CourseId: unref(id),
        GroupId: record.groupId,
        CourseTitle: unref(title),
        isUpdate: true,
      });
    } else {
      
      /* 编辑录播章节组 */
      openGroup(true, {
        record,
        id: record.id,
        CourseId: unref(id),
        CourseTitle: unref(title),
        isUpdate: true,
      });
    }
  }
  /* 添加编辑录播成功 */
  function handleSuccess() {
    reload();
  }
  /* 删除录播 */
  function handleDelete(record: Recordable) {
    if (record.groupId) {
      courseClient.videoDeletes(record.id).then((res) => {
        reload();
      });
    } else {
      courseClient.videocoursegroupDeletes(record.id).then((res) => {
        reload();
      });
    }
  }
  /* 视频打点 */
  function handleDot(record: Recordable) {
    router.push({
      path: '/know/course/courseDot',
      query: {
        id: record.id,
        type: 2,
        kid: unref(kid),
        kind: unref(kind),
      },
    });
  }
  function handleMenu() {}
  /* 1资料 2讲义  */
  function handleDoc(record: Recordable, docType: number) {
    router.push(`/know/course/courseData?typeId=${record.id}&type=2&docType=${docType}`);
  }
</script>
