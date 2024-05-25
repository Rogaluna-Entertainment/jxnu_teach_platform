<template>
    <el-dialog
        :visible.sync="localVisible"
        title="重置密码"
        width="600px"
        @close="handleClose">
        <el-form 
        label-width="100px"
        :model="resetForm">
            <template v-if="step === 1">
                <el-form-item label="手机号">
                    <el-input v-model="resetForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <div>
                        <el-input v-model="resetForm.code" autocomplete="off">
                            <el-button slot="append" @click="sendCode" :disabled="isSendingCode">{{ codeButtonText }}</el-button>
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="validateCode">重置密码</el-button>
                </el-form-item>
            </template>
            <template v-if="step === 2">
                <el-form-item label="新密码">
                    <el-input type="password" v-model="newPasswordForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                    <el-input type="password" v-model="newPasswordForm.confirmPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updatePassword">确定</el-button>
                </el-form-item>
            </template>
        </el-form>
    </el-dialog>
</template>

<script>
import { sendCodeAPI } from '@/services/api/sendCode';

export default {
    name: 'PasswordResetModal',
    props: {
        visible: Boolean
    },
    data() {
        return {
            localVisible: this.visible,
            resetForm: {
                phone: '',
                code: '',
            },
            newPasswordForm: {
                newPassword: '',
                confirmPassword: ''
            },
            step: 1, // 控制显示哪个表单的步骤
            isSendingCode: false,
            codeButtonText: '发送验证码',
            countdownTimer: null
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
            this.$emit('update:visible', false);
            this.step = 1; // 重置步骤
        },
        sendCode() {
            if (this.isSendingCode) return;
            if (this.resetForm.phone.length == 0) return

            sendCodeAPI(this.resetForm.phone)
                .then(response => {
                    const responseBody = response.data;
                    this.initiateCountdown(60);
                })
                .catch(error => {
                    // 处理错误
                    this.$message({
                        message: error,
                        type: 'error'
                    });
                });
        },
        initiateCountdown(duration) {
            this.isSendingCode = true;
            this.codeButtonText = `${duration}秒后重新发送`;
            this.countdownTimer = setInterval(() => {
                duration--;
                this.codeButtonText = `${duration}秒后重新发送`;
                if (duration <= 0) {
                    clearInterval(this.countdownTimer);
                    this.isSendingCode = false;
                    this.codeButtonText = '发送验证码';
                }
            }, 1000);
        },
        validateCode() {
            // 这里应该有一个实际的验证验证码的API调用
            console.log('验证验证码', this.resetForm.code);
            // 假设验证成功，转到设置新密码的步骤
            this.step = 2;
        },
        updatePassword() {
            if (this.newPasswordForm.newPassword !== this.newPasswordForm.confirmPassword) {
                alert('密码不一致');
                return;
            }
            console.log('更新密码', this.newPasswordForm.newPassword);
            // 这里应该有一个实际的更新密码的API调用
            this.handleClose(); // 关闭模态框并重置状态
        }
    }
}
</script>

<style lang="scss" scoped>
/* 样式代码可以根据需要添加 */
</style>
