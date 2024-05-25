<template>
    <el-dialog
        title="添加课程"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form 
        :model="form" 
        :rules="rules" 
        ref="courseForm" 
        label-position="right"
        label-width="120px">
            <el-form-item label="课程名称" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="课程编组" prop="group">
                <el-cascader
                    v-model="form.group"
                    :options="groupOptions"
                    :props="cascaderProps"
                    :show-all-levels="false"
                    filterable
                    :debounce="300">
                </el-cascader>
                <!-- <el-button icon="el-icon-plus" type="primary" style="margin-left: 10px;">新增编组</el-button> -->
            </el-form-item>
            <el-form-item label="课程封面" prop="cover">
                <el-upload
                    class="cover-uploader"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :multiple="false"
                    :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item label="课程门户页面" prop="portalUrl">
                <el-upload
                    class="gateway-uploader"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :multiple="false"
                    :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getCourseGroupAPI } from '@/services/api/course/getCourseGroup'
import { addCourseAPI } from '@/services/api/course/addCourse'

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
                name: '测试课程',
                group: null,
            },
            imageUrl: '',
            rules: {
                name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
                group: [{ required: true, message: '请选择课程编组', trigger: 'change' }],
            },
            groupOptions: [], // 课程编组选项
            cascaderProps: {
                multiple: false,
                label: 'group_name',
                value: 'group_id',
                children: 'children_group'
            }
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
    mounted() {
        this.filterGroups();
    },
    methods: {
        async filterGroups() {
            getCourseGroupAPI(this.$store.state.token)
                .then(response => {
                    const responseBody = response.data
                    this.groupOptions = this.formatOptions(responseBody);
                })
        },
        formatOptions(options) {
            return options.map(option => {
                // 如果children_group为空或不存在，则不包含children_group键
                if (!option.children_group || option.children_group.length === 0) {
                    const { children_group, ...rest } = option;
                    return rest;
                }
                // 递归处理子选项
                return { ...option, children_group: this.formatOptions(option.children_group) };
            });
        },
        handleClose() {
            this.localVisible = false;
        },
        handleVisibilityChange(value) {
            this.$emit('update:visible', value);
        },
        submitForm() {
            this.$refs.courseForm.validate((valid) => {
                if (valid) {
                    const courseRequest = {
                        course_name: this.form.name,
                        creator_id: this.$store.state.accountId,
                    }
                    if (this.form.group) {
                        courseRequest.course_group_id = this.form.group[this.form.group.length-1]
                    }
                    addCourseAPI(courseRequest, this.$store.state.token)
                        .then(response => {
                            const responseBody = response.data
                            this.$message({
                                type: 'success',
                                message: responseBody.message + ":" + responseBody.course_id
                            });

                            // 刷新课程
                            this.$emit('added-course');
                        })
                        .catch(error => {
                            this.$message({
                                type: 'error',
                                message: error
                            });
                        })
                    this.localVisible = false;
                } else {
                    console.log('表单验证失败！');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
    text-align: right;

}

.el-form {

    ::v-deep .el-upload-dragger {
        border: 1px dashed #409EFF;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        

        &:hover {
            border-color: #409EFF88;
        }
    }
}

::v-deep .el-form-item__content {
    display: flex;
}
</style>
