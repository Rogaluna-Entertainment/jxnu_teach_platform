<template>
    <div class="recommend-resource-item">
        <h3>{{ recommendResource.title }}</h3>
        <div class="recommend-task-info">
            
        </div>
    </div>
</template>

<script>
export default {
    props: {
        recommendResource: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>

.recommend-resource-item {
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

    .recommend-task-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;

    }
}
</style>
