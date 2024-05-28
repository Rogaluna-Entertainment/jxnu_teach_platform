<template>
    <el-container>
        <el-main>
            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%;">
                <div style="position: relative; width: 50%;">
                    <el-input
                        placeholder="搜索课程内容"
                        v-model="input"
                        clearable
                        style="margin-bottom: 10px; width: calc(100% - 50px);">
                    </el-input>
                    <el-button type="primary" icon="el-icon-search" style="position: absolute; right: 0; top: 0;">搜索</el-button>
                </div>
                <div style="width: 80%; margin-top: 5px;"> <!-- 设置宽度为60%，与搜索栏宽度相同，并添加上下边距 -->
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="所有资源" name="first">
                            <div class="div-card">
                                <el-card v-for="(recommend, index) in recommends_all" :key="index">
                                    <img :src="recommend.avatar" class="card-avatar">
                                    <div class="card-content">
                                    <h3>{{ recommend.title }}</h3>
                                    <p>{{ recommend.description }}</p>
                                    </div>
                                </el-card>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="教学PPT" name="second">
                            <div class="div-card">
                                <el-card v-for="(recommend, index) in recommends_ppt" :key="index">
                                    <img :src="recommend.avatar" class="card-avatar">
                                    <div class="card-content">
                                    <h3>{{ recommend.title }}</h3>
                                    <p>{{ recommend.description }}</p>
                                    <span>{{ recommend.category }}</span>
                                    </div>
                                </el-card>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="教学教案" name="third">
                            <div class="div-card">
                                <el-card v-for="(recommend, index) in recommends_plan" :key="index">
                                    <img :src="recommend.avatar" class="card-avatar">
                                    <div class="card-content">
                                    <h3>{{ recommend.title }}</h3>
                                    <p>{{ recommend.description }}</p>
                                    <span>{{ recommend.category }}</span>
                                    </div>
                                </el-card>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="教学视频" name="fourth">
                            <div class="div-card">
                                <el-card v-for="(recommend, index) in recommends_video" :key="index">
                                    <img :src="recommend.avatar" class="card-avatar">
                                    <div class="card-content">
                                    <h3>{{ recommend.title }}</h3>
                                    <p>{{ recommend.description }}</p>
                                    <span>{{ recommend.category }}</span>
                                    </div>
                                </el-card>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>

            </div>
        </el-main>
    </el-container>

</template>

<script>
import CourseAsideNavModuleVue from '@/components/widgets/app/CourseAsideNavModule.vue'
import CourseMainModuleVue from '@/components/widgets/app/CourseMainModule.vue';

export default {
    components: {
        CourseAsideNavModuleVue,
        CourseMainModuleVue
    },
    data() {
        return {
            courseId: '',
            input: '',
            activeName: 'first',
            recommends_all: [
                {
                  avatar: require('@/assets/image2.png'), // 头像图片路径
                  title: '商业英语语法',
                  description: '囊括大部分商业环境下可能用到的语法知识视频',
                },
                {
                  avatar: require('@/assets/image2.png'),
                  title: '大学口语视听说PPT',
                  description: '包含大部分大学生日常口语交流场景的教学PPT',
                },
                {
                  avatar: require('@/assets/image2.png'),
                  title: '英语口语演讲技巧',
                  description: '提升英语口语表达能力，让你的演讲更有说服力',
                },
                {
                  avatar: require('@/assets/image2.png'),
                  title: '如何提升英语口语',
                  description: '关于英语口语进阶的视频',
                },
                {
                  avatar: require('@/assets/image2.png'),
                  title: '英语单词速记',
                  description: '英语考试高频词速记视频',
                },
                {
                  avatar: require('@/assets/image3.png'),
                  title: '口语课程思政教案',
                  description: '结合口语课程的思政教育教案',
                },
                {
                  avatar: require('@/assets/image4.png'),
                  title: '大学英语教学用PPT',
                  description: '包含大部分大学英语教学内容',
                },
                {
                  avatar: require('@/assets/image4.png'),
                  title: '大学人际交往PPT',
                  description: '涉及大学生人际交往的方方面面',
                },
                {
                  avatar: require('@/assets/image3.png'),
                  title: '大学英语应试课程教案',
                  description: '包括大部分英语应试技巧',
                },
                {
                  avatar: require('@/assets/image3.png'),
                  title: '英语教学教案大纲',
                  description: '关于大学英语教学的整体教案大纲',
                },
            ],
            recommends_ppt: [
                {
                  avatar: require('@/assets/image4.png'),
                  title: '大学英语教学用PPT',
                  description: '包含大部分大学英语教学内容',
                },
                {
                  avatar: require('@/assets/image4.png'),
                  title: '大学人际交往PPT',
                  description: '涉及大学生人际交往的方方面面',
                },
            ],
            recommends_plan: [
                {
                  avatar: require('@/assets/image3.png'),
                  title: '口语课程思政教案',
                  description: '结合口语课程的思政教育教案',
                },
                {
                  avatar: require('@/assets/image3.png'),
                  title: '英语教学教案大纲',
                  description: '关于大学英语教学的整体教案大纲',
                },
            ],
            recommends_video: [
                {
                  avatar: require('@/assets/image2.png'), // 头像图片路径
                  title: '商业英语语法',
                  description: '囊括大部分商业环境下可能用到的语法知识视频',
                },
                {
                  avatar: require('@/assets/image2.png'),
                  title: '大学口语视听说PPT',
                  description: '包含大部分大学生日常口语交流场景的教学PPT',
                },
                {
                  avatar: require('@/assets/image2.png'),
                  title: '英语口语演讲技巧',
                  description: '提升英语口语表达能力，让你的演讲更有说服力',
                },
                {
                  avatar: require('@/assets/image2.png'),
                  title: '如何提升英语口语',
                  description: '关于英语口语进阶的视频',
                },
                {
                  avatar: require('@/assets/image2.png'),
                  title: '英语单词速记',
                  description: '英语考试高频词速记视频',
                },
            ],
        }
    },
    methods: {
    // ...其他方法
        handleRecommendClick(courseId) {
          console.log(`推荐课程 ${courseId} 被点击`);
          // 这里可以添加跳转到推荐课程的逻辑
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    created() {
        this.courseId = this.$route.params.courseId;
    }
}
</script>

<style lang="scss" scoped>

.el-main {
    display: flex;
    background-color: #FFFFFF;
}

.el-card {
    width: calc(100% / 4.5);
    height: 200px;
}

.div-card {
    width: 80%;
    margin-top: 20px;
    margin-left: 80px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.card-avatar {
  width: 30%;
  height: auto;
}
.card-content {
  height: calc(200px - 100px); /* 根据需要调整 */
  overflow: hidden; /* 保持这个样式，以防止内容溢出容器 */
}

.card-content h3 {
  margin: 0; /* 防止默认的margin影响布局 */
  font-size: 1.2rem; /* 根据需要调整 */
  color: #333; /* 根据需要调整 */
  overflow: hidden;
  white-space: nowrap; /* 不换行，如果需要换行，移除这个样式 */
  text-overflow: ellipsis; /* 使用省略号，如果不需要省略号，移除这个样式 */
}

.card-content p {
  margin: 0; /* 防止默认的margin影响布局 */
  font-size: 1rem; /* 根据需要调整 */
  color: #666; /* 根据需要调整 */
  word-wrap: break-word; /* 允许长单词或URL换行 */
  overflow: auto; /* 或者使用scroll，如果需要滚动条 */
}
</style>