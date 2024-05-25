<template>
    <el-dialog
        title="新建文件夹"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form :model="form" ref="folderForm" label-width="120px">
            <el-form-item label="文件夹名称">
                <el-input v-model="form.folderName" placeholder="请输入文件夹名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">添加</el-button>
                <el-button @click="handleClose">取消</el-button>
            </el-form-item>
        </el-form>
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
            localVisible: this.visible,
            form: {
                folderName: ''
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
        }
    }
}
</script>

<style scoped>
.el-form-item {
    margin-bottom: 20px;
}
</style>
