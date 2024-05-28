<template>
    <el-card class="chapter-wrapper">
        <div v-if="!showChapterDetail">
            <div class="tool-bar" v-show="$store.state.authority === 'teacher'">
                <div>
                    <el-button icon="el-icon-plus" type="primary" @click="addChapterListDialogVisible = true">导入章节目录</el-button>
                    <el-button icon="iconfont el-icon-xedia-rengongzhineng_line" class="ai-button" v-show="$store.state.authority === 'teacher'">智能分析章节知识点</el-button>
                    <add-chapter-list-modal-vue :visible.sync="addChapterListDialogVisible"/>
                </div>
                <div>

                </div>
            </div>

            <div class="chapter-title">
                {{ courseTitle }}
            </div>

            <el-divider></el-divider>

            <el-tree
                :data="chapterData"
                :props="defaultProps"
                node-key="id"
                :default-expand-all="true"
                :expand-on-click-node="false"
                @node-click="handleNodeClick">
                <template #default="{ node, data }">
                    <!-- 自定义内容 -->
                    <chapter-item-vue :node="node" :data="data" @option-click="handleOptionClick"/>
                </template>
            </el-tree>

            <add-chapter-node-modal-vue :visible.sync="addChapterNodeDialogVisible"/>
            <modify-chapter-node-modal-vue :visible.sync="modifyChapterNodeDialogVisible"/>
            <delete-chapter-node-modal-vue :visible.sync="deleteChapterNodeDialogVisible"/>
        </div>

        <div style="width: 100%; height: 100%;" v-else>
            <chapter-detail-section-vue :visible.sync="showChapterDetail" :chapter="selectedChapter"/>
        </div>
    </el-card>
</template>

<script>
import ChapterItemVue from '@/components/list-item/ChapterItem.vue';
import AddChapterListModalVue from '@/components/dialogs/AddChapterListModal.vue';
import ChapterDetailSectionVue from '@/components/sections/ChapterDetailSection.vue';
import AddChapterNodeModalVue from '@/components/dialogs/AddChapterNodeModal.vue';
import ModifyChapterNodeModalVue from '@/components/dialogs/ModifyChapterNodeModal.vue';
import DeleteChapterNodeModalVue from '@/components/dialogs/DeleteChapterNodeModal.vue';

export default {
    name: 'ChapterView',
    components: {
        ChapterItemVue,
        AddChapterListModalVue,
        ChapterDetailSectionVue,
        AddChapterNodeModalVue,
        ModifyChapterNodeModalVue,
        DeleteChapterNodeModalVue
    },
    data() {
        return {
            showChapterDetail: false,
            addChapterListDialogVisible: false,
            addChapterNodeDialogVisible: false,
            modifyChapterNodeDialogVisible: false,
            deleteChapterNodeDialogVisible: false,
            courseTitle: '目录（课程）标题',
            chapterData: [
                {
                    id: 1,
                    label: '章节 1',
                    enable: false,
                    children: [
                        { id: 2, label: '章节 1.1', enable: true },
                        { id: 3, label: '章节 1.2', enable: true }
                    ]
                },
                {
                    id: 4,
                    label: '章节 2',
                    enable: true,
                    children: [
                        {
                            id: 5,
                            label: '章节 2.1',
                            enable: false,
                            children: [
                                { id: 6, label: '章节 2.1.1', enable: true }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            selectedChapter: {}
        };
    },
    methods: {
        handleNodeClick(data) {
            const item = {
                id: data.id,
                label: data.label,
                enable: data.enable
            }
            this.selectedChapter = item;
            if(this.selectedChapter.enable) {
                this.showChapterDetail = true;
            }
        },
        handleOptionClick(opt, node) {
            if (opt.name === "add") {
                this.addChapterNodeDialogVisible = true;
                // const parentId = node.id;
                // let parentNode = this.findNodeById(this.chapterData, parentId);
                // if (parentNode) {
                //     // 检查 parentNode 是否有 children 属性，没有则初始化
                //     if (!parentNode.children) {
                //         this.$set(parentNode, 'children', []);
                //     }
                //     // 创建新的子节点
                //     // const newNodeId = Math.max(...this.flattenNodes(this.chapterData).map(n => n.id)) + 1; // 确保唯一ID
                //     const newChild = {
                //         id: 111,
                //         label: `新章节 ${111}`,
                //         enable: true
                //     };
                //     // 添加新节点到父节点的 children 数组
                //     parentNode.children.push(newChild);
                // }
            } else if (opt.name === "modify") {
                this.modifyChapterNodeDialogVisible = true;
            } else if (opt.name === "delete") {
                this.deleteChapterNodeDialogVisible = true;
            }
        },
        findNodeById(nodes, id) {
            for (let node of nodes) {
                if (node.id === id) {
                    return node;
                }
                if (node.children) {
                    let result = this.findNodeById(node.children, id);
                    if (result) return result;
                }
            }
            return null;
        },
    }
};
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.chapter-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .tool-bar {
        justify-content: space-between;
    }

    .chapter-title {
        display: flex;
    }

    .el-tree {
        user-select: none;

        ::v-deep .el-tree-node__label {
            font-size: 16px;
            color: #666;
        }

        ::v-deep .el-tree-node__content {
            padding-top: 4px;
            padding-bottom: 4px;

            &:hover {
                background-color: #409EFF;
            
                .el-tree-node__label {
                    color: white;
                }
            }
        }
    }
}
</style>
