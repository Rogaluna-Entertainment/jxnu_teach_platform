<template>
    <div class="task-item" :class="isAiTask">
        <div class="task-details">
            <div>
                <span class="task-title">{{ item.title }}</span>
                <el-tag size="mini" type="info" v-show="this.item.isAiTask" style="margin-right: 10px; color: red;">AI任务</el-tag>
                <el-tag size="mini" :type="stateObject.type">{{ stateObject.title }}</el-tag>
            </div>
            <div>
                <!-- <span class="date-info">{{ item.author }}</span> -->
                <span class="date-info">{{ item.date }}</span>
            </div>

        </div>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <div class="task-actions">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        stateObject() {
            return {
                type: "success",
                title: "已完成"
            };
        },
        isAiTask() {
            return this.item.isAiTask ? "ai-task" : ""
        }
    },
    methods: {
        // viewDetails() {
        //     // 查看详情的逻辑
        //     console.log('查看详情');
        //     this.$emit("task-detail", this.item);
        // }
    }
};
</script>

<style lang="scss" scoped>

.task-item {
    display: flex;
    align-items: center;
    flex-direction: row;
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

    .task-details {
        flex-grow: 1;
        margin-left: 16px;
        margin-right: 16px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }

        .task-title {
            font-weight: bold;
            margin-right: 8px;
        }

        .date-info {
            font-size: 12px;
            color: #666;
            margin-right: 10px;
        }
    }

    .task-actions {

        .el-button {
            font-size: 14px;
        }
    }
}

.ai-task {
    background-color: #F0FFFF;

    &:hover {
        background-color: #E0EEEE;
    }
}
</style>
