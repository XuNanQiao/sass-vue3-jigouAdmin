/*----------- 客户管理--------------------------------- */
// 全部客户 跟踪状态
export enum cuerType {
  未跟踪 = 2,
  跟踪中 = 1,
}
/*----------- 教务系统--------------------------------- */
// 成绩管理状态
export enum statusEnum {
  正常 = 0,
  禁用 = 1,
}
// 上架状态 1上架  0下架
export enum ePasssEnum {
  上架 = 1,
  下架 = 0,
}
// 隐藏状态 1上架  0下架
export enum showTypeEnum {
  显示 = 1,
  隐藏 = 0,
}
// 课程   就是  知识套餐
export enum shopType {
  知识套餐 = 1,
  直播 = 2,
  录播 = 3,
  公开课 = 4,
  资料包 = 5,
  试卷包 = 6,
  音频 = 7,
  图文 = 8,
  专栏 = 9,
  面授 = 10,
  训练营期 = 11,
  试卷 = 12,
  虚拟考场 = 15,
  课程包 = 16,
}
/*==================分类管理================================================= */
export enum classifyType {
  合作伙伴分类 = 1,
  自考专业分类 = 5,
  试卷类型 = 7,
  普通专升本专业分类 = 9,
  学位类别 = 10,
  课程性质 = 11,
  资料分类 = 12,
  课件分类 = 13,
  辅导资料类型 = 14,
  知识套餐类型 = 15,
}
/*==================入驻商================================================= */
export enum entrantsType {
  官方 = 1,
  入驻商 = 2,
  院校 = 3,
}
//用户类型
export enum userType {
  名片用户 = 1,
  登录用户 = 2,
}
/*----------- 知识内容--------------------------------- */

export enum videoTypeEnum {
  直播 = 1,
  录播 = 2,
}
export enum liveTypesEnum {
  串讲课 = 1,
  精讲课 = 2,
  冲刺课 = 3,
}

export enum isliveEnum {
  直播未开始 = 0,
  正在直播,
  回放生成中,
  回放中,
}
export enum coursetypeEnum {
  公开课 = 0,
  导学课,
  试听课,
}
/*----------- 题库子系统--------------------------------- */
export enum TiXingEnum {
  单选题 = 0,
  多选题,
  判断题,
  填空题,
  简答题,
  组合题,
}
/*==================模拟考场================================================= */

//Banner状态
export enum examType {
  知识套餐 = 0,
  考试,
}
export enum mTypeEnum {
  公开 = 1,
  邀请 = 2,
}
//考试类型
export enum mKaoStatus {
  未开始 = 0,
  进行中,
  已结束,
}
/*==================分类管理================================================= */
// 课程分类
export enum entryMode {
  任何人可以参与 = 1,
  输入密码参与 = 2,
  支付后参与 = 3,
}
// 成绩管理状态
export enum tpStatusEnum {
  待审核 = 0,
  审核通过 = 1,
  审核拒绝 = 2,
}
export enum tiStatus {
  未提交 = 0,
  已提交,
}
export enum tiShenStatus {
  未审核 = 0,
  已审核,
}
/*----------- 营销系统--------------------------------- */
export enum typeMarketingCoupon {
  无门槛券 = 1,
  满减券,
  折扣券,
}
export enum administrationEngLevel {
  一级 = 1,
  二级,
  三级,
  四级,
  五级,
}

export enum couponStatus {
  未开始 = 1,
  进行中,
  已结束,
}
export enum receiveStatus {
  未领取 = 0,
  已领取,
}
export enum useStatus {
  未使用 = 0,
  已使用,
}
/*----------- 订单管理--------------------------------- */
/* 商品类型( */
export enum commoditType {
  知识套餐课程 = 1,
  直播课程,
  录播课程,
  公开课程,
  资料包,
} /* 支付方式( */
export enum orderPayMode {
  线下支付 = 0,
  微信支付,
  支付宝支付,
} /* 订单状态( */
export enum orderState {
  待付款 = 0,
  已付款,
  已退款,
}
/*==================学员管理================================================= */
export enum stuifShop {
  已购买 = 1,
  未购买 = 2,
}
/*==================讲师管理================================================= */
export enum tType {
  教研 = 1,
  教学,
  教务,
  讲师,
}
// 隐藏状态 1上架  0下架
export enum openCourse {
  未处理 = 0,
  同意 = 1,
  驳回 = 2,
}
/*==================入驻商消息管理================================================= */
// 入驻商消息管理
export enum orgNewsType {
  订单收款 = 1,
  版本更新 = 2,
  促销消息 = 3,
  资料更新,
  课程更新,
  公告,
}
// 入驻商消息管理
export enum feedbackTypeEnum {
  改进建议 = 1,
  授课师资问题,
  在线考试问题,
  辅导资料问题,
  班主任管理,
  其他,
}
// 入驻商类型
export enum orgTypeEnum {
  同行转型 = 1,
  招商加盟 = 2,
  高校合伙人 = 3,
}
/*==================入驻商消息管理================================================= */
export enum customerLabel {
  无意向客户 = 1,
  意向客户,
  高意向客户,
}
export enum customerStatus {
  已购买 = 1,
  未购买,
}
/*==================营销================================================= */
export enum activityStatus {
  未开始 = 1,
  进行中,
  已结束,
  已停止,
}
/*==================组织状态================================================= */
export enum organizationStatus {
  禁用中 = 0,
  启用中,
}
export enum userssort {
  讲师 = 1,
  教研老师 = 2,
  教学助理 = 3,
}
export enum teachersort {
  全职讲师 = 1,
  兼职讲师 = 2,
}

export enum actstatus {
  未开始 = 0,
  进行中 = 1,
  已结束 = 2,
}
export enum liustatus {
  待审核 = 0,
  通过 = 1,
  不通过 = 2,
}
export enum choiceFirstLayer {
  专升本 = 1,
  高起本 = 2,
  高起专 = 3,
}
export enum degreeForeignLanguage {
  英语 = 1,
  日语 = 2,
  俄语 = 3,
  德语 = 4,
  法语 = 5,
}
export enum registrationFeeOut {
  不需要 = 1,
  是 = 2,
  否 = 3,
}
export enum studentStatus {
  报名 = 0,
  在籍 = 1,
  休学 = 2,
  退学 = 3,
  毕业 = 4,
}
export enum lunwen {
  已提交 = 1,
  已驳回 = 2,
  已通过 = 3,
}
/*----------- 总后台任务--------------------------------- */
export enum zongStatus {
  已接收 = 1,
  未接收,
  进行中,
}
export enum smsSendStatus {
  发送成功 = 1,
  发送失败,
  未发送,
}

export enum taskStatus {
  未开始 = 1,
  进行中,
  已完成,
  已逾期,
}
export enum yuangongStatus {
  未完成 = 0,
  已完成,
}
export enum status {
  未开始 = 1,
  进行中 = 2,
  已结束 = 3,
}
export enum numEnum {
  '零' = 0,
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
  '十六',
  '十七',
  '十八',
  '十九',
  '二十',
  '二十一',
  '二十二',
  '二十三',
  '二十四',
  '二十五',
  '二十六',
  '二十七',
  '二十八',
  '二十九',
  '三十',
  '三十一',
  '三十二',
  '三十三',
  '三十四',
  '三十五',
  '三十六',
  '三十七',
  '三十八',
  '三十九',
  '四十',
  '四十一',
  '四十二',
  '四十三',
  '四十四',
  '四十五',
  '四十六',
  '四十七',
  '四十八',
  '四十九',
  '五十',
  '五十一',
  '五十二',
  '五十三',
  '五十四',
  '五十五',
  '五十六',
  '五十七',
  '五十八',
  '五十九',
  '六十',
  '六十一',
  '六十二',
  '六十三',
  '六十四',
  '六十五',
  '六十六',
  '六十七',
  '六十八',
  '六十九',
}
export enum minzuEnum {
  汉族 = 1,
  蒙古族 = 2,
  回族 = 3,
  藏族 = 4,
  维吾尔族 = 5,
  苗族 = 6,
  彝族 = 7,
  壮族 = 8,
  布依族 = 9,
  朝鲜族 = 10,
  满族 = 11,
  侗族 = 12,
  瑶族 = 13,
  白族 = 14,
  土家族 = 15,
  哈尼族 = 16,
  哈萨克族 = 17,
  傣族 = 18,
  黎族 = 19,
  傈僳族 = 20,
  佤族 = 21,
  畲族 = 22,
  高山族 = 23,
  拉祜族 = 24,
  水族 = 25,
  东乡族 = 26,
  纳西族 = 27,
  景颇族 = 28,
  柯尔克孜族 = 29,
  土族 = 30,
  达斡尔族 = 31,
  仫佬族 = 32,
  羌族 = 33,
  布朗族 = 34,
  撒拉族 = 35,
  毛南族 = 36,
  仡佬族 = 37,
  锡伯族 = 38,
  阿昌族 = 39,
  普米族 = 40,
  塔吉克族 = 41,
  怒族 = 42,
  乌孜别克族 = 43,
  俄罗斯族 = 44,
  鄂温克族 = 45,
  德昂族 = 46,
  保安族 = 47,
  裕固族 = 48,
  京族 = 49,
  塔塔尔族 = 50,
  独龙族 = 51,
  鄂伦春族 = 52,
  赫哲族 = 53,
  门巴族 = 54,
  珞巴族 = 55,
  基诺族 = 56,
}
export enum zhegzhimianmao {
  中共党员 = 1,
  中共预备党员 = 2,
  共青团员 = 3,
  群众 = 4,
}

export enum sendUnit {
  时 = 1,
  分,
  秒,
}
export enum sendTypeEnum {
  群公告 = 1,
  退订,
  文本,
  '图片/视频',
  文档,
  名片,
  链接,
}
export enum sendModeEnum {
  公众号 = 1,
  群聊,
  短信,
}
export enum templateTypeEnum {
  公众号 = 1,
  群广告,
  短信及站内信,
  教师,
  教师模板,
  触发模板,
  自动添加学生,
}
export enum sendModeSopEnum {
  公众号 = 1,
  群聊,
  短信,
  站内信,
}
export enum schoolType {
  成人高考 = 1,
  网教电大 = 2,
  同等学力 = 3,
}
export enum taskType {
  通用信息任务 = 1,
  非通用信息任务 = 2,
  通知任务 = 3,
  员工任务,
  模板任务,
}
/*==================教务成考================================================= */

export enum waiyu {
  英语 = 1,
  日语 = 2,
  俄语 = 3,
  法语 = 4,
  德语 = 5,
}
export enum lunjindu {
  论文选题 = 1,
  论文开题 = 2,
  论文初稿 = 3,
  论文二稿 = 4,
  论文终稿 = 5,
  论文答辩 = 6,
}
export enum lunwenst {
  未提交 = 1,
  已驳回 = 2,
  已通过 = 3,
}

export enum tdzt {
  待操作 = 0,
  已调课 = 1,
  已拒绝 = 2,
}
export enum types {
  验证码模板 = 1,
  sop通知模板 = 2,
  任务管家通知模板 = 3,
}
export enum sendState {
  发送成功 = 0,
  发送失败 = 1,
}
export enum costTypes {
  其他 = 0,
  报名费 = 1,
  学费 = 2,
  书费 = 3,
  信息采集费 = 4,
  补考费 = 5,
}
export enum classanswerstatus {
  已关闭 = 1,
  未关闭已确认 = 2,
  未关闭未确认 = 3,
}
export enum isCloses {
  未关闭 = 0,
  已关闭 = 1,
}
export enum isConfirms {
  未确认 = 0,
  已确认 = 1,
}
export enum isChoices {
  未选中 = 0,
  已选中 = 1,
}
export enum userstatuss {
  全职讲师 = 1,
  兼职讲师 = 2,
  学生用户 = 3,
  普通用户 = 4,
}
export enum isChecks {
  未审核 = 0,
  已审核 = 1,
}
export enum paperstatus {
  阅卷未开始 = 0,
  阅卷已完成 = 1,
  阅卷进行中,
}
export enum questionTypes {
  单项选择 = 0,
  多项选择 = 1,
  判断题,
  填空题,
  主观题,
  组合题,
}
export enum isChecksed {
  待审核 = 0,
  已通过 = 1,
  未通过,
}
export enum statues {
  未开始 = 1,
  进行中 = 2,
  已完成 = 3,
}
export enum kctypes {
  串讲课 = 1,
  精讲课 = 2,
  冲刺课 = 3,
}
export enum paperElectronSubmits {
  已提交 = 1,
  已驳回 = 2,
  已通过 = 3,
}
export enum paperStatuss {
  未提交 = 1,
  已驳回 = 2,
  已通过 = 3,
}
export enum paperMails {
  已邮寄 = 1,
  未邮寄 = 2,
  已交回 = 3,
  未交回 = 4,
}
export enum majorCategory {
  文史类 = 1,
  中医类,
  艺术类,
  理工类,
  经济类,
  管理及药物类,
  法学类,
  教育学类,
  农学类,
  医学类,
  管理与工程类,
  经管类,
  哲学类,
}
export enum auditStatus {
  已确认 = 1,
  未确认,
  驳回,
  驳回已修改,
}
export enum expenseTypes {
  报名费 = 1,
  学费,
  书费,
  信息采集费,
  补考费,
}
export enum studentType {
  成人高考 = 1,
  网教电大,
  同等学力,
}
export enum majorLayer {
  专升本 = 1,
  高升本,
  高起专,
}
export enum formState {
  停用 = 0,
  启用,
  发布,
}
export enum formFieldName {
  姓名 = 1,
  手机 = 2,
  年龄 = 3,
  性别 = 4,
  地址 = 5,
  民族 = 6,
  身份证 = 7,
  微信号 = 8,
  单选 = 9,
  多选 = 10,
  下拉菜单 = 11,
  上传图片 = 12,
  文本框 = 13,
  签名 = 14,
  我已阅读并同意 = 15,
}
export enum paymentType {
  线下支付 = 0,
  微信,
  支付宝,
}
export enum commodityType {
  知识套餐 = 1,
  直播课程 = 2,
  点播课程 = 3,
  公开课程 = 4,
  资料包 = 5,
  试卷包 = 6,
  音频 = 7,
  图文 = 8,
  专栏 = 9,
  训练营期 = 11,
  试卷 = 12,
}
export enum isPass {
  未通过 = 0,
  已通过,
  已确定,
}
export enum qystatus {
  认证中 = 0,
  认证成功,
  认证失败,
  未认证,
}
export enum actionEvent {
  提交基本信息 = 0,
  基本信息审核通过 = 1,
  基础信息审核失败 = 2,
  授权书审核失败 = 4,
  认证成功 = 7,
}
export enum applyStateEnum {
  审核中 = 1,
  提现成功 = 2,
  审核失败 = 3,
}
export enum orderStateEnum {
  待发货 = 0,
  已发货 = 1,
  配货中 = 3,
  已完成 = 4,
  退货中 = 9,
  未支付 = 10,
  取消支付 = 11,
  学生已删除 = 12,
  待退运费 = 14,
}
export enum htstatus {
  草稿 = 'DRAFT',
  撤回 = 'RECALLED',
  签约中 = 'SIGNING',
  已退回 = 'REJECTED',
  已完成 = 'COMPLETE',
  已过期 = 'EXPIRED',
  拟定中 = 'FILLING',
  作废中 = 'INVALIDING',
  已作废 = 'INVALIDED',
  强制结束 = 'FORCE_END',
}
export enum htstatuss {
  DRAFT = '草稿',
  RECALLED = '撤回',
  SIGNING = '签约中',
  REJECTED = '已退回',
  COMPLETE = '已完成',
  EXPIRED = '已过期',
  FILLING = '拟定中',
  INVALIDING = '作废中',
  INVALIDED = '已作废',
  FORCE_END = '强制结束',
}
export enum productLine {
  普通线 = 1,
  精品线,
  专属线,
}
export enum fktype {
  我想要 = 1,
  提建议,
  提缺陷,
}
/*=====,========================= 代办===================================== */
export enum FranchiseeEnum {
  折扣销课 = 1,
  学习卡发放,
  代运营项目优惠,
  学习任务,
  考试任务,
  线上集训,
  线下集训,
  回访,
}
export enum oStatus {
  未开始 = 0,
  进行中,
  暂停,
  已完成,
}
export enum dStatus {
  接通后挂断 = 1,
  通话成功,
  未接通,
  呼叫异常,
  拒接,
  空号,
  关机,
  停机,
  不在服务区,
  占线,
  总机欠费,
  外呼限制,
  黑名单,
}
export enum rzstatus {
  认证中 = 0,
  认证成功,
  认证失败,
}
export enum rzxw {
  提交基本信息 = 0,
  基本信息审核通过 = 1,
  基础信息审核失败 = 2,
  授权书审核失败 = 4,
  认证成功 = 7,
}
export enum mkaoStatus {
  未开始 = 0,
  进行中 = 1,
  已结束 = 2,
}
export enum iszd {
  网校 = 1,
  程序,
  M端,
  教育APP,
}
export enum marketingType {
  折扣销课 = 1,
  学习卡发放,
  代运营项目优惠,
}
export enum shs {
  待审核 = 0,
  主任通过 = 1,
  主任驳回 = 2,
  总监驳回 = 3,
  已通过 = 4,
}
export enum shss {
  待审核 = 0,
  已通过 = 1,
  驳回 = 2,
}
export enum isAdmins {
  总监 = 0,
  超管员 = 1,
  普通用户 = 2,
  教学主任 = 3,
  财务专员 = 4,
}
