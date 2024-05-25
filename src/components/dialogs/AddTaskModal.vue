<template>
    <el-dialog
        title="发布任务"
        :visible.sync="localVisible"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form :model="form" label-width="120px">
            <el-form-item>
                <el-button icon="iconfont el-icon-xedia-rengongzhineng" class="ai-button">AI生成</el-button>
            </el-form-item>
            <el-form-item label="任务类型">
                <el-select v-model="form.taskType" placeholder="请选择任务类型">
                    <el-option
                        v-for="item in taskTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务主题">
                <el-input v-model="form.taskSubject" placeholder="新任务"></el-input>
            </el-form-item>
            <el-form-item label="限制时间">
                <el-date-picker
                    v-model="form.timeLimit"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="任务发布对象">
                <el-select v-model="form.taskTarget" placeholder="请选择任务发布对象">
                    <el-option
                        v-for="item in taskTargets"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务内容">
                <rich-text-editor-vue ref="richTextEditor" @submit="submitRichText"/>
            </el-form-item>

            <!-- 可变选项 -->
            <el-form-item label="关联视频" v-if="form.taskType === 'video-learning'">
                <el-table
                    ref="multipleTable"
                    :data="videoData"
                    tooltip-effect="dark"
                    style="width: 100%">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="课程名">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="关联作业" v-else-if="form.taskType === 'do-homework'">
                <el-table
                    ref="multipleTable"
                    :data="homeworkData"
                    tooltip-effect="dark"
                    style="width: 100%">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="作业名">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="关联测评" v-else-if="form.taskType === 'do-examination'">
                <el-table
                    ref="multipleTable"
                    :data="examinationData"
                    tooltip-effect="dark"
                    style="width: 100%">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        label="测评名">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                </el-table>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>


<script>
import taskTypeDefine from '@/assets/configs/taskTypeDefine.json'
import RichTextEditorVue from '@/components/widgets/package/RichTextEditor.vue';
import { uploadRichTextAPI } from '@/services/api/staticRes/uploadRichText';

export default {
    components: {
        RichTextEditorVue
    },
    props: {
        visible: {
            type: Boolean,
            required: false
        },
    },
    data() {
        return {
            localVisible: this.visible,
            form: {
                taskType: '',
                taskSubject: '',
                timeLimit: '',
                taskContent: '',
                taskTarget: '',
            },
            taskTypes: [],
            taskTargets: [
                { value: 'target1', label: '对象1' },
                { value: 'target2', label: '对象2' }
            ],

            videoData: [
                { key: 0, name: "学习视频0" },
                { key: 1, name: "学习视频1" }
            ],
            homeworkData: [
                { key: 0, name: "作业0" },
                { key: 1, name: "作业1" },
                { key: 2, name: "作业2" },
                { key: 3, name: "作业3" }
            ],
            examinationData: [
                { key: 0, name: "测评0" },
                { key: 1, name: "测评1" },
                { key: 2, name: "测评2" }
            ]
        };
    },
    mounted() {
        this.initForm();
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
        },
        localVisible(newVal) {
            // 当本地可见性状态变化时，通知父组件更新
            this.$emit('update:visible', newVal);
        }
    },
    methods: {
        initForm() {
            this.taskTypes = taskTypeDefine.data;   
            this.form.taskType = taskTypeDefine.defaultIndex;
        },
        handleClose() {
            // 手动关闭对话框时触发
            this.localVisible = false;
        },
        handleVisibilityChange(value) {
            // 通知父组件更新 visible 值
            this.$emit('update:visible', value);
        },
        submitForm() {
            console.log('submit!', this.form);
            this.$refs.richTextEditor.onSubmit();
        },
        resetForm() {
            this.$refs.form.resetFields();
        },
        submitRichText(formData) {
            uploadRichTextAPI(formData, this.$store.state.token);
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.upload-demo {
    ::v-deep .el-upload__text em {
        color: #20a0ff;
    }
}

::v-deep .el-form-item__content {
    display: flex;
}
</style>
