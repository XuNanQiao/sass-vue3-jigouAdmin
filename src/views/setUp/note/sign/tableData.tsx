/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-29 14:09:09
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-06-29 14:24:53
 * @FilePath: \edub_tob_jxyZ\src\views\setUp\note\sign\tableData.tsx
 */
import { ref } from 'vue';
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    { title: '签名名称', dataIndex: 'signatureName', align: 'left' },
    { title: '签名Code', dataIndex: 'signatureCode', align: 'left' },
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
