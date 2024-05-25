<template>
    <el-card class="knowledge-graph-wrapper">
        <div style="display: flex; flex-direction: row; height: 100%; justify-content: left;" v-if="$store.state.authority === 'teacher'">
            
            <div v-if="showKnownledgeGraphView" style="display: flex; flex-grow: 1; flex-direction: column;">
                <div>
                    <el-page-header @back="goBack"></el-page-header>
                </div>
                <knownledge-graph-vue :nodes="knownledgePointList" :links="nodeLinkList"/>
            </div>

            <div style="display: flex; flex-direction: column; height: 100%; width: 100%; justify-content: space-between;" v-else>
                <div style="display: flex; flex-direction: column;">
                    <div class="header">
                        <h3>知识点</h3>
                        <div  v-show="$store.state.authority === 'teacher'">
                            <el-button icon="el-icon-upload" type="primary" @click="submit">保存/上传</el-button>
                            <el-divider direction="vertical"></el-divider>
                            <el-button type="primary" @click="showKnownledgeGraphView = true">AI自动生成</el-button>
                            <el-button type="primary" @click="showKnownledgeGraphView = true">预览图谱</el-button>
                        </div>
                    </div>
                    <add-knownledge-resource-vue :visible.sync="addKnownledgeResourceDialog"/>
                    <link-knownledge-node-vue :visible.sync="linkKnownledgeNodeDialog"/>
                    <modify-knownledge-node-modal-vue :visible.sync="modifyKnownledgeNodeDialog" ref="modifyDialog"/>
                    <div style="overflow-y: auto; height: 80vh;">
                        <list
                            :items="knownledgePointList"
                            :on-item-click="handleItemClick"
                            item-width="100%"
                            item-height="auto"
                            item-padding="0px"
                            item-margin="0px"
                            :item-border="false"
                            ref="list"
                        >
                            <template v-slot:item="{ item, index }">
                                <knownledge-point-item-vue
                                    :knowledgePoint="item"
                                    @resAlloc="showResAllocDialog"
                                    @linkNode="showLinkNodeDialog"
                                    @deleteNode="deleteNode(item, index)"
                                    @modifyNode="modifyNode(item, index)"/>
                            </template>
                        </list>
                    </div>
                    <div>
                        <div class="tool-bar">
                            <div>
                                <el-button icon="el-icon-plus" type="primary" @click="showAddKnownledgeNodeDialog" v-show="$store.state.authority === 'teacher'">添加节点</el-button>
                                <el-button type="info" class="delete"  @click="deleteAllKnownledgeNodeDialog = true" v-show="$store.state.authority === 'teacher'">批量删除节点</el-button>
                                <add-knownledge-node-modal-vue :visible.sync="addKnownledgeNodeDialog" @added-node="addKnownledgeNode" ref="addNodeDialog"/>
                                <delete-all-knownledge-node-modal-vue :visible.sync="deleteAllKnownledgeNodeDialog" @confirmed-delete="deleteAllNode"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: flex; flex-direction: row; height: 100%; justify-content: left;" v-else>
            <knownledge-graph-vue :nodes="getCourseNodes" :links="getCourseLinks"/>
        </div>
    </el-card>
</template>

<script>
import RichTextEditorVue from '@/components/widgets/package/RichTextEditor.vue';
import KnownledgeGraphVue from '@/components/widgets/package/KnownledgeGraph.vue';
import List from '@/components/widgets/layout/List.vue';
import KnownledgePointItemVue from '@/components/KnownledgePointItem.vue';
import AddKnownledgeResourceVue from '@/components/dialogs/AddKnownledgeResource.vue';
import LinkKnownledgeNodeVue from '@/components/dialogs/LinkKnownledgeNode.vue';
import AddKnownledgeNodeModalVue from '@/components/dialogs/AddKnownledgeNodeModal.vue';
import DeleteAllKnownledgeNodeModalVue from '@/components/dialogs/DeleteAllKnownledgeNodeModal.vue';
import ModifyKnownledgeNodeModalVue from '@/components/dialogs/ModifyKnownledgeNodeModal.vue';


import { getNodesInfoAPI } from '@/services/api/course/knownledgeGraph/getNodesInfo';
import { getNodesLinkAPI } from '@/services/api/course/knownledgeGraph/getNodesLink';

export default {
    components: {
        List,
        KnownledgePointItemVue,
        RichTextEditorVue,
        KnownledgeGraphVue,
        AddKnownledgeResourceVue,
        LinkKnownledgeNodeVue,
        AddKnownledgeNodeModalVue,
        DeleteAllKnownledgeNodeModalVue,
        ModifyKnownledgeNodeModalVue
    },
    data() {
        return {
            addKnownledgeNodeDialog: false,
            deleteAllKnownledgeNodeDialog: false,
            modifyKnownledgeNodeDialog: false,
            addKnownledgeResourceDialog: false,
            linkKnownledgeNodeDialog: false,
            showKnownledgeGraphView: false,
            themeText: '',
            illustrateText: '',
            knownledgePointList: [
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
                {layout: "2-4", weight: 30, id: "D2", name: "节日与庆典 Festivals and Celebrations", category: "文化意识"},
                {layout: "2-4", weight: 30, id: "D3", name: "历史与地理 History and Geography", category: "文化意识"},
                {layout: "2-5", weight: 40, id: "E1", name: "正式与非正式场合 Formal and Informal Contexts", category: "语言环境"},
                {layout: "2-5", weight: 30, id: "E2", name: "专业术语 Professional Terminology", category: "语言环境"},
                {layout: "2-5", weight: 20, id: "E3", name: "口音差异 Accent Variations", category: "语言环境"},
                {layout: "2-5", weight: 10, id: "E4", name: "语速变化 Speech Rate Variations", category: "语言环境"}
            ],
            nodeLinkList: [
                {source: "A", target: "B", relationship: "支持"},
                {source: "A", target: "C", relationship: "支持"},
                {source: "B", target: "C", relationship: "提高"},
                {source: "D", target: "C", relationship: "增强理解"},
                {source: "E", target: "C", relationship: "影响理解"},
                {source: "A", target: "A1"},
                {source: "A", target: "A2"},
                {source: "A", target: "A3"},
                {source: "B", target: "B1"},
                {source: "B", target: "B2"},
                {source: "B", target: "B3"},
                {source: "B", target: "B4"},
                {source: "C", target: "C1"},
                {source: "C", target: "C2"},
                {source: "C", target: "C3"},
                {source: "C", target: "C4"},
                {source: "D", target: "D1"},
                {source: "D", target: "D2"},
                {source: "D", target: "D3"},
                {source: "E", target: "E1"},
                {source: "E", target: "E2"},
                {source: "E", target: "E3"},
                {source: "E", target: "E4"}
            ]
        }
    },
    created() {
        // this.getCourseNodes();
        // this.getCourseLinks();
    },
    methods: {
        getCourseNodes() {
            getNodesInfoAPI(this.$store.state.token)
                .then(response => {
                    const responseBody = response.data;
                    let kns = []
                    responseBody.forEach(item => {
                        const kn = {
                            layout: item.layout,
                            weight: item.weight,
                            id: item.knownledge_point_id,
                            name: item.knownledge_point_name,
                            category: item.knownledge_point_category
                        }
                        kns.push(kn)
                    })
                    this.knownledgePointList = kns
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: `获取节点信息失败: ${error}`
                    })
                })
        },
        getCourseLinks() {
            getNodesLinkAPI(this.$store.state.token)
                .then(response => {
                    const responseBody = response.data;
                    let knls = []
                    responseBody.forEach(item => {
                        const knl = {
                            source: item.start_node,
                            target: item.end_node,
                        }
                        knls.push(knl)
                    })
                    this.nodeLinkList = knls
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: `获取节点连接失败: ${error}`
                    })
                })
        },
        handleItemClick(item) {
            // this.getAllCategory()
        },
        previewGraph() {
            this.showKnownledgeGraphView = true;
        },
        goBack() {
            this.showKnownledgeGraphView = false;
        },
        showResAllocDialog(item) {
            this.addKnownledgeResourceDialog = true;
        },
        showLinkNodeDialog(item) {
            this.linkKnownledgeNodeDialog = true;
        },
        deleteNode(item, index) {
            this.knownledgePointList.splice(index, 1);
        },
        modifyNode(item, index) {
            this.modifyKnownledgeNodeDialog = true;
            const modifyDialog = this.$refs.modifyDialog;
            modifyDialog.categoryOptions = this.getAllCategory();
            modifyDialog.form = item;
        },
        showAddKnownledgeNodeDialog() {
            this.addKnownledgeNodeDialog = true
            const addNodeDialog = this.$refs.addNodeDialog;
            addNodeDialog.categoryOptions = this.getAllCategory();
        },
        addKnownledgeNode(nodeData) {
            console.log(nodeData);
            const node = {
                name: nodeData.name, 
                category: nodeData.category
            };
            this.knownledgePointList.push(node)
        },
        deleteAllNode() {
            const selectedList = this.getAllSelected();
            let newKnownledgePointList = [];
            for(let i = 0; i < this.knownledgePointList.length; i++) {
                if(!selectedList[i]) {
                    newKnownledgePointList.push(this.knownledgePointList[i]);
                }
            }
            this.knownledgePointList = newKnownledgePointList;
        },
        getAllSelected() {
            const listContainer = this.$refs.list;
            const listConent = listContainer.$children;
            // listConent[0].checked
            let selectedList = []
            listConent.forEach(element => {
                selectedList.push(element.checked)
            });
            return selectedList
        },
        getAllCategory() {
            let categoryList = new Set([]);
            this.knownledgePointList.forEach((value, index) => {
                categoryList.add(value.category)
            })
            // { label: '类别1', value: 'category1' },
            let categoryOptionList = [];
            let categoryArray = [...categoryList];
            for(let i = 0; i < categoryArray.length; i++) {
                const categoryOption = {
                    value: categoryArray[i]
                }
                categoryOptionList.push(categoryOption)
            }
            return categoryOptionList;
        },
        submit() {
            // 上传图谱配置
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.knowledge-graph-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: fit-content;

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    ::v-deep .el-card__body {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .tool-bar {
        margin-top: 20px;
        flex-direction: row-reverse;
        justify-content: space-between;
    
        .delete {
            color: black;
            background-color: gainsboro;
        }
    }
}

</style>