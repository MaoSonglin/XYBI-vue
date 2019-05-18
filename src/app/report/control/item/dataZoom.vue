<template>
	<el-row :gutter="10">
		<el-col :md="12">
			<el-form-item label="类型">
				<el-select v-model="data.type">
					<el-option value="inside" label="inside"></el-option>
					<el-option value="slider" label="slider"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'data-zoom',
		props: {
			dataZoon: {
				type: Object,
				default(){
					return {
						type: 'inside',
						disableed: false,
						start: 0,
						end: 100,
						orient: null,
						xAxisIndex: null,
						yAxisIndex: null,
						radiusAxisIndex: null,
						angleAxisIndex:null
					}
				} 
			},
			'axis-type': {
				type: String,
				default: 'x'
			}
		},
		data() {
			return {
				data: {}
			}
		},
		created() {
			this.data = this.dataZoon
		}
	}
</script>

<style>
</style>
