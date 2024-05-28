<template>
    <el-form :model="formData" ref="editAccountForm" label-position="right" label-width="100px" class="edit-form">
        <el-form-item label="账户ID">
            <el-input v-model="formData.account_id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
            <el-input v-model="formData.telephone_number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="formData.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="权限">
            <el-select v-model="formData.user_type" placeholder="请选择">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="教师" value="teacher"></el-option>
                <el-option label="学生" value="student"></el-option>
            </el-select>
        </el-form-item>
        <!-- 动态区域 -->
        <template v-if="formData.user_type === 'student'">
            <el-form-item label="学院ID">
                <el-input v-model="studentForm.college_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="专业ID">
                <el-input v-model="studentForm.speciality_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班级ID">
                <el-input v-model="studentForm.class_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学生ID">
                <el-input v-model="studentForm.student_id" autocomplete="off"></el-input>
            </el-form-item>
        </template>
        <template v-else-if="formData.user_type === 'teacher'">
            <el-form-item label="学院ID">
                <el-input v-model="teacherForm.college_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="教师ID">
                <el-input v-model="teacherForm.teacher_id" autocomplete="off"></el-input>
            </el-form-item>
        </template>
        <template v-else-if="formData.user_type === 'admin'">
            <el-form-item label="管理员ID">
                <el-input v-model="adminForm.admin_id" autocomplete="off"></el-input>
            </el-form-item>
        </template>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { modifyAccountAPI } from '@/services/api/accountManager/modifyAccount';

export default {
    props: {
        modifyItem: {
            type: Object,
            required: false,
            default: null
        }
    },
    data() {
        return {
            localModifyItem: this.modifyItem,
            formData: {
                account_id: '',
                name: '',
                telephone_number: '',
                email: '',
                password: '',
                user_type: ''
            },
            studentForm: {

            },
            teacherForm: {

            },
            adminForm: {

            }
        };
    },
    watch: {
        modifyItem(newVal) {
            this.localModifyItem = newVal;
        },
        localModifyItem(newVal) {
            // 通知更新
            if (newVal) {
                this.formData = { ...newVal };
            } else {
                this.formData = { account_id: '', name: '', telephone_number: '', email: '', password: '', user_type: '' };
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.editAccountForm.validate((valid) => {
                if (valid) {
                    // 提交表单逻辑
                    modifyAccountAPI(this.localModifyItem.account_id, this.formData, this.$store.state.token)
                        .then( response => {
                            const responseBody = response.data;
                            this.localModifyItem = this.formData;
                            this.$message({
                                type: "success",
                                message: `${responseBody.message}`
                            })
                        })
                        .catch(error => {
                            this.$message({
                                type: "error",
                                message: `${error}`
                            })
                        });

                } else {
                    this.$message({
                        type: "error",
                        message: `表单验证失败!`
                    })
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.editAccountForm.resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
.edit-form {
    width: 500px; /* 设置表单宽度 */
    margin: 20px auto; /* 居中显示 */
}

::v-deep .el-form-item__content {
    display: flex;
}
</style>
