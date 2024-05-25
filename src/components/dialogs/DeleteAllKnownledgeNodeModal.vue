<template>
    <el-dialog
        title="确认删除"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <div class="confirmation-content">
            确定要删除所有选定的项目吗？
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="danger" @click="confirmDelete">确认删除</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'DeleteConfirmationDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            localVisible: this.visible,
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
            this.$emit('confirmed-delete'); // Emit an event when delete is confirmed
            this.localVisible = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
    text-align: right;
}
</style>
