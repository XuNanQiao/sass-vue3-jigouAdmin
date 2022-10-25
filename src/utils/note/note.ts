/*
 * @Description:
 * @Version: 2.0
 * @Author: 隐世浮华
 * @Date: 2022-06-20 14:54:51
 * @LastEditors: 南桥几许
 * @LastEditTime: 2022-07-11 08:51:01
 * @FilePath: \organization\src\utils\note\note.ts
 */
import { defHttp, imdefHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();
export class Note {
  /**短信包列表*/
  async getNotePackageList(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ucenter/notePackage/getNotePackageList`,
        params: params,
      },
      { errorMessageMode: 'none' },
    );

    return data;
  }

  // 修改短信包显示状态
  async updateNotePackageShow(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ucenter/notePackage/updateNotePackageShow`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**入驻商全部列表*/
  async getListAll(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ucenter/entrants/getListAll`,
        params: params,
      },
      { errorMessageMode: 'none' },
    );

    return data;
  }
  /**短信包添加*/
  async addNotePackage(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ucenter/notePackage/addNotePackage`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );

    return data;
  }
  /**短信包修改*/
  async updateNotePackage(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ucenter/notePackage/updateNotePackage`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );

    return data;
  }
  /**获取入驻商模板列表*/
  async getEntrantsNoteTemplateList(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ucenter/noteTemplate/getEntrantsNoteTemplateList`,
        params: params,
      },
      { errorMessageMode: 'none' },
    );
    return data;
  }
  /**删除入驻商模板*/
  async deleteEntrantsNoteTemplate(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ucenter/noteTemplate/deleteEntrantsNoteTemplate`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**添加入驻商模板*/
  async addEntrantsNoteTemplate(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ucenter/noteTemplate/addEntrantsNoteTemplate`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );

    return data;
  }
  /**修改入驻商模板*/
  async updateEntrantsNoteTemplate(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ucenter/noteTemplate/updateEntrantsNoteTemplate`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );

    return data;
  }
  /**获取入驻商购买记录*/
  async getNoteOrderList(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/stu/noteOrder/getNoteOrderList`,
        params: params,
      },
      { errorMessageMode: 'none' },
    );
    return data;
  }
  /**获取入驻商签名列表(总后台)*/
  async getEntrantsNoteSignatureList(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ucenter/noteSignature/getEntrantsNoteSignatureList`,
        params: params,
      },
      { errorMessageMode: 'none' },
    );
    return data;
  }
  /**删除入驻商模板*/
  async deleteEntrantsNoteSignature(params: any) {
    const data: any = await defHttp.get(
      {
        url: `/ucenter/noteSignature/deleteEntrantsNoteSignature`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**修改入驻商签名*/
  async updateEntrantsNoteSignature(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ucenter/noteSignature/updateEntrantsNoteSignature`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );

    return data;
  }
  /**添加入驻商签名*/
  async addEntrantsNoteSignature(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/ucenter/noteSignature/addEntrantsNoteSignature`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );

    return data;
  }
  /**用户聊天注册*/
  async register(params: any) {
    const data: any = await imdefHttp.post(
      {
        url: `/im-user/user/register`,
        params: params,
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
  /**创建群组*/
  async createGroup(params: any, toke: any) {
    const data: any = await imdefHttp.post(
      {
        url: `/im-user/user/createGroup`,
        params: {
          groupName: params.groupName,
        },
        data: JSON.stringify(params.userList),
        headers: { accessToken: toke },
      },
      { errorMessageMode: 'message' },
    );
    return data;
  }
}
