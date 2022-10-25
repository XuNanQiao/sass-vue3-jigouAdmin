<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-10 14:34:47
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\live\liveChat.vue
 * 
-->
<template>
  <div>
    <BasicTable
      @register="registerTable"
      :rowSelection="{
        type: 'checkbox',
        selectedRowKeys: checkedKeys,
        onChange: onSelectChange,
        preserveSelectedRowKeys: true,
      }"
    >
      <template #headerTop>
        <a-alert type="info" show-icon>
          <template #message>
            <template v-if="checkedKeys.length > 0">
              <div class="flex-between">
                <span class="shrink">已选中{{ checkedKeys.length }}条数据</span>
                <div>
                  <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
                  <a-popconfirm
                    title="删除后将无法查看，确认无误后点击确认即可"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="confirm"
                  >
                    <a-button type="link" danger size="small">删除</a-button>
                  </a-popconfirm>
                </div>
              </div>
            </template>
            <template v-else>
              <span>未选中任何项目</span>
            </template>
          </template>
        </a-alert>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增章节</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '视频打点',
              onClick: handleDot.bind(null, record),
            },
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
            {
              label: '添加群聊',
              color: 'success',
              onClick: handleMenu.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
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
  import videoChatAdd from './addSection.vue';
  import dataList from '/@/utils/dataList';
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
  const [registerTable, { reload }] = useTable({
    title: '',
    api: courseClient.liveshowplaybackList,
    beforeFetch: (t: any) => {
      
      t.LiveId = unref(id);
      if (t.StartTime) {
        const time = [...t.StartTime];
        t.StartTime = time[0];
        t.EndTime = time[1];
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
      { title: '章节名称', dataIndex: 'title' },
      { title: '直播开始时间', dataIndex: 'startTime' },
      { title: '直播时长', dataIndex: 'duration' },
      { title: '直播状态', dataIndex: 'isLive' },
      { title: '创建时间', dataIndex: 'addTime' },
      { title: '排序', dataIndex: 'orders', width: '100' },
    ],
    /* 表单配置，参考表单组件的 Props */
    formConfig: {
      labelWidth: '6em',
      schemas: [
        {
          field: 'IsLive',
          label: '视频状态',
          component: 'Select',
          componentProps: {
            options: dataList.iszbLive,
          },
          colProps: {
            span: 6,
          },
        },
        {
          field: 'StartTime',
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
          field: 'Title',
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
      align: 'right',
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
  /* 视频打点 */
  function handleDot(record: Recordable) {
    router.push({
      path: '/know/course/courseDot',
      query: {
        id: record.id,
        type: unref(type),
        kid: unref(kid),
        kind: unref(kind),
      },
    });
  }
  function handleMenu() {}
  /* 当前选中 */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }
  /* 删除全部 */
  function confirm() {
    courseClient.liveshowplaybackDelete(checkedKeys.value.join(',')).then((res) => {
      if (res.code == 200) {
        reload();
        checkedKeys.value = [];
      }
    });
  }
  /* 1资料 2讲义  */
  function handleDoc(record: Recordable, docType: number) {
    router.push(`/know/course/courseData?typeId=${record.id}&type=2&docType=${docType}`);
  }
</script>
