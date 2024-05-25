<template>
    <el-dialog
        title="设置自动回复"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form :model="form" ref="renameForm">
            <!-- <el-form-item label="新文件名">
                <el-input v-model="form.newName" placeholder="请输入新文件名"></el-input>
            </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="localVisible = false">确认</el-button>
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
        item: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            localVisible: this.visible,
            form: {

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
        }
    }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
    text-align: right;
}
</style>