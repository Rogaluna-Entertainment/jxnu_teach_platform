<template>
    <div class="info">

        <el-card>
            <div slot="header" class="clearfix">
                <span>{{ currentTitle }}</span>
            </div>

            <div class="info-detail">
                <el-form label-position="right" label-width="80px" :model="form">
                    <el-form-item v-for="field in metadata" :key="field.prop" :label="field.label">
                        <template v-if="field.type === 'input'">
                            <el-input
                                :value="form[field.prop]"
                                @input="value => form[field.prop] = value"
                                :disabled="!field.tempEdit">
                                <template #append>
                                    <el-button icon="el-icon-edit" @click="toggleEdit(field)" :disabled="!field.editable"></el-button>
                                </template>
                            </el-input>
                        </template>
                        <template v-else-if="field.type === 'image'">
                            <el-image
                                class="profile-image"
                                style="width: 200px; height: 200px; border-radius: 50%;"
                                :src="form[field.prop] || defaultHeadIcon"
                                fit="cover"
                                alt="Profile Image"
                                @click="handleEditImage(field)">
                            </el-image>
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">提交</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

    </div>
</template>

<script>
import infoDetail from '@/assets/configs/infoDetail.json'
import { infoDetailAPI } from '@/services/api/accountInfo/infoDetail'
import { modifyAccountAPI } from '@/services/api/accountManager/modifyAccount'
import defaultHeadIcon from '@/assets/default_head_icon.svg'

export default {
    data() {
        return {
            currentTitle: "个人信息",
            form: {},
            originalFormData: {},
            metadata: [],
            defaultHeadIcon
        };
    },
    created() {
        this.metadata = infoDetail[this.$store.state.authority];
        this.metadata.forEach(field => {
            field.tempEdit = false; // 初始化字段，确保所有字段最初都不可编辑
        });
    },
    mounted() {
        infoDetailAPI(this.$store.state.token)
            .then(response => {
                this.originalFormData = response.data.content
                this.form = JSON.parse(JSON.stringify(this.originalFormData));
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error infoDetailAPI:', error);
            });
    },
    methods: {
        toggleEdit(field) {
            if (field.editable) {
                field.tempEdit = !field.tempEdit
                this.$forceUpdate()
            }
        },
        handleEditImage(field) {
            if (!field.editable) return;
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = "image/*";
            fileInput.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = e => {
                    this.form[field.prop] = e.target.result;
                    this.$forceUpdate(); // 确保更新
                };
                reader.readAsDataURL(file);
            };
            fileInput.click();
        },
        resetForm() {
            // 重置表单数据
            this.form = JSON.parse(JSON.stringify(this.originalFormData));
        },
        submitForm() {
            console.log("Submitting form:", this.form);
            // 这里添加提交表单的逻辑，例如调用API
            const updateRequest = {

            }
            if (this.$store.state.authority === 'student'){

            }

            modifyAccountAPI(this.$store.state.accountId, updateRequest, this.$store.state.token)
                .then(response => {

                })
                .catch(error => {
                    
                })

        }
    }
}
</script>

<style lang="scss" scoped>

.info {
    display: flex;
    height: 100%;
    width: 100%;

    .el-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 20px;

        .info-detail {
            display: flex;
            justify-content: center;

            .profile-image {
                cursor: pointer;
                width: 200px;
                height: 200px;
                border-radius: 50%;
            }
        }
    }

    .clearfix {
        text-align: left;
    }
}

</style>