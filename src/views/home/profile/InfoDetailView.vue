<template>
    
</template>

<script>

export default {
    data() {
        return {
            form: {},
            originalFormData: {},
            metadata: [],
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
        }
    }
}
</script>

<style lang="scss" scoped>
.info-detail {
    display: flex;

    .profile-image {
        cursor: pointer;
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}

</style>
