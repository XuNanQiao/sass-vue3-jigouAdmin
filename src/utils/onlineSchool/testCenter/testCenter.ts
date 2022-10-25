/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-07-01 11:19:42
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-07-01 15:55:01
 * @FilePath: \edub_tob_jxyZ\src\utils\onlineSchool\testCenter\testCenter.ts
 */
import { defHttp, imdefHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();
export class testCenter {
  /**查分页查询考点管理*/
  async getExamPlaceList(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ques/examinationPlace/getExamPlaceList`,
        params: params,
      },
      { errorMessageMode: 'none' },
    );

    return data;
  }
  /**删除--删除考点管理-单条删除*/
  async deleteExamPlace(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ques/examinationPlace/deleteExamPlace`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**修改--审核状态*/
  async updateShowStatus(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ques/examinationPlace/updateShowStatus`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**添加--添加考点管理*/
  async addExamPlace(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ques/examinationPlace/addExamPlace`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**修改--修改考点管理*/
  async updateExamPlace(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ques/examinationPlace/updateExamPlace`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
}
