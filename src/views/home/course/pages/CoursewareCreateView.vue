<template>
    <iframe ref="myIframe" :src="iframeSrc" frameborder="0" allowfullscreen></iframe>
</template>

<script>
export default {
    data() {
        return {
            iframeSrc: "http://aithub.com.cn:5002",
        };
    }
};
</script>


<style scoped>
iframe {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background-color: white;
}
</style>