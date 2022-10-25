/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-07-01 11:19:42
 * @LastEditors: 南桥几许
 * @LastEditTime: 2022-07-19 11:55:57
 * @FilePath: \organization\src\utils\onlineSchool\examManage\examManage.ts
 */
import { defHttp, imdefHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();
export class examManage {
  /**页查询*/
  async getQuestionPaperList(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ques/questionPaper/getQuestionPaperList`,
        params: params,
      },
      { errorMessageMode: 'none' },
    );

    return data;
  }
  /**删除*/
  async deleteQuestionPaper(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ques/questionPaper/deleteQuestionPaper`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }

  /**添加*/
  async addQuestionPaper(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ques/questionPaper/addQuestionPaper`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**修改*/
  async updateQuestionPaper(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ques/questionPaper/updateQuestionPaper`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /* ===============试卷包================================================================= */
  /**分页查询试卷包*/
  async getQuestionPackageList(params: {
    pageSize: number;
    pageNum: number;
    majorId?: number;
    typeId?: number;
    name?: string;
    kindId?: number;
    status?: number;
    isPush?: number;
    tenantId?: number;
    courseId?: any;
  }) {
    const data: any = await defHttp.get({
      url: `/ques/questionPackage/getQuestionPackageList`,
      method: 'GET',
      params,
    });
    return data;
  }
  /* ===============资料包================================================================= */
  /**资料包列表*/
  async getDocPackagePage(params: {
    pageNum: number;
    pageSize: number;
    schoolId?: number;
    classifyId?: number;
    addTime?: string;
    updateTime?: string;
    isPass?: number;
    title?: string;
    kind?: number;
    status?: number;
    zyId?: number;
    kId?: number;
    isPush?: number;
    tenantId?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/docpackage/getDocPackagePage`,
      method: 'GET',
      params,
    });
    return data;
  }
  /**资料列表*/
  async getMaterialsPage(params: {
    pageNum: number;
    pageSize: number;
    kind?: number;
    zyId?: number;
    kId?: number;
    classifyId?: number;
    isPass?: number;
    title?: string;
    addTime?: string;
    updateTime?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/materials/getMaterialsPage`,
      method: 'GET',
      params,
    });
    return data;
  }
  /* ================虚拟考场=========================================================================================================== */
  /**查询--虚拟考场--分页列表
   *roomStatus 考场状态 1：未开始 2：进行中 3：已结束*/
  async getVirtualRoomList(params: {
    pageSize: number;
    pageNum: number;
    kindId?: number;
    majorId?: number;
    name?: string;
    searchTenant?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/ques/examinationVirtualRoom/getVirtualRoomList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
}
