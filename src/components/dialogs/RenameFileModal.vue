<template>
    <el-dialog
        title="重命名文件"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form :model="form" ref="renameForm">
            <el-form-item label="新文件名">
                <el-input v-model="form.newName" placeholder="请输入新文件名"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmRename">确认</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        currentName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            localVisible: this.visible,
            form: {
                newName: ''
            }
        };
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
            this.form.newName = this.currentName; // 初始化表单值为当前名称
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
        confirmRename() {
            if (this.form.newName.trim() === '') {
                this.$message({
                    type: 'warning',
                    message: '文件名不能为空！'
                });
                return;
            }
            this.$emit('rename-confirmed', this.form.newName);
            this.localVisible = false;
        }
    }
}
</script>

<style scoped>
.dialog-footer {
    text-align: right;
}
</style>
