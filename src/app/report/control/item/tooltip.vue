<template>
	<el-row :gutter="10">
		<el-col :md="8">
			<el-form-item label="显示">
				<el-switch v-model="tooltip.show"></el-switch>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="触发类型">
				<el-select v-model="tooltip.trigger">
					<el-option value="item" label="数据项"></el-option>
					<el-option value="axis" label="坐标轴"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="指示器">
				<el-select v-model="tooltip.axisPointer.line">
					<el-option value="line" label="直线"></el-option>
					<el-option value="shadow" label="阴影"></el-option>
					<el-option value="none" label="无"></el-option>
					<el-option value="cross" label="十字准星"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'tooltip',
		components: {},
		props: {
			tooltip: {
				type: Object,
				default(){
					return {
						show: true,
						trigger: 'item',
						axisPointer: {
							type: 'line',
							axis: 'auto'
						},
						textStyle: {
							color: '#fff'
						},
						backgroundColor: 'rgba(50,50,50,0.7)',
						borderColor: '#333'
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
			if(this.tooltip && ! this.tooltip.axisPointer){
				this.tooltip.axisPointer = {}
			}
			if(this.tooltip && ! this.tooltip.textStyle){
				this.tooltip.textStyle = {}
			}
			this.data = this.tooltip
		}
	}
</script>

<style>
</style>
