<template>
    <div class="content">
        <el-menu :default-active="activeIndex" class="menu-nav" mode="horizontal" @select="handleButtonClick">
            <el-menu-item
            v-for="(item, index) in buttonItems"
            :key="index"
            :index="item.index"><i :class="item.frontIcon"></i>{{ item.title }}</el-menu-item>
        </el-menu>

        <div class="course-grid-container">

            <div class="tool-bar">
                <div>
                    <el-button icon="el-icon-plus" type="primary" @click="addCourseDialogVisible = true" v-show="$store.state.authority === 'teacher'">添加课程</el-button>
                    <add-course-modal-vue :visible.sync="addCourseDialogVisible" @added-course="getTeachCourseData"/>
                </div>
                <div>
                    
                </div>
            </div>

            <el-row :gutter="20" class="course-grid">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" v-for="course in courses" :key="course.id">
                    <course-item-vue class="course-item"
                        :image="course.image"
                        :title="course.title"
                        :instructor="course.instructor"
                        :courseId="course.courseId"
                        @card-click="handleCardClick"
                    />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import CourseItemVue from '@/components/list-item/CourseItem.vue'
import AddCourseModalVue from '@/components/dialogs/AddCourseModal.vue';
import homeCourseNavOpt from '@/assets/configs/homeCourseNavOpt.json'
import { getTeacherCoursesAPI } from '@/services/api/course/getTeacherCourses';

export default {
    components: {
        CourseItemVue,
        AddCourseModalVue
    },
    data() {
        return {
            activeIndex: '0',
            addCourseDialogVisible: false,
            courses: [],
            buttonItems: [],
        };
    },
    created() {
        this.buttonItems = homeCourseNavOpt[this.$store.state.authority]
    },
    mounted() {
        this.handleButtonClick(0);
    },
    methods: {
        handleButtonClick(index) {
            const item = this.buttonItems[index];
            console.log('按钮被点击，索引：', item);
            // 处理点击逻辑
            const name = item.name;
            if (name === 'study') {
                this.courses = [
                    {
                        title: "课程标题1",
                        instructor: "主讲老师1",
                        image: "image1.jpg",
                        courseId: "1"
                    },
                    {
                        title: "课程标题2",
                        instructor: "主讲老师2",
                        image: "image2.jpg",
                        courseId: "2"
                    },
                ]
            } else if (name === 'teach') {
                this.getTeachCourseData();
            } else if (name === 'manager') {

            }
        },
        getTeachCourseData(){
            const teacherId = this.$store.state.accountId;
            // getTeacherCoursesAPI(teacherId, this.$store.state.token)
            //     .then(response => {
            //         const responseBody = response.data
            //         this.courses = responseBody.map(course => ({
            //             title: course.course_name,
            //             instructor: `主讲老师:${course.creator_name}`, // 假设creator字段是教师ID或名称
            //             image: course.course_cover_url || 'default_image.jpg', // 如果没有封面图像，使用默认图像
            //             courseId: course.course_id.toString() // 确保courseId是字符串
            //         }));
            //     })
            //     .catch(error => {
                    
            //     })
            const responseBody = [
                {
                    "title": "课程标题1",
                    "instructor": "主讲老师1",
                    "image": "image1.jpg",
                    "courseId": "1"
                }
            ]
            this.courses = responseBody.map(course => ({
                title: course.title,
                instructor: `主讲老师:${course.instructor}`, // 假设creator字段是教师ID或名称
                image: course.course_cover_url || 'default_image.jpg', // 如果没有封面图像，使用默认图像
                courseId: course.courseId.toString() // 确保courseId是字符串
            }));
        },
        handleCardClick(courseId) {
            // 导航到课程详情页面

            this.$router.push (
                {
                    name: 'navLoadingView'
                }
            );
            // this.$router.push({ 
            //     name: 'courseDetail', 
            //     params: { courseId: courseId }
            // })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';

.content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .menu-nav {
        margin: 0 20px;
    }

    .btn-list {
        display: flex;
        align-items: start;

        padding: 0 1vw;
    }

    .course-grid-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 1vw;

        .tool-bar {
            justify-content: space-between;
        }

        .course-grid {
            width: 100%;
        }
    }

}

</style>