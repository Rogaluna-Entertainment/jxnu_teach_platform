<template>
    <el-dialog
        title="添加章节"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form :model="form" ref="chapterForm" label-width="120px">
            <el-form-item label="章节名">
                <el-input v-model="form.chapterName" placeholder="请输入章节名"></el-input>
            </el-form-item>
            <el-form-item label="启用内容" class="enable-content">
                <el-switch v-model="form.enableContent" active-text="启用" inactive-text="禁用"></el-switch>
            </el-form-item>
            <el-form-item label="启用内容" v-show="form.enableContent">
                <rich-text-editor-vue/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import RichTextEditorVue from '../widgets/package/RichTextEditor.vue';

export default {
    components: {
        RichTextEditorVue
    },
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
                chapterName: '',
                enableContent: false,
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
            console.log('Form submitted:', this.form);
            this.handleClose();
        },
        resetForm() {
            this.$refs.chapterForm.resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
.el-form-item {
    margin-bottom: 20px;
}

.el-button {
    margin-right: 10px;
}

.enable-content {
    display: flex;
    align-items: center;
    ::v-deep .el-form-item__content {
        margin-left: 0px !important;
    }
}

::v-deep .el-form-item__content {
    display: flex;
}
</style>
