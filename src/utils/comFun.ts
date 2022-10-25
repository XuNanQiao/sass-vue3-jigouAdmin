/*
 * @Author: 南桥几许
 * @Date: 2022-06-23 16:33:04
 * @LastEditTime: 2022-07-11 15:26:46
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \organization\src\utils\comFun.ts
 *
 */
import { useGlobSetting } from '/@/hooks/setting';
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
export default {
  clickCopy(shareLink: string) {
    const input = document.createElement('input'); // 直接构建input
    input.value = shareLink; // 设置内容
    document.body.appendChild(input); // 添加临时实例
    input.select(); // 选择实例内容
    document.execCommand('Copy'); // 执行复制
    document.body.removeChild(input); // 删除临时实例
    if (document.execCommand('Copy')) {
      // this.$message.success('复制成功~');
    }
  },
  /* 图片上传地址 */
  uploadUrl() {
    const { uploadUrl = '' } = useGlobSetting();
    return uploadUrl;
  },
  /* 文件上传地址 */
  uploadFile() {
    const { uploadFile = '' } = useGlobSetting();
    return uploadFile;
  },
  /* 文件上传大小校验 */
  imgurlBeforeUpload(file: any, fileList: any, size?: number) {
    size = size ? size : 3;
    const isRightSize = file.size / 1024 / 1024 < size;
    if (!isRightSize) {
      message.error(`文件大小超过${size}MB`);
    }
    return isRightSize;
  },
  router(path) {
    const router = useRouter();
    router.push(path);
  },
};
