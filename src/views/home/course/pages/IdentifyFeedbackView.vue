<template>
    <el-card class="identify-feedback-wrapper">
        <div class="identify-feedback-results">
            <div class="identify-feedback-header">
                <h2 class="identify-feedback-title" align="left">练习与测试</h2>
            </div>
            <div class="tool-bar">
                <div class="tool-bar-right">
                    <el-switch
                        v-model="ascending"
                        active-text="正序"
                        inactive-text="倒序"
                        @change="sortQuestion"
                    ></el-switch>
                    <el-select class="select-tool" v-model="sortType" placeholder="排序方式" @change="sortQuestion">
                        <el-option label="默认排序" value="default"></el-option>
                        <el-option label="按时间" value="time"></el-option>
                        <el-option label="按状态" value="status"></el-option>
                    </el-select>
                    <el-select class="select-tool" v-model="filterType" placeholder="筛选任务" @change="filterQuestion">
                        <el-option label="练习" value="practice"></el-option>
                        <el-option label="测试" value="test"></el-option>
                    </el-select>
                </div>
            </div>
            <div v-if="isPracticeTable">
                <el-table
                    :data="practiceData"
                    stripe
                    style="width: 100%">

                    <el-table-column
                        v-for="(practice, index) in practiceList"
                        :key="index"
                        :prop="practice.prop"
                        :label="practice.label"
                        sortable>
                    </el-table-column>

                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handle(scope.$index, scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <div v-else>
                <el-table
                    :data="testData"
                    stripe
                    style="width: 100%">

                    <el-table-column
                    v-for="(test, index) in testList"
                    :key="index"
                    :prop="test.prop"
                    :label="test.label"
                    sortable>
                    </el-table-column>

                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handle(scope.$index, scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </el-card>
</template>

<script>
import '@/icons/iconCommon/iconfont'
import OralTestDetailSectionVue from '@/components/sections/OralTestDetailSection.vue'
import AddQuestionModalVue from "@/components/dialogs/AddQuestionModal.vue";

export default {
    components: {
        OralTestDetailSectionVue
    },
    data() {
        return {
            addDialogVisible: false,
            isPracticeTable: true,
            practiceList: [
                {
                    prop: "number",
                    label: "序号",
                },
                {
                    prop: "studentId",
                    label: "学号",
                },
                {
                    prop: "studentName",
                    label: "姓名",
                },
                {
                    prop: "course",
                    label: "课程",
                },
                {
                    prop: "title",
                    label: "标题",
                },
                {
                    prop: "errorTypes",
                    label: "错误类型",
                },
                {
                    prop: "AIFeedback",
                    label: "AI反馈",
                }
            ],
            practiceData: [
                {
                number: '1',
                studentId: '20230003',
                studentName: 'ACC',
                course: '口语课',
                title: '作业3',
                errorTypes: '发音问题',
                AIFeedback: 'Good job'
                },
                {
                number: '2',
                studentId: '202300033',
                studentName: 'ACEC',
                course: '口语课',
                title: '作业3',
                errorTypes: '发音问题',
                AIFeedback: 'Could be better'
                },
                {
                number: '3',
                studentId: '2023000ER3',
                studentName: 'ADFCC',
                course: '口语课',
                title: '作业3',
                errorTypes: '发音问题',
                AIFeedback: 'Could be better'
                },
                {
                number: '4',
                studentId: '2023000ERD3',
                studentName: 'ADFCFGC',
                course: '口语课',
                title: '作业3',
                errorTypes: '发音问题',
                AIFeedback: 'Could be better'
                },
                {
                number: '5',
                studentId: '2023000EWER3',
                studentName: 'ADFCCG',
                course: '口语课',
                title: '作业3',
                errorTypes: '发音问题',
                AIFeedback: 'Could be better'
                }
            ],
            testList: [
                {
                    prop: "number",
                    label: "序号",
                },
                {
                    prop: "studentId",
                    label: "学号",
                },
                {
                    prop: "studentName",
                    label: "姓名",
                },
                {
                    prop: "course",
                    label: "课程",
                },
                {
                    prop: "title",
                    label: "标题",
                },
                {
                    prop: "errorTypes",
                    label: "错误类型",
                },
                {
                    prop: "AIFeedback",
                    label: "AI反馈",
                }
            ],
            testData: [
                {
                number: '1',
                studentId: '20230004',
                studentName: 'ABC',
                course: '作文课',
                title: '测试4',
                errorTypes: '语法问题',
                AIFeedback: 'Could be better'
                },
                {
                number: '2',
                studentId: '20230004ER',
                studentName: 'ABCDG',
                course: '作文课',
                title: '测试4',
                errorTypes: '语法问题',
                AIFeedback: 'Could be better'
                },
                {
                number: '3',
                studentId: '202300DS04',
                studentName: 'ABCGF',
                course: '作文课',
                title: '测试4',
                errorTypes: '语法问题',
                AIFeedback: 'Could be better'
                },
                {
                number: '4',
                studentId: '20230DF004',
                studentName: 'ABGFC',
                course: '作文课',
                title: '测试4',
                errorTypes: '语法问题',
                AIFeedback: 'Could be better'
                }
            ],
            sortType: "default",
            filterType: "practice",
            ascending: true,
        }
    },
    methods: {
        // 排序功能没有实现
        sortQuestion() {
            let direction = this.ascending ? 1 : -1;
            this.filteredQuestions.sort((a, b) => {
                if (this.sortType === 'time') {
                    return (new Date(a.dueDate) - new Date(b.dueDate)) * direction;
                } else if (this.sortType === 'status') {
                    return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) * direction;
                }
                return 0;
            });
        },
        filterQuestion() {
            if (this.filterType === 'practice') {
                this.isPracticeTable = true;
            } else if (this.filterType === 'test'){
                this.isPracticeTable = false ;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';




.identify-feedback-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .identify-feedback-results {
        display: flex;
        flex-direction: column;

        .identify-feedback-header {
            display: flex;
            align-items: center; /* 使子元素在垂直方向上居中对齐 */
            justify-content: space-between; /* 使子元素在水平方向上分布在两端 */
            }

        .tool-bar {
            justify-content: space-between;
            .tool-bar-right {
                margin-left: auto;
            }
        }
    }
}

</style>