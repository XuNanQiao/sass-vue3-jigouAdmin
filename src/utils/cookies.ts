/*
 * @Author: 南桥几许
 * @Date: 2022-06-15 14:41:55
 * @LastEditTime: 2022-06-15 14:48:08
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\utils\cookies.ts
 *
 */
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';

// App
const sidebarStatusKey = 'sidebar_status';
export const getSidebarStatus = () => localStorage.getItem(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) =>
  localStorage.setItem(sidebarStatusKey, sidebarStatus);

const languageKey = 'language';
export const getLanguage = () => localStorage.getItem(languageKey);
export const setLanguage = (language: string) => localStorage.setItem(languageKey, language);

const sizeKey = 'size';
export const getSize = () => localStorage.getItem(sizeKey);
export const setSize = (size: string) => localStorage.setItem(sizeKey, size);

/* token */

/* 用户信息缓存 */
export const getInfo = () => getAuthCache<userInfo>(USER_INFO_KEY);
export const setInfo = (info: userInfo) => setAuthCache(USER_INFO_KEY, info);
