<template>
    <el-card class="personalized-testing-wrapper">
        <div>
            <div class="tool-bar">
                <div style="display: flex; align-items: center;">
                    <el-button @click="addTestDialogVisible = true" icon="el-icon-plus" type="primary">口语</el-button>
                    <el-button @click="addTestDialogVisible = true" icon="el-icon-plus" type="primary">听力</el-button>
                    <el-button @click="addTestDialogVisible = true" icon="el-icon-plus" type="primary">阅读</el-button>
                    <el-button @click="addTestDialogVisible = true" icon="el-icon-plus" type="primary">写作</el-button>
                    <el-button icon="iconfont el-icon-xedia-rengongzhineng_line" @click="addTestDialogVisible = true" class="ai-button" >一键生成试卷</el-button>
                    <!-- <add-test-modal-vue :visible.sync="addTestDialogVisible"></add-test-modal-vue> -->
                </div>
                <div style="display: flex; align-items: center;">
                    <el-switch
                        v-model="ascending"
                        active-text="正序"
                        inactive-text="倒序"
                        @change="sortTest"
                    ></el-switch>
                    <el-select class="select-tool" v-model="sortType" placeholder="排序方式" @change="sortTest">
                        <el-option label="默认排序" value="default"></el-option>
                        <el-option label="按时间" value="time"></el-option>
                        <el-option label="按状态" value="status"></el-option>
                    </el-select>
                    <el-select class="select-tool" v-model="filterType" placeholder="筛选测试" @change="filterTest">
                        <el-option label="全部" value="all"></el-option>
                        <el-option label="听力" value="listen"></el-option>
                        <el-option label="阅读" value="read"></el-option>
                        <el-option label="写作" value="write"></el-option>
                        <el-option label="口语" value="oral"></el-option>
                    </el-select>
                    <el-input 
                        v-model="searchQuery"
                        placeholder="搜索测试..."
                        @input="filterTest"
                        class="search-box"
                    ></el-input>
                </div>
            </div>

            <list
                :items="testList"
                item-width="100%"
                item-height="auto"
                fit-content
                item-padding="0px"
                item-margin="0px"
                :item-border="false">
                <template v-slot:item="{ item }">
                    <!-- <test-item-vue
                        :item="item"
                        @test-detail="handleTestDetail"
                    ></test-item-vue> -->
                    <personalized-testing-item-vue
                        :item="item"
                    ></personalized-testing-item-vue>
                </template>
            </list>
        </div>
    </el-card>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import PersonalizedTestingItemVue from '@/components/list-item/PersonalizedTestingItem.vue';

export default {
    components: {
        List,
        PersonalizedTestingItemVue,
    },
    data() {
        return {
            showTestDetail: false,
            addTestDialogVisible: false,
            testList: [
                { id: 1, date: '2023-04-16 09:00', title: '测试1', type: 'multiple-choice', author: '上传者1' },
                { id: 2, date: '2023-04-17 14:00', title: '测试2', type: 'short-answer', author: '上传者2' },
                // 更多测试...
            ],
            filteredTests: [],
            searchQuery: '',
            sortType: 'default',
            filterType: 'all',
            ascending: true,
            selectedTest: {}
        }
    },
    mounted() {
        this.filterTest();
    },
    methods: {
        sortTest() {
            let direction = this.ascending ? 1 : -1;
            this.filteredTests.sort((a, b) => {
                if (this.sortType === 'time') {
                    return (new Date(a.dueDate) - new Date(b.dueDate)) * direction;
                } else if (this.sortType === 'status') {
                    return (a.completed === b.completed ? 0 : a.completed ? 1 : -1) * direction;
                }
                return 0; // 默认排序不改变原始顺序
            });
        },
        filterTest() {
            this.filteredTests = this.testList.filter(item => {
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
            this.sortTest();
        },
        handleTestDetail(item) {
            this.selectedTest = item;
            this.showTestDetail = true;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.personalized-testing-wrapper {
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
