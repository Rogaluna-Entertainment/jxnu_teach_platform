<template>
<div class="home">
  <!-- {{authority}} -->
  <el-container>
    <el-header>
        <home-header-module-vue/>
    </el-header>
    <el-container>
        <router-view/>
    </el-container>
  </el-container>
</div>
</template>

<script>
import HomeHeaderModuleVue from '@/components/HomeHeaderModule.vue'
import { findNameByIndex } from '@/functions/findNameByIndex'

export default {
	name: 'HomeView',
	components: {
		HomeHeaderModuleVue
	},
	data() {
		return {};
	},
	methods: {
		handleSelectedItem(value) {
			console.log('接收到子组件的数据:', value);
			const index = value.key;
			const item = value.item;

			this.currentPage = item;

			const name = findNameByIndex([item], index)

			if (this.$route.name !== name) {
				this.$router.push({ name: name })
			}
		}
	},
}
</script>

<style lang="scss" scoped>

.home{
	width: 100%;
	height: 100%;

	display: flex;
	align-content: stretch;

	.el-main {
		display: flex;
		flex-direction: column;

	}
}

</style>