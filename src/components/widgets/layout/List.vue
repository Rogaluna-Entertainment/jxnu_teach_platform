<template>
    <div class="list-container" :class="{'is-horizontal': horizontal}">
        <div v-for="(item, index) in items" :key="index"
            class="list-item" @click="handleClick(index)"
            :class="{'focused': focusedIndex === index}"
            :style="itemStyle(item)">
            <slot name="item" :item="item" :index="index">{{ item }}</slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'List',
    props: {
        items: {
            type: Array,
            default: () => []
        },
        onItemClick: {
            type: Function,
            default: () => {}
        },
        horizontal: {
            type: Boolean,
            default: false
        },
        itemWidth: {
            type: String,
            default: '100px'
        },
        itemHeight: {
            type: String,
            default: '50px'
        },
        fitContent: {
            type: Boolean,
            default: false
        },
        itemBorder: {
            type: Boolean,
            default: true
        },
        itemPadding: {
            type: String,
            default: '10px'
        },
        itemMargin: {
            type: String,
            default: '5px'
        }
    },
    data() {
        return {
            // 现有的数据
            focusedIndex: null,  // 存储聚焦的 item 的索引
        };
    },
    computed: {
        itemStyle() {
            return (item) => ({
                minWidth: this.fitContent ? 'min-content' : this.itemWidth,
                minHeight: this.fitContent ? 'min-content' : this.itemHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: this.itemPadding,
                margin: this.itemMargin,
                border: this.itemBorder ? '1px solid #ccc' : 'none'
            });
        }
    },
    methods: {
        handleClick(index) {
            this.focusedIndex = index;
            this.onItemClick(index);
        }
    }
}
</script>

<style lang="scss" scoped>
.list-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &.is-horizontal {
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
    }

    .list-item {
        width: auto;
        height: auto;
    }
}
</style>