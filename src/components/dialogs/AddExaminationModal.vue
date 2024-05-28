<template>
    <el-dialog
        title="添加考试"
        :visible.sync="localVisible"
        width="90%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form 
            :model="examinationForm" 
            ref="examinationFormRef" 
            label-position="right"
            label-width="100px">
            <el-form-item>
                <el-button icon="iconfont el-icon-xedia-rengongzhineng" class="ai-button">AI组卷</el-button>
            </el-form-item>
            <el-form-item label="考试标题" prop="title">
                <span>
                    <el-input v-model="examinationForm.title" autocomplete="off"></el-input>
                </span>
            </el-form-item>
            <el-form-item label="时间限制" prop="timeLimit">
                <el-date-picker
                    v-model="examinationForm.timeLimit"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="考试对象" prop="target">
                <el-select v-model="examinationForm.target" placeholder="请选择考试对象">
                    <el-option
                        v-for="item in targets"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="考试内容" prop="content">
                <question-composer-module-vue />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import QuestionComposerModuleVue from '@/components/widgets/app/QuestionComposerModule.vue';

export default {
    components: {
        QuestionComposerModuleVue
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
            examinationForm: {
                title: '',
                timeLimit: '',
                target: '',
                content: ''
            },
            targets: [
                { label: '所有学生', value: 'all_students' },
                { label: '选择班级', value: 'select_class' }
                // 根据需求添加更多选项
            ]
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
            this.$refs.examinationFormRef.validate((valid) => {
                if (valid) {
                    // TODO: 提交考试表单数据到服务器
                    console.log('考试信息提交成功：', this.examinationForm);
                    this.localVisible = false;
                    this.$message({
                        type: 'success',
                        message: '考试发布成功！'
                    });
                } else {
                    console.log('考试表单验证失败！');
                    this.$message({
                        type: 'error',
                        message: '表单填写有误，请检查后再提交！'
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.dialog-footer {
    text-align: right;
}

::v-deep .el-form-item__content {
    display: flex;
}
</style>
