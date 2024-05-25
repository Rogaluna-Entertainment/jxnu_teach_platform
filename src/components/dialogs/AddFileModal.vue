<template>
    <el-dialog
        title="上传文件"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form 
            :model="form" 
            ref="fileForm" 
            label-position="right"
            label-width="120px">
            <el-form-item label="文件" prop="file">
                <el-upload
                    class="upload-file"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    drag
                    :multiple="false"
                    :auto-upload="false"
                    :on-change="handleFileChange">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
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
            localVisible: this.visible,
            form: {
                file: null
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
        handleFileChange(file, fileList) {
            this.form.file = fileList;
        },
        submitForm() {
            if (this.form.file.length > 0) {
                // TODO: 实现文件上传逻辑
                console.log('文件准备上传:', this.form.file[0]);
                this.localVisible = false;
                this.$message({
                    type: 'success',
                    message: '文件上传成功！'
                });
            } else {
                this.$message({
                    type: 'error',
                    message: '请上传文件后再提交！'
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
    text-align: right;
}

.upload-file {
    ::v-deep .el-upload-dragger {
        border: 1px dashed #409EFF;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &:hover {
            border-color: #409EFF88;
        }
    }
}
</style>
