<template>
    <div class="course-card" @click="cardClicked">
        <div class="image-container">
            <el-image 
                class="course-image" 
                :src="imageData" 
                fit="cover"
                @error="handleImageError">
            </el-image>
            <div class="card-content">
                <h3 class="course-title">{{ title }}</h3>
                <p class="course-instructor">{{ instructor }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: String,
        title: String,
        instructor: String,
        courseId: String
    },
    data() {
        return {
            imageData: ''
        };
    },
    created() {
        this.loadImage();
    },
    methods: {
        loadImage() {
            try {
                this.imageData = require('@/assets/' + this.image);
            } catch (e) {
                this.handleImageError();
            }
        },
        handleImageError() {
            // 加载失败时，设置默认图片
            this.imageData = require('@/assets/course_def.jpg');
        },
        cardClicked() {
            // Emit an event with the courseId when the card is clicked
            this.$emit('card-click', this.courseId);
        }
    }
};
</script>

<style lang="scss" scoped>

.course-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        box-shadow: 0 20px 30px rgba(0,0,0,0.3);
    }

    .image-container {
        display: flex;
        position: relative;
        width: 100%;
        padding-top: 61.8%;

        .course-image {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.8);
            padding: 10px 15px;
            backdrop-filter: blur(5px); 
            transition: background-color 0.3s ease-in-out;
        }

        .course-title {
            margin: 0;
            font-size: 16px;
            color: #333;
        }

        .course-instructor {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
    }
}
</style>
