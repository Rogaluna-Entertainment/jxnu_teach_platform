<template>
    <el-card class="inquiry-approval-wrapper">
        <div class="inquiry-approval-results">
            <div class="inquiry-approval-header">
                <h2 class="inquiry-approval-title" align="left">练习与测试</h2>
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
                    prop: "timeConsuming",
                    label: "作业耗时",
                },
                {
                    prop: "rateAccuracy",
                    label: "正确率",
                },
                {
                    prop: "state",
                    label: "状态",
                }
            ],
            practiceData: [
                {
                number: '1',
                studentId: '20230001',
                studentName: 'AAA',
                course: '口语课',
                title: '作业1',
                timeConsuming: '20min',
                rateAccuracy: '80%',
                state: '已批阅',
                },
                {
                number: '2',
                studentId: '202300012',
                studentName: 'AAAD',
                course: '口语课',
                title: '作业1',
                timeConsuming: '20min',
                rateAccuracy: '60%',
                state: '已批阅',
                },
                {
                number: '3',
                studentId: '2023000123',
                studentName: 'AAADA',
                course: '口语课',
                title: '作业1',
                timeConsuming: '20min',
                rateAccuracy: '100%',
                state: '已批阅',
                },
                {
                number: '4',
                studentId: '2023000A1',
                studentName: 'AAAWE',
                course: '口语课',
                title: '作业1',
                timeConsuming: '20min',
                rateAccuracy: '80%',
                state: '已批阅',
                },
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
                    prop: "testConsuming",
                    label: "测试耗时",
                },
                {
                    prop: "rateAccuracy",
                    label: "正确率",
                },
                {
                    prop: "state",
                    label: "状态",
                }
            ],
            testData: [
                {
                number: '1',
                studentId: '20230001',
                studentName: 'AAA',
                course: '听力课',
                title: '测试1',
                testConsuming: '20min',
                rateAccuracy: '80%',
                state: '已批阅',
                },
                {
                number: '2',
                studentId: '2023000134',
                studentName: 'AEFAA',
                course: '听力课',
                title: '测试1',
                testConsuming: '20min',
                rateAccuracy: '100%',
                state: '已批阅',
                },
                {
                number: '3',
                studentId: '202300401',
                studentName: 'AWEAA',
                course: '听力课',
                title: '测试1',
                testConsuming: '20min',
                rateAccuracy: '50%',
                state: '已批阅',
                },
                {
                number: '4',
                studentId: '2023000DF1',
                studentName: 'AAFAA',
                course: '听力课',
                title: '测试1',
                testConsuming: '20min',
                rateAccuracy: '100%',
                state: '已批阅',
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




.inquiry-approval-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .inquiry-approval-results {
        display: flex;
        flex-direction: column;

        .inquiry-approval-header {
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