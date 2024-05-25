<template>
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
        <el-page-header @back="goBack" :content="item.class">
        </el-page-header>

        <div style="padding: 10px;">
            <div class="tool-bar">
                <div>
                    <el-button type="primary">添加学生</el-button>
                    <el-button type="danger">删除学生</el-button>
                    <el-button type="warning">导入学生</el-button>
                </div>
                <div>

                </div>
            </div>

            <el-table
                :data="tableData"
                style="width: 100%"
                >
                <el-table-column
                    type="selection">
                </el-table-column>
                <el-table-column
                    v-for="(item, index) in tableAttributes"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    sortable>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localVisible: this.visible,
            tableAttributes: [
                {
                    prop: 'name',
                    label: '姓名'
                },
                {
                    prop: 'studentId',
                    label: '学号'
                },
                {
                    prop: 'major',
                    label: '专业'
                },
                {
                    prop: 'class',
                    label: '班级'
                }
            ],
            tableData: [],
            content: ''
        }
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
        },
        localVisible(newVal) {
            // 当本地可见性状态变化时，通知父组件更新
            this.handleVisibilityChange(newVal);
        }
    },
    methods: {
        handleVisibilityChange(value) {
            // 通知父组件更新 visible 值
            this.$emit('update:visible', value);
        },
        goBack() {
            this.handleVisibilityChange(false);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';

.tool-bar {
    justify-content: space-between;
}
</style>