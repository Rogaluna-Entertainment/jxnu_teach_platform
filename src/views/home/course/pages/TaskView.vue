<template>
    <el-card class="task-wrapper">
        <div v-if="!showTaskDetail">
            <div class="tool-bar">
                <div>
                    <el-button @click="addTaskDialogVisible = true" icon="el-icon-plus" type="primary"  v-show="$store.state.authority === 'teacher'">手动发布任务</el-button>
                    <el-button @click="showAutoTaskSetting = true" icon="iconfont el-icon-xedia-rengongzhineng_line" class="ai-button" v-show="$store.state.authority === 'teacher'">设置自动发布任务</el-button>
                    <add-task-modal-vue :visible.sync="addTaskDialogVisible"></add-task-modal-vue>
                    <set-auto-task-modal-vue :visible="showAutoTaskSetting" :item="{}"/>
                </div>
                <div>
                    <el-switch
                        v-model="ascending"
                        active-text="正序"
                        inactive-text="倒序"
                        @change="sortTask"
                    ></el-switch>
                    <el-select class="select-tool" v-model="sortType" placeholder="排序方式" @change="sortTask">
                        <el-option label="默认排序" value="default"></el-option>
                        <el-option label="按时间" value="time"></el-option>
                        <el-option label="按状态" value="status"></el-option>
                    </el-select>
                    <el-select class="select-tool" v-model="filterType" placeholder="筛选任务" @change="filterTask">
                        <el-option label="所有测试" value="all"></el-option>
                        <el-option label="已截止" value="expired"></el-option>
                        <el-option label="未完成" value="incomplete"></el-option>
                        <el-option label="已完成" value="complete"></el-option>
                    </el-select>
                    <el-input 
                        v-model="searchQuery"
                        placeholder="搜索任务..."
                        @input="filterTask"
                        class="search-box"
                    ></el-input>
                </div>
            </div>

            <list
                :items="taskList"
                :on-item-click="handleItemClick"
                item-width="100%"
                item-height="auto"
                fit-content
                item-padding="0px"
                item-margin="0px"
                :item-border="false"
            >
                <template v-slot:item="{ item }">
                    <task-item-vue
                        :item="item"
                    ></task-item-vue>
                </template>
            </list>
        </div>
        <div style="width: 100%; height: 100%;" v-else>
            <task-detail-section-vue :visible.sync="showTaskDetail" :task="selectedTask"/>
        </div>
    </el-card>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import TaskItemVue from '@/components/list-item/TaskItem.vue';
import AddTaskModalVue from '@/components/dialogs/AddTaskModal.vue';
import TaskDetailSectionVue from '@/components/sections/TaskDetailSection.vue';
import SetAutoTaskModalVue from '@/components/dialogs/SetAutoTaskModal.vue';

export default {
    components: {
        List,
        TaskItemVue,
        AddTaskModalVue,
        TaskDetailSectionVue,
        SetAutoTaskModalVue
    },
    created() {
        this.$store.state.authority
    },
    data() {
        return {
            showTaskDetail: false,
            addTaskDialogVisible: false,
            showAutoTaskSetting: false,
            taskList: [
                { id: 1, date: '2023-04-16 09:00', title: '签到1', type: "sign-in" },
                { id: 2, date: '2023-04-17 14:00', title: '学习任务2', type: "do-homework", isAiTask: true },
                // 更多事件...
            ],
            filteredTask: [],
            searchQuery: '',
            sortType: 'default',
            filterType: 'all',
            ascending: true,
            selectedTask: {}
        }
    },
    mounted() {
        this.filterTask();
    },
    methods: {
        sortTask() {
            let direction = this.ascending ? 1 : -1;
            this.filteredTask.sort((a, b) => {
                if (this.sortType === 'time') {
                    return (new Date(a.dueDate) - new Date(b.dueDate)) * direction;
                } else if (this.sortType === 'status') {
                    return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) * direction;
                }
                return 0; // 默认排序不改变原始顺序
            });
        },
        filterTask() {
            this.filteredTask = this.taskList.filter(item => {
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
        handleItemClick(index) {
            const item = this.taskList[index]
            this.selectedTask = item;
            this.showTaskDetail=true;
            this.showAutoTaskSetting = false;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.task-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .list-container {
        align-items: stretch;
    }

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