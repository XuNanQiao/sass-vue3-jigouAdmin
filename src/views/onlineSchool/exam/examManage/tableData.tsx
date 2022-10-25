/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-07-05 13:54:35
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-07-05 14:28:43
 * @FilePath: \edub_tob_jxyZ\src\views\onlineSchool\exam\examManage\tableData.tsx
 */
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    { title: '试卷名称', dataIndex: 'name', align: 'left', width: 260 },
    { title: '所属项目', dataIndex: 'kindName', align: 'left', width: 180 },
    { title: '试看试题(道)', dataIndex: 'seeNum', align: 'center', width: 110 },
    { title: '所属课程', dataIndex: 'courseName', align: 'left', width: 180 },
    { title: '试卷类型', dataIndex: 'typeName', align: 'left', width: 150 },
    { title: '修改前价格', dataIndex: 'priceAgo', align: 'left', width: 90 },
    {
      title: '价格',
      dataIndex: 'paperPrice',
      width: 90,
      slots: { customRender: 'showStatus' },
    },
    { title: '题数', dataIndex: 'subjectNum', width: 90 },
    { title: '总分数', dataIndex: 'totalScore', width: 90 },
    { title: '更新时间', dataIndex: 'updateTime', width: 180 },
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
