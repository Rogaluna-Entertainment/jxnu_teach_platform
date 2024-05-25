<template>
    <el-dialog
        title="关联节点"
        :visible.sync="localVisible"
        width="80%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-divider></el-divider>

        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; flex-grow: 1; flex-direction: column;">
                <div style="overflow-y: auto; height: 50vh;">
                    <list
                        :items="nodeListLeft"
                        :on-item-click="handleLeftItemClick"
                        item-width="100%"
                        item-height="auto"
                        item-padding="0px"
                        item-margin="0px"
                        :item-border="false">

                        <template v-slot:item="{ item }">
                            <div class="knowledge-point-item">
                                <div class="knowledge-info">
                                    <div style="display: flex;
                                        justify-content: space-between;
                                        flex-grow: 1;">
                                        <span style="display: flex; align-items: center;"><b>节点名：</b>{{ item.name }}</span>
                                        <span style="display: flex; align-items: center;"><b>类型：</b>{{ item.category }}</span>
                                    </div>
                                </div>
                            </div>
                        </template>

                    </list>
                </div>
            </div>

            <div style="width: 20vw; display: flex; flex-direction: column;">

                <span>请输入关联名</span>
                <div style="padding: 20px;">
                    <el-input v-model="currentConnectName" placeholder="请输入内容"></el-input>
                </div>
                <div>
                    <el-button type="danger" @click="submitForm" v-if="hasConnect">解除关联</el-button>
                    <el-button type="primary" @click="submitForm" v-else>建立关联</el-button>
                </div>
            </div>
            
            <div style="display: flex; flex-grow: 1; flex-direction: column;">
                <div style="overflow-y: auto; height: 50vh;">
                    <list
                        :items="nodeListRight"
                        :on-item-click="handleRightItemClick"
                        item-width="100%"
                        item-height="auto"
                        item-padding="0px"
                        item-margin="0px"
                        :item-border="false">

                        <template v-slot:item="{ item }">
                            <div class="knowledge-point-item">
                                <div class="knowledge-info">
                                    <div style="display: flex;
                                        justify-content: space-between;
                                        flex-grow: 1;">
                                        <span style="display: flex; align-items: center;"><b>节点名：</b>{{ item.name }}</span>
                                        <span style="display: flex; align-items: center;"><b>类型：</b>{{ item.category }}</span>
                                    </div>
                                </div>
                            </div>
                        </template>

                    </list>
                </div>
            </div>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        List,
    },
    data() {
        return {
            localVisible: this.visible,
            hasConnect: false,
            currentConnectName: '',
            leftSelectedIndex: '',
            rightSelectedIndex: '',
            leftConnectedIndics: [],
            rightConnectedIndics: [],
            nodeListLeft: [
                {layout: "1", weight: 20, id: "A", name: "听力基础 Basic Listening", category: "听力基础"},
                {layout: "1", weight: 25, id: "B", name: "听力技巧 Listening Techniques", category: "听力技巧"},
                {layout: "1", weight: 30, id: "C", name: "听力实践 Listening Practice", category: "听力实践"},
                {layout: "1", weight: 10, id: "D", name: "文化意识 Cultural Awareness", category: "文化意识"},
                {layout: "1", weight: 15, id: "E", name: "语言环境 Language Context", category: "语言环境"},
                {layout: "2-1", weight: 40, id: "A1", name: "语音识别 Phonetic Recognition", category: "听力基础"},
                {layout: "2-1", weight: 40, id: "A2", name: "词汇理解 Vocabulary Comprehension", category: "听力基础"},
                {layout: "2-1", weight: 20, id: "A3", name: "语法结构 Grammatical Structures", category: "听力基础"},
                {layout: "2-2", weight: 30, id: "B1", name: "注意力集中 Concentration", category: "听力技巧"},
                {layout: "2-2", weight: 25, id: "B2", name: "预测内容 Anticipation", category: "听力技巧"},
                {layout: "2-2", weight: 20, id: "B3", name: "关键词捕捉 Key Word Identification", category: "听力技巧"},
                {layout: "2-2", weight: 25, id: "B4", name: "信息整合 Information Integration", category: "听力技巧"},
                {layout: "2-3", weight: 30, id: "C1", name: "日常对话听力 Daily Conversation Listening", category: "听力实践"},
                {layout: "2-3", weight: 30, id: "C2", name: "学术听力 Academic Listening", category: "听力实践"},
                {layout: "2-3", weight: 20, id: "C3", name: "新闻听力 News Listening", category: "听力实践"},
                {layout: "2-3", weight: 20, id: "C4", name: "娱乐媒体听力 Entertainment Media Listening", category: "听力实践"},
                {layout: "2-4", weight: 40, id: "D1", name: "习俗与礼仪 Customs and Etiquette", category: "文化意识"},
            ],
            nodeListRight: [
                {layout: "1", weight: 20, id: "A", name: "听力基础 Basic Listening", category: "听力基础"},
                {layout: "1", weight: 25, id: "B", name: "听力技巧 Listening Techniques", category: "听力技巧"},
                {layout: "1", weight: 30, id: "C", name: "听力实践 Listening Practice", category: "听力实践"},
                {layout: "1", weight: 10, id: "D", name: "文化意识 Cultural Awareness", category: "文化意识"},
                {layout: "1", weight: 15, id: "E", name: "语言环境 Language Context", category: "语言环境"},
                {layout: "2-1", weight: 40, id: "A1", name: "语音识别 Phonetic Recognition", category: "听力基础"},
                {layout: "2-1", weight: 40, id: "A2", name: "词汇理解 Vocabulary Comprehension", category: "听力基础"},
                {layout: "2-1", weight: 20, id: "A3", name: "语法结构 Grammatical Structures", category: "听力基础"},
                {layout: "2-2", weight: 30, id: "B1", name: "注意力集中 Concentration", category: "听力技巧"},
                {layout: "2-2", weight: 25, id: "B2", name: "预测内容 Anticipation", category: "听力技巧"},
                {layout: "2-2", weight: 20, id: "B3", name: "关键词捕捉 Key Word Identification", category: "听力技巧"},
                {layout: "2-2", weight: 25, id: "B4", name: "信息整合 Information Integration", category: "听力技巧"},
                {layout: "2-3", weight: 30, id: "C1", name: "日常对话听力 Daily Conversation Listening", category: "听力实践"},
                {layout: "2-3", weight: 30, id: "C2", name: "学术听力 Academic Listening", category: "听力实践"},
                {layout: "2-3", weight: 20, id: "C3", name: "新闻听力 News Listening", category: "听力实践"},
                {layout: "2-3", weight: 20, id: "C4", name: "娱乐媒体听力 Entertainment Media Listening", category: "听力实践"},
                {layout: "2-4", weight: 40, id: "D1", name: "习俗与礼仪 Customs and Etiquette", category: "文化意识"},
            ],
            form: {
                knownledgeName: ''
            }
        };
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
        },
        localVisible(newVal) {
            this.$emit('update:visible', newVal);
        }
    },
    methods: {
        handleClose() {
            this.localVisible = false;
        },
        handleVisibilityChange(value) {
            this.$emit('update:visible', value);
        },
        submitForm() {
            console.log('Adding new folder:', this.form.folderName);
            // Here you would typically invoke an API to add the folder to a server or database
            this.handleClose(); // Optionally close the dialog upon submission
        },
        handleLeftItemClick(item) {
            console.log(item);
        },
        handleRightItemClick(item) {
            console.log(item);
        }
    }
}
</script>

<style lang="scss" scoped>

.dialog-footer {
    text-align: right;
}

.list-container {
    width: 100%;
}

.knowledge-point-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        background-color: #f9f9f9;
    }

    .knowledge-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;

        .delete {
            color: black;
            background-color: gainsboro;
        }
    }
}

</style>
