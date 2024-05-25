<template>
    <div>
        <el-divider content-position="left"><strong>论述题标题</strong></el-divider>
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
            // question: ''
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