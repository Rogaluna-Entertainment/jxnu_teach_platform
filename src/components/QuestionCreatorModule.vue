<template>
    <div class="question-creator-panel">
        <div class="tool-bar">
            <el-select v-model="localSelectedType" placeholder="选择题型">
                <el-option
                    v-for="type in questionTypes"
                    :key="type.value"
                    :label="type.label"
                    :value="type.value">
                </el-option>
            </el-select>
            <el-button @click="importFromLibrary" style="margin-left: 10px;">从题库导入</el-button>
        </div>
        <div class="question-edit">
            <component :is="currentEditComponent" v-model="currentQuestion.content"></component>
        </div>
    </div>
</template>

<script>
import SingleChoiceQuestionEditorVue from './editors/SingleChoiceQuestionEditor.vue';
import MultipleChoiceQuestionEditorVue from "@/components/editors/MultipleChoiceQuestionEditor.vue";
import ShortAnswerQuestionEditorVue from "@/components/editors/ShortAnswerQuestionEditor.vue";
import OralQuestionEditorVue from './editors/OralQuestionEditor.vue';
import ListeningQuestionEditorVue from './editors/ListeningQuestionEditor.vue';
import TrueFalseQuestionEditorVue from './editors/TrueFalseQuestionEditor.vue';
import EssayQuestionEditorVue from './editors/EssayQuestionEditor.vue';
import ReadingComprehensionEditorVue from './editors/ReadingComprehensionEditor.vue';
import ClozeTestQuestionEditorVue from './editors/ClozeTestQuestionEditor.vue';

import questionTypeDefine from "@/assets/configs/questionTypeDefine.json"

export default {
    components: {
        SingleChoiceQuestionEditorVue,
        MultipleChoiceQuestionEditorVue,
        ShortAnswerQuestionEditorVue,
        OralQuestionEditorVue,
        ListeningQuestionEditorVue,
        TrueFalseQuestionEditorVue,
        EssayQuestionEditorVue,
        ReadingComprehensionEditorVue,
        ClozeTestQuestionEditorVue
    },
    props: {
        selectedType: String,
        currentQuestion: Object,
    },
    data() {
        return {
            localSelectedType: this.selectedType,
            questionTypes: [],
        }
    },
    watch: {
        selectedType(newVal) {
            this.localSelectedType = newVal;
        }
    },
    mounted() {
        this.questionTypes = questionTypeDefine.data;
    },
    computed: {
        currentEditComponent() {
            switch (this.localSelectedType) {
                case 'single-choice':
                    return 'SingleChoiceQuestionEditorVue'
                case 'multiple-choice':
                    return 'MultipleChoiceQuestionEditorVue';
                case 'short-answer':
                    return 'ShortAnswerQuestionEditorVue';
                case 'oral':
                    return 'OralQuestionEditorVue';
                case 'listening':
                    return 'ListeningQuestionEditorVue';
                case 'true-false':
                    return 'TrueFalseQuestionEditorVue';
                case 'essay':
                    return 'EssayQuestionEditorVue';
                case 'reading-comprehension':
                    return 'ReadingComprehensionEditorVue';
                case 'cloze-test':
                    return 'ClozeTestQuestionEditorVue';
                default: return null;
            }
        }
    },
    methods: {
        importFromLibrary() {
            // 实现从题库导入逻辑
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/css/div/tool-bar/generalStyle.scss";

.question-creator-panel {
    flex-grow: 1;
    background-color: #f8f9fa;
    padding: 10px;

    .toolbar {
        margin-bottom: 10px; 
    }

    .question-edit {
        background-color: #ffffff;
        border: 1px solid #dee2e6;
        padding: 10px;
        height: calc(100% - 50px);
        overflow-y: auto;
    }
}
</style>
