/*
 * @Author: 南桥几许
 * @Date: 2022-06-08 10:25:33
 * @LastEditTime: 2022-06-08 14:19:01
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\api\sys\model\userModel.ts
 *
 */
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  type: number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
