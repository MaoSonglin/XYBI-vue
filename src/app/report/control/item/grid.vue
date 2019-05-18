<template>
	<el-row :gutter="10">
		<el-col :md="12">
			<el-form-item label="显示">
				<el-switch v-model="grid.show"></el-switch>
			</el-form-item>
		</el-col>
		<el-col :md="12">
			<el-form-item label="显示刻度">
				<el-switch v-model="grid.containLabel"></el-switch>
			</el-form-item>
		</el-col>
		<el-col :md="12">
			<el-form-item label="边框颜色">
				<el-color-picker v-model="grid.borderColor"></el-color-picker>
			</el-form-item>
		</el-col>
		<el-col :md="12">
			<el-form-item label="边框宽度">
				<el-input-number v-model="grid.borderWidth"></el-input-number>
			</el-form-item>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'grid',
		components:{},
		props: {
			grid: {
				type: Object,
				default(){
					return {
						show: false,
						borderColor: '#ccc',
						borderWidth: 1,
						containLabel: false
					}
				} 
			},
		},
		data() {
			return {
				data: {}
			}
		},
		created() {
			this.data = this.grid
		}
	}
</script>

<style>
</style>
