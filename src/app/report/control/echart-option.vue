<template>
	<el-form v-model="option" label-position="right" label-width="100px" size="small" label-suffix=":">
		<el-tabs type="border-card" tab-position="left">
			<el-tab-pane label="标题">
				<m-title :title="option.title"></m-title>
			</el-tab-pane>
			<el-tab-pane label="图例">
				<m-legend :legend="option.legend"></m-legend>
			</el-tab-pane>
			<el-tab-pane label="网格">
				<m-grid :grid="option.grid"></m-grid>
			</el-tab-pane>
			<el-tab-pane label="提示框">
				<m-tooltip :tooltip="option.tooltip"></m-tooltip>
			</el-tab-pane>
			<el-tab-pane label="放缩" v-for="(d,index) in option.dataZoom" v-if="typeof option.dataZoom === 'array'">
				<dataZoom :dataZoom="d" axisType='x'></dataZoom>
			</el-tab-pane>
			<el-tab-pane label="坐标轴">
				<el-card v-if="option.xAxis">
					<div class="" slot="header">
						X轴
					</div>
					<div>
						<axis :axis="option.xAxis"></axis>
					</div>
				</el-card>
				<el-card v-if="option.yAxis">
					<div class="" slot="header">
						Y轴
					</div>
					<div>
						<axis :axis="option.yAxis"></axis>
					</div>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</el-form>
</template>

<script>
	import title from './item/title'
	import legend from './item/legend'
	import grid from './item/grid'
	import tooltip from './item/tooltip'
	import dataZoom from './item/dataZoom'
	import axis from './item/axis'
	export default {
		name: 'echart-option',
		components:{ 'm-title': title, 'm-legend': legend, 'm-grid': grid, 'm-tooltip': tooltip, dataZoom , axis},
		props: {
			option: {
				type: Object,
				required: true ,
				dataZoom: [{}]
			},
		},
		created() {
			
		}
	}
</script>

<style>
</style>
