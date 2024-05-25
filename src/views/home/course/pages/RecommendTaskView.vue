<template>
    <el-card class="recommend-task-wrapper">
        <list
            :items="recommendTaskList"
            item-width="100%"
            item-height="auto"
            fit-content
            item-padding="0px"
            item-margin="0px"
            :item-border="false"
        >
            <template v-slot:item="{ item }">
                <recommend-task-item-vue :recommendTask="item"></recommend-task-item-vue>
            </template>
        </list>
    </el-card>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import RecommendTaskItemVue from '@/components/RecommendTaskItem.vue';

export default {
    components: {
        List,
        RecommendTaskItemVue
    },
    data() {
        return {
            recommendTaskList: [
                { id: 1, title: '数学作业', dueDate: '2023-10-01' },
                { id: 2, title: '物理作业', dueDate: '2023-10-02' },
            ]
        };   
    },
}
</script>

<style lang="scss" scoped>

.recommend-task-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .list-container {
        align-items: stretch;
    }
}

</style>