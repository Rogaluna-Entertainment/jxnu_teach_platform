<template>
    <div class="tree-item">
        <div>
            <i class="el-icon-folder"></i> {{ data.label }}
            <!-- 可以添加更多自定义 HTML 或组件 -->
        </div>
        <div class="options" v-show="$store.state.authority === 'teacher'">
            <span
            v-for="(item, index) in optionItems"
            :key="index"
            @click.stop="optionClicked(item)">{{ item.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        node: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            optionItems: [
                {
                    title: "添加",
                    name: "add"
                },
                {
                    title: "编辑",
                    name: "modify"
                },
                {
                    title: "删除",
                    name: "delete"
                }
            ]
        }
    },
    methods: {
        optionClicked(item) {
            this.$emit('option-click', item, this.node);
        }
    }
}
</script>

<style lang="scss" scoped>

.tree-item {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;

    .options {
        font-size: 14px;

        span {
            margin: 0 10px;

            &:hover {
                color: white;
            }
        }
    }
}

</style>