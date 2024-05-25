<template>
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
        <el-page-header @back="goBack" :content="item.class">
        </el-page-header>


    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localVisible: this.visible,
            content: ''
        }
    },
    watch: {
        visible(newVal) {
            this.localVisible = newVal;
        },
        localVisible(newVal) {
            // 当本地可见性状态变化时，通知父组件更新
            this.handleVisibilityChange(newVal);
        }
    },
    methods: {
        handleVisibilityChange(value) {
            // 通知父组件更新 visible 值
            this.$emit('update:visible', value);
        },
        goBack() {
            this.handleVisibilityChange(false);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>