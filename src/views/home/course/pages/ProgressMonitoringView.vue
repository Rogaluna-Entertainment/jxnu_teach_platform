<template>
    <el-card class="progress-monitoring-wrapper">
        <div class="progress-monitoring-results">
            <div class="progress-monitoring-header">
                <h2 class="progress-monitoring-title" align="left">练习与测试</h2>
            </div>
            <div class="tool-bar">
                <div>
                    <el-button @click="addDialogVisible = true" icon="el-icon-plus" type="primary">添加</el-button>
                </div>
                <div>
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
                        align="right">
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
                        align="right">
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
                    prop: "courseViewing",
                    label: "课程观看度(%)",
                },
                {
                    prop: "completionProgress",
                    label: "任务完成进度(%)",
                },
                {
                    prop: "comments",
                    label: "评语",
                },
            ],
            practiceData: [
                {
                number: '1',
                studentId: '20230001',
                studentName: 'AAA',
                course: '口语课',
                courseViewing: '50',
                completionProgress: '80',
                comments: 'Could be better'
                },
                {
                number: '2',
                studentId: '20230002',
                studentName: 'BBB',
                course: '听力课',
                courseViewing: '100',
                completionProgress: '100',
                comments: 'Good job'
                },
                {
                number: '3',
                studentId: '20230003',
                studentName: 'CCC',
                course: '语法课',
                courseViewing: '80',
                completionProgress: '80',
                comments: 'Could be better'
                },
                {
                number: '4',
                studentId: '20230004',
                studentName: 'DDD',
                course: '作文课',
                courseViewing: '10',
                completionProgress: '10',
                comments: 'Could be better'
                },
                {
                number: '5',
                studentId: '20230005',
                studentName: 'EEE',
                course: '翻译课',
                courseViewing: '66',
                completionProgress: '66',
                comments: 'Could be better'
                },
                {
                number: '6',
                studentId: '20230006',
                studentName: 'FFF',
                course: '作文课',
                courseViewing: '100',
                completionProgress: '100',
                comments: 'Good job'
                },
                {
                number: '7',
                studentId: '20230007',
                studentName: 'GGG',
                course: '作文课',
                courseViewing: '70',
                completionProgress: '10',
                comments: 'Could be better'
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
                    prop: "completionProgress",
                    label: "任务完成进度(%)",
                },
                {
                    prop: "comments",
                    label: "评语",
                },
            ],
            testData: [
                {
                number: '1',
                studentId: '20230002',
                studentName: 'BBBA',
                course: '听力课',
                completionProgress: '80',
                comments: 'Could be better'
                },
                {
                number: '2',
                studentId: '202300056',
                studentName: 'BBBCC',
                course: '听力课',
                completionProgress: '80',
                comments: 'Could be better'
                },
                {
                number: '3',
                studentId: '202300034',
                studentName: 'BBBAAA',
                course: '听力课',
                completionProgress: '80',
                comments: 'Could be better'
                },
                {
                number: '4',
                studentId: '202300023',
                studentName: 'BBBASD',
                course: '听力课',
                completionProgress: '80',
                comments: 'Could be better'
                },
                {
                number: '5',
                studentId: '202300068',
                studentName: 'BBBDFA',
                course: '听力课',
                completionProgress: '80',
                comments: 'Could be better'
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




.progress-monitoring-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .progress-monitoring-header {
        display: flex;
        align-items: center; /* 使子元素在垂直方向上居中对齐 */
        justify-content: space-between; /* 使子元素在水平方向上分布在两端 */
    }

    .tool-bar {
        justify-content: space-between;
    }

    .progress-monitoring-results {
        display: flex;
        flex-direction: column;
    }
}

</style>