<template>
    <el-dialog
        title="确认删除"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <div class="delete-content">
            <p>您确定要删除这个文件（夹）吗？此操作不可恢复。</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="danger" @click="confirmDelete">确认删除</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            localVisible: this.visible
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
        confirmDelete() {
            console.log('Delete confirmed.');
            this.$emit('delete-confirmed');
            this.localVisible = false;
        }
    }
}
</script>

<style scoped>
.delete-content p {
    margin: 20px 0;
    color: #f56c6c;
    text-align: center;
}

.dialog-footer {
    text-align: right;
}
</style>
