<template>
    <div>
        <!-- <el-input v-model="audioSource" placeholder="输入音频链接" clearable></el-input> -->
        <el-divider content-position="left"><strong>听力题标题</strong></el-divider>
        <!-- <el-input
            type="textarea"
            v-model="question"
            placeholder="输入问题"
            clearable>
        </el-input> -->
        <rich-text-editor-vue
        :menubar="false"/>
        <el-divider content-position="left"><strong>上传音频</strong></el-divider>
        <div class="upload-audio">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary" icon="el-icon-upload">上传音频</el-button>
            </el-upload>
            <div class="el-upload__tip">只能上传mp3文件，且不超过500kb</div>
        </div>
    </div>
</template>

<script>
import RichTextEditorVue from '@/components/widgets/package/RichTextEditor.vue';

export default {
    components: {
        RichTextEditorVue
    },
    data() {
        return {
            // audioSource: '',
            // question: ''
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
};
</script>

<style lang="scss" scoped>

.upload-audio {
    display: flex;
    flex-direction: row;

    :last-child{
        margin-left: 10px;
    }
}

::v-deep .el-divider__text{
    font-size: 20px;
    color: #409EFF;
}

</style>