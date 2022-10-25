/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-29 10:20:18
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-06-29 10:22:29
 * @FilePath: \edub_tob_jxyZ\src\views\setUp\note\payList\tableData.tsx
 */

import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    { title: '入驻商名称', dataIndex: 'entrantsName', align: 'left' },
    { title: '购买条数', dataIndex: 'number', align: 'left', width: 180 },
    {
      title: '花费金额',
      dataIndex: 'price',
      align: 'left',
      width: 180,
    },
    { title: '购买时间', dataIndex: 'payTime', width: 180 },
  ];
}
