<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-10 14:15:01
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\course\courseExam\index.vue
 * 
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="gtoupCreate">添加</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '查看',
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
  import addData from './addExam.vue';
  const route = useRoute();
  const id = Number(route.query.id); //当前课程id
  const type = Number(route.query.type); //1直播 2点播 3  面授 4 音频  5图文
  const kind = Number(route.query.kind);
  const cKid = Number(route.query.cKid); //当前辅导课程idcKid
  const sId = ref([]); //当前辅导课程idcKid
  const status = ref(3); //status:	1 课后作业 2 随堂测试 3课程模考

  /* 初始化表格 */
  const [registerTable, { reload }] = useTable({
    //
    title: '',
    api: courseClient.getPaperByCourse,
    beforeFetch: (t: any) => {
      t.status = unref(status);
      t.cKid = cKid;
    },
    afterFetch: (t: any) => {
      sId.value = t.sId;
      
      return t.array;
    },
    searchInfo: {
      cCourseid: id,
      cType: type,
    },

    fetchSetting: {
      listField: 'data',
    },
    indentSize: 25,
    /**列配置
     * slots：自定义的插槽 */
    columns: [
      { title: '试卷名称', dataIndex: 'sjName', align: 'left' },
      { title: '所属项目', dataIndex: 'kindName' },
      { title: '题数', dataIndex: 'subjectNum', width: 150 },
      { title: '总分数', dataIndex: 'totalScore', width: 150 },
      { title: '添加时间', dataIndex: 'addTime', width: 200 },
    ],
    // rowKey: 'cId',
    /* 使用搜索表单	 */
    useSearchForm: false,
    /* 显示表格设置工具	 */
    showTableSetting: true,
    //bordered: true,
    showIndexColumn: false,
    pagination: false, //分页信息配置，为 false 不显示分页
    actionColumn: {
      title: '操作',
      width: 200,
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  /* -----------添加-章节组-弹窗 --------------------- */
  /* 初始化弹窗 */
  const [groupDrawer, { openModal }] = useModal();
  /* 添加 */
  function gtoupCreate(record: Recordable) {
    openModal(true, {
      kind: kind,
      ids: unref(sId),
    });
  }
  /* -------------------------------- */
  /* 添加编辑成功 */
  function handleSuccess(value) {
    let data = {
      status: 3,
      cType: type,
      cCourseid: id,
      cKid: cKid,
      sIds: value.join(','),
    };
    courseClient.addCoursePaper(data).then((res) => {
      reload();
    });
    // reload();
  }
  /* 删除 */
  function handleDelete(record: Recordable) {
    courseClient.delCourseContact(record.cId).then((res) => {
      reload();
    });
  }
  function handleEdit() {}
</script>
