<template>
    <div>
        <el-divider content-position="left"><strong>口语题标题</strong></el-divider>
        <rich-text-editor-vue
        :menubar="false"/>
        <el-divider content-position="left"><strong>选择评价模型</strong></el-divider>
        <div style="display: flex;">
            <el-select v-model="defaultValue" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
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
            options: [{
                value: '0',
                label: '模型0'
            }, {
                value: '1',
                label: '模型1'
            }, {
                value: '2',
                label: '模型2'
            }],
            defaultValue: ''
        };
    },
};
</script>

<style lang="scss" scoped>

::v-deep .el-divider__text{
    font-size: 20px;
    color: #409EFF;
}

</style>