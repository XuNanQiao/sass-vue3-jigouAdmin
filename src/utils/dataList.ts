export default {
  /**账号类型  */
  entrantsType: [
    { label: '官方', value: 1 },
    { label: '入驻商 ', value: 2 },
    /* { label: '院校',  value: 3 }, */
  ],
  /* 入驻商类型 */
  orgType: [
    { label: '同行转型', value: 1 },
    { label: '招商加盟', value: 2 },
    { label: '高校合伙人', value: 3 },
    { label: '其他类型', value: 4 },
  ],

  /* ---------------- 课程产品线--------------- */
  productLine: [
    { label: '普通线', value: 1 },
    { label: '精品线', value: 2 },
  ],
  classLine: [
    { label: '普通线', value: 1 },
    { label: '精品线', value: 2 },
    { label: '专属线', value: 3 },
  ],
  classLines: [
    { label: '全部', value: 0 },
    { label: '普通线', value: 1 },
    { label: '精品线', value: 2 },
    { label: '专属线', value: 3 },
  ],
  liveType: [
    { label: '直播', value: 1 },
    { label: '伪直播', value: 2 },
  ],
  /* ----------------周期--------------- */
  semester: [
    { label: '第一周期', value: 1 },
    { label: '第二周期', value: 2 },
    { label: '第三周期', value: 3 },
    { label: '第四周期', value: 4 },
    { label: '第五周期', value: 5 },
  ],

  /*============================== 知识内容===================================== */

  videoType: [
    { label: '直播', value: 1 },
    { label: '录播', value: 2 },
  ],
  /* 公开课类型 */
  coursetype: [
    { label: '公开课', value: 0 },
    { label: '导学课', value: 1 },
    { label: '试听课', value: 2 },
  ],
  //直播录播课程类型
  liveTypes: [
    { label: '串讲课', value: 1 },
    { label: '精讲课', value: 2 },
    { label: '冲刺课', value: 3 },
  ],
  //直播状态
  iszbLive: [
    { label: '未开始', value: 0 },
    { label: '直播中', value: 1 },
    { label: '回放生成中', value: 2 },
    { label: '回放中', value: 3 },
  ],
  /**审核状态 */
  shList: [
    { label: '已审核', value: 1 },
    { label: '未审核', value: 0 },
  ],
  /**上架状态 */
  aPass: [
    { label: '上架', value: 1 },
    { label: '下架', value: 0 },
  ],
  featuresOptions: [
    { label: '直播回放', value: '直播回放' },
    { label: '上课提示', value: '上课提示' },
    { label: '虚拟考场', value: '虚拟考场' },
    { label: '章节练习', value: '章节练习' },
    { label: '随堂练习', value: '随堂练习' },
    { label: '电子讲义', value: '电子讲义' },
    { label: '12小时极速答疑', value: '12小时极速答疑' },
    { label: '24小时极速答疑', value: '24小时极速答疑' },
  ],
  /*=====,========================= 知识产品类型===================================== */
  /*  1直播  2 点播  3 音频 4 图文  5 面授  6 课程包 */
  coursePackage: [
    { label: '直播课', value: 1 },
    { label: '录播课', value: 2 },
    { label: '音频课', value: 3 },
    { label: '图文课', value: 4 },
    { label: '面授课', value: 5 },
    // { label: "课程包",  value: 6, },
  ],
  /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* 分割线-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */

  tiStatus: [
    { label: '已提交', value: 1 },
    { label: '未提交', value: 0 },
  ],
  showType: [
    { label: '显示', value: 1 },
    { label: '隐藏', value: 0 },
  ],
  /*============================== 分类管理===================================== */
  //分类类型
  classifyType: [
    { label: '合作伙伴分类', value: 1 },
    { label: '自考专业分类', value: 5 },
    { label: '试卷类型', value: 7 },
    { label: '普通专升本专业分类', value: 9 },
    { label: '学位类别', value: 10 },
    { label: '课程性质', value: 11 },
    { label: '资料分类', value: 12 }, //添加资料/资料包
    { label: '课件分类', value: 13 },
    { label: '辅导资料类型', value: 14 }, //未用到
    { label: '知识套餐类型', value: 15 },
  ],
  /* 所有属性 */
  listData: [
    { label: '专业名称', value: 'zName', vals: '' },
    { label: '专业阶段', value: 'zStage', vals: '' },
    { label: '专业代码', value: 'zCode', vals: '' },
    { label: '学位类别', value: 'zXwid', vals: '' },
    { label: '主考院校', value: 'zMsid', vals: '' },
    { label: '专业分类', value: 'zClassifyid', vals: '' },
    { label: '所属省份', value: 'zProid', vals: '' },
    { label: '扩展字段1', value: 'extOne', vals: '' },
    { label: '扩展字段2', value: 'extTwo', vals: '' },
    { label: '扩展字段3', value: 'extThree', vals: '' },
    { label: '扩展字段4', value: 'extFour', vals: '' },
    { label: '扩展字段5', value: 'extFive', vals: '' },
    {
      label: '行业前景',
      value: 'zExtend',
      list: [
        { label: '培养目标', value: 'PeiYangMuBiao', vals: '', valss: '培养目标' },
        { label: '就业能力', value: 'JiuYeNengLi', vals: '', valss: '就业能力' },
        {
          label: '报名条件',
          value: 'BaoKaoTiaoJian',
          vals: '',
          valss: '报名条件',
        },
        {
          label: '主课程介绍',
          value: 'ZhuKeChengIntro',
          vals: '',
          valss: '主课程介绍',
        },
        { label: '其他', value: 'Other', vals: '', valss: '其他' },
      ],
    },
  ],
  /* 课程属性 */
  kechengExtend: [
    { label: '课程类型', value: 'kcType', vals: '' },
    { label: '课程阶段', value: 'kcStage', vals: '' },
    { label: '课程名称', value: 'kcName', vals: '' },
    { label: '课程代码', value: 'code', vals: '' },
    { label: '课程性质', value: 'xzId', vals: '' },
    { label: '扩展字段1', value: 'extOne', vals: '' },
    { label: '扩展字段2', value: 'extTwo', vals: '' },
    { label: '扩展字段3', value: 'extThree', vals: '' },
    { label: '扩展字段4', value: 'extFour', vals: '' },
    { label: '扩展字段5', value: 'extFive', vals: '' },
  ],

  /*=====,========================= 训练营===================================== */
  //加入形式：
  entryMode: [
    { label: '任何人可以参与', value: 1 },
    { label: '输入密码参与', value: 2 },
    { label: '支付后参与', value: 3 },
  ],
  /* ========活动管理================================================================ */
  //活动类型
  activeType: [
    { label: '已发布', value: 0 },
    { label: '未发布', value: 1 },
    { label: '已结束', value: 2 },
  ],
  /* ========优惠券管理========================================================= */

  //优惠券状态 1、未开始,2、进行中,3、已停止,4、已结束
  stateMarketingCoupon: [
    { label: '未开始', value: 1 },
    { label: '进行中', value: 2 },
    // { label: '已停止',  value: 4 },
    { label: '已结束', value: 3 },
  ],
  //优惠券类型 1、无门槛券，2、满减券，3、兑换券
  typeMarketingCoupon: [
    { label: '无门槛券', value: 1 },
    { label: '满减券', value: 2 },
    { label: '折扣券', value: 3 },
  ],
  //积分兑换类型
  GeSelKnowItemListType: [
    { label: '知识套餐', value: 1, val: 'zstc' },
    { label: '直播视频', value: 2, val: 'zb' },
    { label: '录播视频', value: 3, val: 'db' },
    // { label: '公开课',  value: 4, val: 'gkk' },
    { label: '资料包', value: 5, val: 'zlb' },
    { label: '试卷包', value: 6, val: 'sjb' },
    { label: '音频', value: 7, val: 'yp' },
    { label: '图文', value: 8, val: 'tw' },
    // { label: '专栏',  value: 9, val: 'zl' },
    { label: '面授课', value: 10, val: 'ms' },
    // { label: '训练营期',  value: 11, val: 'yly' },
    { label: '试卷', value: 12, val: 'sj' },
    // { label: '虚拟考场',  value: 15 },
    // { label: '课程包',  value: 16 },
  ],
  /*=====,========================= 入驻商产品类型===================================== */
  shopType: [
    { label: '知识套餐', value: 1 },
    { label: '直播课', value: 2 },
    { label: '录播课', value: 3 },
    { label: '面授课', value: 10 },
    { label: '图文课', value: 8 },
    { label: '音频课', value: 7 },
    /*  { label: "公开课",  value: 4, }, */
    { label: '资料包', value: 5 },
    { label: '试卷包', value: 6 },
    { label: '试卷', value: 12 },
  ],
  shopType4: [
    { label: '知识套餐', value: 1 },
    { label: '直播课', value: 2 },
    { label: '录播课', value: 3 },
    { label: '面授课', value: 10 },
    { label: '图文课', value: 8 },
    { label: '音频课', value: 7 },
    /*  { label: "公开课",  value: 4, }, */
    // { label: "资料包",  value: 5 },
    { label: '试卷包', value: 6 },
    // { label: "试卷",  value: 12 }
  ],
  shopType1: [{ label: '知识套餐', value: 1 }],
  shopType2: [{ label: '资料包', value: 5 }],
  shopType3: [
    { label: '试卷包', value: 6 },
    { label: '试卷', value: 12 },
  ],

  /*=====,========================= 消息===================================== */

  //教务消息类型
  administrationFormName: [
    '课程安排通知',
    '考前督学通知',
    '考试前提示通知' /* , '节假日放假通知',
    '缴费通知', '政策通知', '高校通知', '学位通知', '毕业通知', */,
  ],
  //确认消息类型
  sureFormName: ['学位确认', '入学资料确认', '学习计划确认'],
  //入学资料确认
  sureStrJson: ['报名表', '保障书', '手册'],
  administrationEngLevel: [
    { label: '一级', value: 1 },
    { label: '二级', value: 2 },
    { label: '三级', value: 3 },
    { label: '四级', value: 4 },
    { label: '五级', value: 5 },
  ],
  // 查留言列表1未回复 2已回复
  mStatus: [
    { label: '未回复', value: 1 },
    { label: '已回复', value: 2 },
  ],
  /*=====,========================入驻商= 消息===================================== */
  orgNewsType: [
    { label: '版本更新', value: 2 },
    { label: '促销消息', value: 3 },
    { label: '资料更新', value: 4 },
    { label: '课程更新', value: 5 },
    { label: '公告', value: 6 },
  ],
  orgNewsTypeLan: [
    { label: '订单收款', value: 1 },
    { label: '版本更新', value: 2 },
    { label: '促销消息', value: 3 },
    { label: '资料更新', value: 4 },
    { label: '课程更新', value: 5 },
    { label: '公告', value: 6 },
  ],
  /* 意见反馈 */
  feedbackTypeLan: [
    { label: '改进建议', value: 1 },
    { label: '授课师资问题', value: 2 },
    { label: '在线考试问题', value: 3 },
    { label: '辅导资料问题', value: 4 },
    { label: '班主任管理', value: 5 },
    { label: '其他', value: 6 },
  ],

  /* ----------资讯----------------------------- */
  //教务消息类型
  source: ['本站原创', '网上下载', '地方媒体'],
  /*============================== 讲师管理===================================== */
  tType: [
    { label: '教研', value: 1 },
    { label: '教学', value: 2 },
    { label: '教务', value: 3 },
    { label: '讲师', value: 4 },
  ],
  /*============================== 题库管理===================================== */
  questionType: [
    { label: '单项选择', value: 0 },
    { label: '多项选择', value: 1 },
    { label: '判断题', value: 2 },
    { label: '填空题', value: 3 },
    { label: '简答题', value: 4 },
    { label: '组合题', value: 5 },
  ],
  /*=====,========================= 客户管理===================================== */
  customerLabel: [
    { label: '无意向客户', value: 1 },
    { label: '意向客户', value: 2 },
    { label: '高意向客户', value: 3 },
  ],
  customerStatusInfo: [
    { label: '跟踪中', value: 1 },
    { label: '未跟踪', value: 2 },
  ],
  customerStatus: [
    { label: '已购买', value: 1 },
    { label: '未购买', value: 2 },
  ],
  /*=====,========================= 虚拟考场===================================== */
  xuNiType: [
    { label: '公开', value: 1 },
    { label: '限邀请', value: 2 },
  ],
  /* ========任务管家管理========================================================= */
  taskStu: [
    { label: '学号', value: 'studentNo' },
    { label: '学生姓名', value: 'stuName' },
    { label: '手机号', value: 'mobile' },
    { label: '证件号码', value: 'identityNo' },
    { label: '民族', value: 'nation' },
    { label: '政治面貌', value: 'politicCountenance' },
    { label: '报考类别', value: 'category' },
    { label: '录取院校', value: 'collegeName' },
    { label: '专业', value: 'majorName' },
    { label: '层次', value: 'layer' },
    { label: '年级批次', value: 'gradeBatch' },
    { label: '学籍状态', value: 'studentStatus' },
    { label: '教务老师', value: 'educationName' },
    { label: '招生老师', value: 'teacherName' },
  ],
  SmsSendStatus: [
    { label: '发送成功', value: 1 },
    { label: '发送失败', value: 2 },
    { label: '未发送', value: 3 },
  ],
  ReceiveStatus: [
    { label: '已接收', value: 1 },
    { label: '未接收', value: 2 },
    { label: '进行中', value: 3 },
  ],
  zongValStatus: [
    { label: '已接收', value: 1 },
    { label: '未接收', value: 2 },
  ],
  sendType: [
    { label: '群公告', value: 1 },
    { label: '退订', value: 2 },
    { label: '文本', value: 3 },
    { label: '图片/视频', value: 4 },
    { label: '文档', value: 5 },
    { label: '名片', value: 6 },
    { label: '链接', value: 7 },
  ],
  sendMode: [
    { label: '公众号', value: 1 },
    // { label: '群聊',  value: 2 },
    { label: '短信/站内信', value: 3 },
  ],
  sendSopMode: [
    { label: '公众号', value: 1 },
    // { label: '群聊',  value: 2 },
    { label: '短信/站内信', value: 3 },
    // { label: '站内信',  value: 4 },任务管家
  ],
  /* ========学习管家管理========================================================= */
  taskLearnStu: [
    { label: '新准考证号', value: 'newAdmissionNumber' },
    { label: '学生姓名', value: 'studentName' },
    { label: '手机号', value: 'mobile' },
    { label: '身份证号', value: 'identity' },
    { label: '性别', value: 'sex' },
    { label: '报考专业', value: 'examMajor' },
    { label: '层次', value: 'layer' },
    { label: '报考科目', value: 'examSubject' },
    { label: '负责老师', value: 'educationName' },
  ],
  /*=====,========================= 讲师管理===================================== */
  userrode: [
    { label: '全职讲师', value: 1 },
    { label: '兼职讲师', value: 2 },
  ],
  usercategory: [
    { label: '教学助理', value: 3 },
    { label: '教研老师', value: 2 },
    { label: '讲师', value: 1 },
  ],
  teacherroid: [
    { label: '全职', value: 1 },
    { label: '兼职', value: 2 },
  ],
  minzu: [
    { label: '汉族', value: 1 },
    { label: '蒙古族', value: 2 },
    { label: '回族', value: 3 },
    { label: '藏族', value: 4 },
    { label: '维吾尔族', value: 5 },
    { label: '苗族', value: 6 },
    { label: '彝族', value: 7 },
    { label: '壮族', value: 8 },
    { label: '布依族', value: 9 },
    { label: '朝鲜族', value: 10 },
    { label: '满族', value: 11 },
    { label: '侗族', value: 12 },
    { label: '瑶族', value: 13 },
    { label: '白族', value: 14 },
    { label: '土家族', value: 15 },
    { label: '哈尼族', value: 16 },
    { label: '哈萨克族', value: 17 },
    { label: '傣族', value: 18 },
    { label: '黎族', value: 19 },
    { label: '傈僳族', value: 20 },
    { label: '佤族', value: 21 },
    { label: '畲族', value: 22 },
    { label: '高山族', value: 23 },
    { label: '拉祜族', value: 24 },
    { label: '水族', value: 25 },
    { label: '东乡族', value: 26 },
    { label: '纳西族', value: 27 },
    { label: '景颇族', value: 28 },
    { label: '柯尔克孜族', value: 29 },
    { label: '土族', value: 30 },
    { label: '达斡尔族', value: 31 },
    { label: '仫佬族', value: 32 },
    { label: '羌族', value: 33 },
    { label: '布朗族', value: 34 },
    { label: '撒拉族', value: 35 },
    { label: '毛南族', value: 36 },
    { label: '仡佬族', value: 37 },
    { label: '锡伯族', value: 38 },
    { label: '阿昌族', value: 39 },
    { label: '普米族', value: 40 },
    { label: '塔吉克族', value: 41 },
    { label: '怒族', value: 42 },
    { label: '乌孜别克族', value: 43 },
    { label: '俄罗斯族', value: 44 },
    { label: '鄂温克族', value: 45 },
    { label: '德昂族', value: 46 },
    { label: '保安族', value: 47 },
    { label: '裕固族', value: 48 },
    { label: '京族', value: 49 },
    { label: '塔塔尔族', value: 50 },
    { label: '独龙族', value: 51 },
    { label: '鄂伦春族', value: 52 },
    { label: '赫哲族', value: 53 },
    { label: '门巴族', value: 54 },
    { label: '珞巴族', value: 55 },
    { label: '基诺族', value: 56 },
  ],
  zhegzhimianmao: [
    { label: '中共党员', value: 1 },
    { label: '中共预备党员', value: 2 },
    { label: '共青团员', value: 3 },
    { label: '群众', value: 4 },
  ],
  sopStatus: [
    { label: '未开始', value: 1 },
    { label: '进行中', value: 2 },
    { label: '已结束', value: 3 },
  ],
  schoolType: [
    { label: '成人高考', value: 1 },
    { label: '网教电大', value: 2 },
    { label: '同等学力', value: 3 },
  ],
  /*  1：通用信息任务 2：非通用信息任务 3：通知任务 4：员工任务 5：模板任务 */
  /* ------------------------------------任务管家------------------------------- */
  taskType: [
    { label: '通用信息任务', value: 1 },
    { label: '非通用信息任务', value: 2 },
    { label: '通知任务', value: 3 },
    { label: '员工任务', value: 4 },
    { label: '模板任务', value: 5 },
  ],
  taskStatus: [
    { label: '未开始', value: 1 },
    { label: '进行中', value: 2 },
    { label: '已完成', value: 3 },
    { label: '已逾期', value: 4 },
  ],
  zongStatus: [
    { label: '已接收', value: 1 },
    { label: '未接收', value: 2 },
    { label: '进行中', value: 3 },
  ],
  studentOption: [
    { label: '已操作', value: 1 },
    { label: '未操作', value: 0 },
  ],
  yuangongStatus: [
    { label: '未完成', value: 0 },
    { label: '已完成', value: 1 },
  ],
  tongkaoOption: [
    { label: '计算机', value: 1 },
    { label: '英语', value: 2 },
    { label: '大学语文', value: 2 },
  ],

  zhuan: [
    { label: '专升本', value: 1 },
    { label: '高升本', value: 2 },
    { label: '高起专', value: 3 },
  ],
  majorCategory: [
    { label: '文史类', value: 1 },
    { label: '中医类', value: 2 },
    { label: '艺术类', value: 3 },
    { label: '理工类', value: 4 },
    { label: '经济类', value: 5 },
    { label: '管理及药物类', value: 6 },
    { label: '法学类', value: 7 },
    { label: '教育学类', value: 8 },
    { label: '农学类', value: 9 },
    { label: '医学类', value: 10 },
    { label: '管理与工程类', value: 11 },
    { label: '经管类', value: 12 },
    { label: '哲学类', value: 13 },
  ],

  /*=====,========================= 积分管理===================================== */
  integralType: [
    { label: '充值', value: 1 },
    { label: '提现', value: 2 },
    { label: '消费', value: 3 },
  ],
  integralPay: [
    { label: '微信', value: 1 },
    { label: '支付宝', value: 2 },
  ],
  integralPass: [
    { label: '审核中', value: 1 },
    { label: '审核失败', value: 3 },
    { label: '审核成功', value: 2 },
  ],
  expressList: [
    '顺丰快递',
    '中通快递',
    '圆通快递',
    '韵达快递',
    '申通快递',
    '京东快递',
    '德邦快递',
    '邮政快递',
  ],
  /*=====,========================= 代办===================================== */
  Franchisee: [
    { label: '折扣销课', value: 1 },
    { label: '学习卡发放', value: 2 },
    { label: '代运营项目优惠', value: 3 },
    { label: '学习任务', value: 4 },
    { label: '考试任务', value: 5 },
    { label: '线上集训', value: 6 },
    { label: '线下集训', value: 7 },
    { label: '回访', value: 8 },
  ],
  FranchiseeStatu: [
    { label: '已办理', value: 1 },
    { label: '未办理', value: 2 },
  ],

  juxueUSwiperTab: [
    { label: 'APP轮播图', value: 1 },
    { label: 'PC端轮播图', value: 2 },
    { label: 'PC端广告位', value: 3 },
    { label: '图片管理', value: 4 },
    { label: '资讯管理', value: 5 },
    { label: '考试倒计时管理', value: 6 },
  ],
  jtkType: [
    { label: '自考聚题库', value: 1 },
    { label: '成考聚题库', value: 2 },
    { label: '专升本聚题库', value: 3 },
  ],

  //拼团活动状态
  jtkPintuanStatus: [
    { label: '未开始', value: 1 },
    { label: '进行中', value: 2 },
    { label: '已结束', value: 3 },
  ],
  //拼团活动状态
  jtkDetailStatus: [
    { label: '进行中 ', value: 0 },
    { label: '已完成  ', value: 1 },
    { label: '已过期 ', value: 2 },
    { label: '已付款', value: 3 },
  ],
};
