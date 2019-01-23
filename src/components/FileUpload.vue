<template>
  <div id="mediaFileUpload">
    <el-upload
      class="upload-demo"
      action="https://upload.qiniup.com"
      :accept="accept"
      :before-upload="handleBefore"
      :auto-upload="true"
      :http-request="doReq"
    >
      <!-- 
      :data="fileData"
      :file-list="fileList"-->
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
const axiosInstance = axios.create({ timeout: 0 });
export default {
  props: {
    action: {
      type: String,
      required: false,
      default: "https://upload.qiniup.com"
    },
    tip: {
      type: String,
      required: false,
      default: "只能上传jpg/png文件，且不超过500kb"
    },
    accept: {
      type: String,
      required: false,
      default: ".png, .jpg, .mp4, .wmv, .mp3"
    },
    upToken: {
      type: String,
      required: true
    }
  },
  methods: {
    submitUpload() {
      let that = this;
      that.$refs.upload.submit();
    },
    handleBefore(file) {
      console.log("before", file);
      const data = new FormData();
      data.append("token", this.upToken);
      data.append("file", file);
      this.data = {
        token: this.upToken,
        file: file
      };
      console.log(this.data);
      return false;
    },
    onSuccess(response, file) {
      console.log("response:", response, file, fileList);
    },
    doReq(file, fileList) {
      console.log("请求上传", file);

      axiosInstance({
        method: "POST",
        url: "https://upload.qiniup.com",
        data
      }).then(res => {
        const { hash, key } = res.data;
        console.log("hash,key", hash, key);
      });
    }
  }
};
</script>

<style>
</style>
