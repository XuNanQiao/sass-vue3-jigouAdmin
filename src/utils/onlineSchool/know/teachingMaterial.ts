/*
 * @Author: 南桥几许
 * @Date: 2022-06-08 10:25:33
 * @LastEditTime: 2022-07-12 14:09:54
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\utils\onlineSchool\know\teachingMaterial.ts
 *
 */
import { defHttp } from '/@/utils/http/axios';
// import { ErrorMessageMode } from '/#/axios';

export class TeachingMaterialClient {
  //分页查询自研课程记录
  async getSelfResearchTextBook(params: {
    pageSize: number;
    pageNum: number;
    firstKindId?: string;
    kindId?: string;
    teacherId?: string;
    researchStarttime?: string;
    researchEndtime?: string;
    textbookName?: string;
  }) {
    const data: any = await defHttp.post({
      url: `/kecheng/researchTextbook/getSelfResearchTextBook`,
      method: 'POST',
      params: params,
    });
    return data;
  }
  //新增自研教材
  async addSelfResrarchTextBook(sub: {
    nickname: string;
    userId: string;
    textbookName: string;
    kindId: string;
    kechengId: string;
    teacherId: string;
    bookVersion: string;
    researchStarttime: string;
    researchEndtime: string;
    faceImg: string;
    textBookNote: string;
    chapterText: string;
    netFileUrl: string;
    netFileSize: string;
    totalChar: string;
    tryRead: string;
    textbook_level: string;
    zhuanyeId: string;
    bigKindId: string;
    netFilePath: string;
    fileName: string;
  }) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/researchTextbook/addSelfResrarchTextBook`,
        method: 'POST',
        data: sub,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //更新自研教材
  async updateSelfResrarchTextBook(sub: {
    id: number;
    nickname: string;
    userId: string;
    textbookName: string;
    kindId: string;
    kechengId: string;
    teacherId: string;
    bookVersion: string;
    researchStarttime: string;
    researchEndtime: string;
    faceImg: string;
    textBookNote: string;
    chapterText: string;
    netFileUrl: string;
    netFileSize: string;
    totalChar: string;
    tryRead: string;
    textbook_level: string;
    zhuanyeId: string;
    bigKindId: string;
    netFilePath: string;
    fileName: string;
  }) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/researchTextbook/updateSelfResrarchTextBook`,
        method: 'POST',
        data: sub,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**逻辑删除*/
  async delRecordLogic(reocrdId: string) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/researchTextbook/delRecordLogic`,
        method: 'POST',
        params: { reocrdId: reocrdId },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
}
