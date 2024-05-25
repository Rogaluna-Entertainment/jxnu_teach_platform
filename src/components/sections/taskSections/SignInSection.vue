<template>
    <div class="signin-container">
        <h2>{{ title }}</h2>
        <div v-html="content"></div>
        <button
            :disabled="signedIn"
            class="signin-button"
            @click="handleSignin">
            {{ buttonText }}
        </button>
        <p v-if="signinTime">签到时间：{{ signinTime }}</p>
    </div>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            require: false // 之后需要换成true
        }
    },
    data() {
        return {
            title: '签到', // 需要从task中获取标题
            content: '<p>目前显示的全部是富文本的内容：</p><h1>课程门户页面</h1>', // 需要根据task从网络中获取富文本
            signedIn: false,
            signinTime: ''
        };
    },
    computed: {
        buttonText() {
            return this.signedIn ? '已签到' : '签到';
        }
    },
    methods: {
        handleSignin() {
            if (!this.signedIn) {
                this.signinTime = new Date().toLocaleString();
                this.signedIn = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.signin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;

    .signin-button {
        width: 120px;
        height: 120px;
        border-radius: 60px; // 使按钮成圆形
        border: none;
        background-color: #4CAF50;
        color: white;
        font-size: 20px;
        cursor: pointer;
        outline: none;
        transition: background-color 0.3s ease;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        &:hover:not(:disabled) {
            background-color: #45a049;
        }
    }

    p {
        margin-top: 15px;
    }
}
</style>
