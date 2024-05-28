<template>
    <div class="examination-item">
        <h3>{{ examination.title }}</h3>
        <div class="examination-info">
            <span class="status" :class="{'completed': examination.isCompleted}">状态: {{ examination.isCompleted ? '已完成' : '未完成' }}</span>
            <span class="due-date">截止时间: {{ examination.dueDate }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExaminationItem',
    props: {
        examination: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.examination-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        background-color: #f9f9f9;
    }

    h3 {
        font-size: 18px;
        color: #333;
        margin: 0;
        margin-bottom: 10px;
    }

    .examination-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;

        .status {
            color: #666;
            &.completed {
                color: #4CAF50; /* Green for completed items */
            }
        }

        .due-date {
            color: #999;
        }
    }
}
</style>
