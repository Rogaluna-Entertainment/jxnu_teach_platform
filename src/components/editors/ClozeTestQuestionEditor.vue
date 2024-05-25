<template>
    <div>
        <el-divider content-position="left"><strong>完型填空题题干</strong></el-divider>
        <rich-text-editor-vue
        :menubar="false"/>
        <el-divider content-position="left"><strong>标准答案</strong></el-divider>
        <el-form>
            <el-form-item v-for="(choice, index) in choices" :key="index">
                <!-- <el-input v-model="choice.text" :placeholder="'选项 ' + (index + 1)" clearable></el-input> -->
                <div>
                    <rich-text-editor-vue
                    :menubar="false"/>
                </div>
                <div class="choice-opt">
                    <el-button type="danger" icon="el-icon-delete" @click="removeChoice(index)">删除</el-button>
                </div>
            </el-form-item>
            <el-button type="success" icon="el-icon-plus" @click="addChoice">添加选项</el-button>
        </el-form>
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
            // text: ''
            choices: [
                { text: '', correct: false },
                { text: '', correct: false },
                { text: '', correct: false },
                { text: '', correct: false }
            ]
        };
    },
    methods: {
        addChoice() {
            this.choices.push({ text: '', correct: false });
        },
        removeChoice(index) {
            this.choices.splice(index, 1);
        }
    }
};
</script>

<style lang="scss" scoped>

::v-deep .el-divider__text{
    font-size: 20px;
    color: #409EFF;
}

::v-deep .el-form-item__content {
    display: flex;
    align-items: center;

    .choice-opt {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
    }
}

</style>