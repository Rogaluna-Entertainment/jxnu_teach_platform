<template>
    <el-dialog
        title="添加节点"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form
            :model="form"
            :rules="rules"
            ref="nodeForm"
            label-position="right"
            label-width="120px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <el-select v-model="form.category" placeholder="请选择类别">
                    <el-option
                        v-for="option in categoryOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="localVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">添加节点</el-button>
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
                name: '',
                category: '',
            },
            rules: {
                name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
                category: [{ required: true, message: '请选择节点类别', trigger: 'change' }],
            },
            categoryOptions: []
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
            this.$refs.nodeForm.validate((valid) => {
                if (valid) {
                    this.$emit('added-node', this.form);
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
