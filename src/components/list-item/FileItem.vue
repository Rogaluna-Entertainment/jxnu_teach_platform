<template>
    <div class="file-item" @click="emitItemClick">
        <div class="file-info">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="getIconClass(item.type)"></use>
            </svg>
            <span class="file-name">{{ item.name }}</span>
        </div>
        <div class="file-meta">
            <span class="uploader">{{ item.uploader }}</span>
            <span class="upload-time">{{ item.uploadTime }}</span>
        </div>
        <div class="file-actions" v-if="item.type !== 'folder'">
            <el-button type="text" icon="el-icon-download" @click="emitDownload">下载</el-button>
        </div>
    </div>
</template>

<script>
import iconFileClassMap from '@/assets/configs/iconFileClassMap.json'

export default {
    props: {
        item: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            clickTimeout: null,
            clickDelay: 300, // item点击缓冲时间
        }
    },
    methods: {
        getIconClass(type) {
            // 返回与文件类型对应的图标类
            let iconClass = iconFileClassMap[type];
            if (iconClass == undefined) {
                iconClass = iconFileClassMap["others"];
            }
            return iconClass;
        },
        emitItemClick() {
            if (this.clickTimeout) {
                clearTimeout(this.clickTimeout);
                this.clickTimeout = null;
                this.$emit('item-click', this.item);  // 当第二次点击时触发打开操作
            } else {
                this.clickTimeout = setTimeout(() => {
                    this.clickTimeout = null;
                    this.$emit('item-select', this.item);  // 当只有一次点击时触发选中操作
                }, this.clickDelay);
            }
        },
        emitDownload() {
            this.$emit('download', this.item);
        }
    }
};
</script>

<style lang="scss" scoped>
.file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #eee;
    padding: 25px;
    &:last-child {
        border-bottom: none;
    }

    .file-info {
        display: flex;
        align-items: center;

        .file-name {
            margin-left: 10px;
        }
    }

    .file-meta {
        margin-left: auto;
        padding-right: 20px;

        .uploader,
        .upload-time {
            margin-right: 15px;
        }
    }

    .file-actions {
        .el-button {
            margin-left: 20px;
        }
    }
}
</style>
