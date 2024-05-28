<template>
    <div style="width: 100%;display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;">
        <div class="top-row">
            <ImageBox
                v-for="(item, index) in items.slice(0, 3)"
                :key="index"
                :icon="item.icon"
                :words="item.words"
                :post="item.post"
                :class="`box box-${index + 1}`"
            />
        </div>
        <div class="bottom-row">
        <ImageBox
            v-for="(item, index) in items.slice(3)"
            :key="index"
            :icon="item.icon"
            :words="item.words"
            :post="item.post"
            :class="`box box-${index + 4}`"
        />
        </div>
    </div>
</template>

<script>
import ImageBox from '@/components/list-item/ImageBox.vue'

export default {
    components: {
        ImageBox
    },
    data() {
        return {
            items: [
                { icon:'el-icon-bell',words: '学习公告', post: '自生成授课安排#课程内容查询' },
                { icon:'el-icon-monitor',words: '资源生成及管理', post: '教学资源推荐#个性化课件生成#个性化测试生成#教师思政教案生成#其他' },
                { icon:'el-icon-reading',words: '自生成课程', post: '课程' },
                { icon:'el-icon-user',words: '学生学情分析报告', post: '学生学习进度监控#学生练习测试情况查询与审批#学生问题识别及自生成反馈' },
                { icon:'el-icon-menu',words: 'AI及其他服务', post: '针对性口语练习#全过程双师互动课堂#1V1智能辅导' }
            ]
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>

.top-row, .bottom-row {
  display: flex;
  justify-content: center;
  width: 100%;
}

.top-row {
  margin-bottom: 20px; /* Adjust the spacing between top and bottom rows */
}

.bottom-row {
  margin-top: 20px; /* Adjust the spacing between top and bottom rows */
}

.box {
  margin: 0 10px; /* Add some horizontal spacing between boxes */
}

@media only screen and (max-width: 990px) {
  .top-row, .bottom-row {
    flex-wrap: wrap;
  }

  .box {
    margin: 10px 0; /* Adjust margin for smaller screens */
  }
}

@media only screen and (max-width: 479px) {
  .top-row, .bottom-row {
    flex-direction: column;
    align-items: center;
  }

  .box {
    margin: 10px 0; /* Adjust margin for very small screens */
  }
}


</style>