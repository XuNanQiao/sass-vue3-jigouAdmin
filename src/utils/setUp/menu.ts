/*
 * @Author: 南桥几许
 * @Date: 2022-06-08 10:25:33
 * @LastEditTime: 2022-07-05 13:56:17
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\utils\setUp\menu.ts
 *
 */
import { BasicPageParams } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
// import { ErrorMessageMode } from '/#/axios';

export class Menu {
  /**查询所有的菜单*/
  async getFuKindList() {
    const data: any = await defHttp.get(
      {
        url: `/ucenter/sysMenu/queryAllSysMenu`,
        method: 'GET',
      },
      { errorMessageMode: 'none' },
    );

    return data;
  }
  /**查询所有的菜单(新)*/
  async selectPermissionList() {
    const data: any = await defHttp.get({
      url: `/lecturer/sysMenu/selectPermissionList`,
      method: 'GET',
    });

    return data;
  }
  /** 根据入驻商ID查询权限*/
  async getMenuByTenantId() {
    const data: any = await defHttp.get({
      url: `/ucenter/sysMenu/getMenuByTenantId`,
      method: 'GET',
    });

    return data;
  }
  /* 新建菜单
   *parentId 父级id（新建项目父级为0）
   */
  async addMenu(fromData: any) {
    if (!fromData.parentId) {
      fromData.parentId = 0;
    }
    const data: any = await defHttp.post(
      {
        url: `/ucenter/sysMenu/addSysMenu`,

        params: fromData,
      },
      {
        errorMessageMode: 'message',
      },
    );

    return data;
  }

  /* 编辑菜单
   *parentId 父级id（新建项目父级为0）
   */
  async editMenu(fromData: any) {
    if (!fromData.parentId) {
      fromData.parentId = 0;
    }
    const data: any = await defHttp.post(
      {
        url: `/ucenter/sysMenu/updateSysMenu`,
        params: fromData,
      },
      {
        errorMessageMode: 'message',
      },
    );
    return data;
  }

  /* 递归删除菜单
   *id 菜单ID
   */
  async deleteSysMenu(id: number) {
    const data = await defHttp.get(
      {
        url: `/ucenter/sysMenu/deleteSysMenu`,
        params: {
          id: id,
        },
      },
      {
        errorMessageMode: 'message',
      },
    );

    return data;
  }

  /* ================角色=========================================================== */
  /* 获取所有的角色 */
  async getAllRole(
    params: BasicPageParams,
    /*  pageSize: number,
    pageNum: number,
    searchTenant?: number,
    type?: number,
    name?: string, */
  ) {
    const data: any = await defHttp.get({
      url: `/ucenter/sysRole/getSysRolePageList`,
      method: 'GET',
      params: params,
    });
    return data;
  }

  /* 添加角色 */
  async addSysRole(params: {
    name: string;
    remark: string;
    type: string;
    entrantsType?: number;
    organaddId?: number;
    tenantId?: number;
  }) {
    const data: any = await defHttp.post(
      {
        url: `/ucenter/sysRole/addSysRole`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /** 修改角色  */
  async updateSysRole(params: {
    id: number;
    name: string;
    remark: string;
    type: string;
    entrantsType?: number;
    organaddId?: number;
  }) {
    const data: any = await defHttp.post(
      {
        url: `/ucenter/sysRole/updateSysRole`,
        method: 'POST',
        params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /* 删除角色 */
  async deleteRole(id: number) {
    const data = await defHttp.get(
      {
        url: `/ucenter/sysRole/deleteSysRole`,
        method: 'GET',
        params: {
          id: id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /* 根据角色获取菜单 */
  async getMenuByRole(roleId: number) {
    const data: any = await defHttp.get({
      url: `/ucenter/sysMenu/getMenuByRole`,
      method: 'GET',
      params: {
        roleId: roleId,
      },
    });

    return data;
  }
  /* 给角色分配菜单权限 */
  async toRoleAssignMenu(roleId: number, sysMenuIds: string) {
    const data: any = await defHttp.request(
      {
        url: `/ucenter/sysMenu/toRoleAssignMenu`,
        method: 'POST',
        params: {
          roleId: roleId,
          sysMenuIds: sysMenuIds,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /* 分页查询角色-供总后台添加用户-查询角色 */
  async getSysRolePageForUserList(searchTenantId?: number) {
    const data: any = await defHttp.get({
      url: `/ucenter/sysRole/getSysRolePageForUserList`,
      method: 'GET',
      params: {
        pageSize: 1000,
        pageNum: 1,
        searchTenantId: searchTenantId,
      },
    });

    return data;
  }
  /* 查询入驻商总管理员角色是否存在 */
  async selectTenantSysRoleExist(tenantId: number) {
    const data: any = await defHttp.get({
      url: `/ucenter/sysRole/selectTenantSysRoleExist`,
      method: 'GET',
      params: {
        tenantId: tenantId,
      },
    });
    // this.functionShow(data);
    return data;
  }
  /**=========================用户管理==============================================================================  */
  /**分页查询用户   */
  async getSysUserPageList(params: {
    pageSize: number;
    pageNum: number;
    userType?: number;
    username?: string;
    searchTenant?: number;
    roleName?: string;
    entrantsType?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/ucenter/sysUser/getSysUserPageList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**用户列表不分页   */
  async getSysUserByCardList(
    userType?: number,
    tenantId?: number,
    status?: string,
    searchTenant?: any,
  ) {
    const params = {
      userType: userType,
      tenantId: tenantId,
      status: status,
      searchTenant: searchTenant,
    };
    const data: any = await defHttp.get({
      url: `/ucenter/sysUser/getSysUserByCardList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**分页查询名片老师用户   */
  async getSysUserByCardPageList(
    pageSize: number,
    pageNum: number,
    username?: string,
    searchTenant?: number,
  ) {
    const params = {
      ...{ pageSize: pageSize, pageNum: pageNum },
      ...{
        userType: 1,
        username: username,
        searchTenant: searchTenant,
      },
    };
    const data: any = await defHttp.get({
      url: `/ucenter/sysUser/getSysUserByCardPageList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**全部客户   */
  async getAllCustomerInfo(
    pageSize: number,
    pageNum: number,
    tenantid?: number,
    source?: number,
    label?: number,
    status?: number,
    userId?: number,
    name?: string,
  ) {
    const params = {
      ...{ pageSize: pageSize, pageNum: pageNum },
      ...{
        tenantid: tenantid,
        source: source,
        label: label,
        status: status,
        userId: userId,
        name: name,
      },
    };
    const data: any = await defHttp.get({
      url: `/customer/customerInfo/getAllCustomerInfo`,
      method: 'GET',
      params: params,
    });
    return data;
  }

  /* 查询角色详情 */
  async getdetail(uid: number) {
    const data: any = await defHttp.get({
      url: `/ucenter/sysUser/selectUserDetail`,
      method: 'GET',
      params: {
        id: uid,
      },
    });

    return data;
  }
  /* 新建用户  */
  async userAdd(val: any) {
    const fromData = { ...val };
    if (val.roleId) {
      fromData.roleId = await val.roleId.join(',');
    }
    if (val.userVideo) {
      fromData.userVideo = await val.userVideo.join(',');
    }
    if (fromData.password) {
      // fromData.password = await Vue.prototype.encrypt(fromData.password);
    }
    const data: any = await defHttp.get({
      url: `/ucenter/sysUser/addSysUser`,
      method: 'POST',
      data: fromData,
    });

    return data;
  }
  /* 编辑用户  */
  async userEdit(val: any) {
    const fromData = JSON.parse(JSON.stringify(val));
    if (val.roleId) {
      fromData.roleId = await val.roleId.join(',');
    }
    if (val.userVideo) {
      fromData.userVideo = await val.userVideo.join(',');
    }
    if (fromData.password) {
      // fromData.password = await Vue.prototype.encrypt(fromData.password);
    }
    const data: any = await defHttp.get({
      url: `/ucenter/sysUser/updateSysUser`,
      method: 'POST',
      data: fromData,
    });

    return data;
  }
  /* 修改密码  */
  async updateSysUserPassword(id: number, password: string, isOld: number, oldPassword?: string) {
    if (password) {
      // password = await Vue.prototype.encrypt(password);
    }
    if (oldPassword) {
      // oldPassword = await Vue.prototype.encrypt(oldPassword);
    }

    const params = {
      ...{ id: id, password: password, isOld: isOld },
      ...{ oldPassword: oldPassword },
    };
    const data: any = await defHttp.get({
      url: `/ucenter/sysUser/updateSysUserPassword`,
      method: 'POST',
      params: params,
    });

    return data;
  }
  /* 修改状态（启用、禁用）  */
  async updateSysUserStatus(id: number) {
    const data: any = await defHttp.get({
      url: `/ucenter/sysUser/updateSysUserStatus`,
      method: 'POST',
      params: {
        id: id,
      },
    });

    return data;
  }
  /* 删除用户-单条删除  */
  async userDel(id: number) {
    const data = await defHttp.get({
      url: `/ucenter/sysUser/deleteSysUser`,
      method: 'GET',
      params: { id: id },
    });
    return data;
  }
  /* ===================讲师============================= */
  /**讲师普通列表*/
  async selectTerList(params: {
    userName?: string;
    loginName?: string;
    userType?: number;
    isOffice?: number;
    method?: any;
    isAppraise?: string;
    isPerAppraise?: string;
    terType?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/lecturer/teacher/selectTerList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
}
