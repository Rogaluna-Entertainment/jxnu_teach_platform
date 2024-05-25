<template>
    <div class="manager">
        <manager-tool-bar-module-vue 
        @item-added="handleItemAdded" 
        @delete-selected="handleDeleteSelected"/>
        <manager-table-module-vue ref="tableRef" @selected-rows-change="handleSelectedRows"/>
        <manager-modify-module-vue :modifyItem="modifyItem"/>
    </div>
</template>

<script>
import ManagerTableModuleVue from '@/components/ManagerTableModule.vue'
import ManagerToolBarModuleVue from '@/components/ManagerToolBarModule.vue'
import ManagerModifyModuleVue from '@/components/ManagerModifyModule.vue'

export default {
    components: {
        ManagerTableModuleVue,
        ManagerToolBarModuleVue,
        ManagerModifyModuleVue
    },
    data() {
        return {
            modifyItem: null
        }
    },
    methods: {
        handleSelectAll() {
            // 全选逻辑
        },
        handleItemAdded() {
            // 添加项目通知表格刷新
            if (this.$refs.tableRef) {
                this.$refs.tableRef.fetchData();
            }
        },
        handleDeleteSelected() {
            // 删除选中项目逻辑
        },
        handleSelectedRows(items) {
            const lastItem = items[items.length -1]
            this.modifyItem = lastItem
        }
    }
}
</script>

<style lang="scss" scoped>

.manager {
    display: flex;
}

</style>