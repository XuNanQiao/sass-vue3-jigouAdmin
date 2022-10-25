<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-07 16:52:49
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\courseDot\index.vue
 * 
-->
<template>
  <div>
    <BasicTable
      @register="registerTable"
      :rowSelection="{
        preserveSelectedRowKeys: true,
        type: 'checkbox',
        selectedRowKeys: checkedKeys,
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
        </a-alert>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="gtoupCreate"> 新增打点</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
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
    <addDot @register="groupDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useModal } from '/@/components/Modal';
  import addDot from './addDot.vue';
  const kind = ref();
  const id = ref(); //当前课程id
  const kid = ref(); //当前辅导课程id
  const type = ref(); //当前辅导课程类型 直播录播
  const checkedKeys = ref<Array<string | number>>([]); //当前选中列

  const router = useRouter();
  const route = useRoute();
  kind.value = route.query.kind;
  id.value = route.query.id;
  kid.value = route.query.kid ? Number(route.query.kid) : undefined;
  type.value = route.query.type;
  /* 初始化表格 */
  const [registerTable, { reload }] =  useTable({
        
    title: '',
    isTreeTable: true,
    api: courseClient.curVideoSegmentList,
    beforeFetch: (t: any) => {
      t.parentId = unref(id);
      t.videoType = unref(type) == '1' ? 'liveCourses' : 'videoCourses';
    },
    afterFetch: (t: any) => {
      for (let item of t) {
        if (item.knowledgeList != null) {
          item.knowledgeNames = [];
          for (let items of item.knowledgeList) {
            item.knowledgeNames.push(items.name);
          }
          item.knowledgeName = item.knowledgeNames.join(',');
        }
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
      { title: '打点时间', dataIndex: 'startTime', align: 'left' },
      { title: '视频时长', dataIndex: 'lengthTime' },
      { title: '关联知识点', dataIndex: 'knowledgeName' },
      { title: '视频图片', dataIndex: 'coverUrl' },
      // { title: "视频简介", dataIndex: "summary" },
      { title: '排序', dataIndex: 'sort' },
    ],
    rowKey: 'id',
    /* 使用搜索表单	 */
    useSearchForm: false,
    /* 显示表格设置工具	 */
    showTableSetting: true,
    //bordered: true,
    showIndexColumn: false,
    clearSelectOnPageChange: false,
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
  const [groupDrawer, { openModal }] = useModal();
  /* 添加录播 */
  function gtoupCreate(record: Recordable) {
    openModal(true, {
      isUpdate: false,
      CourseId: unref(id),
      kid: unref(kid),
      type: unref(type),
    });
  }
  /* -------------------------------- */
  /* 编辑录播 */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      id: record.id,
      CourseId: unref(id),
      kid: unref(kid),
      isUpdate: true,
    });
  }
  /* 添加编辑录播成功 */
  function handleSuccess() {
    reload();
  }
  /* 删除录播 */
  function handleDelete(record: Recordable) {
    courseClient.deletes(record.id).then((res) => {
      reload();
    });
  }
  /* 当前选中 */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }

  /* 删除全部 */
  function confirm() {
    courseClient.deletes(checkedKeys.value.join(',')).then((res) => {
      if (res.code == 200) {
        reload();
        checkedKeys.value = [];
      }
    });
  }
</script>
