<template>
    <div class="wrapper">
        <router-view/>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>

.wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 1%;

    border: solid gray 1px;
    background-color: gainsboro;
    
}

</style>