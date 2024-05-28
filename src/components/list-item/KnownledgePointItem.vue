<template>
    <div class="knowledge-point-item">
        <div class="knowledge-info">
            <div style="display: flex; align-items: center; margin-right: 10px;">
                <el-checkbox v-model="checked"></el-checkbox>
            </div>
            <div style="display: flex;
                justify-content: space-between;
                flex-grow: 1;">
                <span style="display: flex; align-items: center;"><b>节点名：</b>{{ knowledgePoint.name }}</span>
                <span style="display: flex; align-items: center;"><b>类型：</b>{{ knowledgePoint.category }}</span>
            </div>

            <el-button @click="modifyNode" style="margin-left: 10px;">修改节点</el-button>
            <el-button @click="resourceAlloc" style="margin-left: 10px;">分配资源</el-button>
            <el-button @click="linkKnowledgePoint" style="margin-left: 10px;">连接节点</el-button>
            <el-button type="info" class="delete" @click="deleteKnowledgePoint" style="margin-left: 10px;">删除</el-button>
        </div>
        <!-- <add-knownledge-resource-vue :visible.sync="AddKnownledgeResourceDialog"/>
        <link-knownledge-node-vue :visible.sync="linkKnownledgeNodeDialog"/> -->
    </div>
</template>

<script>

export default {
    props: {
        knowledgePoint: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            checked: false,
            AddKnownledgeResourceDialog: true,
            linkKnownledgeNodeDialog: true,
        }
    },
    watch: {
        knowledgePoint(newVal) {
            // 新的item
            this.checked = false;
        },
    },
    methods: {
        modifyNode() {
            this.$emit("modifyNode", this.knowledgePoint);
        },
        resourceAlloc() {
            this.$emit("resAlloc", this.knowledgePoint);
        },
        linkKnowledgePoint() {
            // 触发一个事件，可以在父组件中处理
            this.$emit('linkNode', this.knowledgePoint);
        },
        deleteKnowledgePoint() {
            this.$emit("deleteNode", this.knowledgePoint)
        }
    }
}
</script>

<style lang="scss" scoped>

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
