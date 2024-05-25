<template>
    <el-card class="question-bank-wrapper">
        <div v-if="!showQuestionDetail">
            <div class="tool-bar">
                <div>
                    <el-button @click="addQuestionDialogVisible = true" icon="el-icon-plus" type="primary">添加题目</el-button>
                    <add-question-modal-vue :visible.sync="addQuestionDialogVisible"></add-question-modal-vue>
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
                        <el-option label="所有测试" value="all"></el-option>
                        <el-option label="已截止" value="expired"></el-option>
                        <el-option label="未完成" value="incomplete"></el-option>
                        <el-option label="已完成" value="complete"></el-option>
                    </el-select>
                    <el-input 
                        v-model="searchQuery"
                        placeholder="搜索任务..."
                        @input="filterQuestion"
                        class="search-box"
                    ></el-input>
                </div>
            </div>

            <list
                :items="questionList"
                item-width="100%"
                item-height="auto"
                fit-content
                item-padding="0px"
                item-margin="0px"
                :item-border="false">
                <template v-slot:item="{ item }">
                    <question-item-vue
                        :item="item"
                        @question-detail="handleQuestionDetail"
                    ></question-item-vue>
                </template>
            </list>
        </div>
        <div v-else>
            <question-detail-section-vue :visible.sync="showQuestionDetail" :question="selectedQuestion"/>
        </div>
    </el-card>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import AddQuestionModalVue from "@/components/dialogs/AddQuestionModal.vue"
import QuestionItemVue from '@/components/QuestionItem.vue';
import QuestionDetailSectionVue from '@/components/sections/QuestionDetailSection.vue';

export default {
    components: {
        List,
        AddQuestionModalVue,
        QuestionItemVue,
        QuestionDetailSectionVue
    },
    data() {
        return {
            showQuestionDetail: false,
            addQuestionDialogVisible: false,
            questionList: [
                { id: 1, date: '2023-04-16 09:00', title: '题目1', type: 'multiple-choice', author: '上传者1' },
                { id: 2, date: '2023-04-17 14:00', title: '题目2', type: 'short-answer', author: '上传者2' },
                // 更多事件...
            ],
            filteredQuestions: [],
            searchQuery: '',
            sortType: 'default',
            filterType: 'all',
            ascending: true,
            selectedQuestion: {}
        }
    },
    mounted() {
        this.filterQuestion();
    },
    methods: {
        sortQuestion() {
            let direction = this.ascending ? 1 : -1;
            this.filteredQuestions.sort((a, b) => {
                if (this.sortType === 'time') {
                    return (new Date(a.dueDate) - new Date(b.dueDate)) * direction;
                } else if (this.sortType === 'status') {
                    return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) * direction;
                }
                return 0; // 默认排序不改变原始顺序
            });
        },
        filterQuestion() {
            this.filteredQuestions = this.questionList.filter(item => {
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
            this.sortQuestion();
        },
        handleQuestionDetail(item) {
            this.selectedQuestion = item;
            this.showQuestionDetail=true;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.question-bank-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .list-container {
        align-items: stretch;
    }

    .tool-bar {
        justify-content: space-between;
    }
}
</style>