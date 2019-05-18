<template>
	<el-row :gutter="10">
		<el-col :md="16">
			<el-form-item label="类型">
				<el-radio v-model="data.type" label="plain">普通图例</el-radio>
				<el-radio v-model="data.type" label="scroll">可滚动图例</el-radio>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="显示">
				<el-switch v-model="data.show"></el-switch>
			</el-form-item>
		</el-col>
		<el-col :md="12">
			<el-form-item label="位置">
				<el-select v-model="data.left">
					<el-option value="auto" label="auto"></el-option>
					<el-option value="left" label="左"></el-option>
					<el-option value="right" label="右"></el-option>
					<el-option value="center" label="居中"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :md="12">
			<el-form-item label="位置">
				<el-select v-model="data.top">
					<el-option value="auto" label="auto"></el-option>
					<el-option value="top" label="上"></el-option>
					<el-option value="middle" label="中"></el-option>
					<el-option value="bottom" label="底"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :md="12">
			<el-form-item label="方向">
				<el-select v-model="data.orient">
					<el-option value="horizontal" label="水平"></el-option>
					<el-option value="vertical" label="垂直"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'legend',
		components:{},
		props: {
			legend: {
				type: Object,
				default(){
					return {
						type: 'plain',
						show: true,
						left: 'auto',
						top: 'auto',
						right: 'auto',
						botton: 'auto',
						width: 'auto',
						height: 'auto',
						orient: 'horizontal',
						align: 'auto'
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
			this.data = this.legend
		}
	}
</script>

<style>
</style>
