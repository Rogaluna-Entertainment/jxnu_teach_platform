<template>
    <Tinymce 
    v-model="tiny.value" 
    ref="tinyMCE" 
    @submit="submit"
    :menubar="menubar"
    ></Tinymce>
</template>
  
<script>
import Tinymce from './Tinymce.vue';
export default {
    props: {
        menubar: {
            type: Boolean,
            default: true
        }
    },
    components: {
        Tinymce,
    },
    data() {
        return {
            tiny: {
            value: undefined,
            },
        };
    },
    methods: {
        // 保存富文本内容-保存字符串
        add() {
            const params = `this.tiny?.value`;
        },
        edit() {
            // 接口回显保存html
            // this.tiny.value = res.data|| ''
        },
        submit(formData) {
            this.$emit("submit", formData)
        }
    },
};
</script>

<style lang="scss" scoped>



</style>