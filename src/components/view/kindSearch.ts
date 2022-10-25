/*
 * @Author: 南桥几许
 * @Date: 2022-06-22 14:34:26
 * @LastEditTime: 2022-06-22 14:48:05
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\components\view\kindSearch.ts
 *
 */
import type { ComputedRef, Slots } from 'vue';
import type { BasicTableProps, FetchParams } from '../types/table';
import { unref, computed } from 'vue';
import type { FormProps, FormSchema } from '/@/components/Form';
import { isFunction } from '/@/utils/is';
const shooleList = [];
const kindList = [];
const zyList = [];
const classList = [];
export function kind() {
  return [
    {
      field: 'name',
      component: 'Select',
      label: '所属大类:',
      colProps: {
        span: 6,
      },
      componentProps: {
        placeholder: '请选择所属大类',
        options: shooleList,
        onChange: (e: any) => {},
      },
    },
    {
      field: 'type',
      component: 'Select',
      label: '所属项目:',
      colProps: {
        span: 6,
      },
      componentProps: {
        options: kindList,
      },
    },
  ];
}
export function kindZy() {
  return [
    {
      field: 'name',
      component: 'Select',
      label: '所属大类:',
      colProps: {
        span: 6,
      },
      componentProps: {
        placeholder: '请选择所属大类',
        options: shooleList,
        onChange: (e: any) => {},
      },
    },
    {
      field: 'type',
      component: 'Select',
      label: '所属项目:',
      colProps: {
        span: 6,
      },
      componentProps: {
        options: kindList,
      },
    },
    {
      field: 'type',
      component: 'Select',
      label: '所属项目:',
      colProps: {
        span: 6,
      },
      componentProps: {
        options: zyList,
      },
    },
  ];
}
