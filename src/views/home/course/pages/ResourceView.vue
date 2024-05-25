<template>
    <el-card class="resource-wrapper">
        <transition name="fade" mode="out-in">
            <div class="menu" v-show="showMenu" :style="{ top: menuPosition.y + 'px', left: menuPosition.x + 'px' }">
                <ul class="menu-options">
                    <li 
                    class="menu-option"
                    v-for="(item, index) in menuItems"
                    :key="index"
                    @click="handleClickMenuOption(item)">
                    {{ item.title }}
                    </li>
                </ul>
            </div>
        </transition>

        <div class="tool-bar" v-show="$store.state.authority === 'teacher'">
            <div>
                <el-button icon="el-icon-plus" type="primary" @click="addFileDialogVisible = true">上传文件</el-button>
                <el-button icon="el-icon-plus" type="warning" @click="addFolderDialogVisible = true">新建文件夹</el-button>
            </div>
            <div>
                <span class="tips">鼠标右键打开菜单</span>
            </div>
        </div>

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                class="folder-crumb"
                v-for="(crumb, index) in currentPath"
                :key="crumb.id"
                @click.native="navigateTo(index)">
                {{ crumb.name }}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="list-wrapper"  @contextmenu.prevent="handleContextMenu" @click="handleCardClick">
            <list
                :items="currentPath[currentPath.length - 1].children"
                item-width="200px"
                item-height="100px"
                fit-content
                item-padding="0px"
                item-margin="10px"
            >
                <template v-slot:item="{ item }">
                    <file-item-vue 
                    :item="item" 
                    @item-click="handleItemClick"
                    @item-select="handleItemSelect"
                    @download="handleDownload"></file-item-vue>
                </template>
            </list>

            <add-file-modal-vue :visible.sync="addFileDialogVisible"/>
            <add-folder-modal-vue :visible.sync="addFolderDialogVisible"/>
            <rename-file-modal-vue :visible.sync="renameFileDialogVisible"/>
            <delete-file-modal-vue :visible.sync="deleteFileDialogVisible"/>
        </div>
        
    </el-card>
</template>

<script>
import '@/icons/iconFile/iconfont';
import List from '@/components/widgets/layout/List.vue';
import FileItemVue from '@/components/FileItem.vue';
import AddFileModalVue from '@/components/dialogs/AddFileModal.vue';
import AddFolderModalVue from '@/components/dialogs/AddFolderModal.vue';
import RenameFileModalVue from '@/components/dialogs/RenameFileModal.vue';
import DeleteFileModalVue from '@/components/dialogs/DeleteFileModal.vue';

export default {
    name: 'ResourceView',
    components: {
        List,
        FileItemVue,
        AddFileModalVue,
        AddFolderModalVue,
        RenameFileModalVue,
        DeleteFileModalVue
    },
    data() {
        return {
            addFileDialogVisible: false,
            addFolderDialogVisible: false,
            renameFileDialogVisible: false,
            deleteFileDialogVisible: false,
            showMenu: false,
            menuPosition: { x: 0, y: 0 },
            menuItems: [],
            resources: {
                id: 'root',
                name: '根目录',
                type: 'folder',
                children: [
                    {
                        id: 'folder1',
                        name: '文档',
                        type: 'folder',
                        children: [
                            { id: 'file1', name: '报告.docx', uploader: '张三', uploadTime: '2023-04-01', type: 'file' }
                        ]
                    },
                    {
                        id: 'folder2',
                        name: '图片',
                        type: 'folder',
                        children: []
                    }
                ]
            },
            currentPath: [],
        };
    },
    created() {
        this.currentPath.push(this.resources);
    },
    mounted() {

    },
    methods: {
        handleItemClick(item) {
            if (item.type === 'folder') {
                this.currentPath.push(item);
            } else {
                console.log('文件被点击:', item);
            }
        },
        handleItemSelect(item) {
            console.log("select");
        },
        handleDownload(item) {
            // 处理下载逻辑
            console.log('下载请求:', item);
        },
        navigateTo(index) {
            this.currentPath = this.currentPath.slice(0, index + 1);
        },
        handleContextMenu(event) {
            // 仅当权限为教师时能够打开右键菜单
            if(this.$store.state.authority === 'teacher') {
                const target = event.target;
                // 检查点击的是否为 list-item 或其子元素
                if (target.closest('.list-item')) {
                    // 如果是在 list-item 上点击，展示特定的菜单项
                    this.menuItems = [
                        {
                            title: '重命名',
                            name: 'rename'
                        },
                        {
                            title: '删除',
                            name: 'delete'
                        }
                    ];
                } else {
                    // 默认的菜单项
                    this.menuItems = [
                        {
                            title: '上传文件',
                            name: 'addFile'
                        },
                        {
                            title: '新建文件夹',
                            name: 'newFolder'
                        }
                    ];
                }
                this.setPosition({ top: event.clientY, left: event.clientX });
                event.preventDefault(); // 截断浏览器右键菜单
            }
        },
        handleCardClick() {
            if (this.showMenu) {
                this.showMenu = false;
            }
        },
        toggleMenu(visible) {
            this.showMenu = visible;
        },
        setPosition({ top, left }) {
            this.menuPosition = { x: left, y: top };
            this.toggleMenu(true);
        },
        handleClickMenuOption(item) {
            const name = item.name
            this.showMenu = false;
            switch (name) {
                case 'addFile':
                    this.addFileDialogVisible = true;
                    break;
                case 'newFolder':
                    this.addFolderDialogVisible = true;
                    break
                case 'rename':
                    this.renameFileDialogVisible = true;
                    break;
                case 'delete':
                    this.deleteFileDialogVisible = true;
                    break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/css/div/float-menu/style.css';
@import '@/css/div/tool-bar/generalStyle.scss';

.resource-wrapper {
    display: flex;
    width: 100%;

    ::v-deep .el-card__body {
        width: 100%;
        display: flex;
        flex-direction: column;

        .list-wrapper {
            display: flex;
            flex-grow: 1;
            width: 100%;
            flex-direction: column;

            .list-container {
                display: flex;
                align-items: stretch;

                .list-item {
                    &:hover {
                        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                        background-color: #f9f9f9;
                    }

                    &.focused {
                        border: 1px solid blue !important;
                    }
                }
            }
        }

        .folder-crumb {
            cursor: pointer;
        }
    }

    .tool-bar {
        justify-content: space-between;

        .tips {
            font-size: 12px;
            color: #999;
        }
    }
}
</style>
