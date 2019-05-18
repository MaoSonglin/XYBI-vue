<template>
	<el-row>
		<el-col :md="8">
			<el-form-item label="显示">
				<el-switch v-model="axis.show"></el-switch>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="名称">
				<el-input v-model="axis.name"></el-input>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="类型">
				<el-select v-model="axis.type">
					<el-option value="category" label="分类"></el-option>
					<el-option value="value" label="值"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="坐标系">
				<el-input-number v-model="axis.gridIndex" step="1"></el-input-number>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="位置">
				<el-select v-model="axis.position">
					<el-option value="left" label="左"></el-option>
					<el-option value="right" label="右"></el-option>
					<el-option value="top" label="上"></el-option>
					<el-option value="bottom" label="下"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'axis',
		props: {
			axis: {
				type: Object,
				default() {
					return {
						show: true,
						gridIndex: 0,
						type: 'category',
						name: '',
						position: 'bottom'
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
			this.data = this.axis
		}
	}
</script>

<style>
</style>
