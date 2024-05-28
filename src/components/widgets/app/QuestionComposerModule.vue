<template>
    <div class="question-composer">
        <div class="left-panel">
            <List
                :items="questions"
                :onItemClick="handleQuestionClick"
                item-width="300px"
                item-height="40px"
                item-padding="5px"
                item-margin="5px"
                :item-border="true">
                <template #item="{ item }">
                    <span>{{ item.title }}</span>
                </template>
            </List>
        </div>
        <div class="right-panel">
            <question-creator-module-vue
            :selectedType="selectedType"
            :currentQuestion="currentQuestion"/>
        </div>
    </div>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import QuestionCreatorModuleVue from '@/components/widgets/app/QuestionCreatorModule.vue';

export default {
    components: {
        List,
        QuestionCreatorModuleVue
    },
    data() {
        return {
            questions: [],
            selectedType: 'multiple-choice',
            currentQuestion: { content: '' }
        };
    },
    methods: {
        handleQuestionClick() {

        }
    }
};
</script>

<style lang="scss" scoped>
.question-composer {
    display: flex;
    width: 100%;
    border: 1px solid #eaecef; 
    background-color: #f8f9fa;
    padding: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    .left-panel {
        width: 100px;
        height: 800px;
        border-right: 2px solid #ced4da; 
        background-color: #ffffff;
        padding: 5px;
        overflow-y: auto;

        .list-item {
            cursor: pointer;
            &:hover {
                background-color: #e9ecef;
            }
        }
    }

    .right-panel {
        flex-grow: 1;
        background-color: #f8f9fa;
        padding: 10px;
    }
}
</style>

