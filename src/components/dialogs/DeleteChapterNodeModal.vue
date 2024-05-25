<template>
    <el-dialog
        :title="delTitle"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <div class="delete-content">
            <p>您确定要删除该章节吗？此操作不可恢复。</p>
        </div>
        <el-button type="danger" @click="submitDelete">确认删除</el-button>
        <el-button @click="handleClose">取消</el-button>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        chapterData: {
            type: Object,
            default: () => ({ chapterName: '', enableContent: false })
        }
    },
    data() {
        return {
            localVisible: this.visible,
        };
    },
    computed: {
        delTitle() {
            return "删除章节" + this.chapterData.chapterName;
        }
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
        submitDelete() {
            // 实现删除逻辑，可能需要调用API来从服务器删除章节
            this.handleClose(); // 关闭对话框
            // 可以考虑在删除成功后显示提示消息或者进行其他UI更新
        }
    }
}
</script>

<style scoped>

</style>
