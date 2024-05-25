<template>
    <el-dialog
        title="分配资源"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <div>
            节点信息
        </div>
        <el-divider></el-divider>

        <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入资源名称"
            :titles="['资源库', '引用资源']"
            v-model="value" 
            :data="data">
        </el-transfer>
        <span slot="footer" class="dialog-footer">    
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            localVisible: this.visible,
            form: {
                knownledgeName: ''
            },
            data: [
                {
                    label: '资源1',
                    key: '0'
                },
                {
                    label: '资源2',
                    key: '1'
                },
                {
                    label: '资源3',
                    key: '2'
                },
                {
                    label: '资源4',
                    key: '3'
                },
                {
                    label: '资源5',
                    key: '4'
                }
            ],
            value: [],
        };
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
        },
        localVisible(newVal) {
            this.$emit('update:visible', newVal);
        }
    },
    methods: {
        handleClose() {
            this.localVisible = false;
        },
        handleVisibilityChange(value) {
            this.$emit('update:visible', value);
        },
        submitForm() {
            console.log('Adding new knownledge:', this.form.knownledgeName);
            this.handleClose(); 
        },
        filterMethod(query, item) {
            return item.key.indexOf(query) > -1;
        }
    }
}
</script>

<style lang="scss" scoped>

.dialog-footer {
    text-align: right;
}

::v-deep .el-checkbox__input {
    display: flex;
}

::v-deep .el-checkbox__label {
    display: flex !important;
}

::v-deep .el-transfer-panel__header {
    .el-checkbox {
        display: flex !important;
        height: 100%;
        align-items: center;
    }
}



</style>
