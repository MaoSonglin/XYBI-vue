<template>
	<el-form :model="view" label-position="right" label-suffix=":" label-width="100px">
		<el-form-item label="名称">
			<el-input v-model="view.viewName"></el-input>
		</el-form-item>
		<el-form-item label="中文名">
			<el-input v-model="view.viewZhChName"></el-input>
		</el-form-item>
		<el-form-item label="说明">
			<el-input type="textarea" v-model="view.comment"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'CreateViewForm',
		props: {
			viewInfo: {
				type: Object,
				default: {}
			}
		},
		created() {
			this.view.valiate = () => true
		}
	}
</script>

<style>
</style>
