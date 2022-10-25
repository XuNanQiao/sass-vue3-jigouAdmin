/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-07-05 13:54:35
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-07-07 11:21:53
 * @FilePath: \edub_tob_jxyZ\src\views\onlineSchool\exam\exambag\tableData.tsx
 */
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    { title: '试卷包名称', dataIndex: 'name', align: 'left', width: 260 },
    { title: '所属项目', dataIndex: 'kindName', align: 'left', width: 180 },
    { title: '所属专业', dataIndex: 'majorName', align: 'center', width: 110 },
    {
      title: '试卷包类型',
      dataIndex: 'typeName',
      align: 'left',
      width: 180,
      slots: { customRender: 'typeName' },
    },
    { title: '价格', dataIndex: 'packagePrice', width: 90 },
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
