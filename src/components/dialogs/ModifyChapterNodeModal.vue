<template>
    <el-dialog
        title="修改章节"
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
                <el-button type="primary" @click="submitForm">更新</el-button>
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
        },
        chapterData: {
            type: Object,
            default: () => ({ chapterName: '', enableContent: false })
        }
    },
    data() {
        return {
            localVisible: this.visible,
            form: JSON.parse(JSON.stringify(this.chapterData)) // 深拷贝传入的章节数据
        };
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
            if (newVal) {
                // 当对话框显示时更新表单数据
                this.form = JSON.parse(JSON.stringify(this.chapterData));
            }
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
            console.log('Form updated:', this.form);
            this.handleClose();
            // 发送更新请求到后端，这里需要实现API调用
        },
        resetForm() {
            this.$refs.chapterForm.resetFields(); // 重置表单到初始状态
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
