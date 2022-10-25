import { ref } from 'vue';
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { Menu } from '/@/utils/setUp/menu';
const menu = new Menu();
export function getBasicColumns(): BasicColumn[] {
  return [
    { title: '菜单名称', dataIndex: 'name', align: 'left', width: 180 },
    { title: 'path', dataIndex: 'path', align: 'left' },
    { title: '文件路径', dataIndex: 'url', align: 'left' },
    { title: '菜单类型', dataIndex: 'type', width: 100, slots: { customRender: 'type' } },
    { title: '图标', dataIndex: 'icon', width: 80, slots: { customRender: 'icon' } },
    { title: '排序', dataIndex: 'sort', width: 60 },
    { title: '备注', dataIndex: 'remark', width: 120 },
    { title: '更新时间', dataIndex: 'createTime', width: 180 },
  ];
}
const res = menu.getFuKindList();
// let res1 = await JSON.parse(JSON.stringify(res.data).replaceAll(/name/g, 'label'));
// let res2 = await JSON.parse(JSON.stringify(res1).replaceAll(/id/g, 'value'));
const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;
export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
    colProps: { lg: 24, md: 24 },
  },

  {
    field: 'parentId',
    label: '上级菜单',
    component: 'Cascader',

    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
        children: 'children',
      },
      disabled: 'isUpdate',
      options: res.data,
      checkStrictly: true,
    },
  },
  {
    field: 'path',
    label: '路径',
    component: 'Input',
  },
  {
    field: 'url',
    label: '文件路径',
    component: 'Input',
  },
  {
    field: 'sort',
    label: '排序',
    ifShow: ({ values }) => isMenu(values.type),
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
  },
  {
    field: 'permissionValue',
    label: '按钮权限值',
    ifShow: ({ values }) => isButton(values.type),
    component: 'InputNumber',
    required: true,
  },

  {
    field: 'isCache',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
  },
];
