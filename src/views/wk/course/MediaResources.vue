<template>
  <div id="wkMediaResource" class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>多媒体管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="12" class="upload-op-box">
      <el-col :span="6">
        <el-button type="primary" size="medium" @click="showUpload">上传文件</el-button>
      </el-col>
      <el-col :span="6" v-if="isShowUpload">
        <el-button type="success" size="medium" @click="confirmUpload">确认上传</el-button>
      </el-col>

      <el-col :span="6" v-if="isShowUpload">
        <el-button type="warning" size="medium" @click="showUpload = false">取消上传</el-button>
      </el-col>
    </el-row>

    <div v-if="isShowUpload" class="upload-box">
      <el-upload
        class="upload-demo"
        ref="upload"
        :multiple="true"
        action="https://upload.qiniup.com"
        :data="fileData"
        drag
        :before-upload="handleBefore"
        :on-preview="handlePreview"
        accept=".png, .jpg, .mp4, .wmv, .mp3"
        :on-remove="handleRemove"
        :auto-upload="true"
        :disabled="isUploading"
        :on-success="onSuccess"
      >
        <!-- :http-request="doRequest" :file-list="fileList" -->
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>

    <!-- <file-upload :upToken="upToken"></file-upload> -->
  </div>
</template>

<script>
import { getUpToken } from "@/api/qiniu";
import { batchSaveMedias } from "@/api/mediaResources";

export default {
  name: "wkMeidaResourceManager",
  data() {
    return {
      upToken: "",
      isUploading: false,
      fileList: {},
      fileData: {},
      isShowUpload: false
    };
  },
  mounted() {
    this.getToken();
    this.fileList = {};
  },
  methods: {
    showUpload() {
      this.fileList = {};
      this.isShowUpload = true;
    },
    handleBefore(file) {
      return true;
    },
    onSuccess(response, file, fileList) {
      console.log("成功", response, file, fileList);
      let type = 0;
      const originType = file.raw.type;
      console.log("originType", originType);
      if (originType.substr(0, "image".length) === "image") {
        type = 1;
      } else if (originType.substr(0, "audio".length) === "audio") {
        type = 2;
      } else if (originType.substr(0, "video".length) === "audio") {
        type = 3;
      }
      const { hash, key } = response;
      this.fileList[file.uid] = {
        title: file.name,
        fileName: file.name,
        type: type,
        size: file.size,
        content: key
      };
      console.log(this.fileList);
    },
    handleRemove(file, fileList) {
      console.log("移除", fileList);
      delete this.fileList[file.uid];
      console.log(this.fileList);
    },
    handlePreview(file) {
      console.log("预览", file);
    },
    async getToken() {
      const data = await getUpToken().catch(e => console.log(e));
      console.log("token", data);
      this.fileData = { token: data.uptoken };
    },
    //确认上传
    async confirmUpload() {
      let data = [];
      for (let item in this.fileList) {
        let x = this.fileList[item];
        data.push(x);
        console.log("item", x);
      }
      console.log("确认上传", data);
      const d = await batchSaveMedias(data).catch(e => console.log(e));
      this.fileList = {};
      this.isShowUpload = false;
    },
    //取消上传
    cancleUpload() {
      this.fileList = {};
      this.isShowUpload = false;
    }
  }
};
</script>

<style lang="less" scope>
.upload-op-box {
  padding: 20px 10px;
}
.upload-box {
  padding: 20px 10px;
}
</style>
