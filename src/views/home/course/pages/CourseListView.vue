<template>
  <div class="course-list">
    <course-detail-modal-vue :visible.sync="showCourseDetail" ref="courseDetail"></course-detail-modal-vue>
    <el-card>
      <div slot="header" class="clearfix">
        <span>课程列表</span>
      </div>
      <div class="search-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入关键词搜索"
          clearable
          @clear="handleClearSearch"
          @input="handleSearch"
        ></el-input>
      </div>
      <el-table :data="filteredCourses" stripe style="width: 100%" height="600">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="courseName" label="课程名称" width="150"></el-table-column>
        <el-table-column prop="courseId" label="课程号" width="150"></el-table-column>
        <el-table-column prop="courseDescription" label="课程简介" width="300"></el-table-column>
        <el-table-column prop="class" label="授课班级" width="200"></el-table-column>
        <el-table-column prop="teacher" label="授课教师" width="150"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleViewDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import CourseDetailModalVue from '@/components/dialogs/CourseDetailModal.vue';


export default {
  components: {
    CourseDetailModalVue,
  },
  data() {
    return {
      courses: [
        {
          courseName: "英语口语",
          courseId: "002106",
          courseDescription: "旨在提高学生的英语口语能力，通过大量的实践和互动，使学生能够在日常生活和学术环境中自信流利地表达自己。",
          class: "2020级英语1班",
          teacher: "王凤娥"
        },
        {
          courseName: "大学英语应用翻译",
          courseId: "001652",
          courseDescription: "帮助学生提高语言交际和应用能力，同时构建跨学科视野，提升应用翻译技能。教学内容主要由三个知识模块组成:应用翻译基础、呼唤功能型应用翻译策略、信息为主型应用翻译策略。",
          class: "2021级英语(师范)2班",
          teacher: "李秋华"
        },
        {
          courseName: "大学英语英美概况",
          courseId: "003247",
          courseDescription: "主要介绍英语国家的社会与文化背景，旨在帮助英语了解这些国家的文化和社会的基本知识、如历史、政治、经济、社会生活、文化传统，节日娱乐等，以便学生了解西方文化和价值观。更好地掌握和运用英语语言，加深对语言和文化的理解。",
          class: "2022级商务英语3班",
          teacher: "陈海锋"
        },
        {
          courseName: "英语批判性阅读",
          courseId: "009395",
          courseDescription: "本课程的目标是通过讲授按照篇章的修辞模式编排的课文，培养学生较高层次和更高层次的阅读鉴赏能力。鉴赏是读者和文本之间的对话，是一个思想碰撞和心灵交流的动态过程。鉴赏以文本为凭据，但又不限于文本:它能促使我们联想和想象，引申和扩展课文的主题思想，并唤起创新意识。",
          class: "2023级英法1班",
          teacher: "黄慧"
        },
        {
          courseName: "大学英语跨文化商务交际",
          courseId: "002054",
          courseDescription: "课程服务“一带一路”建设对国际化人才的需求，介绍相关国家概况、核心文化价值观以及商务礼仪知识，讲解通用商务英语沟通技巧，兼顾人文知识与语言技能，融合商务英语内容学习与跨文化交际能力培养，为学生进行跨文化商务往来提供指导。",
          class: "2023级英语1班",
          teacher: "杨正君"
        },
        // 添加更多课程信息
      ],
      searchKeyword: '', // 搜索关键词
      showCourseDetail: false
    };
  },
  computed: {
    // 根据搜索关键词过滤课程
    filteredCourses() {
      if (!this.searchKeyword) {
        return this.courses;
      }
      const keyword = this.searchKeyword.toLowerCase();
      return this.courses.filter(course => {
        return (
            course.courseName.toLowerCase().includes(keyword) ||
            course.courseId.toLowerCase().includes(keyword) ||
            course.courseDescription.toLowerCase().includes(keyword) ||
            course.class.toLowerCase().includes(keyword) ||
            course.teacher.toLowerCase().includes(keyword)
        );
      });
    },
  },
  methods: {
    // 处理搜索
    handleSearch() {
      // 搜索功能由计算属性实现，此处不需要额外处理
    },
    // 处理清除搜索
    handleClearSearch() {
      this.searchKeyword = ''; // 清空搜索关键词
    },
    // 查看详情操作
    handleViewDetails(course) {
      this.showCourseDetail = true;
      this.$refs.courseDetail.course = course
    },
  },
};
</script>

<style lang="scss" scoped>
.course-list {
  display: flex;
  height: 100%;
  width: 100%;

  .el-card {
    width: 100%;
    margin: 10px;

    .clearfix {
      text-align: left;
    }

    .search-bar {
      margin-bottom: 20px;
    }

    .el-table {
      width: 100%;

    }
  }
}
</style>
