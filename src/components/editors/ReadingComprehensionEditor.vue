<template>
    <div>
        <el-divider content-position="left"><strong>阅读理解题题干</strong></el-divider>
        <rich-text-editor-vue
        :menubar="false"/>
        <el-divider content-position="left"><strong>编辑题目</strong></el-divider>
        <el-form>
            <el-form-item v-for="(question, index) in questions" :key="index">
                <!-- <el-input v-model="choice.text" :placeholder="'选项 ' + (index + 1)" clearable></el-input> -->
                <div style="width: 100%;">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                        <h3>{{ index }}、</h3>
                        <rich-text-editor-vue
                        :menubar="false" style="flex-grow: 1;"/>
                        <el-button type="danger" icon="el-icon-delete" @click="removeQuestion(index)">删除</el-button>
                    </div>
                    <el-form>
                        <el-form-item v-for="(choice, index) in question.choices" :key="index">
                            <div>
                                <rich-text-editor-vue
                                :menubar="false"/>
                            </div>
                            <div class="choice-opt">
                                <el-checkbox v-model="choice.correct" label="正确答案"></el-checkbox>
                                <el-button type="danger" icon="el-icon-delete" @click="removeChoice(question, index)">删除</el-button>
                            </div>
                        </el-form-item>
                        <el-button type="success" icon="el-icon-plus" @click="addChoice(question)">添加选项</el-button>
                    </el-form>
                </div>
            </el-form-item>
            <el-button type="success" icon="el-icon-plus" @click="addQuestion">添加题目</el-button>
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
            // passage: '',
            // questions: ''
            questions: [
                { text: '', correct: false, choices: [] },
                { text: '', correct: false, choices: [] }
            ]
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({ text: '', correct: false });
        },
        removeQuestion(index) {
            this.questions.splice(index, 1);
        },
        addChoice(question) {
            question.choices.push({ text: '', correct: false });
        },
        removeChoice(question, index) {
            question.choices.splice(index, 1);
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
    background-color: rgb(241, 241, 241);

    .choice-opt {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
    }
}

</style>