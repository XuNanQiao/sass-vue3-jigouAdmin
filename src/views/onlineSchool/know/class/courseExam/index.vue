<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-19 13:47:28
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\class\courseExam\index.vue
 * 
-->
<template>
  <div>
    <a-radio-group
      v-if="type == 4 || type == 2"
      v-model:value="type"
      button-style="solid"
      @change="search"
    >
      <a-radio-button :value="4">专属资料</a-radio-button>
      <a-radio-button :value="2">专属资料包</a-radio-button>
    </a-radio-group>
    <a-radio-group
      v-if="type == 3 || type == 5"
      v-model:value="type"
      button-style="solid"
      @change="search"
    >
      <a-radio-button :value="5">专属试卷</a-radio-button>
      <a-radio-button :value="3">专属试卷包</a-radio-button>
    </a-radio-group>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="gtoupCreate">添加</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
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
    <addExam @register="examRegister" @success="handleSuccess" />
    <addExamBao @register="examBaoRegistera" @success="handleSuccess" />
    <addData @register="dataRegister" @success="handleSuccess" />
    <addDataBao @register="dataBaoRegister" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction, BasicColumn } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useModal } from '/@/components/Modal';
  import addData from './addData.vue';
  import addDataBao from './addDataBao.vue';
  import addExam from './addExam.vue';
  import addExamBao from './addExamBao.vue';
  const route = useRoute();
  const classId = Number(route.query.classId); //当前课程id
  const type = ref(1); /*  1 课程模考 虚拟考场 2 资料包  3 试卷包 4资料  5试卷 */
  const kind = Number(route.query.kind);
  const zyId = Number(route.query.zyId);
  const sId = ref([]); //当前辅导课程idcKid

  const status = ref(3); //status:	1 课后作业 2 随堂测试 3课程模考
  type.value = Number(route.query.type);
  const columns = ref<any>([]);
  setColum();
  function setColum() {
    switch (unref(type)) {
      case 1:
        columns.value = [
          { title: '考场名称', dataIndex: 'typeName', align: 'left' },
          { title: '所属项目', dataIndex: 'kindName' },
          { title: '所属专业', dataIndex: 'zyName' },
          // { title: "考场类型", dataIndex: "kcName" },
          { title: '开始时间', dataIndex: 'startTime', width: 180 },
          { title: '结束时间', dataIndex: 'endTime', width: 180 },
          { title: '添加时间', dataIndex: 'addTime', width: 180 },
        ];

        break;
      case 2:
        columns.value = [
          { title: '资料包名称', dataIndex: 'typeName', align: 'left' },
          { title: '所属项目', dataIndex: 'kindName' },
          { title: '所属专业', dataIndex: 'zyName' },
          { title: '所属课程名', dataIndex: 'kcName' },
          { title: '添加时间', dataIndex: 'addTime', width: 180 },
        ];

        break;
      case 3:
        columns.value = [
          { title: '试卷包名称', dataIndex: 'typeName', align: 'left' },
          { title: '所属项目', dataIndex: 'kindName' },
          { title: '所属专业', dataIndex: 'zyName' },
          { title: '添加时间', dataIndex: 'addTime', width: 180 },
        ];

        break;
      case 4:
        columns.value = [
          { title: '资料名称', dataIndex: 'typeName', align: 'left' },
          { title: '所属项目', dataIndex: 'kindName' },
          { title: '所属专业', dataIndex: 'zyName' },
          { title: '所属课程名', dataIndex: 'kcName' },
          { title: '添加时间', dataIndex: 'addTime', width: 180 },
        ];

        break;
      case 5:
        columns.value = [
          { title: '试卷名称', dataIndex: 'typeName', align: 'left' },
          { title: '所属项目', dataIndex: 'kindName' },
          // { title: "所属专业", dataIndex: "zyName" },
          { title: '所属课程名', dataIndex: 'kcName' },
          { title: '题数', dataIndex: 'subjectNum', width: 150 },
          { title: '总分数', dataIndex: 'totalScore', width: 100 },
          { title: '添加时间', dataIndex: 'addTime', width: 180 },
        ];

        break;
      default:
        break;
    }
  }
  /* 初始化表格 */
  const [registerTable, { reload }] = useTable({
    //
    title: '',
    api: courseClient.selectServeList,
    beforeFetch: (t: any) => {
      t.type = unref(type);
      t.classesId = classId;
    },
    afterFetch: (t: any) => {
      sId.value = t.typeId;
      return t.rows;
    },
    // sticky: false, //设置粘性头部和滚动条
    fetchSetting: {
      listField: 'data',
    },
    indentSize: 25,
    /**列配置
     * slots：自定义的插槽 */
    columns /*  [
       {
         title: '考场名称',
         dataIndex: 'typeName',
         align: 'left',
         ifShow: () => {
           return unref(type) == 1;
         },
       },
       {
         title: '资料包名称',
         dataIndex: 'typeName',
         align: 'left',
         ifShow: () => {
           return unref(type) == 2;
         },
       },
       {
         title: '试卷包名称',
         dataIndex: 'typeName',
         align: 'left',
         ifShow: () => {
           return unref(type) == 3;
         },
       },
       {
         title: '试卷名称',
         dataIndex: 'typeName',
         align: 'left',
         ifShow: () => {
           return unref(type) == 5;
         },
       },
       {
         title: '资料名称',
         dataIndex: 'typeName',
         align: 'left',
         ifShow: () => {
           return unref(type) == 4;
         },
       },
       { title: '所属项目', dataIndex: 'kindName', width: 180 },
       {
         title: '所属专业',
         width: 180,
         dataIndex: 'zyName',
         ifShow: () => {
           return unref(type) != 5;
         },
       },
       {
         title: '所属课程名',
         dataIndex: 'kcName',
         width: 180,
         ifShow: () => {
           return unref(type) == 5 || unref(type) == 2 || unref(type) == 4;
         },
       },
       // { title: "考场类型", dataIndex: "kcName" },
       {
         title: '开始时间',
         dataIndex: 'startTime',

         ifShow: () => {
           return unref(type) == 1;
         },
       },
       {
         title: '结束时间',
         dataIndex: 'endTime',
         ifShow: () => {
           return unref(type) == 1;
         },
       },

       {
         title: '题数',
         dataIndex: 'subjectNum',
         width: 100,
         ifShow: () => {
           return unref(type) == 5;
         },
       },
       {
         title: '总分数',
         dataIndex: 'totalScore',
         width: 100,
         ifShow: () => {
           return unref(type) == 5;
         },
       },
       { title: '添加时间', dataIndex: 'addTime', width: 180 },
     ] */,
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
      width: 100,
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  /* -----------添加--弹窗 --------------------- */
  /* 初始化弹窗 */
  const [examRegister, { openModal }] = useModal();
  const [examBaoRegister, { openModal: openBaoModal }] = useModal();
  const [dataRegister, { openModal: dataOpen }] = useModal();
  const [dataBaoRegister, { openModal: dataBaoOpen }] = useModal();
  /* 添加试卷 */
  function gtoupCreate(record: Recordable) {
    if (unref(type) == 4) {
      dataOpen(true, {
        kind: kind,
        zyId: zyId,
        ids: unref(sId),
      });
    } else if (unref(type) == 5) {
      openModal(true, {
        kind: kind,
        zyId: zyId,
        ids: unref(sId),
      });
    } else if (unref(type) == 2) {
      dataBaoOpen(true, {
        kind: kind,
        zyId: zyId,
        ids: unref(sId),
      });
    } else if (unref(type) == 3) {
      openBaoModal(true, {
        kind: kind,
        zyId: zyId,
        ids: unref(sId),
      });
    }
  }

  /* -------------------------------- */
  /* 添加编辑成功 */
  function handleSuccess(value) {
    courseClient.addServe(unref(type), classId, value.join(',')).then((res) => {
      reload();
    });
    // reload();
  }
  /* 删除 */
  function handleDelete(record: Recordable) {
    courseClient.deleteByIdServe(record.cId).then((res) => {
      reload();
    });
  }
  function search() {
    setColum();
    reload();
  }
</script>
