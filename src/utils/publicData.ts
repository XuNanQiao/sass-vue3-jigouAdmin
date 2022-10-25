import { defHttp } from '/@/utils/http/axios';
export class publicData {
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
}
