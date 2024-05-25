<template>
    <div class="aside-nav">
        <div class="course-card">
            <el-image 
                class="course-image" 
                src="data:image/jpeg;base64,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" 
                fit="contain"
                style="padding: 10px;"
                @error="handleImageError"
                @click="handleGateClick">
            </el-image>
            <h4>{{ courseTitle }}</h4>

            <el-divider></el-divider>
        </div>

        <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
            <template v-for="item in menuItems">
                <el-submenu v-if="item.children && item.children.length" :key="`${item.index}`" :index="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item 
                        v-for="child in item.children"
                        :key="`${child.index}`"
                        :index="child.index">
                            {{ child.title }}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :key="item.index" :index="`${item.index}`" :disabled="item.disabled || false">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { courseNavOptAPI } from '@/services/api/course/courseNavOpt';
import { findNameByIndex } from '@/functions/findNameByIndex';

export default {
    props: {
        courseId: String
    },
    data() {
        return {
            courseTitle: "英语听力",
            defaultActive: "",
            menuItems: []
        };
    },
    created() {
        courseNavOptAPI({ courseId: this.courseId}, this.$store.state.token)
            .then(response => {
                const responseBody = response.data;
                const opts = responseBody.content;
                this.defaultActive = opts.defaultActive;
                this.menuItems = opts.options;

                if (this.$route.name == 'courseDetail') {
                    this.handleSelect(this.defaultActive);
                }
            })
            .catch(error => {
                this.$message({
                    type: "error",
                    message: `Error: ${error}`
                })
            })
    },
    methods: {
        handleImageError() {
            return true
        },
        handleGateClick() {
            this.$router.push({ name: 'courseGate' });
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            const name = findNameByIndex(this.menuItems, key)
            if (this.$route.name !== name) {
				this.$router.push({ name: name })
			}
        }
    }
}
</script>

<style lang="scss" scoped>

.aside-nav {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .course-card {
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        overflow: hidden;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        margin: 10px;

        .el-image {
            cursor: pointer;
        }
    }

    .el-menu {
        width: 100%;
    }
}

</style>