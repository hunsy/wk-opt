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

    <div v-if="!isShowUpload">
      <el-form :model="searchModel" class="search-form">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-form-item>
              <el-input placeholder="资源标题" v-model="searchModel.title" class="form-input">
                <template slot="prepend">资源标题</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" size="medium" @click="doSearch()">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="tableData" border fit highlight-current-row empty-text="-">
        <el-table-column type="index"></el-table-column>

        <el-table-column prop="type" width="100" label="资源类型" align="center">
          <template slot-scope="scope">
            <font-awesome-icon icon="image" v-if="scope.row.type == 1"/>
            <font-awesome-icon icon="audio-description" v-if="scope.row.type == 2"/>
            <font-awesome-icon icon="video" v-if="scope.row.type == 3"/>
          </template>
        </el-table-column>

        <el-table-column prop="title" label="资源标题"></el-table-column>
        <el-table-column prop="size" width="200" label="资源大小(byte)"></el-table-column>
        <el-table-column prop="createdTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="primary"
                class="handle-btn"
                size="small"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container flex-center">
        <el-pagination
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="更新资源信息"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      width="50%"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="资源标题" prop="title" required:true>
          <el-input v-model="form.title" placeholder="资源标题"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUpToken } from "@/api/qiniu";
import {
  batchSaveMedias,
  getMediaPage,
  updateMedia
} from "@/api/mediaResources";

export default {
  name: "wkMeidaResourceManager",
  data() {
    return {
      upToken: "",
      isUploading: false,
      fileList: {},
      fileData: {},
      isShowUpload: false,
      searchModel: {},
      pageNo: 1,
      pageSize: 5,
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      form: {},
      rules: {
        title: [
          { required: true, message: "资源标题不能为空", trigger: "blur" },
          {
            min: 3,
            max: 32,
            message: "长度在 3 到 32 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getToken();
    this.fileList = {};
    this.loadPage();
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
      if (data.length == 0) {
        this.$message.warning(`至少上传一个文件`);
        return;
      }
      console.log("确认上传", data);
      const d = await batchSaveMedias(data).catch(e => console.log(e));
      this.fileList = {};
      this.isShowUpload = false;
      this.loadPage();
    },
    //取消上传
    cancleUpload() {
      this.fileList = {};
      this.isShowUpload = false;
    },
    doSearch() {
      this.loadPage();
    },
    async loadPage() {
      const query = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        title: this.searchModel.title
      };
      const data = await getMediaPage(query).catch(error => {
        console.log(error);
      });
      this.tableData = data.dataResult;
      this.total = data.totalNum;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.loadPage();
    },
    handleEdit(idx, row) {
      this.form = {};
      this.form = {
        id: row.id,
        title: row.title
      };
      this.dialogFormVisible = true;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const s = await updateMedia(this.form).catch(e => {
            console.log(e);
          });
          this.dialogFormVisible = false;
          this.loadPage();
        } else {
          console.log("validate error");
        }
      });
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
