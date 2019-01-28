<template>
  <div id="coursesManager" class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>微课管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="searchModel" class="search-form">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="课程名称" v-model="searchModel.name" class="form-input">
              <template slot="prepend">课程名称</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" size="medium" @click="doSearch()">查询</el-button>
            <el-button type="success" size="medium" @click="addCourse()">新增课程</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border fit highlight-current-row empty-text="-">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="课程名称">
        <template slot-scope="scope">
          <div class="custom-ellipsis">{{scope.row.name}}</div>
        </template>
      </el-table-column>

      <el-table-column label="讲师" width="180">
        <template slot-scope="scope">
          <div class="custom-ellipsis">{{scope.row.lecturerName}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="price" label="课程基价(元)" width="130" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="likes" label="点赞数" width="100" align="center"></el-table-column>

      <el-table-column prop="totalDurationStr" label="音视频时长" width="130" align="center"></el-table-column>

      <el-table-column prop="isDisabled" label="课程状态" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isDisabled == 0" style="color:#67c23a;">
            <i class="el-icon-circle-check"></i>启用
          </span>
          <span v-if="scope.row.isDisabled == 1" style="color:#f56c6c;">
            <i class="el-icon-circle-close"></i>禁用
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              v-if="!scope.row.isDisabled "
              size="small"
              class="handle-btn"
              type="danger"
              @click="handleDisabled(scope.$index, scope.row)"
            >禁用</el-button>
            <el-button
              v-else
              size="small"
              class="handle-btn"
              type="success"
              @click="handleDisabled(scope.$index, scope.row)"
            >启用</el-button>
            <el-button
              type="primary"
              size="small"
              class="handle-btn"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑信息</el-button>
            <el-button
              type="success"
              size="small"
              class="handle-btn"
              icon="el-icon-edit-outline"
              @click="handleContent(scope.$index, scope.row)"
            >内容管理</el-button>
            <el-button
              type="primary"
              size="small"
              class="handle-btn"
              icon="el-icon-view"
              @click="goCourseCommentPage(scope.$index, scope.row)"
            >查看留言</el-button>
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
    <el-dialog
      title="新增课程"
      v-if="dialogNewFormVisible"
      :visible.sync="dialogNewFormVisible"
      width="50%"
      :modal-append-to-body="false"
    >
      <el-steps :active="stepActive" finish-status="success">
        <el-step title="课程基本信息"></el-step>
        <el-step title="课程内容"></el-step>
      </el-steps>

      <!-- 课程基本内容 -->
      <div v-if="stepActive==0" class="form-box">
        <el-form
          ref="courseNewForm"
          :rules="courseRules"
          :model="courseNewForm"
          label-width="150px"
        >
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="courseNewForm.name" placeholder="课程名称"></el-input>
          </el-form-item>

          <el-form-item label="讲师ID" class="search-popup-container" required:true>
            <el-input v-model="courseNewForm.lecturerId" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="讲师" class="search-popup-container" prop="lecturerId">
            <el-autocomplete
              width="100%"
              v-model="courseNewForm.lecturerName"
              :fetch-suggestions="searchLecture"
              @select="handleSelect"
            >
              <template slot-scope="{ item }">
                <div>
                  <img :src="item.avatarUrl | patchImgHttp" style="width:25px;height:25px">
                  <span>{{ item.name }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>

          <el-form-item label="课程基价(元)" prop="price" required:true>
            <el-input-number v-model="courseNewForm.price" :max="10000"></el-input-number>
          </el-form-item>

          <el-form-item label="头图预览" class="search-popup-container">
            <img
              :src="courseNewForm.headImgUrl | patchImgHttp"
              v-if="courseNewForm.headImgUrl"
              style="width:45px;height:45px;"
            >
          </el-form-item>

          <el-form-item label="头图" class="search-popup-container" prop="headImgUrl">
            <el-autocomplete
              width="100%"
              v-model="courseNewForm.headImgName"
              :fetch-suggestions="searchHeadurl"
              @select="handleHeader"
            >
              <template slot-scope="{ item }">
                <div>
                  <img :src="item.content | patchImgHttp" style="width:25px;height:25px">
                  <span>{{ item.title }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogNewFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="nextStep('courseNewForm')">下一步</el-button>
        </span>
      </div>

      <!-- 课程内容 -->
      <div v-if="stepActive==1" class="form-box">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-button type="primary" size="small" @click="addContent(0)">文本内容</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="small" @click="addContent(1)">图片内容</el-button>
          </el-col>
        </el-row>

        <el-row :gutter="12" v-if="content.type != null">
          <el-col :span="18">
            <!-- 添加文本内容 -->
            <el-input
              v-if="content.type == 0"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="content.content"
            ></el-input>
            <!-- 添加媒体内容 -->
            <el-autocomplete
              width="100%"
              v-model="content.title"
              :fetch-suggestions="searchContentMedia"
              @select="handleContentMedia"
              v-if="content.type == 1"
            >
              <template slot-scope="{ item }">
                <div>
                  <img :src="item.content | patchImgHttp" style="width:25px;height:25px">
                  <span>{{ item.title }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="6">
            <el-button type="text" @click="addContentItem()">添加</el-button>
            <el-button type="text" @click="cancelContentItem()">取消</el-button>
          </el-col>
        </el-row>

        <!-- 课程内容列表 -->
        <div v-for="(item, index) in contents" :key="index" class="content-item">
          <el-row :gutter="12">
            <el-col :span="22">
              <div v-if="item.type == 0">{{item.content}}</div>
              <div v-if="item.type == 1">
                <img :src="item.url | patchImgHttp" style="width:25px;height:25px">
                {{item.title}}
              </div>
            </el-col>
            <el-col :span="2" style="aligin:center;">
              <el-button type="text" @click="removeContentItem()">删除</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCoursePage } from "@/api/courses";
import { getLecturerList } from "@/api/lecturers";
import { getMediaPage } from "@/api/mediaResources";

export default {
  name: "coursesManager",
  data() {
    return {
      searchModel: {},
      isSearching: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogNewFormVisible: false,
      stepActive: 0,
      courseNewForm: { price: 0 },
      courseRules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        lecturerId: [{ required: true, message: "请选择讲师" }],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          {
            type: "number",
            message: "请输入0-10000之间的数字格式",
            min: 0,
            max: 10000,
            trigger: "blur"
          }
        ],
        headImgUrl: [{ required: true, message: "请选择头图" }]
      },
      content: {},
      contents: []
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    doSearch() {
      this.isSearching = true;
      this.loadPage();
      this.isSearching = false;
    },
    async loadPage() {
      const data = await getCoursePage({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.searchModel.name
      }).catch(e => console.log(e));
      this.tableData = data.dataResult;
      this.total = data.totalNum;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.loadPage();
    },
    addCourse() {
      this.courseNewForm = { price: 0 };
      this.stepActive = 0;
      this.dialogNewFormVisible = true;
    },
    async searchLecture(queryString, cb) {
      const data = await getLecturerList({
        name: queryString
      }).catch(e => {
        console.log(e);
      });
      cb(data);
    },
    handleSelect(item) {
      this.courseNewForm.lecturerId = item.id;
      this.courseNewForm.lecturerName = item.name;
    },
    async searchHeadurl(queryString, cb) {
      const data = await getMediaPage({
        pageNo: 1,
        pageSize: 10,
        title: queryString,
        type: 1
      }).catch(e => {
        console.log(e);
      });
      cb(data.dataResult);
    },
    handleHeader(item) {
      this.courseNewForm.headImgName = item.title;
      this.courseNewForm.headImgUrl = item.content;
    },
    nextStep(formName) {
      console.log(this.courseNewForm);

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.stepActive = 1;
          this.contents = [];
        }
      });
    },
    addContent(type) {
      this.content = {};
      this.content = {
        type: type
      };
      console.log(this.content);
    },
    addContentItem() {
      this.contents.push(this.content);
      this.content = {};
      console.log(this.contents);
    },
    cancelContentItem() {
      this.content = {};
      console.log(this.contents);
    },
    removeContentItem(index) {
      this.contents.splice(index, 1);
    },
    async searchContentMedia(queryString, cb) {
      const data = await getMediaPage({
        pageNo: 1,
        pageSize: 10,
        title: queryString
      }).catch(e => {
        console.log(e);
      });
      cb(data.dataResult);
    },
    handleContentMedia(item) {
      console.log(item);
      this.content = {
        type: item.type,
        title: item.title,
        content: item.id,
        url: item.content
      };
    }
  }
};
</script>

<style lang="less" scope>
.form-box {
  margin-top: 25px;
  border-top: 1px #eee solid;
  padding-top: 25px;
}
.content-item {
  margin-top: 10px;
  padding: 10px;
  border: 1px #eee dashed;
}
</style>
