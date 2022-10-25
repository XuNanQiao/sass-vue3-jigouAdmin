/*
 * @Author: 南桥几许
 * @Date: 2022-06-08 10:25:33
 * @LastEditTime: 2022-06-16 08:55:52
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\api\sys\user.ts
 *
 */
import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export async function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  let data: any = null;
  await defHttp
    .post<LoginResultModel>(
      {
        url: '/ucenter/login',
        data: params,
      },
      {
        errorMessageMode: mode,
      },
    )
    .then((res) => {
      data = res;
    });
  return data;
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<AllDoto<userInfo>>(
    { url: '/ucenter/index/info' },
    { errorMessageMode: 'none' },
  );
}
export const getMenuList = () => {
  return defHttp.get<GetUserInfoModel>(
    { url: '/ucenter/index/info' },
    { errorMessageMode: 'none' },
  );
  // return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
