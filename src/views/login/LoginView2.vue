<template>
    <div>
        <div class="main-body">
            <div :class="active" class="container">
                <!-- 教师登录 -->
                <div class="container-form container-signup">
                    <el-form class="form" :model="loginForm">
                        <h2 class="form-title">教师登录</h2>
                        <span style="color: red;"></span>
                        <div class="form-item">
                            <input required="" type="text" class="username" v-model="loginForm.username" style="box-shadow:none" name="userName">
                            <span class="bar"></span>
                            <label for="username">User Name</label>
                        </div>
                        <div class="form-item">
                            <input required="" type="password" class="password" v-model="loginForm.password" style="box-shadow:none" name="passWord">
                            <span class="bar"></span>
                            <label for="password">Pass Word</label>
                        </div>
                        <div class="link" style="justify-content: space-between;display: flex; width: 70%">
                            <a href="#">忘记密码?</a>
                            <a href="#">没有账号?注册</a>
                        </div>
                        <el-button class="btnlogin" style="box-shadow:none" @click="handleLogin">点击登录</el-button>
                    </el-form>
                </div>

                <!-- 学生登录 -->
                <div class="container-form container-signin">
                    <el-form class="form" :model="loginForm">
                        <h2 class="form-title">学生登录</h2>
                        <span style="color: red;"></span>
                        <div class="form-item">
                            <input required="" type="text" class="username" v-model="loginForm.username" style="box-shadow:none" name="userName">
                            <span class="bar"></span>
                            <label for="username">User Name</label>
                        </div>
                        <div class="form-item">
                            <input required="" type="password" class="password" v-model="loginForm.password" style="box-shadow:none" name="passWord">
                            <span class="bar"></span>
                            <label for="password">Pass Word</label>
                        </div>
                        <div class="link" style="justify-content: space-between;display: flex;width: 70%">
                            <a href="#">忘记密码?</a>
                            <a href="#">没有账号?注册</a>
                        </div>
                        <el-button class="btnlogin" style="box-shadow:none" @click="handleLogin">点击登录</el-button>
                    </el-form>
                </div>

                <!-- 叠加层部分 -->
                <div class="container-overlay">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <button class="user_backgroud" id="signIn" style="box-shadow:none" @click="switchLoginType">
                                登录学生账号
                            </button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <button class="user_backgroud" id="signUp" style="box-shadow:none" @click="switchLoginType">
                                登录教师账号
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loginAPI } from '@/services/api/login/login';
import loginAuthority from '@/assets/configs/loginAuthority.json'

export default {
    data() {
        return {
            active: 'panel-active',
            loginForm: {
                username: '',
                password: '',
            },
            loginForm1: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        switchLoginType() {
            if (this.active == '') {
                this.active = 'panel-active'
            } else {
                this.active = ''
            }
        },
        handleLogin() { 
            // 登录
            console.log(this.loginForm);
            const redirectAuthority = loginAuthority['teacher'];
            this.$store.dispatch('updateAuthority', redirectAuthority);
            this.$store.dispatch('updateUsername', 124);
            this.$store.dispatch('updateToken', 124);
            this.$store.dispatch('updateAccountId', 124);
            this.$router.push({ name: 'home' });
            // loginAPI(this.loginForm.username, this.loginForm.password)
            //     .then(response => {
            //         // 处理响应
            //         const responseBody = response.data;
            //         const redirectAuthority = loginAuthority[responseBody.authority];
            //         if (redirectAuthority) {
            //             this.$message({
            //                 message: responseBody.message,
            //                 type: 'success'
            //             });
            //             this.$store.dispatch('updateAuthority', redirectAuthority);
            //             this.$store.dispatch('updateUsername', responseBody.username);
            //             this.$store.dispatch('updateToken', responseBody.token);
            //             this.$store.dispatch('updateAccountId', responseBody.accountId);
            //             this.$router.push({ name: 'home' });
            //         } else {
            //             this.$message({
            //                 message: responseBody.message,
            //                 type: 'error'
            //             });
            //         }
            //     })
            //     .catch(error => {
            //         // 处理错误
            //         console.error('登录失败', error);
            //         this.$message({
            //             message: error,
            //             type: 'error'
            //         });
            //     });
        },
    }
}
</script>

<style lang="scss" scoped>
.main-body {
    height: 100vh;
    background: url("@/assets/stu_and_tec.png") center no-repeat fixed;
    background-size: cover;
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 主体 div 样式 */
.container {
    background-color: #222;
    border-radius: 0.7rem;
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: 512px;
    max-width: 1000px;
    overflow: hidden;
    position: relative;
    width: 100%;
}


/* 登录、注册框部分 */
.container-form {
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
}

/* 登录框 - 默认层级高 */
.container-signin {
    left: 0;
    width: 50%;
    z-index: 2;
}

/* 注册框 - 默认层级低 - 透明度 0 */
.container-signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
}


/* 表单样式 */
.form {
    position: absolute;
    inset: 4px;
    background: #222;
    padding: 50px 40px;
    border-radius: 8px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


.link {
    a {
        color: #333;
        font-size: 0.9rem;
        margin: 1.5rem 0;
        text-decoration: none;

        &:hover {
            color: aquamarine;
        }
    }
}

.input {
    width: 100%;
    background-color: transparent;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
    border: none;
    outline: none;
}


.btnlogin {
    background-color: #242943;
    border-radius: 5px;
    color: #ffffff;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 1rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.user_backgroud {
    background-color: #ffffff;
    border-radius: 5px;
    color: #242943;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 1rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.form > .btnlogin {
    margin-top: 1.5rem;
}

.btnlogin:active {
    transform: scale(0.95);
}

/* ---------- 叠加部分样式 ------------- */
.container-overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
}

.overlay {
    width: 200%;
    height: 100%;
    position: relative;
    left: -100%;
    background: url("@/assets/stu_and_tec.png") no-repeat center fixed;
    background-size: cover;
    transition: transform 0.6s ease-in-out;
    transform: translateX(0);
}

.overlay-panel {
    height: 100%;
    width: 50%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

/* 设计激活时叠加层的位置 */
.panel-active .overlay-left {
    transform: translateX(0);
}

.panel-active .container-overlay {
    transform: translateX(-100%);
}

.panel-active .overlay {
    transform: translateX(50%);
}

/* 设置激活时，登录注册层的位置和透明度 */
.panel-active .container-signin {
    transform: translateX(100%);
}

.panel-active .container-signup {
    opacity: 1;
    z-index: 5;
    transform: translateX(100%);
}

.form-title {
    font-weight: 300;
    margin: 0;
    margin-bottom: 1.25rem;
    color: white;
    font-size:xx-large;
}

body {
    font-family: 'Roboto', sans-serif;
}
.form-item {
    position: relative;
    margin-bottom: 20px;
    margin-top: 20px;
    width: 300px;
}
.form-item input {
    color: white;
    font-size: large;
    width: 100%;
    border: none;
    border-bottom: 1px solid #bdbdbd;
    outline: none;
    background-color: transparent;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: auto;
}
.form-item .bar {
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.4s ease;
}
.form-item input:focus + .bar {
    width: 100%;
}
.form-item input:valid ~ label,
.form-item input:focus ~ label {
    transform: translateY(-25px) scale(0.75);
}
label {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    pointer-events: none;
    transition: 0.2s ease all;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
}


</style>