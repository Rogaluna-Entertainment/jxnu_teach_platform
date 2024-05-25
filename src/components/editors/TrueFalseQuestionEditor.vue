<template>
    <div>
        <!-- <el-input v-model="statement" placeholder="输入陈述" clearable></el-input> -->
        <el-divider content-position="left"><strong>判断题标题</strong></el-divider>
        <rich-text-editor-vue
        :menubar="false"/>
        <el-divider content-position="left"><strong>标准答案</strong></el-divider>
        <div style="display: flex;">
            <el-radio-group v-model="truthValue">
                <el-radio :label="true">正确</el-radio>
                <el-radio :label="false">错误</el-radio>
            </el-radio-group>
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
            // statement: '',
            truthValue: true
        };
    }
};
</script>

<style lang="scss" scoped>

::v-deep .el-divider__text{
    font-size: 20px;
    color: #409EFF;
}

</style>