import { defHttp } from '/@/utils/http/axios';

/* const 常量是块级范围的，非常类似用 const 语句定义的变量。但常量的值是无法（通过重新赋值）改变的，也不能被重新声明。 */
// 查询所有的院校
export const getAllCollage = async () => {
  const data = await defHttp.get({
    url: '/kecheng/pKind/getAllCollage',
    method: 'GET',
  });
  return data;
};
// 查询所有的项目
export const selectKindAll = async () => {
  const data = await defHttp.get({
    url: '/kecheng/pKind/selectKindAll',
    method: 'GET',
  });
  return data;
};
/**项目详情 */
export const selectByKindId = async (kindId: any) => {
  const data = await defHttp.get({
    url: `/kecheng/pKind/selectByKindId?kindId=${kindId}`,
    method: 'GET',
  });
  return data;
};
// 根据学院查项目
export const selectTypeByCollageId = async (collageId: any) => {
  const data = await defHttp.get({
    url: `/kecheng/pKind/selectTypeByCollageId?collageId=${collageId}`,
    method: 'GET',
  });
  return data;
};
/**查询专业字段扩展详情 */
export const selectFieldExtendDetail = async (id: any) => {
  const res: any = await defHttp.get({
    url: `/kecheng/fieldExtend/selectFieldExtendDetail`,
    method: 'GET',
    params: {
      kindId: id,
    },
  });
  return res;
};
/**查询课程字段扩展详情 */
export const selectPKcExtendDetail = async (id: any) => {
  const res: any = await defHttp.get({
    url: `/kecheng/KcExtend/selectPKcExtendDetail`,
    method: 'GET',
    params: {
      kindId: id,
    },
  });
  return res;
};
//根据项目查询专业
export const selectZhuanyeByKind = async (kindId?: any) => {
  const data = await defHttp.get({
    url: `/kecheng/zhuanye/selectZhuanyeByKind`,
    method: 'GET',
    params: { kindId: kindId },
  });
  return data;
};
//获取学院列表专业
export const selectByKindOrStage = async (kindId: any, zStage: any) => {
  const data = await defHttp.get({
    url: `/ucenter/api/allcur/selectByKindOrStage`,
    method: 'GET',
    params: { kind: kindId },
  });
  return data;
};
// 查询所有专业
export const ZhuanyeSelectAll = async () => {
  const data = await defHttp.get({
    url: '/kecheng/zhuanye/selectAll',
    method: 'GET',
  });
  return data;
};
// 根据专业查课程列表
export const getKechengList = async (params: {
  kind?: number;
  zyId?: number;
  kcName?: string;
  kcType?: number;
}) => {
  const data = await defHttp.get({
    url: '/kecheng/zhuanyekecheng/getKechengList',
    method: 'GET',
    params,
  });
  return data;
};
// 根据专业查课程列表
export const getKindZidList = async (params: {
  kind?: number;
  zyId?: number;
  kcName?: string;
  kcType?: number;
}) => {
  const data = await defHttp.get({
    url: '/kecheng/kecheng/getKindZidList',
    method: 'GET',
    params,
  });
  return data;
};
/* ==============省份============================================== */
// 查询所有的省份
/* export const selectAllProvice =  async () =>
  {const data=await  defHttp.get({
         baseURL: userInfo.loginType&&userInfo.loginType == "teacher" ? process.env.VUE_APP_teacher_API : process.env.VUE_APP_BASE_API,
      url:'/kecheng/area/selectAllProvice',
    method: 'GET',
   })
  return data} */
//根据省份查询地级市
export const selectProviceByid = async (proviceId: any) => {
  const data = await defHttp.get({
    url: `/kecheng/area/selectProviceByid`,
    method: 'GET',
    params: { proviceId: proviceId },
  });
  return data;
};
// 课程题库系统===查询所有的省份
export const selectByType = async (type: number, lName?: string) => {
  const data = await defHttp.get({
    url: `/kecheng/lanmu/selectByType`,
    method: 'GET',
    params: {
      type: type,
      lName: lName,
    },
  });
  return data;
};
//课程题库系统===根据省份查询地级市
export const selectByPId = async (parentId: any) => {
  const data = await defHttp.get({
    url: `/kecheng/fenlei/selectByPId`,
    method: 'GET',
    params: { parentId: parentId },
  });
  return data;
};
/* ==============开考============================================== */

// 开考配置分页列表
export const examConfiguration = async (params: any) => {
  const data = await defHttp.get({
    url: '/kecheng/openExam/selectPOpenExamPage',
    method: 'GET',
    params,
  });
  return data;
};
// 添加开考配置
export const addExamConfiguration = async (data: any) => {
  const sub = await defHttp.get({
    url: '/kecheng/openExam/addPOpenExam',
    method: 'POST',
    data,
  });
  return sub;
};
// 删除开考配置
export const delExamConfiguration = async (params: any) => {
  const data = await defHttp.get({
    url: '/kecheng/openExam/deletePOpenExam',
    method: 'POST',
    params,
  });
  return data;
};
// 修改开考配置
export const updateExamConfiguration = async (data: any) => {
  const sub = await defHttp.get({
    baseURL: process.env.VUE_APP_teacher_API,
    url: '/kecheng/openExam/updatePOpenExam',
    method: 'POST',
    data,
  });
  return sub;
};
/* =======================课程报考===================== */
// 报考信息分页
export const getServeApplySubjectList = (params: any) =>
  defHttp.get({
    url: '/stu/api/getBkSemesterList',
    method: 'GET',
    params,
  });
// 分页获取课程报考学生信息
export const getServeApplySubjectdetail = (params: any) =>
  defHttp.get({
    url: '/stu/serveApplySubject/getServeApplySubjectdetail',
    method: 'GET',
    params,
  });
// 分页获取课程报考学生信息
export const getBkSemesterStuList = (params: any) =>
  defHttp.get({
    url: '/stu/api/getBkSemesterStuList',
    method: 'GET',
    params,
  });
// 修改学生课程报考信息
export const updateApply = (params: any) =>
  defHttp.get({
    url: '/stu//api/addStuExamCourse',
    method: 'GET',
    params,
  });
//  获取学生报考科目信息
export const getServeApplySubjectdetailList = (params: any) =>
  defHttp.get({
    url: '/kecheng/openExam/getOpenExamApiList',
    method: 'GET',
    params,
  });

/* ======================成绩管理====================== */
// 分页获取成绩管理
export const getServeGradeList = (params: any) =>
  defHttp.get({
    url: '/stu/serveGrade/getStuExamList',
    method: 'GET',
    params,
  });
// 获取学生成绩详情
export const getServeGradeDetail = (params: any) =>
  defHttp.get({
    url: '/stu/serveGrade/getStuExamCourse',
    method: 'GET',
    params,
  });
/* 修改学生成绩 */
export const updateServeGrade = (params: any) =>
  defHttp.get({
    url: '/stu/serveGrade/updateStuExamCourse',
    method: 'GET',
    params,
  });
/* 删除学生成绩 */
export const deleteServeGrade = (params: any) =>
  defHttp.get({
    url: '/stu/serveGrade/deleteServeGrade',
    method: 'GET',
    params,
  });
/* ===============================学习管管理-督学管理========================================================= */
/* ============授课动态=========== */
/* 总后台授课动态 */
export const selectEduSectionAll = (params: any) =>
  defHttp.get({
    url: '/kecheng/eduData/selectEduSectionAll',
    method: 'GET',
    params,
  });
/* 入驻商后台授课动态 */
export const selectTenanteEduSectionAll = (params: any) =>
  defHttp.get({
    url: '/kecheng/eduData/selectTenanteEduSectionAll',
    method: 'GET',
    params,
  });

/* =====公共组件================================================================================================================================== */
/* =====网易============================== */
//网易登录注册
export const regist = async (mobile: any, name: string, icon?: string) => {
  const data = await defHttp.get({
    url: `/neteasy/user/regist`,
    method: 'POST',
    params: { mobile: mobile, name: name, icon: icon },
  });
  return data;
};
//获取验证码
export async function getcode(mobile: any) {
  const data: any = await defHttp.get({
    url: `/ucenter/loginSms/code`,
    method: 'GET',
    params: { phoneNum: mobile, smsTmplName: 'welcomePotential' },
  });

  return data;
}
//获取验证码(机构后台验证码)
export async function geTenantCode(mobile: any) {
  const data: any = await defHttp.get({
    url: `/ucenter/loginSms/tenantCode`,
    method: 'GET',
    params: { phoneNum: mobile, smsTmplName: 'welcomePotential' },
  });

  return data;
}

/* ====================入驻商=================================================================================================================== */

// 查询所有的项目
export const oraKindAll = async () => {
  const data = await defHttp.get({
    url: '/kecheng/basics/selectKindList',
    method: 'GET',
  });
  return data;
};
