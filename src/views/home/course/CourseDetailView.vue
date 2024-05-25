<template>
    <el-container>
        <el-aside width="200px">
            <course-aside-nav-module-vue :courseId="courseId"/>
        </el-aside>
        <el-main>
            <course-main-module-vue/>
        </el-main>
    </el-container>
</template>

<script>
import CourseAsideNavModuleVue from '@/components/CourseAsideNavModule.vue'
import CourseMainModuleVue from '@/components/CourseMainModule.vue';

export default {
    components: {
        CourseAsideNavModuleVue,
        CourseMainModuleVue
    },
    data() {
        return {
            courseId: '',
        }
    },
    created() {
        this.courseId = this.$route.params.courseId;
    }
}
</script>

<style lang="scss" scoped>

.el-main {
    display: flex;
}

</style>