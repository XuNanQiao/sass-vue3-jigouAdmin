/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-28 17:58:53
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-06-30 09:30:41
 * @FilePath: \edub_tob_jxyZ\src\views\setUp\note\noteModel\tableData.tsx
 */
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    { title: '模板名称', dataIndex: 'templateName', align: 'left' },
    { title: '模板Code', dataIndex: 'templateCode', align: 'left' },
    {
      title: '模板类型',
      dataIndex: 'type',
      align: 'left',
      slots: { customRender: 'type' },
      width: 180,
    },
    { title: '创建时间', dataIndex: 'creationTime', width: 180 },
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
