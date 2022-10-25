declare interface addKnowCampData {
  pkind: number; // 大类id
  kindId: number; // 项目id
  campName: string; // 训练营名称
  campImg: string; // 训练营封面图
  campProfile: string; // 训练营简介
  campDetails: string; // 训练营详情
  bmStartTime: string; // 报名开始时间
  bmEndTime: string; // 报名结束时间
  startTime: string; // 学习开始时间
  endTime: string; // 学习结束时间
  isLimit: string; // 是否限制人数 1限制  0不限制
  unlockName: string; // 解锁模式 1日期解锁  2随机模式
  joinType: string; // 加入形式  1任何人加入  2密码加入 3支付加入
  password: string; // 密码
  invitationCard: string; // 是否开通邀请卡 1 开通 0未开通
  isCollectApplyinfo: string; // 是否报名信息收集 1 收集 0 不收集

  unlockDay?: string; // 每隔几天解锁
  bmNum?: string; // 报名人数
  passwordPrompt?: string; // 密码提示语
  limitNum?: string; // 限制人数
}

declare interface selectCampPageData {
  pageSize: number;
  pageNum: number;

  campName?: string; // 名称搜索
  ztValue?: string; // 1 开课中  2 开课结束 3  招生中  4  招生结束
  isPass?: string; // 1 上架  0下架
}

declare interface addPartProductData {
  type: number; //  2直播课程  3点播课程  7：音频 8：图文12 试卷 16 资料
  productId: number; // 产品id
}
