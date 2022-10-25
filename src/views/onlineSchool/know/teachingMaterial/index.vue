<!--
 * @Author: 南桥几许
 * @Date: 2022-06-13 11:37:29
 * @LastEditTime: 2022-07-12 10:07:05
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \organization\src\views\onlineSchool\know\teachingMaterial\index.vue
 * 
-->
<template>
  <div>
    <KindSearch :search="kindSearch" :kindSchemas="kindSchemas" @submit="submit" />

    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <template #faceImg="{ record }">
        <TableImg :imgList="record.faceImg.split(',')" />
      </template>
      <template #firstjor="{ record }">
        <div> {{ record.researchStarttime }} -- {{ record.researchEndtime }}</div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <addMaterial @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, toRefs } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { TeachingMaterialClient } from '/@/utils/onlineSchool/know/teachingMaterial';
  let teachingMaterialClient = new TeachingMaterialClient();
  import { Menu } from '/@/utils/setUp/menu';
  let menu = new Menu();
  import { useDrawer } from '/@/components/Drawer';
  import { useRouter, useRoute } from 'vue-router';

  import addMaterial from './addMaterial.vue';
  import KindSearch from '/@/components/view/kindSearch.vue';
  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, TableAction, TableImg, addMaterial, KindSearch },
    setup() {
      const type = 1;
      const router = useRouter();
      const route = useRoute();
      const teacherList = ref();
      getTeacher();
      const state = reactive({
        active: false,
        opened: false,
        kindSearch: {
          shooleShow: true,
          kindShow: true,
          zyShow: false,
          classShow: false,
          kcShow: false,
        },
        kindSchemas: [
          {
            field: 'teacherId',
            label: '研发老师',
            component: 'Select',
            componentProps: {
              options: teacherList,
              fieldNames: {
                label: 'userName',
                value: 'id',
              },
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
            field: 'textbookName',
            component: 'Input',
            label: '教材名称',
            colProps: {
              span: 6,
            },
            componentProps: {
              placeholder: '请输入教材名称',
              onChange: (e: any) => {},
            },
          },
        ],
        kindVal: {} as any,
        kindZyName: '所属专业',
        columns: [],
      });
      /* 获取授课老师列表 */
      async function getTeacher() {
        await menu.selectTerList({ isOffice: 1 }).then((res) => {
          teacherList.value = res.msg;
        });
      }
      /* 初始化表格 */
      const [registerTable, { reload }] = useTable({
        title: '',
        api: teachingMaterialClient.getSelfResearchTextBook,
        beforeFetch: (t: any) => {
          if (t.addTime) {
            let time = [...t.addTime];
            t.researchStarttime = time[0];
            t.cTiresearchEndtimeme = time[1];
          }
          t.textbookName = state.kindVal.textbookName;
          t.kindId = state.kindVal.kind;
          t.teacherId = state.kindVal.teacherId;
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
          { title: '教材名称', dataIndex: 'textbookName', align: 'left' },
          { title: '所属项目', dataIndex: 'kindName' },
          // { title: 'stageName', dataIndex: 'zStage' },
          { title: '所属专业', dataIndex: 'zhuanyeName', slots: { title: 'kindZyName' } },
          { title: '教材版本', dataIndex: 'bookVersion' },
          {
            title: '教材图片',
            dataIndex: 'faceImg',
            slots: { customRender: 'faceImg' },
          },
          { title: '研发日期', dataIndex: 'firstjor', slots: { customRender: 'firstjor' } },
          { title: '研发老师', dataIndex: 'teacherName' },
          { title: '创建人', dataIndex: 'createrName' },
          { title: '创建时间', dataIndex: 'createTime' },
          { title: '电子网盘地址', dataIndex: 'netFileUrl' },
        ],
        /* 表单配置，参考表单组件的 Props */

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
          align: undefined,
        },
      });
      /* -----------搜索 --------------------- */
      function submit(value) {
        console.log(value, '-=---value');

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
        });
      }
      /* 编辑 */
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      /* 添加编辑成功 */
      function handleSuccess() {
        reload();
      }
      /* 删除 */
      function handleDelete(record: Recordable) {
        teachingMaterialClient.delRecordLogic(record.id).then((res) => {
          reload();
        });
      }

      return {
        ...toRefs(state),
        submit,
        registerTable,
        registerDrawer,
        registerMenu,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
