<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-19 16:48:40
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\class\index.vue
 * 
-->
<template>
  <div>
    <KindSearch :search="kindSearch" :kindSchemas="kindSchemas" @submit="submit" />
    <a-tabs v-if="productLine != 3" v-model:activeKey="productLine" @change="handleSuccess">
      <a-tab-pane v-for="item in productLinelist" :key="item.value" :tab="item.label" />
    </a-tabs>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <template #isPass="{ record }">
        <a-switch
          v-model:checked="record.isPass"
          :checkedValue="1"
          :unCheckedValue="0"
          @change="showChange(record)"
        />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '课程管理',
              onClick: handClassCourse.bind(null, record),
            },
            {
              label: '课程包管理',
              onClick: handleData.bind(null, record),
            },
            {
              label: '专属资料',
              onClick: handleExam.bind(null, record, 4),
              ifShow: () => {
                return productLine == 3;
              },
            },
            {
              label: '专属题库',
              onClick: handleExam.bind(null, record, 5),
              ifShow: () => {
                return productLine == 3;
              },
            },
            {
              label: '模考服务',
              onClick: handleExam.bind(null, record, 1),
              ifShow: () => {
                return productLine == 3;
              },
            },
            {
              label: '专属教服',
              onClick: handleExam.bind(null, record),
              ifShow: () => {
                return productLine == 3;
              },
            },
            {
              label: '专属教材',
              onClick: handleTeacher.bind(null, record),
              ifShow: () => {
                return productLine == 3;
              },
            },
            {
              label: '评价',
              onClick: handleEvaluate.bind(null, record),
            },
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <addClass @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRefs } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { CourseClient } from '/@/utils/onlineSchool/know/courseClient';
  let courseClient = new CourseClient();
  import { useDrawer } from '/@/components/Drawer';
  import { useRouter, useRoute } from 'vue-router';
  import dataList from '/@/utils/dataList';

  import addClass from './addClass.vue';
  import KindSearch from '/@/components/view/kindSearch.vue';
  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, addClass, KindSearch },
    setup() {
      const type = 1;
      const productLine = ref(1);
      const router = useRouter();
      const route = useRoute();
      const state = reactive({
        productLinelist: dataList.productLine,
        kindSearch: {
          shooleShow: true,
          kindShow: true,
          zyShow: true,
          classShow: false,
          kcShow: false,
        },
        kindSchemas: [
          {
            field: 'isPass',
            label: '上架状态',
            component: 'Select',
            componentProps: {
              options: dataList.aPass,
            },
            colProps: {
              span: 6,
            },
          },
          {
            field: 'addTime',
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
            field: 'tiitle',
            component: 'Input',
            label: '搜索:',
            colProps: {
              span: 6,
            },
            componentProps: {
              placeholder: '请输入知识套餐名称',
              onChange: (e: any) => {},
            },
          },
        ],
        kindVal: {} as any,
        kindZyName: '所属专业',
        columns: [],
      });
      if (route.path == '/onlineSchool/class/vipClass') {
        productLine.value = 3;
      }
      /* 初始化表格 */
      const [registerTable, { reload }] = useTable({
        title: '',
        /*   api: courseClient.getPageList, */ api: courseClient.getCoursePackageList,
        beforeFetch: (t: any) => {
          if (t.addTime) {
            let time = [...t.addTime];
            t.addTime = time[0];
            t.cTime = time[1];
          }
          t.productLine = unref(productLine);
          t.tiitle = state.kindVal.name;
          t.isPass = state.kindVal.isPass;
          t.kind = state.kindVal.kind;
          t.zyId = state.kindVal.zyId;
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
        /**列配置
         * slots：自定义的插槽 */
        columns: [
          { title: '知识套餐名称', dataIndex: 'tiitle', align: 'left' },
          { title: '所属项目', dataIndex: 'kindName' },
          // { title: 'stageName', dataIndex: 'zStage' },
          { title: '所属专业', dataIndex: 'zyName', slots: { title: 'kindZyName' } },
          {
            title: '套餐阶段',
            dataIndex: 'zyName',
            ifShow: () => {
              return unref(productLine) == 3;
            },
          },
          { title: '知识套餐价格', dataIndex: 'price', width: 100 },
          { title: '上架状态', dataIndex: 'isPass', width: 100, slots: { customRender: 'isPass' } },
          { title: '添加人', dataIndex: 'createUser', width: 120 },
          { title: '添加时间', dataIndex: 'addTime', width: 180 },
        ],
        /* 表单配置，参考表单组件的 Props */

        /* 使用搜索表单	 */
        useSearchForm: false,
        /* 显示表格设置工具	 */
        showTableSetting: true,
        //bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 400,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          align: undefined,
        },
      });
      /* -----------搜索 --------------------- */
      function submit(value) {
        state.kindVal = value;
        state.kindZyName = value.kindZyName;
        reload();
      }
      /* -----------添加--弹窗 --------------------- */
      /* 初始化弹窗 */
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerMenu, { openDrawer: openMenu }] = useDrawer();
      /* 添加 */
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
          productLine: unref(productLine),
        });
      }
      /* 编辑 */
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          type: type,
          isUpdate: true,
        });
      }
      /* 添加编辑成功 */
      function handleSuccess() {
        reload();
      }
      /* 删除 */
      function handleDelete(record: Recordable) {
        courseClient.videocourseDelete(record.id).then((res) => {
          reload();
        });
      }
      /* 更新知识套餐状态 */
      function showChange(record: Recordable) {
        courseClient.updateStatusClass(record.id, 2).then((res) => {
          reload();
        });
      }
      /* 套餐课程 */
      function handClassCourse(record: Recordable) {
        router.push({
          path: '/onlineSchool/class/classCourse',
          query: {
            id: record.id,
            title: record.tiitle,
            productLine: record.productLine,
            learningPhase: record.learningPhase,
          },
        });
        // router.push(`/know/course/videoChat?id=${record.id}`);
      }
      /* 套餐课程包 */
      function handleData(record: Recordable) {
        router.push(
          `/onlineSchool/class/coursepackage?classId=${record.id}&productLine=${record.productLine}&learningPhase=${record.learningPhase}`,
        );
      }
      /* 评价 */
      function handleEvaluate(record: Recordable) {
        router.push(`/know/score/stuComment?typeId=${record.id}&type=1`);
      }
      /* 专属教材 */
      function handleTeacher(record: Recordable) {
        router.push(`/know/class/classTeaching?typeId=${record.id}&type=1`);
      }

      /* 课程模考 */
      function handleExam(record: Recordable, type: number) {
        router.push({
          path: '/know/class/courseExam',
          query: {
            classId: record.id,
            type: type,
            zyId: record.zyId,
            kind: record.kind,
          },
        });
      }
      return {
        ...toRefs(state),
        productLine,
        submit,
        registerTable,
        registerDrawer,
        registerMenu,
        showChange,
        handClassCourse,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleEvaluate,
        handleTeacher,
        handleData,
        handleExam,
      };
    },
  });
</script>
