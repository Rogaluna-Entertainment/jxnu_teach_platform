<template>
    <div>
        <el-divider content-position="left"><strong>简答题标题</strong></el-divider>
        <rich-text-editor-vue
        :menubar="false"/>
        <el-divider content-position="left"><strong>标准答案</strong></el-divider>
        <rich-text-editor-vue
        :menubar="false"/>
        <el-divider content-position="left"><strong>答案解析</strong></el-divider>
        <rich-text-editor-vue
        :menubar="false"/>
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
            answer: ''
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