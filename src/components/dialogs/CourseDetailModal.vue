<template>
  <el-dialog
    :visible.sync="localVisible"
    :title="course.courseName"
    :close-on-click-modal="true"
    @close="handleClose"
  >
    <div class="grid-container">
      <div class="grid-item title">课程名称：</div>
      <div class="grid-item content">{{ course.courseName }}</div>
      <div class="grid-item title">课程号：</div>
      <div class="grid-item content">{{ course.courseId }}</div>
      <div class="grid-item title">课程简介：</div>
      <div class="grid-item content">{{ course.courseDescription }}</div>
      <div class="grid-item title">授课班级：</div>
      <div class="grid-item content">{{ course.class }}</div>
      <div class="grid-item title">授课教师：</div>
      <div class="grid-item content">{{ course.teacher }}</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      localVisible: this.visible,
      course: {
        courseName: '',
        courseId: '',
        courseDescription: '',
        class: '',
        teacher: ''
      }
    }
  },
  watch: {
    visible(newVal) {
      this.localVisible = newVal;
    },
    localVisible(newVal) {
      this.$emit('update:visible', newVal);
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
    gap: 0; /* 移除行间隔 */
}

.grid-item {
  width: 50%;
  margin-bottom: 0;
  padding: 2%;
  border: 1px solid black; /* 黑色边框 */
  box-sizing: border-box; /* 让边框在宽度内 */
}

.grid-item.title {
  width: 40%;
  font-weight: bold; /* 标题加粗 */
}

.grid-item.content {
  width: 60%;
}

</style>
