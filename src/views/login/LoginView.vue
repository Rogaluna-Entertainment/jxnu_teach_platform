<template>
    <div class="background">
        <div class="login-panel">
            
            <div class="login-decoration">
                <h1>江西师范大学外国语学院</h1>
                <el-image
                    style="width: 600px; height: 150px"
                    :src="url"></el-image>
            </div>
            
            <el-card class="login-form" shadow="always">
                <h2 class="login-title">登录</h2>
                <el-form ref="loginForm" :model="loginForm" label-position="top" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" prefix-icon="el-icon-user" autocomplete="off" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" autocomplete="off" placeholder="密码" show-password></el-input>
                    </el-form-item>
                    <div class="forgot-password">
                        <el-button type="text" @click="handleForgotPassword">忘记密码</el-button>
                    </div>
                    <el-form-item class="login-button">
                        <el-button type="primary" @click="handleLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            
        </div>

        <password-reset-modal-vue :visible.sync="showPasswordResetModal"></password-reset-modal-vue>
    </div>
</template>

<script>
import { loginAPI } from '@/services/api/login/login';
import PasswordResetModalVue from '@/components/dialogs/PasswordResetModal.vue';
import loginAuthority from '@/assets/configs/loginAuthority.json'

    export default {
        name: 'LoginView',
        components: {
            PasswordResetModalVue
        },
        data() {
            return {
                showPasswordResetModal: false,
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                url: require("@/assets/jxnu.png")
            };
        },
        methods: {
            handleLogin() {
                // 登录
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        // 表单验证通过
                        loginAPI(this.loginForm.username, this.loginForm.password)
                            .then(response => {
                                // 处理响应
                                const responseBody = response.data;
                                const redirectAuthority = loginAuthority[responseBody.authority];
                                if (redirectAuthority) {
                                    this.$message({
                                        message: responseBody.message,
                                        type: 'success'
                                    });
                                    this.$store.dispatch('updateAuthority', redirectAuthority);
                                    this.$store.dispatch('updateUsername', responseBody.username);
                                    this.$store.dispatch('updateToken', responseBody.token);
                                    this.$store.dispatch('updateAccountId', responseBody.accountId);
                                    this.$router.push({ name: 'home' });
                                } else {
                                    this.$message({
                                        message: responseBody.message,
                                        type: 'error'
                                    });
                                }
                            })
                            .catch(error => {
                                // 处理错误
                                console.error('登录失败', error);
                                this.$message({
                                    message: error,
                                    type: 'error'
                                });
                            });
                    } else {
                        // 表单验证未通过
                        console.log('验证失败');
                        return false;
                    }
                });
            },
            handleForgotPassword() {
                // 忘记密码
                this.showPasswordResetModal = true;
            }
        }
    }
</script>

<style lang="scss" scoped>



.background {
    background-image: url('@/assets/login_bk_1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width:100%;
    height:100%;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    .login-panel {
    background: rgba($color: #f0f0f0, $alpha: 1.0);
    border-radius: 10px;
    margin-top: 10vh;

    
    display: flex;
    justify-content: flex-end;

    .login-decoration {
        display: flex;
        width: fit-content;
        flex-direction: column;

        h1 {
            height: fit-content;
            text-align: left;
        }
    }

    .login-form {
        width: 300px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        .el-form-item:nth-child(2) {
            margin-bottom: 0;
        }

        .login-button {
            margin-bottom: 0;

            button {
                width: 100%;
            }
        }

        .login-title {
            text-align: left;
        }

        .forgot-password, .register{
            text-align: right;
        }
    }
}

}
</style>