<template>
    <el-card class="class-manager-wrapper">
        <div v-if="!showClassDetail">
            <div class="tool-bar">
                <div>
                    <el-button icon="el-icon-plus" type="primary">添加班级</el-button>
                    <el-button icon="el-icon-minus" type="danger">删除班级</el-button>
                </div>
                <div>
                </div>
            </div>

            <!-- 班级表 -->

            <el-table
                :data="tableData.filter(data => !searchQuery || data.name.toLowerCase().includes(searchQuery.toLowerCase()))"
                style="width: 100%">
                <el-table-column
                    label="班级"
                    prop="class">
                </el-table-column>
                <el-table-column
                    label="年级"
                    prop="grade">
                </el-table-column>
                <el-table-column
                    label="学院"
                    prop="college">
                </el-table-column>
                <el-table-column
                    label="总人数"
                    prop="total">
                </el-table-column>
                <el-table-column
                    align="right">
                    <template slot="header">
                        <el-input
                        v-model="searchQuery"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <div style="width: 100%; height: 100%;" v-else>
            <class-detail-section-vue :visible.sync="showClassDetail" :item="selectedClass"/>
        </div>
    </el-card>
</template>

<script>
import ClassDetailSectionVue from '@/components/sections/ClassDetailSection.vue'

export default {
    components: {
        ClassDetailSectionVue
    },
    data() {
        return {
            showClassDetail: false,
            tableData: [{
                class: '3班',
                grade: '2020级',
                college: '软件学院',
                total: '10'
                }],
            searchQuery: '',
            selectedClass: {}
        }
    },
    methods: {
        sortStudent() {
            let direction = this.ascending ? 1 : -1;
            this.filteredStudent.sort((a, b) => {
                if (this.sortType === 'time') {
                    return (new Date(a.dueDate) - new Date(b.dueDate)) * direction;
                } else if (this.sortType === 'status') {
                    return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) * direction;
                }
                return 0; // 默认排序不改变原始顺序
            });
        },
        filterStudent() {
            this.filteredStudent = this.taskList.filter(item => {
                if (this.filterType === 'expired') {
                    return new Date(item.dueDate) < new Date();
                } else if (this.filterType === 'incomplete') {
                    return !item.completed;
                } else if (this.filterType === 'complete') {
                    return item.completed;
                }
                return true;
            }).filter(item => {
                return item.title.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
            this.sortTask();
        },
        handleEdit(index, row) {
            const item = this.tableData[index];
            this.selectedClass = item;
            this.showClassDetail = true;
        },
        handleDelete(index, row) {
            const item = this.tableData[index];
            this.selectedClass = item;
            // 执行删除逻辑
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';

.class-manager-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .tool-bar {
        justify-content: space-between;
    }

    ::v-deep .el-card__body {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
}

</style>