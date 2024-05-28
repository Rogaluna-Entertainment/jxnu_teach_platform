<template>
    <el-dialog
        title="添加问题"
        :visible.sync="localVisible"
        width="60%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <QuestionCreatorModuleVue 
            :selectedType="selectedType"
            :currentQuestion="currentQuestion"/>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import QuestionCreatorModuleVue from '@/components/widgets/app/QuestionCreatorModule.vue';

export default {
    components: {
        QuestionCreatorModuleVue
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            localVisible: this.visible,
            selectedType: 'single-choice',
            currentQuestion: { content: '' }
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
            console.log('Question submitted');
            this.localVisible = false;
            this.$message({
                type: 'success',
                message: '问题已成功添加！'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
    text-align: right;
}
</style>
