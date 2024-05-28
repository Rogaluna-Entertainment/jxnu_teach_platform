<template>
    <el-card class="discuss-wrapper">
        <div v-if="!showDiscussDetail">
            <div class="tool-bar">
                <div>
                    <el-button type="primary" @click="openDiscussForm" v-show="$store.state.authority === 'student'">发布讨论</el-button>
                    <el-button icon="iconfont el-icon-xedia-rengongzhineng_line" @click="showAutoReplySetting = true" class="ai-button" v-show="$store.state.authority === 'teacher'">设置自动回复</el-button>
                    <set-auto-reply-modal-vue :visible.sync="showAutoReplySetting" :item="{}"/>
                </div>
                <div>
                    <el-switch
                        v-model="ascending"
                        active-text="正序"
                        inactive-text="倒序"
                        @change="sortDiscussions"
                    ></el-switch>
                    <el-select class="select-tool" v-model="sortOrder" placeholder="排序方式" @change="sortDiscussions">
                        <el-option label="默认排序" value="default"></el-option>
                        <el-option label="按时间" value="time"></el-option>
                        <el-option label="按热度" value="status"></el-option>
                    </el-select>
                    <el-input 
                        v-model="searchQuery"
                        placeholder="搜索讨论..."
                        @input="filterDiscussions"
                        class="search-box"
                    ></el-input>
                </div>
            </div>
            <list
                :items="filteredDiscussions"
                :horizontal="false"
                :on-item-click="handleListItemClick"
                item-width="100%"
                item-height="auto"
                fit-content
                item-padding="0px"
                item-margin="0px"
                :item-border="false"
            >
                <template v-slot:item="{ item }">
                    <discuss-item-vue 
                    :item="item"
                    :discussion-clicked="handleDiscussionClick"
                    :like-clicked="handleLikeClick"/>
                </template>
            </list>
        </div>
        <div style="width: 100%; height: 100%;" v-else>
            <discuss-detail-section-vue :visible.sync="showDiscussDetail" :discuss="selectedDiscuss"/>
        </div>
    </el-card>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import DiscussItemVue from '@/components/list-item/DiscussItem.vue';
import DiscussDetailSectionVue from '@/components/sections/DiscussDetailSection.vue';
import SetAutoReplyModalVue from '@/components/dialogs/SetAutoReplyModal.vue';

export default {
    name: 'DiscussView',
    components: {
        List,
        DiscussItemVue,
        DiscussDetailSectionVue,
        SetAutoReplyModalVue
    },
    data() {
        return {
            showDiscussDetail: false,
            showAutoReplySetting: false,
            discussions: [
                { title: '怎么样更好地发音？', summary: '', author: '学生1', date: '2023-04-01', likeCount: '0', discussionCount: '0' },
                { title: '什么语言最好学', summary: '有一些关于选择学习语言的疑惑...', author: '学生2', date: '2023-04-02', likeCount: '0', discussionCount: '0' },
            ],
            filteredDiscussions: [],
            sortOrder: 'default',
            searchQuery: '',
            ascending: true,
            selectedDiscuss: {}
        };
    },
    mounted() {
        this.filteredDiscussions = this.discussions;
    },
    methods: {
        openDiscussForm() {
            // 实现打开发布讨论的表单或模态窗口的逻辑
        },
        sortDiscussions() {
            // 实现排序讨论的逻辑
        },
        filterDiscussions() {
            // 实现根据搜索查询过滤讨论的逻辑
        },
        handleListItemClick(index) {
            const item = this.discussions[index];
            this.selectedDiscuss = item;
            this.showDiscussDetail = true;
        },
        handleDiscussionClick(item) {

        },
        handleLikeClick(item) {

        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.discuss-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    ::v-deep .el-card__body {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .list-container {
        align-items: stretch;
    }

    .discuss-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .tool-bar {
        justify-content: space-between;
    }
}
</style>
