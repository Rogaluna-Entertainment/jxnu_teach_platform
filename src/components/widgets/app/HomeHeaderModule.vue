<template>
    <div class="header">
        <div class="title">
            <div style="display: flex; flex-direction: row;">
                <el-image 
                    class="course-image" 
                    :src="logo" 
                    fit="scale-down"
                    style="padding: 10px; width: 50px;"
                    >
                </el-image>
                <h2 class="title-text">智语新航</h2>
            </div>
            

            <list
                class="home-nav"
                :items="homeNavList"
                item-width="100%"
                item-height="auto"
                fit-content
                horizontal
                item-padding="0px"
                item-margin="0px"
                :item-border="false"
            >
                <template v-slot:item="{ item }">
                    <div class="nav-btn" @click="handleItemClick(item)">
                        <span><i class="el-icon-s-home"></i>{{ item.title }}</span> 
                    </div>
                </template>
            </list>
        </div>
        <div>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                    {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item 
                    v-for="(item, index) in dropdownItems" 
                    :key="index"
                    :command="item.command"
                    :disabled="item.disabled"
                    :divided="item.divided">
                        {{ item.name }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import userMenu from '@/assets/configs/userMenu.json'
import List from '@/components/widgets/layout/List.vue';
import logo from '@/assets/logo.png';

export default {
    components: {
        List
    },
    data() {
        return {
            homeNavList: [
                {
                    title: '首页',
                    name: 'home'
                }
            ],
            dropdownItems: [],
            authority: "",
            username: "",
            currentPage: {},
            logo
        };
    },
    created() {
        this.authority = this.$store.state.authority;
        this.username = this.$store.state.username;
        this.dropdownItems = userMenu[this.authority];
    },
    methods: {
        handleCommand(command) {
            if (command === 'exit') {
                this.$store.dispatch('logout');
                this.$router.replace({ name: 'login' })
            } else {
                if (this.$route.name !== command) {
                    this.$router.push({ name: command })
                }
            }
            
            console.log(command);
        },
        handleItemClick(item) {
            if (this.$route.name != item.name) {
                this.$router.push({ name: item.name });
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@font-face {
    font-family: 'HanYiWeiFont';
    src: url('@/assets/hanyi_wei.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}


.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    
    .title {
        display: flex;
        align-items: center;

        .logo {
            background-image: url('@/assets/logo.png');
        }

        .title-text {
            font-family: 'HanYiWeiFont', sans-serif;
            font-size: xx-large;
            background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    
        .home-nav {
            margin-left: 50px;

            .nav-btn {
                padding: 10px;
                margin: 6px;
                cursor: pointer;

                &:hover {
                    background-color: gainsboro;
                    border-radius: 5px;
                }
            }
        }
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #409EFF;

        .el-avatar {
            margin-right: 10px;
        }
    }
    
    .el-icon-arrow-down {
        font-size: 12px;
    }
}

</style>