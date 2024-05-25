<template>
    <el-dialog
        title="添加账户"
        :visible.sync="localVisible"
        width="30%"
        @close="handleClose"
        @update:visible="handleVisibilityChange">
        <el-form :model="form" label-width="100px">
            <el-form-item label="账户类型">
                <el-select v-model="form.user_type" placeholder="请选择账户类型" @change="onUserTypeChange">
                    <el-option label="学生" value="student"></el-option>
                    <el-option label="教师" value="teacher"></el-option>
                    <el-option label="管理员" value="admin"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input v-model="form.telephone_number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password" autocomplete="new-password"></el-input>
            </el-form-item>
            <!-- 动态区域 -->
            <template v-if="form.user_type === 'student'">
                <el-form-item label="学院ID">
                    <el-input v-model="form.college_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业ID">
                    <el-input v-model="form.speciality_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级ID">
                    <el-input v-model="form.class_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学生ID">
                    <el-input v-model="form.student_id" autocomplete="off"></el-input>
                </el-form-item>
            </template>
            <template v-else-if="form.user_type === 'teacher'">
                <el-form-item label="学院ID">
                    <el-input v-model="form.college_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="教师ID">
                    <el-input v-model="form.teacher_id" autocomplete="off"></el-input>
                </el-form-item>
            </template>
            <template v-else-if="form.user_type === 'admin'">
                <el-form-item label="管理员ID">
                    <el-input v-model="form.admin_id" autocomplete="off"></el-input>
                </el-form-item>
            </template>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm">重置</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { addAccountAPI } from '@/services/api/accountManager/addAccount';

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
                user_type: '',
                name: '',
                telephone_number: '',
                email: '',
                password: '',
                college_id: '',
                speciality_id: '',
                class_id: '',
                student_id: '',
                teacher_id: '',
                admin_id: ''
            }
        };
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
        handleClose() {
            // 手动关闭对话框时触发
            this.localVisible = false;
        },
        handleVisibilityChange(value) {
            // 通知父组件更新 visible 值
            this.$emit('update:visible', value);
        },
        onUserTypeChange() {
            // 清空相关的字段
            this.form.college_id = '';
            this.form.speciality_id = '';
            this.form.class_id = '';
            this.form.student_id = '';
            this.form.teacher_id = '';
            this.form.admin_id = '';
        },
        resetForm() {
            this.form = {
                user_type: '',
                name: '',
                telephone_number: '',
                email: '',
                password: '',
                college_id: '',
                speciality_id: '',
                class_id: '',
                student_id: '',
                teacher_id: '',
                admin_id: ''
            };
        },
        submitForm() {
            // 提交表单逻辑
            const accountRequest = {
                account: {
                    name: this.form.name,
                    telephone_number: this.form.telephone_number,
                    email: this.form.email,
                    password: this.form.password,
                    user_type: this.form.user_type
                }
            }
            if(accountRequest.account.user_type === 'admin') {
                accountRequest.admin_info = {
                    admin_id: this.form.admin_id
                }   
            } else if (accountRequest.account.user_type === 'student') {
                accountRequest.student_info = {
                    college_id: this.form.college_id,
                    speciality_id: this.form.speciality_id,
                    class_id: this.form.class_id,
                    student_id: this.form.student_id
                }
            } else if (accountRequest.account.user_type === 'teacher') {
                accountRequest.teacher_info = {
                    college_id: this.form.college_id,
                    teacher_id: this.form.teacher_id
                }
            }

            console.log('accountRequest:', accountRequest);

            addAccountAPI(accountRequest, this.$store.state.token)
                .then(response => {
                    const responseBody = response.data
                    this.$message({
                        type: "success",
                        message: `${responseBody.message}:${responseBody.account_id}`
                    });
                    this.$emit('update:visible', false);
                    this.resetForm();

                    this.$emit('item-added');
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: `${error}`
                    });
                });
            this.$emit('update:visible', false);
            this.resetForm();
        }
    }
}
</script>

<style scoped>

::v-deep .el-form-item__content {
    display: flex;
    align-items: start;
}

.dialog-footer {
    text-align: right;
}
</style>
