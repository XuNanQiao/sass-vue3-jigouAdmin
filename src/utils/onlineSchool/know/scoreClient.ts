/*
 * @Author: 南桥几许
 * @Date: 2022-06-08 10:25:33
 * @LastEditTime: 2022-07-05 18:04:56
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\utils\onlineSchool\know\scoreClient.ts
 *
 */
import { BasicPageParams } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
// import { ErrorMessageMode } from '/#/axios';

export class ScoreClient {
  /* ===============评分管理================================================================ */
  /**后台评分列表 */
  async getStudentScoreList(params: {
    pageSize: number;
    pageNum: number;
    type?: number;
    typeId?: number;
    chapterId?: number;
    sectionId?: number;
    isCheck?: number;
    userName?: string;
    startTime?: string;
    endTime?: string;
    tenantId?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/stuScore/getStudentScoreList`,
      method: 'GET',
      params: params,
    });

    return data;
  }
  /**修改--审核状态*/
  async updateStudentScoreState(id: number) {
    const data: any = await defHttp.post({
      url: `/kecheng/stuScore/updateStudentScoreState`,
      method: 'POST',
      params: {
        id: id,
      },
    });

    return data;
  }
  /* ===============评价管理================================================================ */
  /**后台评分列表 */
  async getStudentEvaluateList(params: {
    pageSize: number;
    pageNum: number;
    type?: number;
    typeId?: number;
    classId?: number;
    isCheck?: number;
    content?: string;
    startTime?: string;
    endTime?: string;
    tenantId?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/stuEvaluate/getStudentEvaluateList`,
      method: 'GET',
      params: params,
    });

    return data;
  }
  /**修改--审核状态*/
  async updateStudentEvaluateState(id: number) {
    const data: any = await defHttp.post({
      url: `/kecheng/stuEvaluate/updateStudentEvaluateState`,
      method: 'POST',
      params: {
        id: id,
      },
    });

    return data;
  }
  /**后台知识套餐评分列表 */
  async getClassStudentEvaluate(params: {
    pageSize: number;
    pageNum: number;
    type?: number;
    typeId?: number;
    isCheck?: number;
    content?: string;
    startTime?: string;
    endTime?: string;
    tenantId?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/stuEvaluate/getClassStudentEvaluate`,
      method: 'GET',
      params: params,
    });
    return data;
  }
}
