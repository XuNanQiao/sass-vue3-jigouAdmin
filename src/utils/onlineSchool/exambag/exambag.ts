/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-07-07 11:06:35
 * @LastEditors: 隐世浮华
 * @LastEditTime: 2022-07-07 11:32:19
 * @FilePath: \edub_tob_jxyZ\src\utils\onlineSchool\exambag\exambag.ts
 */
import { defHttp, imdefHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();
export class exambag {
  /**页查询*/
  async getQuestionPackageList(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ques/questionPackage/getQuestionPackageList`,
        params: params,
      },
      { errorMessageMode: 'none' },
    );

    return data;
  }
  /**删除*/
  async deleteQuestionPackage(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ques/questionPackage/deleteQuestionPackage`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }

  /**添加*/
  async addQuestionPackage(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ques/questionPackage/addQuestionPackage`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**修改*/
  async updateQuestionPackage(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ques/questionPackage/updateQuestionPackage`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
}
