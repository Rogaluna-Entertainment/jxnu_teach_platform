<template>
    <div>
        <div v-html="content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: '<p>目前显示的全部是富文本的内容：</p><h1>课程门户页面</h1>',
        }
    }
}
</script>

<style lang="scss" scoped>

</style>