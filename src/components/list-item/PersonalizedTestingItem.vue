<template>
    <div class="testing-item">
        <div class="testing-details">
            <div class="testing-title">
                
                <el-tag size="mini" :color="tagColor">{{ tagLabel }}</el-tag>
                <span class="date-info">{{ item.date }}</span>
            </div>
            <div>
                <div style="display: flex; flex-direction: column;">
                    <span class="testing-title">{{ item.title }}</span>
                    <span class="date-info">{{ item.author }}</span>
                </div>
                <el-button type="primary" @click="viewDetails">详情</el-button>
            </div>
            
        </div>
        <div class="testing-actions">
            
        </div>
    </div>
</template>

<script>
import questionTypeDefine from "@/assets/configs/questionTypeDefine.json"

export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        tagColor() {
            const typeObj = questionTypeDefine.data.find(type => type.value === this.item.type);
            return typeObj ? typeObj.color : '#000000'; // Default color if not found
        },
        tagLabel() {
            const typeObj = questionTypeDefine.data.find(type => type.value === this.item.type);
            return typeObj ? typeObj.label : 'Unknown'; // Default label if not found
        }
    },
    methods: {
        viewDetails() {
            console.log('查看测试详情');
            this.$emit("test-detail", this.item);
        }
    }
};
</script>

<style lang="scss" scoped>
.testing-item {
    display: flex;
    flex-direction: row;
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

    .testing-details {
        flex-grow: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .el-tag {
            color: #ffffff;
        }

        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .testing-title {
            font-weight: bold;
            margin-right: 8px;
        }

        .date-info {
            font-size: 12px;
            color: #666;
            margin-right: 10px;
        }
    }

    .testing-actions {
        align-self: flex-end;

        .el-button {
            font-size: 14px;
        }
    }
}
</style>
