/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-29 10:20:18
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-07-01 14:02:14
 * @FilePath: \edub_tob_jxyZ\src\views\onlineSchool\exam\testCenter\tableData.tsx
 */
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    { title: '所属', dataIndex: 'entrantsType', align: 'left' },
    { title: '所属项目', dataIndex: 'kindName', align: 'left', width: 180 },
    { title: '所属专业', dataIndex: 'majorName', align: 'left', width: 180 },
    { title: '课程名称', dataIndex: 'courseName', align: 'left', width: 180 },
    { title: '所属章节', dataIndex: 'chapterName', align: 'left', width: 180 },
    { title: '排序', dataIndex: 'orderNum', align: 'left', width: 90 },
    {
      title: '是否显示',
      dataIndex: 'showStatus',
      width: 90,
      slots: { customRender: 'showStatus' },
    },
    { title: '创建时间', dataIndex: 'createTime', width: 180 },
  ];
}

export const formSchema: FormSchema[] = [
  {
    field: 'templateCode',
    label: '模板code',
    component: 'Input',
    required: true,
    colProps: { lg: 12, md: 24 },
  },
  {
    field: 'type',
    label: '短信类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '验证码模板', value: 1 },
        { label: 'sop通知模板', value: 2 },
        { label: '任务管家通知模板', value: 3 },
      ],
    },
    required: true,
    colProps: { lg: 24, md: 24 },
  },

  {
    field: 'templateName',
    label: '短信标题',
    component: 'Input',
    required: true,
    colProps: { lg: 12, md: 24 },
  },
  {
    field: 'templateContent',
    label: '短信内容',
    component: 'Input',
    required: true,
    colProps: { lg: 24, md: 24 },
    slot: 'Content',
  },
];
