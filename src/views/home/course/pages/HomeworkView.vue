<template>
    <el-card class="homework-wrapper">
        <div v-if="!showHomeworkDetail">
            <div class="tool-bar">
                <div>
                    <el-button icon="el-icon-plus" type="primary" @click="addHomeworkDialogVisible = true" v-show="$store.state.authority === 'teacher'">手动发布作业</el-button>
                    <el-button icon="iconfont el-icon-xedia-rengongzhineng_line" @click="showAutoCorrectionSetting = true" class="ai-button" v-show="$store.state.authority === 'teacher'">设置自动批改</el-button>
                    <add-homework-modal-vue :visible.sync="addHomeworkDialogVisible"/>
                    <set-auto-correction-modal-vue :visible.sync="showAutoCorrectionSetting" :item="{}"/>
                </div>
                <div>
                    <el-switch
                        v-model="ascending"
                        active-text="正序"
                        inactive-text="倒序"
                        @change="sortHomework"
                    ></el-switch>
                    <el-select class="select-tool" v-model="sortType" placeholder="排序方式" @change="sortHomework">
                        <el-option label="默认排序" value="default"></el-option>
                        <el-option label="按时间" value="time"></el-option>
                        <el-option label="按状态" value="status"></el-option>
                    </el-select>
                    <el-select class="select-tool" v-model="filterType" placeholder="筛选作业" @change="filterHomework">
                        <el-option label="所有作业" value="all"></el-option>
                        <el-option label="已截止" value="expired"></el-option>
                        <el-option label="未完成" value="incomplete"></el-option>
                        <el-option label="已完成" value="complete"></el-option>
                    </el-select>
                    <el-input 
                        v-model="searchQuery"
                        placeholder="搜索作业..."
                        @input="filterHomework"
                        class="search-box"
                    ></el-input>
                </div>
            </div>
            <list
                :items="homeworkList"
                :on-item-click="handleItemClick"
                item-width="100%"
                item-height="auto"
                fit-content
                item-padding="0px"
                item-margin="0px"
                :item-border="false"
            >
                <template v-slot:item="{ item }">
                    <homework-item-vue :homework="item"></homework-item-vue>
                </template>
            </list>
        </div>
        <div style="width: 100%; height: 100%;" v-else>
            <homework-detail-section-vue :visible.sync="showHomeworkDetail" :item="selectedHomework"/>
        </div>
    </el-card>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import HomeworkItemVue from '@/components/list-item/HomeworkItem.vue';
import AddHomeworkModalVue from '@/components/dialogs/AddHomeworkModal.vue';
import HomeworkDetailSectionVue from '@/components/sections/HomeworkDetailSection.vue';
import SetAutoCorrectionModalVue from '@/components/dialogs/SetAutoCorrectionModal.vue';

export default {
    name: 'HomeworkView',
    components: {
        List,
        HomeworkItemVue,
        AddHomeworkModalVue,
        HomeworkDetailSectionVue,
        SetAutoCorrectionModalVue
    },
    data() {
        return {
            showHomeworkDetail: false,
            addHomeworkDialogVisible: false,
            showAutoCorrectionSetting: false,
            homeworkList: [
                { id: 1, title: '数学作业', dueDate: '2023-10-01' },
                { id: 2, title: '物理作业', dueDate: '2023-10-02' },
                // 更多作业项...
            ],
            filteredHomework: [],
            searchQuery: '',
            sortType: 'default',
            filterType: 'all',
            ascending: true,
            selectedHomework: {}
        };   
    },
    mounted() {
        this.filterHomework();
    },
    methods: {
        sortHomework() {
            let direction = this.ascending ? 1 : -1;
            this.filteredHomework.sort((a, b) => {
                if (this.sortType === 'time') {
                    return (new Date(a.dueDate) - new Date(b.dueDate)) * direction;
                } else if (this.sortType === 'status') {
                    return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) * direction;
                }
                return 0; // 默认排序不改变原始顺序
            });
        },
        filterHomework() {
            this.filteredHomework = this.homeworkList.filter(item => {
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
            this.sortHomework();
        },
        handleItemClick(index) {
            const item = this.homeworkList[index];
            this.selectedHomework = item;
            this.showHomeworkDetail = true;
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.homework-wrapper {
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
