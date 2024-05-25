<template>
    <div class="learning-task-container">
        <h2>{{ title }}</h2>
        <div v-html="content"></div>
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
            title: '标题', // 需要从task中获取标题
            content: '<p>目前显示的全部是富文本的内容：</p><h1>课程门户页面</h1>', // 需要根据task从网络中获取富文本
        };
    },
};
</script>

<style lang="scss" scoped>

.learning-task-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;
}

</style>