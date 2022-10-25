<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-10 14:19:41
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\courseData\index.vue
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
        <a-button type="primary" @click="gtoupCreate">添加</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '下载',
              onClick: handleDownloadByUrl.bind(null, record),
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
    <addData @register="groupDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useModal } from '/@/components/Modal';
  import addData from './addData.vue';
  const typeId = ref(); //当前课程id
  const type = ref(); //当前辅导课程类型 直播录播
  const docType = ref(3); // 1资料 2讲义   3课程资料   4 资料和讲义
  const checkedKeys = ref<Array<string | number>>([]); //当前选中列
  import { downloadByUrl } from '/@/utils/file/download';
  const router = useRouter();
  const route = useRoute();
  typeId.value = route.query.typeId;
  type.value = route.query.type;
  docType.value = route.query.docType ? Number(route.query.docType) : 3;
  /* 初始化表格 */
  const [registerTable, { reload }] = useTable({
    title: '',
    api: courseClient.curCourseDocsList,
    beforeFetch: (t: any) => {
      t.docType = unref(docType);
      t.sectionId = unref(typeId);
      t.courseType = unref(type);
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
      { title: '资料名称', dataIndex: 'fileName', align: 'left' },
      { title: '添加时间', dataIndex: 'addTime' },
    ],
    rowKey: 'id',
    /* 使用搜索表单	 */
    useSearchForm: false,
    /* 显示表格设置工具	 */
    showTableSetting: true,
    //bordered: true,
    showIndexColumn: false,
    actionColumn: {
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
      typeId: unref(typeId),
      type: unref(type),
      docType: unref(docType),
    });
  }
  /* -------------------------------- */
  /* 编辑录播 */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      id: record.id,
      typeId: unref(typeId),
      type: unref(type),
      docType: unref(docType),
    });
  }
  /* 添加编辑录播成功 */
  function handleSuccess() {
    reload();
  }
  /* 删除录播 */
  function handleDelete(record: Recordable) {
    courseClient.curCourseDocsDel(record.id).then((res) => {
      reload();
    });
  }
  /* 当前选中 */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }
  /* 删除全部 */
  function confirm() {
    courseClient.curCourseDocsDel(checkedKeys.value.join(',')).then((res) => {
      if (res.code == 200) {
        reload();
        checkedKeys.value = [];
      }
    });
  }
  function handleDownloadByUrl(record: Recordable) {
    downloadByUrl({
      url: record.filePath,
      target: '_blank',
      fileName: record.fileName,
    });
  }
</script>
