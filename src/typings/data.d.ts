declare interface AllDoto<T> {
  code: number;
  msg?: string;
  data: T;
}
declare interface AllMsgDoto<T> {
  code: number;
  msg: T;
  data?: string;
}
declare interface TabDoto<T> {
  total: number;
  rows: T;
}
//表头
declare interface tabHeader {
  name: string;
  val: string;
  align?: string;
  width?: number;
  class?: string;
  sortable?: boolean;
}
/* ---------------用户信息----------------------------- */

//用户信息
declare interface userInfo {
  id: number;
  icon: string | null;
  name: string | null;
  nickname?: string | null;
  permissionValueList?: permissionValueList | null;
  roles?: string[];
  tenantId: number | null;
  isAdmin?: string;
  loginType?: string;
  wxUserId?: string;
  phoneNum?: string | null;
  entrantsType?: number;
  entrantsStoreType?: number;
  entrantsName?: string | null;
}
/* 菜单 */
declare interface permissionValueList {
  children?: permissionValueList[];
  id: number;
  meta: any;
  name: string | null;
  path: string | null;
  permissionValue: string | null;
  type: number | null;
  url: string | null;
}
/* 角色 */
declare interface roleValueList {
  createTime: string;
  entrantsType: number;
  id: number;
  isDelete: number;
  name: string;
  remark: string;
  searchTenant: number | null;
  select: boolean;
  tenantId: number;
  type: number;
}

/* 分类 */
declare interface classSelectValueList {
  fAddtime: string;
  fDelete: number;
  fDesc: string;
  fId: number;
  fIspass: number;
  fName: string;
  fOrders: number;
  fShortname: string;
  fType: number;
  fUpdatetime: string;
}
/* ---------------积分商城----------------------------- */
/* 教辅资料分离 */
declare interface CateRecord {
  cateLevel: number;
  cateName?: string;
  cateSort: number;
  childJson?: string;
  createTime?: string;
  icon: null | string;
  id: string;
  isDelete: number;
  isShow: null | string; //是否显示 1是 0否
  parentId: null | string;
  productType: number;
  selectIcon: null | string;
  typeNote: null | string;
  chill?: CateRecord[];
}
/* ---------------积分商城----------------------------- */
declare interface BookDoto {
  createAuthor: number;
  createTime: string;
  exchageNum: string | null;
  freightValue: string | null;
  id: string;
  imgJson: string | null;
  isDelete: number;
  labelSort: string | null;
  needFreight: number;
  onlineTime: string | null;
  orderBy: string | null;
  productBigType: string;
  bigCateName: string | null;
  productChannel: null;
  productDescp: string | null;
  productIcon: string | null;
  productLabel: string | null;
  productName: string;
  productNote: null;
  productOnline: number;
  productPrice: number | null;
  productPurchasePrice: string | null;
  productSpec: string | null;
  productStock: string | null;
  productType: string;
  productTypeName: string;
  productUnit: string | null;
  sort: number | null;
  batchUpdateSort: number | null;
  underLinePrice: string | null;
  updateTime: string | null;
  specSalePrice: number | null;
  specId: string | null;
}
