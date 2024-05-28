<template>
    <el-container>
        <br>
        <el-main class="word-cloud-container">

            <div class="left-panel">
                <div>
                    <h2 class="title">智语新航教学管理系统</h2>
                    <h4 class="desc">
                        欢迎来到由AI赋能个性化外语教育领航者——智语新航教学管理系统<br>
                        本系统由江西师范大学外国语学院和计算机科学与信息工程学院联合开发，欢迎使用！
                    </h4>
                </div>
                <div>
                    <button class="rbutton" @click="enterSystem">点击进入系统<i class="el-icon-right"></i></button>
                </div>
            </div>
            <div class="right-panel">
                <WordCloud :words="words"/>
            </div>
        
        <button class="icon-button"><full-screen-overlay/></button>

        </el-main>

    </el-container>
</template>

<script>
import WordCloud from '@/components/widgets/package/WordCloud.vue'
import FullScreenOverlay from '@/components/widgets/app/FullScreenOverlay.vue'

export default {
    name: 'App',
    components: {
        FullScreenOverlay,
        WordCloud,

    },
    data() {
        return {
            words: [
                'Hello', 'Hola', 'Bonjour', 'Hallo', 'Ciao', 'Salut', 'Guten Tag',
                '你好', 'こんにちは', '안녕하세요', 'Привет', 'Olá', 'Aloha', 'Merhaba',
                'Cześć', 'Kamusta', 'Terve', 'Hej', 'Hallo', 'مرحبا'
            ], 
        };
    },
    methods: {
        enterSystem() {
            console.log('enterSystem');
            this.$router.push({ name: 'login' });
        }
    }
};
</script>

<style lang="scss" scoped>

@font-face {
    font-family: 'HanYiWeiFont';
    src: url('@/assets/hanyi_wei.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.left-panel {
    width: 50vw;
    height: 75vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    .title {
        font-family: 'HanYiWeiFont', sans-serif;
        font-size: 7vh;
        background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .desc {
        font-size: 2.5vh;
    }
}

.right-panel {
    display: flex;
    width: 50vw;
}

.el-container {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    margin:0;
    top:0;

}
.rbutton {
    position: relative;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 30px;
    font-size: 24px;
    cursor: pointer;
    background: none;
    color: black;
    border: 1px solid white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Add border shadow */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add text shadow */
    border-radius: 5px; /* Optional: Add border radius for rounded corners */
    transition: all 0.3s ease; /* Smooth transition for hover effects */
}

.rbutton:hover {
    background-color: white; /* Change background color on hover */
    color: white; /* Change text color on hover */
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5); /* Darken shadow on hover */
    transform: translate(-50%, -50%) scale(1.1); /* Slightly enlarge the button on hover */
}
body {
    overflow: hidden; /* Disable scrolling */
}

#app {
    position: relative;
    height: 100vh;
    overflow: hidden; /* Ensure no scrollbars in app */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.word-cloud-container {
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color:white; /* Optional: set a background color for the word cloud container */

    display: flex;
    flex-direction: row;
}


.icon-button {
    top: 6px;
    right: 6px;
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    transition: all 0.3s ease; /* Smooth transition for hover effects */
}
</style>