<template>
    <el-dialog
        :visible.sync="localVisible"
        title="注册账号"
        width="30%"
        @close="handleClose">
        <el-form :model="registerForm" ref="registerForm" :rules="rules" label-position="top">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username" autocomplete="off"></el-input>
            </el-form-item>
                <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="registerForm.confirmPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
  
<script>
export default {
    name: 'RegisterModal',
    props: {
        visible: {
        visible: Boolean
        }
    },
    data() {
        return {
        localVisible: this.visible,
        registerForm: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        rules: {
            username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
            ],
            confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: this.matchPassword, trigger: 'blur' }
            ]
        }
        };
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
        },
        localVisible(newVal) {
            // 当本地值改变时，通知父组件更新
            this.$emit('update:visible', newVal);
        }
    },
    methods: {
        matchPassword(rule, value, callback) {
            if (value !== this.registerForm.password) {
            callback(new Error('两次输入的密码不匹配!'));
            } else {
            callback();
            }
        },
        handleRegister() {
            this.$refs.registerForm.validate((valid) => {
            if (valid) {
                console.log('注册表单数据：', this.registerForm);
                // 这里应该是你的注册逻辑，比如调用API进行注册
                this.resetForm();
                this.$emit('update:visible', false); // 关闭模态框
                // 可以在这里添加一个成功注册的通知或跳转
            } else {
                console.log('表单验证失败');
            }
            });
        },
        handleClose() {
            this.localVisible = false;
            this.$emit('update:visible', false);
        },
    }
}
</script>
  
<style lang="scss" scoped>

</style>
