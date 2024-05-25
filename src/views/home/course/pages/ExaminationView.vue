<template>
    <el-card class="examination-wrapper">
        <div v-if="!showExaminationDetail">
            <div class="tool-bar">
                <div>
                    <el-button icon="el-icon-plus" type="primary" @click="addExaminationDialogVisible = true" v-show="$store.state.authority === 'teacher'">手动发布测评</el-button>
                    <el-button icon="iconfont el-icon-xedia-rengongzhineng_line" @click="showAutoCorrectionSetting = true" class="ai-button" v-show="$store.state.authority === 'teacher'">设置自动批改</el-button>
                    <add-examination-modal-vue :visible.sync="addExaminationDialogVisible"/>
                    <set-auto-correction-modal-vue :visible.sync="showAutoCorrectionSetting" :item="{}"/>
                </div>
                <div>
                    <el-switch
                        v-model="ascending"
                        active-text="正序"
                        inactive-text="倒序"
                        @change="sortExamination"
                    ></el-switch>
                    <el-select class="select-tool" v-model="sortType" placeholder="排序方式" @change="sortExamination">
                        <el-option label="默认排序" value="default"></el-option>
                        <el-option label="按时间" value="time"></el-option>
                        <el-option label="按状态" value="status"></el-option>
                    </el-select>
                    <el-select class="select-tool" v-model="filterType" placeholder="筛选测试" @change="filterExamination">
                        <el-option label="所有测试" value="all"></el-option>
                        <el-option label="已截止" value="expired"></el-option>
                        <el-option label="未完成" value="incomplete"></el-option>
                        <el-option label="已完成" value="complete"></el-option>
                    </el-select>
                    <el-input 
                        v-model="searchQuery"
                        placeholder="搜索测试..."
                        @input="filterExamination"
                        class="search-box"
                    ></el-input>
                </div>
            </div>
            <list
                :items="examinationList"
                :on-item-click="handleItemClick"
                item-width="100%"
                item-height="auto"
                fit-content
                item-padding="0px"
                item-margin="0px"
                :item-border="false"
            >
                <template v-slot:item="{ item }">
                    <examination-item :examination="item"></examination-item>
                </template>
            </list>
        </div>
        <div style="width: 100%; height: 100%;" v-else>
            <examination-detail-section-vue :visible.sync="showExaminationDetail" :item="selectedExamination"/>
        </div>
    </el-card>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import ExaminationItem from '@/components/ExaminationItem.vue';
import AddExaminationModalVue from '@/components/dialogs/AddExaminationModal.vue';
import ExaminationDetailSectionVue from '@/components/sections/ExaminationDetailSection.vue';
import SetAutoCorrectionModalVue from '@/components/dialogs/SetAutoCorrectionModal.vue';

export default {
    name: 'ExaminationView',
    components: {
        List,
        ExaminationItem,
        AddExaminationModalVue,
        ExaminationDetailSectionVue,
        SetAutoCorrectionModalVue
    },
    data() {
        return {
            showExaminationDetail: false,
            addExaminationDialogVisible: false,
            showAutoCorrectionSetting: false,
            examinationList: [
                { id: 1, title: '数学期末考试', dueDate: '2023-12-01' },
                { id: 2, title: '物理期末考试', dueDate: '2023-12-02' },
                // 更多考试项...
            ],
            filteredExamination: [],
            searchQuery: '',
            sortType: 'default',
            filterType: 'all',
            ascending: true,
            selectedExamination: {}
        };
    },
    created() {
        this.filterExamination();
    },
    methods: {
        sortExamination() {
            let direction = this.ascending ? 1 : -1;
            this.filteredExamination.sort((a, b) => {
                if (this.sortType === 'time') {
                    return (new Date(a.dueDate) - new Date(b.dueDate)) * direction;
                } else if (this.sortType === 'status') {
                    return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) * direction;
                }
                return 0; // 默认排序不改变原始顺序
            });
        },
        filterExamination() {
            this.filteredExamination = this.examinationList.filter(item => {
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
            this.sortExamination();
        },
        handleItemClick(index) {
            const item = this.examinationList[index];
            this.selectedExamination = item;
            this.showExaminationDetail = true;
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.examination-wrapper {
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
