<template>
    <el-dialog
        title="上传章节目录"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form 
            :model="form" 
            ref="chapterForm" 
            label-position="right"
            label-width="120px">
            <el-form-item label="章节目录文件" prop="chapterList">
                <el-upload
                    class="upload-chapter-list"
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
                chapterList: null
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
            this.form.chapterList = fileList;
        },
        submitForm() {
            if (this.form.chapterList.length > 0) {
                // TODO: Implement file upload logic here
                console.log('File ready to be uploaded:', this.form.chapterList[0]);
                this.localVisible = false;
                this.$message({
                    type: 'success',
                    message: '文件已成功上传！'
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

.upload-chapter-list {
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
