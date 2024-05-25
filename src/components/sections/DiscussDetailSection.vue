<template>
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
        <el-page-header @back="goBack" :content="discuss.title">
        </el-page-header>

        <div class="main">
            <div class="discuss-area">

            </div>
            <div class="reply-area">
                <rich-text-editor-vue/>
                <div>
                    <el-button class="ai-button">AI回复</el-button>
                    <el-button type="primary">发表见解</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RichTextEditorVue from '../widgets/package/RichTextEditor.vue';

export default {
    components: {
        RichTextEditorVue
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        discuss: {
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
@import '@/icons/iconCommon/iconfont.css';
@import '@/css/button/AIButtonStyle.scss';

.main {
    display: flex; 
    flex-direction: column;
    flex-grow: 1;

    .discuss-area {
        display: flex; 
        flex-grow: 1;
        background-color: rgb(247, 247, 247);
        border: 1px gainsboro solid;
    }

    .reply-area {
        display: flex; 
        flex-direction: column;

        :last-child {
            display: flex;
            
            .el-button {
                margin-top: 10px;
            }
        }
    }
}

</style>