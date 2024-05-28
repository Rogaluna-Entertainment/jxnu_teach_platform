<template>
    <el-card class="recommend-resource-wrapper">
        <list
            :items="recommendResourceList"
            item-width="100%"
            item-height="auto"
            fit-content
            item-padding="0px"
            item-margin="0px"
            :item-border="false"
        >
            <template v-slot:item="{ item }">
                <recommend-resource-item-vue :recommendResource="item"></recommend-resource-item-vue>
            </template>
        </list>
    </el-card>
</template>

<script>
import List from '@/components/widgets/layout/List.vue';
import RecommendResourceItemVue from '@/components/list-item/RecommendResourceItem.vue';

export default {
    components: {
        List,
        RecommendResourceItemVue
    },
    data() {
        return {
            recommendResourceList: [
                { id: 1, title: '推荐资源1' },
                { id: 2, title: '推荐资源2' },
                // 更多作业项...
            ]
        };   
    },
}
</script>

<style lang="scss" scoped>

.recommend-resource-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .list-container {
        align-items: stretch;
    }
}

</style>