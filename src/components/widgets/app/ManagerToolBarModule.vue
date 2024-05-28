<template>
    <div>
        <list-vue class="sidebar-tools"
        :items="buttonItems" 
        :onItemClick="handleButtonClick" 
        :itemBorder="false"  
        fitContent 
        itemWidth="0px" 
        itemHeight="0px"
        itemPadding="0px"
        itemMargin="0px">
            <template #item="{ item }">
                    <el-button type="primary" :icon="item.icon" class="tool-button">
                        {{ item.title }}
                    </el-button>
            </template>
        </list-vue>
        <add-account-modal-vue :visible.sync="addAccountDialogVisible" @item-added="handleItemAdded" />
    </div>
</template>

<script>
import AddAccountModalVue from '../../dialogs/AddAccountModal.vue';
import ListVue from '../layout/List.vue';

export default {
    components: {
        ListVue,
        AddAccountModalVue
    },
    data() {
        return {
            addAccountDialogVisible: false,
            buttonItems: [
                {
                    title: "添加",
                    name: "add",
                    icon: "el-icon-plus"
                },
                {
                    title: "删除",
                    name: "delete",
                    icon: "el-icon-delete"
                }
            ]
        }
    },
    methods: {
        handleButtonClick (index) {
            const name = this.buttonItems[index].name
            switch(name) {
                case 'add':
                    this.addItem();
                    break;
                case 'delete':
                    this.deleteSelected();
                    break;
                default: console.log(index);
            }
        },
        addItem() {
            this.addAccountDialogVisible = true;
        },
        deleteSelected() {
            this.$emit('delete-selected');
        },
        handleItemAdded() {
            this.$emit('item-added');
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar-tools {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 10px;

    .tool-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px; /* Space between buttons */
    }

    .tool-button span {
        margin-top: 5px; /* Space between icon and text */
    }
}
</style>
