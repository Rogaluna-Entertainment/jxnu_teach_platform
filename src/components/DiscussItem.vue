<template>
    <div class="discuss-item">
        <div class="additional-info">
            <div>
                <span class="author">发布者: {{ item.author }}</span>
                <span class="date-info">{{ item.date }}</span>
            </div>
            <div>
                <span class="discussion-count">
                    <el-badge :value="item.discussionCount" class="item">
                        <i class="iconfont el-icon-xedia-jiaoliu" @click="handleDiscussionClick"></i>
                    </el-badge>
                </span>
                <span class="like-count">
                    <el-badge :value="item.likeCount" class="item">
                        <i :class="likeIconClass" @click="handleLikeClick"></i>
                    </el-badge>
                </span>
            </div>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        likeIconClass() {
            return this.item.likeCount > 0 ? 'iconfont el-icon-xedia-dianzan1' : 'iconfont el-icon-xedia-dianzan';
        }
    },
    methods: {
        handleDiscussionClick() {
            this.$emit('discussion-clicked', this.item);
        },
        handleLikeClick() {
            this.$emit('like-clicked', this.item);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/icons/iconCommon/iconfont.css';

.iconfont {
    font-size: 20px;
    cursor: pointer; /* Make the icons clickable */
}

.discuss-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s;

    h3 {
        color: #333;
        font-size: 18px;
        margin-bottom: 5px;
    }

    p {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
    }

    .additional-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 12px;
        color: #999;

        span {
            margin-right: 20px;

            &.author, &.date-info {
                flex: 1;
            }

            &.discussion-count, &.like-count {
                white-space: nowrap;
            }
        }
    }

    &:hover {
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
}
</style>
