/* /*
 * @Author: 南桥几许
 * @Date: 2022-06-08 10:25:33
 * @LastEditTime: 2022-07-12 17:40:32
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\utils\onlineSchool\know\courseClient.ts
 *
 */
import { BasicPageParams } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
// import { ErrorMessageMode } from '/#/axios';

export class CourseClient {
  /*------------------------ 专业课程管理--------------------------------------------------------------------------------- */
  /**课程列表*/
  async getKengchengList(params: {
    kind?: number;
    zyId?: number;
    kcName?: string;
    kcType?: number;
    kcStage?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/kecheng/getKindZidList` /* `/kecheng/kecheng/getKengchengList` */,
      method: 'GET',
      params: params,
    });
    return data;
  }
  //获取课程详情
  async selectKecheng(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/kecheng/selectKecheng`,
      method: 'GET',
      params: {
        id: id,
      },
    });
    return data;
  }
  /*------------------------ 辅导课程管理--------------------------------------------------------------------------------- */
  //课程分页列表
  private async getList(params: {
    pageSize: number;
    pageNum: number;
    kid?: number;
    ispass?: number;
    starttime?: string;
    endtime?: string;
    title?: string;
    types?: number;
    kind?: number;
    status?: number;
    yearName?: string;
    semester?: string;
    productLine?: string;
    isPush?: number;
    tenantId?: number;
  }) {
    console.log(params, '---getList----=-=-=-=-=');

    const data: any = await defHttp.get({
      url: `/kecheng/courseAll/getList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  //课程 列表
  async getLiveList(params: {
    kid?: number;
    ispass?: number;
    starttime?: string;
    endtime?: string;
    title?: string;
    types?: number;
    kind?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/courseAll/getLiveList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /*------------------------ 录播---------------------------------------------------------------------------------*/
  //切换录播课上架状态
  async videoChangeStatus(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocourse/changeStatus`,
      method: 'GET',
      params: {
        id: id,
      },
    });

    return data;
  }
  //添加录播课
  async addVideo(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }

    const data: any = await defHttp.get(
      {
        url: `/kecheng/videocourse/add`,
        method: 'GET',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //修改录播课
  async UpdateVideo(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }
    const data: any = await defHttp.get(
      {
        url: `/kecheng/videocourse/update`,
        method: 'GET',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //删除录播课
  async videocourseDelete(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocourse/delete`,
      method: 'GET',
      params: {
        ids: id,
      },
    });

    return data;
  }
  //获取录播课详情
  async videocourseDetail(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocourse/getDetail`,
      method: 'GET',
      params: {
        Id: id,
      },
    });
    return data;
  }
  /*------------------------  录播课章节组--------------------------------------------------------------------------------- */
  //章节组查分页
  async videocoursegroupList(params: {
    pageNum: number;
    pageSize: number;
    CourseId: number;
    Title?: string;
    CreateTime?: string;
    UpdateTime?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocoursegroup/getList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  //章节组章节查分页
  async getChildrenList(params: {
    pageNum: number;
    pageSize: number;
    CourseId: number;
    title?: string;
    startTime?: string;
    endTime?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocoursegroup/getChildrenList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  //添加
  async videocoursegroupAdd(sub: any) {
    const formData = await { ...sub };
    formData.Audition = formData.Audition == -1 ? formData.Audition : formData.minute;

    const data: any = await defHttp.get(
      {
        url: `/kecheng/videocoursegroup/add`,
        method: 'GET',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //修改
  async videocoursegroupUpdate(sub: any) {
    const formData = await { ...sub };
    formData.Audition = formData.Audition == -1 ? formData.Audition : formData.minute;

    const data: any = await defHttp.get(
      {
        url: `/kecheng/videocoursegroup/update`,
        method: 'GET',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //章节组查详情
  async getChatDetail(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocoursegroup/getDetail`,
      method: 'GET',
      params: {
        id: id,
      },
    });

    return data;
  }
  //删除
  async videocoursegroupDeletes(id: string) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/videocoursegroup/delete`,
        method: 'GET',
        params: {
          ids: id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /*------------------------  录播课章节--------------------------------------------------------------------------------- */
  //章节查分页
  async videoList(
    pageNum: number,
    pageSize: number,
    CourseId: number,
    Title?: string,
    CreateTime?: string,
    UpdateTime?: string,
  ) {
    const params = this.combin(
      {
        pageNum: pageNum,
        pageSize: pageSize,
        CourseId: CourseId,
      },
      {
        Title: Title,
        CreateTime: CreateTime,
        UpdateTime: UpdateTime,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/videocoursevideo/getList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  //章节组-章节查分页
  async getListGroupId(
    pageNum: number,
    pageSize: number,
    GroupId: number,
    CourseId: number,
    Title?: string,
    CreateTime?: string,
    UpdateTime?: string,
  ) {
    const params = this.combin(
      {
        pageNum: pageNum,
        pageSize: pageSize,
        CourseId: CourseId,
        GroupId: GroupId,
      },
      {
        Title: Title,
        AddTime: CreateTime,
        UpdateTime: UpdateTime,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/videocoursevideo/getListGroupId`,
      method: 'GET',
      params: params,
    });
    return data;
  }

  //添加
  async videoAdd(sub: any) {
    const formData = await { ...sub };
    formData.Audition = formData.Audition == -1 ? formData.Audition : formData.minute;

    const data: any = await defHttp.get(
      {
        url: `/kecheng/videocoursevideo/add`,
        method: 'GET',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //修改
  async videoUpdate(sub: any) {
    const formData = await { ...sub };
    formData.Audition = formData.Audition == -1 ? formData.Audition : formData.minute;

    const data: any = await defHttp.get(
      {
        url: `/kecheng/videocoursevideo/update`,
        method: 'GET',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //查章节详情
  async getDetail(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocoursevideo/getDetail`,
      method: 'GET',
      params: {
        Id: id,
      },
    });

    return data;
  }
  //删除
  async videoDeletes(id: string) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/videocoursevideo/delete`,
        method: 'GET',
        params: {
          ids: id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /*------------------------  课程录播打点视频--------------------------------------------------------------------------------- */
  //视频分段管理
  async curVideoSegmentList(params: {
    pageNum: number;
    pageSize: number;
    parentId?: number;
    videoType?: string;
    points?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/curVideoSegment/getList`,
      method: 'GET',
      params,
    });
    return data;
  }
  //添加
  async addNew(params: {
    title: string;
    vId?: string;
    lengthTime: string;
    videoType: string;
    parentId: number;
    sort: string;
    startTime: string;
    endTime: string;
    coverUrl: string;
    summary?: string;
    points?: string;
    videoUrl?: string;
  }) {
    const startTime = [...params.startTime];
    params.startTime = startTime[0];
    params.endTime = startTime[1];
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curVideoSegment/addNew`,
        method: 'GET',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //修改
  async updateData(params: {
    id: number;
    title: string;
    vId: string;
    lengthTime: string;
    videoType: string;
    sort: string;
    startTime: string;
    endTime: string;
    coverUrl: string;
    summary: string;
    points?: string;
    videoUrl?: string;
  }) {
    const startTime = [...params.startTime];
    params.startTime = startTime[0];
    params.endTime = startTime[1];
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curVideoSegment/updateData`,
        method: 'GET',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //删除
  async deletes(id: string) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curVideoSegment/deletes`,
        method: 'GET',
        params: {
          ids: id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //批量删除视频的某个关联的知识点
  async deletePiont(piontid: number, id: string) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curVideoSegment/deletePiont`,
        method: 'GET',
        params: {
          piontid: piontid,
          ids: id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /*------------------------ 直播---------------------------------------------------------------------------------*/

  //切换直播课上架状态
  async liveshowChangeStatus(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/liveshow/changeStatus`,
      method: 'GET',
      params: {
        id: id,
      },
    });

    return data;
  }
  //添加直播课
  async liveAdd(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }
    const data: any = await defHttp.get({
      url: `/kecheng/liveshow/add`,
      method: 'GET',
      params: formData,
    });

    return data;
  }
  //修改直播课
  async liveUpdate(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }
    const data: any = await defHttp.get({
      url: `/kecheng/liveshow/update`,
      method: 'GET',
      params: formData,
    });

    return data;
  }
  //删除直播课
  async liveshowDelete(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/liveshow/delete`,
      method: 'GET',
      params: {
        ids: id,
      },
    });

    return data;
  }
  //获取直播课详情
  async liveshowDetail(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/liveshow/getDetail`,
      method: 'GET',
      params: {
        Id: id,
      },
    });

    return data;
  }
  /*------------------------  课程直播章节--------------------------------------------------------------------------------- */
  //获取直播课详情
  async liveshowplaybackList(params: {
    LiveId: number;
    pageSize: number;
    pageNum: number;
    IsLive?: number;
    Title?: string;
    StartTime?: string;
    EndTime?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/liveshowplayback/getList`,
      method: 'GET',
      params: params,
    });

    return data;
  }
  //获取直播章节详情
  async liveshowplaybackgetDetail(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/liveshowplayback/getDetail`,
      method: 'GET',
      params: {
        Id: id,
      },
    });
    return data;
  }
  //添加直播课
  async liveshowplaybackAdd(params: {
    LiveId: number;
    Title: string;
    Orders: number;
    CcConfig: string;
    StartTime: string;
    Audition: string;
    EndTime: string;
    TrialVideo: string;
    TrialVideoDuration: string;
    BackAudition: string;
    AliVideoUrl?: string;
    label?: string;
    Others?: string;
    RecordId?: any;
    CcRomid?: any;
    CcLiveid?: any;
    ksTime?: any;
    AliVideoId?: string;
  }) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/liveshowplayback/add`,
        method: 'GET',
        params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //修改直播章节
  async liveshowplaybackUpdate(params: {
    id: number;
    Title: string;
    Orders: number;
    CcConfig: string;
    StartTime: string;
    Audition: string;
    EndTime: string;
    TrialVideo: string;
    TrialVideoDuration: string;
    BackAudition: string;
    AliVideoUrl?: string;
    label?: string;
    Others?: string;
    RecordId?: any;
    CcRomid?: any;
    CcLiveid?: any;
    ksTime?: any;
    AliVideoId?: string;
  }) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/liveshowplayback/update`,
        method: 'GET',
        params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //删除直播章节
  async liveshowplaybackDelete(ids: string) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/liveshowplayback/delete`,
        method: 'GET',
        params: {
          ids: ids,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /*------------------------  标签列表--------------------------------------------------------------------------------- */
  //标签列表
  async selectLabelList() {
    const data: any = await defHttp.get({
      url: `/kecheng/fenlei/selectLabelList`,
      method: 'GET',
    });
    return data;
  }
  /**知识点列表*/
  async getLists(kId: any) {
    const res: any = await defHttp.get({
      url: `/kecheng/knowledge/getList`,
      method: 'GET',
      params: {
        kId: kId,
      },
    });
    return res;
  }
  /*--------图文课程----------------   */

  //课程分页列表
  async getImageTextTeachList(params: {
    pageSize: number;
    pageNum: number;
    kindId?: number;
    zyId?: number;
    courseId?: number;
    name?: string;
    showStatus?: number;
    status?: number;
    isPush?: number;
    tenantId?: number;
    isException?: number;
  }) {
    params.isException = params.isException ? params.isException : 0;
    const data: any = await defHttp.get({
      url: `/kecheng/imageText/getImageTextTeachList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**修改图文课程*/
  async updateImageTextTeach(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }

    const data: any = await defHttp.post(
      {
        url: `/kecheng/imageText/updateImageTextTeach`,
        method: 'POST',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**添加图文课程*/
  async addImageTextTeach(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }

    const data: any = await defHttp.post(
      {
        url: `/kecheng/imageText/addImageTextTeach`,
        method: 'POST',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**查询图文课详情*/
  async getImageTextTeachDetail(Id: number) {
    const res: any = await defHttp.get({
      url: `/kecheng/imageText/getImageTextTeachDetail`,
      method: 'GET',
      params: {
        id: Id,
      },
    });
    return res;
  }
  /**删除图文课程*/
  async deleteImageTextTeach(Id: number) {
    const data = await defHttp.get(
      {
        url: `/kecheng/imageText/deleteImageTextTeach`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /**修改图文课程显示状态*/
  async updateImageTextTeachState(Id: number) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/imageText/updateImageTextTeachState`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /*------------------------ 图文课程zhang--------------------------------------------------------------------------------- */
  //课程分页列表
  async getImageTeachChapterList(params: {
    pageSize: number;
    pageNum: number;
    startTime?: string;
    endTime?: string;
    teachId?: number;
    name?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/imageTeachChapter/getImageTeachChapterList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**修改图文课程*/
  async updateImageTeachChapter(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/imageTeachChapter/updateImageTeachChapter`,
        method: 'POST',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**添加图文课程章*/
  async addImageTeachChapter(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/imageTeachChapter/addImageTeachChapter`,
        method: 'POST',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**查询图文课详情章*/
  async getImageTeachChapterDetail(Id: number) {
    const res: any = await defHttp.get(
      {
        url: `/kecheng/imageTeachChapter/getImageTeachChapterDetail`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return res;
  }
  /**删除图文课程*/
  async deleteImageTeachChapter(Id: number) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/imageTeachChapter/deleteImageTeachChapter`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /*------------------------ 面授课程--------------------------------------------------------------------------------- */
  //课程分页列表
  async getFaceTeachList(params: {
    pageSize: number;
    pageNum: number;
    kindId?: number;
    zyId?: number;
    courseId?: number;
    name?: string;
    showStatus?: number;
    status?: number;
    isPush?: number;
    tenantId?: number;
    isException?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/face/getFaceTeachList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**修改面授课程*/
  async updateFaceTeach(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }

    const data: any = await defHttp.post(
      {
        url: `/kecheng/face/updateFaceTeach`,
        method: 'POST',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**添加面授课程*/
  async addFaceTeach(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }
    const params = formData;

    const data: any = await defHttp.post(
      {
        url: `/kecheng/face/addFaceTeach`,
        method: 'POST',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**查询面授课详情*/
  async getFaceTeachDetail(Id: number) {
    const res: any = await defHttp.get({
      url: `/kecheng/face/getFaceTeachDetail`,
      method: 'GET',
      params: {
        id: Id,
      },
    });
    this.functionNo(res);
    return res;
  }
  /**修改显示状态*/
  async updateFaceTeachState(Id: number) {
    const res: any = await defHttp.get(
      {
        url: `/kecheng/face/updateFaceTeachState`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return res;
  }
  /**删除面授课程*/

  async deleteFaceTeach(Id: number) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/face/deleteFaceTeach`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /*----------面授课程大纲--------------   */

  /*  */
  //获取面授课程大纲列表
  async getFaceTeachOutlineList(params: {
    pageSize: number;
    pageNum: number;
    faceId: string;
    name?: string;
    startTime?: string;
    endTime?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/faceOutline/getFaceTeachOutlineList`,
      method: 'GET',
      params,
    });
    return data;
  }
  /**添加面授课程大纲*/
  async addFaceTeachOutline(params: any) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/faceOutline/addFaceTeachOutline`,
        method: 'POST',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**修改面授课程大纲*/
  async updateFaceTeachOutline(sub: any) {
    const res: any = await defHttp.post(
      {
        url: `/kecheng/faceOutline/updateFaceTeachOutline`,
        method: 'POST',
        params: sub,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return res;
  }
  /**查询面授课详情*/
  async getFaceTeachOutlineDetail(Id: number) {
    const res: any = await defHttp.get({
      url: `/kecheng/faceOutline/getFaceTeachOutlineDetail`,
      method: 'GET',
      params: {
        id: Id,
      },
    });
    this.functionNo(res);
    return res;
  }
  /**删除面授课程*/

  async deleteFaceTeachOutline(Id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/faceOutline/deleteFaceTeachOutline`,
      method: 'GET',
      params: {
        id: Id,
      },
    });
    return data;
  }

  /*------------------------ 音频课--------------------------------------------------------------------------------- */
  //课程分页列表
  async getAudioTeachList(params: {
    pageSize: number;
    pageNum: number;
    kindId?: number;
    zyId?: number;
    courseId?: number;
    name?: string;
    showStatus?: number;
    status?: number;
    isPush?: number;
    tenantId?: number;
    isException?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/audio/getAudioTeachList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**修改音频课程*/
  async updateAudioTeach(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }
    const data: any = await defHttp.post(
      {
        url: `/kecheng/audio/updateAudioTeach`,
        method: 'POST',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /**添加音频课程*/
  async addAudioTeach(sub: any) {
    const formData = { ...sub };
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }

    const data: any = await defHttp.post(
      {
        url: `/kecheng/audio/addAudioTeach`,
        method: 'POST',
        params: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**查询音频课详情*/
  async getAudioTeachDetail(Id: number) {
    const res: any = await defHttp.get({
      url: `/kecheng/audio/getAudioTeachDetail`,
      method: 'GET',
      params: {
        id: Id,
      },
    });
    this.functionNo(res);
    return res;
  }
  /**修改显示状态*/
  async updateAudioTeachState(Id: number) {
    const res: any = await defHttp.get(
      {
        url: `/kecheng/audio/updateAudioTeachState`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return res;
  }
  /**删除音频课程*/
  async deleteAudioTeach(Id: number) {
    const data = await defHttp.get(
      {
        url: `/kecheng/audio/deleteAudioTeach`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /*------------音频课程章------------   */
  //课程分页列表
  async getAudioChapterList(params: {
    pageSize: number;
    pageNum: number;
    startTime?: string;
    endTime?: string;
    faceId?: number;
    name?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/audioChapter/getAudioChapterList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**修改音频课程章*/
  async updateAudioChapter(sub: any) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/audioChapter/updateAudioChapter`,
        method: 'POST',
        params: sub,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**添加音频课程章*/
  async addAudioChapter(sub: any) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/audioChapter/addAudioChapter`,
        method: 'POST',
        params: sub,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**查询音频课程章*/
  async getAudioChapterDetail(Id: any) {
    const res: any = await defHttp.get({
      url: `/kecheng/audioChapter/getAudioChapterDetail`,
      method: 'GET',
      params: {
        id: Id,
      },
    });
    return res;
  }

  /**删除音频课程章*/
  async deleteAudioChapter(Id: number) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/audioChapter/deleteAudioChapter`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /*------------音频课程节------------   */
  //课程分页列表
  async getAudioLessonList(params: {
    pageSize: number;
    pageNum: number;
    startTime?: string;
    endTime?: string;
    faceId?: number;
    chapterId?: number;
    name?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/audioLesson/getAudioLessonList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**修改音频课程章*/
  async updateAudioLesson(sub: any) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/audioLesson/updateAudioLesson`,
        method: 'POST',
        params: sub,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**添加音频课程章*/
  async addAudioLesson(sub: any) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/audioLesson/addAudioLesson`,
        method: 'POST',
        params: sub,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /**查询音频课程章*/
  async getAudioLessonDetail(Id: any) {
    const res: any = await defHttp.get({
      url: `/kecheng/audioLesson/getAudioLessonDetail`,
      method: 'GET',
      params: {
        id: Id,
      },
    });
    return res;
  }

  /**删除音频课程章*/
  async deleteAudioLesson(Id: number) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/audioLesson/deleteAudioLesson`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }

  /*------------------------  视频章节随堂资料、讲义--------------------------------------------------------------------------------- */
  /**查列表
   * docType	 1资料 2讲义   3课程资料   4 资料和讲义
   * courseType 1 直播 2录播 3音频 4 图文 5面授 */
  async curCourseDocsList(params: {
    pageNum: number;
    pageSize: number;
    sectionId: number;
    docType: number;
    courseType: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/curCourseDocs/getList`,
      method: 'GET',
      params,
    });
    return data;
  }
  /**新增
   * 1 直播 2录播 3音频 4 图文 5面授*/
  async curCourseDocsAdd(
    params: {
      courseType: number;
      sectionId: number;
      docType: number;
    },
    filePath: any,
  ) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/curCourseDocs/addNew`,
        method: 'POST',
        params,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        data: JSON.stringify(filePath),
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //更新
  async curCourseDocsUpdate(params: {
    id: number;
    courseType: number;
    sectionId: number;
    fileName: string;
    filePath: string;
    docType: number;
  }) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curCourseDocs/updateData`,
        method: 'GET',
        params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  //删除
  async curCourseDocsDel(id: string) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curCourseDocs/deletes`,
        method: 'GET',
        params: {
          ids: id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /*------------------------  随堂测试--------------------------------------------------------------------------------- */

  /**查绑定的试卷
   * status:	1 课后作业 2 随堂测试 3课程模考
   */
  async getPaperByCourse(params: {
    cChapterid?: number;
    cType?: number;
    cCourseid?: number;
    cKid?: number;
    status?: number;
  }) {
    const data = await defHttp.get({
      url: `/kecheng/curCourseContact/getPaperByCourse`,
      method: 'GET',
      params,
    });
    return data;
  }
  /**课程模考添加试卷（scf）
   * status:	1 课后作业 2 随堂测试 3课程模考
   */
  async addCoursePaper(params: {
    status: number;
    cType: number;
    cCourseid: number;
    cKid: number;
    sIds: string;
    cChapterid?: number;
  }) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curCourseContact/addCoursePaper`,
        method: 'GET',
        params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  //删除
  async delCourseContact(id: string) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curCourseContact/delete`,
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
  /*------------------------  课后作业--------------------------------------------------------------------------------- */
  //查课程下可选的试卷
  /*   async getListByCourseId(cKid: number, cChapterid: number, cType: number) {
       let userInfo =await getInfo();
    let data: any = await defHttp.get({
      baseURL: userInfo.loginType&&userInfo.loginType == "teacher" ? process.env.VUE_APP_teacher_API : process.env.VUE_APP_BASE_API,

        url: `/kecheng/curCourseContact/getListByCourseId`,
        method: 'GET',
        params: {
          cKid: cKid,
          cChapterid: cChapterid,
          cType: cType,
        }
      })
      return data
    } */
  /**章节绑定试卷*/
  async curCourseContactAdd(
    cCourseid: number,
    sIds: number,
    cKid: number,
    cType: number,
    cChapterid: number,
  ) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curCourseContact/addNew`,
        method: 'GET',
        params: {
          cCourseid: cCourseid,
          cContactid: sIds,
          cKid: cKid,
          cType: cType,
          cChapterid: cChapterid,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /**更新章节所选中的试卷*/
  async curCourseContactupdate(cId: number, cContactid: number) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/curCourseContact/update`,
        method: 'GET',
        params: {
          cId: cId,
          cContactid: cContactid,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }

  /**查绑定的试卷
   * status:	1 课后作业 2 随堂测试 3课程模考
   */
  async getPaperBy(cChapterid?: number, cType?: number, cCourseid?: number, cKid?: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/curCourseContact/getPaperBy`,
      method: 'GET',
      params: {
        cChapterid: cChapterid,
        cType: cType,
        cCourseid: cCourseid,
        cKid: cKid,
      },
    });
    this.functionNo(data);
    return data;
  }
  /* ===============================知识套餐配置=============================== */
  //知识套餐分页列表（创建知识套餐列表）
  async getPageList(params: {
    pageSize: number;
    pageNum: number;
    zyId?: number;
    isPass?: number;
    cTime?: string;
    addTime?: string;
    tiitle?: string;
    kind?: number;
    productLine?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/classes/getPageList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  // 更新知识套餐状态
  async updateStatusClass(id: number, type: number) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/classes/updateStatusClass?id=${id}&type=${type}`,
        method: 'POST',
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  // 添加知识套餐
  async addClass(sub: any) {
    const formData = { ...sub };
    if (formData.features) {
      formData.features = formData.features.toString();
    }
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }
    if (formData.curForms) {
      formData.curForms = formData.curForms.toString();
    }

    const data: any = await defHttp.post(
      {
        url: `/kecheng/classes/addClass`,
        method: 'POST',
        data: formData,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  // 知识套餐详情
  async getClass(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/classes/getClass?id=${id}`,
    });
    return data;
  }
  // 修改知识套餐
  async editClass(sub: any) {
    const formData = { ...sub };
    if (formData.features) {
      formData.features = formData.features.toString();
    }
    if (formData.orgIds) {
      formData.orgIds = formData.orgIds.join(',');
    }
    if (formData.curForms) {
      formData.curForms = formData.curForms.toString();
    }
    if (formData.jfType) {
      formData.jfType = formData.jfType.join(',');
    }

    const data: any = await defHttp.post({
      url: `/kecheng/classes/updateClass`,
      method: 'POST',
      data: formData,
    });

    return data;
  }
  // 删除知识套餐
  async deleteClass(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/classes/deleteClass`,
      method: 'POST',
      params: {
        id: id,
      },
    });

    return data;
  }
  // 隐藏知识套餐
  async updateReadClass(id: number, type: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/classes/updateReadClass`,
      method: 'POST',
      params: {
        id: id,
        type: type,
      },
    });

    return data;
  }
  /* ===============================知识套餐-课程=============================== */

  // 知识套餐课程分页列表
  async ClassesCoursePageList(params: {
    pageSize: number;
    pageNum: number;
    type: number;
    classesId: number;
    yearName?: string;
    semester?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/classescourse/ClassesCoursePageList`,
      method: 'GET',
      params: params,
    });
    const val = { data };
    return val;
  }
  // 删除单个知识套餐课程
  async deleteClassesCourse(classesId: number, type: number, courseId: number) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/classescourse/deleteClassesCourse?classesId=${classesId}&type=${type}&courseId=${courseId}`,
        method: 'POST',
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  // 修改知识套餐课程
  async updateClassesCourse(params: {
    classesId: number;
    type: number;
    courseId: number;
    id: number;
    order?: number;
  }) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/classescourse/updateClassesCourse`,
        method: 'POST',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );

    return data;
  }
  /*------------------------  课程模块 试卷包 资料包--------------------------------------------------------------------------------- */
  /**课程模块 试卷包 资料包*/
  async selectServeList(params: {
    pageSize: number;
    pageNum: number;
    type?: number;
    classesId?: any;
    kind?: string;
    zyId?: string;
    zStage?: string;
    typeName?: string;
    addTime?: string;
    endTime?: string;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/classesServe/selectServeList`,
      method: 'GET',
      params: params,
    });
    const val = {
      data,
    };
    return val;
  }
  /**添加 课程模块 试卷包 资料包
   * 1 课程模考 虚拟考场 2 资料包  3 试卷包 4资料  5试卷
   */
  async addServe(type: number, classesId: number, ids?: string) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/classesServe/addServe`,
        method: 'POST',
        params: {
          type: type,
          classesId: classesId,
          ids: ids,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /**删除
   * 1 课程模考 虚拟考场 2 资料包  3 试卷包 4资料  5试卷
   */
  async deleteByIdServe(id: number) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/classesServe/deleteByIdServe`,
        method: 'POST',
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
  /**虚拟考场 下的知识套餐列表*/
  async selectClassesList(
    pageSize: number,
    pageNum: number,
    typeId?: string,
    typeName?: string,
    addTime?: string,
    endTime?: string,
    kind?: number,
    zyId?: number,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        typeId: typeId,
        typeName: typeName,
        addTime: addTime,
        endTime: endTime,
        kind: kind,
        zyId: zyId,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/classesServe/selectClassesList`,
      method: 'GET',
      params: params,
    });
    this.functionNo(data);
    return data;
  }
  /**虚拟考场 关联知识套餐  */
  async addClassesServe(roomId: string, ids?: string) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/classesServe/addClassesServe`,
        method: 'POST',
        params: {
          roomId: roomId,
          ids: ids,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /*------------------------  课程包--------------------------------------------------------------------------------- */
  async getCoursePackageList(params: { pageSize: number; pageNum: number; classesId: string }) {
    const data: any = await defHttp.get({
      url: `/kecheng/coursePackage/getCoursePackageList`,
      method: 'GET',
      params,
    });

    return data;
  }
  /**课程包添加 */
  async addCoursePackage(params: { name: string; classesId: string }) {
    const data: any = await defHttp.post(
      {
        url: `/kecheng/coursePackage/addCoursePackage`,
        method: 'POST',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  /**课程包修改价格 */
  async updateCoursePackage(id: string, price?: string, entrantsPrice?: string) {
    const params = this.combin({ id: id }, { price: price, entrantsPrice: entrantsPrice });

    const data: any = await defHttp.get(
      {
        url: `/kecheng/coursePackage/updateCoursePackage`,
        method: 'POST',
        params: params,
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return data;
  }
  // 课程包修改显示状态
  async updateCoursePackageState(Id: number) {
    const res: any = await defHttp.get(
      {
        url: `/kecheng/coursePackage/updateCoursePackageState`,
        method: 'GET',
        params: {
          id: Id,
        },
      },
      {
        errorMessageMode: 'message',
        successMessageMode: 'message',
      },
    );
    return res;
  }
  /**课程包删除 */
  async deleteCoursePackage(id: any) {
    const data: any = await defHttp.get(
      {
        url: `/kecheng/coursePackage/deleteCoursePackage`,
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
  /*------------------------  课程包-----课程---------------------------------------------------------------------------- */
  /**获取课程包关联班型下所有课程
   * type:课程类型 1直播  2 点播   3 面授 4 音频 5 图文 6课程包
   */
  async getCourseList(pageSize: number, pageNum: number, type: number, packageId: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/curPackageCourse/getCourseList`,
      method: 'GET',
      params: {
        pageSize: pageSize,
        pageNum: pageNum,
        type: type,
        packageId: packageId,
      },
    });
    this.functionNo(data);
    return data;
  }
  /**获取课程包列表
   * type:课程类型 1直播  2 点播   3 面授 4 音频 5 图文 6课程包
   */
  async getCurPackageCourseList(
    pageSize: number,
    pageNum: number,
    classesId: number,
    packageId: number,
    type?: number,
    kind?: number,
    kId?: number,
    zyId?: number,
  ) {
    const params = this.combin(
      {
        pageSize: pageSize,
        pageNum: pageNum,
        classesId: classesId,
        packageId: packageId,
      },
      { kId: kId, type: type, kind: kind, zyId: zyId },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/curPackageCourse/getCurPackageCourseList`,
      method: 'GET',
      params: params,
    });
    this.functionNo(data);
    return data;
  }
  /**添加课程包与课程关系课程
   * type:课程类型 1直播  2 点播   3 面授 4 音频 5 图文 6课程包
   */
  async addCurPackageCourse(
    courseIdS: string,
    packageId: number,
    type: number,
    courseName: string,
  ) {
    const data: any = await defHttp.get({
      url: `/kecheng/curPackageCourse/addCurPackageCourse`,
      method: 'POST',
      params: {
        courseIdS: courseIdS,
        packageId: packageId,
        type: type,
        courseName: courseName,
      },
    });
    this.functionNo(data);
    return data;
  }
  /**删除课程包与课程关系课程 */
  async deleteCurPackageCourse(id: any) {
    let data: any = {};
    await this.$confirm('删除后将无法查看，确认无误后点击确认即可', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      data = await defHttp.get({
        url: `/kecheng/curPackageCourse/deleteCurPackageCourse`,
        method: 'GET',
        params: {
          id: id,
        },
      });
      //this.functionThen(data);
    });
    return data;
  }
  /* =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=* */

  /* ===============================知识套餐配置=============================== */
  // 知识套餐所有列表
  async getClassListAll() {
    const data: any = await defHttp.get({
      url: `/kecheng/classes/getClassListAll`,
      method: 'GET',
    });
    return data;
  }
  // 根据项目查询知识套餐所有列表
  async getClassListByKind(zyId?: number, tiitle?: string, kind?: number) {
    const params = this.combin({}, { zyId: zyId, tiitle: tiitle, kind: kind });

    const data: any = await defHttp.get({
      url: `/kecheng/classes/getClassListAll`,
      method: 'GET',
      params: params,
    });

    return data;
  }
  /**知识套餐分页列表
   * status 1:已购买 2 未购买
   */
  async getPageClassList(params: {
    pageSize: number;
    pageNum: number;
    zyId?: number;
    isPass?: number;
    cTime?: string;
    addTime?: string;
    tiitle?: string;
    kind?: number;
    status?: number;
    productLine?: string;
    isPush?: number;
    tenantId?: number;
  }) {
    const data: any = await defHttp.get({
      url: `/kecheng/classes/getPageClassList`,
      method: 'GET',
      params: params,
    });
    return data;
  }

  //知识套餐分页列表（知识套餐考勤专用）
  async getClassPageList(
    pageSize: number,
    pageNum: number,
    zyId?: number,
    isPass?: number,
    tiitle?: string,
    userId?: number,
    kind?: number,
  ) {
    const params = this.combin(
      {
        pageSize: pageSize,
        pageNum: pageNum,
      },
      {
        zyId: zyId,
        isPass: isPass,
        userId: userId,
        tiitle: tiitle,
        kind: kind,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/classes/getClassPageList`,
      method: 'GET',
      params: params,
    });
    return data;
  }

  // 知识套餐资料列表
  async getPageClassesDocList(pageSize: number, pageNum: number, classesId: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/classesdoc/getPageClassesDocList?pageSize=${pageSize}&pageNum=${pageNum}&classesId=${classesId}`,
      method: 'GET',
    });
    return data;
  }
  // 添加知识套餐资料
  async addClassesDoc(classesId: number, ints: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/classesdoc/addClassesDoc?classesId=${classesId}&ints=${ints}`,
      method: 'POST',
    });

    return data;
  }
  // 删除知识套餐资料
  async deleteClassesDoc(classesId: number, docId: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/classesdoc/deleteClassesDoc?classesId=${classesId}&docId=${docId}`,
      method: 'POST',
    });

    return data;
  }
  //  批量删除知识套餐资料
  async deleteClassesDocList(classesId: number, ints: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/classesdoc/deleteClassesDocList?classesId=${classesId}&ints=${ints}`,
      method: 'POST',
    });

    return data;
  }

  /* ===============================知识套餐描述=============================== */
  // 添加知识套餐描述
  async addDescription(classesId: number, title: string, content: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/description/addDescription`,
      method: 'POST',
      params: {
        classesId: classesId,
        content: content,
        title: title,
      },
    });

    return data;
  }
  // 更新知识套餐描述
  async updateDescription(classesId: number, title: string, content: string, id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/description/updateDescription`,
      method: 'POST',
      params: {
        classesId: classesId,
        title: title,
        content: content,
        id: id,
      },
    });

    return data;
  }
  // 知识套餐描述列表
  async getDescriptionList(classesId: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/description/getDescriptionList`,
      method: 'GET',
      params: {
        classesId: classesId,
      },
    });

    return data;
  }
  // 知识套餐描述详情
  async getDescription(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/description/getDescription`,
      method: 'GET',
      params: {
        id: id,
      },
    });

    return data;
  }
  // 知识套餐描述降序升序
  async updateSort(id: number, type: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/description/updateSort`,
      method: 'POST',
      params: {
        id: id,
        type: type,
      },
    });

    return data;
  }
  // 删除知识套餐描述
  async deleteDescription(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/description/deleteDescription`,
      method: 'POST',
      params: {
        id: id,
      },
    });

    return data;
  }

  // ==========================知识套餐课程===========================
  // 添加知识套餐课程
  async addClasses(sub: any) {
    const data: any = await defHttp.get({
      url: `/kecheng/classescourse/addClasses`,
      method: 'POST',
      data: sub,
    });

    return data;
  }

  // 批量删除知识套餐课程
  async deleteClassesCourseList(classesId: number, type: number, ints: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/classescourse/deleteClassesCourseList?classesId=${classesId}&type=${type}&ints=${ints}`,
      method: 'POST',
    });

    return data;
  }

  /* ===============================指示点=============================== */
  /**获取课程下面的章*/
  async getListByKid(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/kChapter/getListByKid`,
      method: 'GET',
      params: {
        KId: id,
      },
    });

    return data;
  }
  // 获取章下面的节
  async getListByChapter(id: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/kSection/getListByChapter`,
      method: 'GET',
      params: {
        CId: id,
      },
    });

    return data;
  }
  /* ==============入驻商购买的知识产品==================================================================================== */
  /** （入驻商后台）入驻商管理更新的产品 */
  async updateProduct(entrantsProductId: number, price?: number, pass?: number) {
    const params = this.combin(
      { entrantsProductId: entrantsProductId },
      { price: price, pass: pass },
    );

    const data: any = await defHttp.get({
      url: `/ucenter/product/updateProduct`,
      method: 'POST',
      params: params,
    });

    return data;
  }
  /** 获取入驻商下所有班型*/
  async orSelectPageList(zyId?: number, tiitle?: string, kind?: number) {
    const params = this.combin({}, { zyId: zyId, tiitle: tiitle, kind: kind });

    const data: any = await defHttp.get({
      url: `/kecheng/pc/classes/selectClassList`,
      method: 'GET',
      params: params,
    });

    return data;
  }
  /* ---------公开课程-------------- */
  /**直播公开课程列表*/
  async getCouPubList(
    pageSize: number,
    pageNum: number,
    kind?: number,
    islive?: number,
    ispass?: number,
    coursetype?: number,
    title?: string,
    isException?: number,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        kind: kind,
        islive: islive,
        ispass: ispass,
        coursetype: coursetype,
        title: title,
        isException: isException ? isException : 0,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/tenant/couPublic/getCouPubList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /**直播公开课详情*/
  async getPubDetails(typeId: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/tenant/couPublic/getPubDetails`,
      method: 'GET',
      params: {
        typeId: typeId,
      },
    });
    this.functionNo(data);
    return data;
  }
  /**辅导课程列表*/
  async getCouList(
    pageSize: number,
    pageNum: number,
    types?: number,
    kind?: number,
    kid?: number,
    ispass?: number,
    title?: string,
    ktypes?: number,
    productLine?: string,
    yearName?: string,
    semester?: string,
    tenantId?: number,
    IsJg?: number,
    isException?: number,
    tiitle?: string,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        ktypes: ktypes,
        kid: kid,
        types: types,
        ispass: ispass,
        title: title,
        kind: kind,
        productLine: productLine,
        yearName: yearName,
        semester: semester,
        tenantId: tenantId,
        IsJg: IsJg,
        isException: isException ? isException : 0,
        tiitle: tiitle,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/courseAll/getJgList`,
      method: 'GET',
      params: params,
    });
    this.functionNo(data);
    return data;
  }
  /**辅导课程详情*/
  async getCouDetails(typeId: number, types: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/tenant/couAll/getCouDetails`,
      method: 'GET',
      params: {
        typeId: typeId,
        types: types,
      },
    });
    this.functionNo(data);
    return data;
  }
  /**辅导知识套餐列表
   * IsJg:0购买班型 1:添加班型
   */
  async getCouClassesList(
    pageSize: number,
    pageNum: number,
    isPass?: number,
    tiitle?: string,
    kind?: number,
    zyId?: number,
    productLine?: string,
    tenantId?: number,
    IsJg?: number,
    isException?: number,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        kind: kind,
        zyId: zyId,
        isPass: isPass,
        tiitle: tiitle,
        productLine: productLine,
        tenantId: tenantId,
        IsJg: IsJg,
        isException: isException ? isException : 0,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/tenant/classes/getJgCouClassesList`,
      method: 'GET',
      params: params,
    });
    this.functionNo(data);
    return data;
  }
  /**知识套餐详情*/
  async getDetails(typeId: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/tenant/classes/getDetails`,
      method: 'GET',
      params: {
        typeId: typeId,
      },
    });
    this.functionNo(data);
    return data;
  }
  /**资料包列表*/
  async getCouPackageList(
    pageSize: number,
    pageNum: number,
    isPass?: number,
    title?: string,
    kind?: number,
    zyId?: number,
    kId?: number,
    isException?: number,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        kind: kind,
        zyId: zyId,
        isPass: isPass,
        title: title,
        kId: kId,
        isException: isException ? isException : 0,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/tenant/couPackage/getCouPackageList`,
      method: 'GET',
      params: params,
    });
    this.functionNo(data);
    return data;
  }
  /**资料包详情*/
  async getPackageDetails(typeId: number) {
    const data: any = await defHttp.get({
      url: `/kecheng/tenant/couPackage/getPackageDetails`,
      method: 'GET',
      params: {
        typeId: typeId,
      },
    });
    this.functionNo(data);
    return data;
  }
  /* 图文课 */
  async getJgImageTextTeachList(
    pageSize: number,
    pageNum: number,
    kindId?: number,
    zyId?: number,
    courseId?: number,
    name?: string,
    showStatus?: number,
    tenantId?: number,
    IsJg?: number,
    isException?: number,
    status?: number,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        kindId: kindId,
        zyId: zyId,
        courseId: courseId,
        name: name,
        status: status,
        showStatus: showStatus,
        tenantId: tenantId,
        IsJg: IsJg,
        isException: isException ? isException : 0,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/imageText/getJgImageTextTeachList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /* 面授课 */
  async getJgFaceTeachList(
    pageSize: number,
    pageNum: number,
    kindId?: number,
    zyId?: number,
    courseId?: number,
    name?: string,
    showStatus?: number,
    tenantId?: number,
    IsJg?: number,
    isException?: number,
    status?: number,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        kindId: kindId,
        zyId: zyId,
        courseId: courseId,
        name: name,
        showStatus: showStatus,
        tenantId: tenantId,
        status: status,
        IsJg: IsJg,
        isException: isException ? isException : 0,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/face/getJgFaceTeachList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /** 音频课
   *    IsJg:0购买班型 1:添加班型
   */
  async getJgAudioTeachList(
    pageSize: number,
    pageNum: number,
    kindId?: number,
    zyId?: number,
    courseId?: number,
    name?: string,
    showStatus?: number,
    tenantId?: number,
    IsJg?: number,
    isException?: number,
    status?: number,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        kindId: kindId,
        zyId: zyId,
        courseId: courseId,
        name: name,
        showStatus: showStatus,
        status: status,
        tenantId: tenantId,
        IsJg: IsJg,
        isException: isException ? isException : 0,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/audio/getJgAudioTeachList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /* ==============公开课邀请记录==================================================================================== */
  /**获取公开课邀请记录列表*/
  async getUserPublicKeInviteList(
    keId: number,
    searchTenant?: number,
    inviteUserId?: number,
    beinviteUserId?: number,
    isSucceed?: string,
  ) {
    const params = this.combin(
      { keId: keId },
      {
        searchTenant: searchTenant,
        inviteUserId: inviteUserId,
        beinviteUserId: beinviteUserId,
        isSucceed: isSucceed,
      },
    );

    const data: any = await defHttp.get({
      url: `/stu/userPublicKeInvite/getUserPublicKeInviteList`,
      method: 'GET',
      params: params,
    });
    this.functionNo(data);
    return data;
  }
  /**获取公开课预约列表*/
  async getUserPublicKeList(
    keId: number,
    searchTenant?: number,
    inviteUserId?: number,
    beinviteUserId?: number,
    isSucceed?: string,
  ) {
    const params = this.combin(
      { keId: keId },
      {
        searchTenant: searchTenant,
        inviteUserId: inviteUserId,
        beinviteUserId: beinviteUserId,
        isSucceed: isSucceed,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/userPublicKe/getUserPublicKeList`,
      method: 'GET',
      params: params,
    });
    this.functionNo(data);
    return data;
  }

  /*------------------------  公开课管理--------------------------------------------------------------------------------- */
  //查分页
  async coursePublicList(
    pageSize: number,
    pageNum: number,
    kind?: number,
    types?: number,
    islive?: number,
    ispass?: number,
    starttime?: number,
    endtime?: number,
    coursetype?: number,
    title?: string,
    status?: number,
    isPush?: number,
    tenantId?: number,
  ) {
    const params = this.combin(
      { pageSize: pageSize, pageNum: pageNum },
      {
        kind: kind,
        types: types,
        islive: islive,
        ispass: ispass,
        starttime: starttime,
        endtime: endtime,
        coursetype: coursetype,
        title: title,
        status: status,
        isPush: isPush,
        tenantId: tenantId,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/coursePublic/getList`,
      method: 'GET',
      params: params,
    });
    return data;
  }
  /*------------------------  直播公开课--------------------------------------------------------------------------------- */
  //添加
  async liveshowpublicAdd(
    Title: string,
    Content: string,
    Img: string,
    TeacherId: number,
    Kind: number,
    CourseType: number,
    Duration: string,
    Price: number,
    zbTime: string,
    IsAllowPresent: number,
    IsAllowShare: number,
    IsWelfare: number,
    Thumbnail?: string,
    LiveConfig?: string,
    MImg?: string,
    BackUrl?: string,
    BackTime?: number,
    CcConfig?: string,
    AliSrc?: string,
    videoSrc?: string,
  ) {
    const params = this.combin(
      {
        Title: Title,
        Content: Content,
        Img: Img,
        TeacherId: TeacherId,
        Kind: Kind,
        CourseType: CourseType,
        Duration: Duration,
        Price: Price,
        zbTime: zbTime,
        IsAllowPresent: IsAllowPresent,
        IsAllowShare: IsAllowShare,
        IsWelfare: IsWelfare,
      },
      {
        Thumbnail: Thumbnail,
        LiveConfig: LiveConfig,
        MImg: MImg,
        BackUrl: BackUrl,
        BackTime: BackTime,
        CcConfig: CcConfig,
        AliSrc: AliSrc,
        videoSrc: videoSrc,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/liveshowpublic/add`,
      method: 'GET',
      params: params,
    });

    return data;
  }

  //修改
  async liveshowpublicUpdate(
    id: number,
    Title: string,
    Content: string,
    Img: string,
    TeacherId: number,
    Kind: number,
    CourseType: number,
    Duration: string,
    Price: number,
    zbTime: string,
    IsAllowPresent: number,
    IsAllowShare: number,
    IsWelfare: number,
    Thumbnail?: string,
    LiveConfig?: string,
    MImg?: string,
    BackUrl?: string,
    BackTime?: number,
    CcConfig?: string,
    AliSrc?: string,
    videoSrc?: string,
  ) {
    const params = this.combin(
      {
        id: id,
        Title: Title,
        Content: Content,
        Img: Img,
        TeacherId: TeacherId,
        Kind: Kind,
        CourseType: CourseType,
        Duration: Duration,
        Price: Price,
        zbTime: zbTime,
        IsAllowPresent: IsAllowPresent,
        IsAllowShare: IsAllowShare,
        IsWelfare: IsWelfare,
      },
      {
        Thumbnail: Thumbnail,
        LiveConfig: LiveConfig,
        MImg: MImg,
        BackUrl: BackUrl,
        BackTime: BackTime,
        CcConfig: CcConfig,
        AliSrc: AliSrc,
        videoSrc: videoSrc,
      },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/liveshowpublic/update`,
      method: 'GET',
      params: params,
    });

    return data;
  }
  //查详公开课情
  async liveshowpublicDetail(id: any) {
    const data: any = await defHttp.get({
      url: `/kecheng/liveshowpublic/getDetail`,
      method: 'GET',
      params: {
        Id: id,
      },
    });

    return data;
  }
  //删除
  async liveshowpublicDel(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/liveshowpublic/delete`,
      method: 'GET',
      params: {
        ids: id,
      },
    });

    return data;
  }
  //更改上架状态
  async liveChangeStatus(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/liveshowpublic/changeStatus`,
      method: 'GET',
      params: {
        Id: id,
      },
    });

    return data;
  }
  /*------------------------  录播公开课--------------------------------------------------------------------------------- */
  //添加
  async videocoursepublicAdd(
    Title: string,
    Kind: number,
    Content: string,
    TeacherId: number,
    Img: string,
    CourseType: number,
    LiveConfig: string,
    Duration: number,
    Price: number,
    MImg?: string,
    videoSrc?: string,
  ) {
    const params = this.combin(
      {
        Price: Price,
        Title: Title,
        Kind: Kind,
        Content: Content,
        TeacherId: TeacherId,
        Img: Img,
        CourseType: CourseType,
        LiveConfig: LiveConfig,
        Duration: Duration,
      },
      { MImg: MImg, videoSrc: videoSrc },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/videocoursepublic/add`,
      method: 'GET',
      params: params,
    });

    return data;
  }
  //修改
  async videocoursepublicUpdate(
    Id: number,
    Title: string,
    Kind: number,
    Content: string,
    TeacherId: number,
    Img: string,
    CourseType: number,
    LiveConfig: string,
    Duration: number,
    Price: number,
    MImg?: string,
    videoSrc?: string,
  ) {
    const params = this.combin(
      {
        Id: Id,
        Price: Price,
        Title: Title,
        Kind: Kind,
        Content: Content,
        TeacherId: TeacherId,
        Img: Img,
        CourseType: CourseType,
        LiveConfig: LiveConfig,
        Duration: Duration,
      },
      { MImg: MImg, videoSrc: videoSrc },
    );

    const data: any = await defHttp.get({
      url: `/kecheng/videocoursepublic/update`,
      method: 'GET',
      params: params,
    });

    return data;
  }
  //查详情
  async videocoursepublicDetail(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocoursepublic/getDetail`,
      method: 'GET',
      params: {
        Id: id,
      },
    });

    return data;
  }
  //删除
  async videocoursepublicDel(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocoursepublic/delete`,
      method: 'GET',
      params: {
        ids: id,
      },
    });

    return data;
  }
  //更改上架状态
  async videocoursepublicChangeStatus(id: string) {
    const data: any = await defHttp.get({
      url: `/kecheng/videocoursepublic/changeStatus`,
      method: 'GET',
      params: {
        Id: id,
      },
    });

    return data;
  }
  /*------------------------ 课程管理--------------------------------------------------------------------------------- */
  async getCourse(params: {
    types?: number;
    pageSize: number;
    pageNum: number;
    kind?: number;
    name?: string;
  }) {
    let data = {};
    switch (params.types) {
      case 1:
      case 2:
        console.log(params, '======getCourse');

        await this.getList(params);
        break;
      case 3:
        data = await this.getAudioTeachList({
          pageSize: params.pageSize,
          pageNum: params.pageNum,
          kindId: params.kind,
          name: params.name,
        });
        break;
      case 4:
        data = await this.getImageTextTeachList({
          pageSize: params.pageSize,
          pageNum: params.pageNum,
          kindId: params.kind,
          name: params.name,
        });
        break;
      case 5:
        data = await this.getFaceTeachList({
          pageSize: params.pageSize,
          pageNum: params.pageNum,
          kindId: params.kind,
          name: params.name,
        });
        break;
      default:
        break;
    }

    return data;
  }
}
