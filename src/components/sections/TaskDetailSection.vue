<template>
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
        <el-page-header @back="goBack" :content="task.title">
        </el-page-header>

        <div class="wrapper-teacher-content" v-if="$store.state.authority === 'teacher'">
            <el-tabs v-model="activeName" type="border-card" v-if="!showStudentTaskDetail">
                <el-tab-pane label="任务详情" name="0">
                    任务详情
                </el-tab-pane>
                <el-tab-pane label="学生完成情况" name="1">
                    <el-table
                        :data="taskResultData"
                        style="width: 100%">
                        <el-table-column
                            v-for="(item, index) in tableAttributes"
                            :key="index"
                            :prop="item.prop"
                            :label="item.label">
                        </el-table-column>

                        <el-table-column
                            align="right">

                            <template slot="header">
                                <el-button
                                size="mini"
                                class="ai-button"
                                @click="handleBatchCorrection()">批量自动批改</el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="handlePreview(scope.$index, scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>

            <div v-else>
                <component :is="currentTaskComponent"></component>
            </div>
        </div>

        <div class="wrapper-student-content" v-else>
            <component :is="currentTaskComponent"></component>
        </div>

    </div>
</template>

<script>
import TaskDetailWorkVue from './studentWorks/TaskDetailWork.vue';
import DoHomeworkSectionVue from './taskSections/DoHomeworkSection.vue';
import SignInSectionVue from './taskSections/SignInSection.vue';

export default {
    components: {
        SignInSectionVue,
        DoHomeworkSectionVue,
        TaskDetailWorkVue
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localVisible: this.visible,
            showStudentTaskDetail: false,
            activeName: '1',
            tableAttributes: [
                {
                    prop: "studentId",
                    label: "学号"
                },
                {
                    prop: "score",
                    label: "成绩"
                },
                {
                    prop: "state",
                    label: "批改状态"
                },
            ],
            taskResultData: [
                {
                    studentId: 123,
                    score: 123,
                    state: "已批改"
                }
            ]
        }
    },
    computed: {
        currentTaskComponent() {
            // 根据 task 的 type 返回相应的组件名
            switch (this.task.type) {
                case 'sign-in':
                    return 'SignInSectionVue';
                case 'do-homework':
                    return 'DoHomeworkSectionVue';
                default:
                    return null; // 如果类型不匹配，不显示任何组件
            }
        }
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
        },
        localVisible(newVal) {
            // 当本地可见性状态变化时，通知父组件更新
            this.handleVisibilityChange(newVal);
        }
    },
    methods: {
        handleVisibilityChange(value) {
            // 通知父组件更新 visible 值
            this.$emit('update:visible', value);
        },
        goBack() {
            if (this.showStudentTaskDetail === true) {
                this.showStudentTaskDetail = false;
            } else {
                this.handleVisibilityChange(false);
            }
        },
        handleBatchCorrection() {

        },
        handlePreview(index, row) {
            this.showStudentTaskDetail = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.wrapper-teacher-content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    padding: 10px;

    .el-tabs {
        flex-grow: 1;
    }
}

.wrapper-student-content {
    display: flex;
    flex-direction: column;
    align-items: start;
    flex-grow: 1;
}

</style>