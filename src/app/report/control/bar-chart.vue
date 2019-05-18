<template>
	<div class="control" :style="{ top: position.top+'px', left: position.left+'px', width: position.width+'px', height: position.height+'px', cursor: isMove ? 'pointer;':'' , 'background-color': isMove? 'rgba(12,12,12,0.1)':'', 'border': isResize ? 'black 1px solid':''}"
	 @mousedown="startMove($event)" @mouseup="sendMsg()" >
		<div class="echart-container" ref='echart'></div>
		<div class="x-menu-bar">
			<i class="el-icon el-icon-setting" title="设置" @click="startSetting($event)"></i>
		</div>
		<div style="z-index: 200; position: absolute;top: 0; left: 0;width: 100%; height: 100%;">
			<div @mousedown="startResize($event)" class="loc loc-nw" :style="{ 'margin-top': '-2.5px', 'margin-left': '-2.5px', left: 0, top: 0}"></div>
			<div @mousedown="startResize($event)" class="loc loc-n" :style="{ 'margin-top': '-2.5px', 'margin-left': '-2.5px', left: '50%', top: 0}"></div>
			<div @mousedown="startResize($event)" class="loc loc-ne" :style="{ 'margin-top': '-2.5px', 'margin-left': '-2.5px', left: '100%', top: 0}"></div>
			<div @mousedown="startResize($event)" class="loc loc-w" :style="{ 'margin-top': '-2.5px', 'margin-left': '-2.5px', left: 0, top: '50%'}"></div>
			<div @mousedown="startResize($event)" class="loc loc-e" :style="{ 'margin-top': '-2.5px', 'margin-left': '-2.5px', left: '100%', top: '50%'}"></div>
			<div @mousedown="startResize($event)" class="loc loc-sw" :style="{ 'margin-top': '-2.5px', 'margin-left': '-2.5px', left: 0, top: '100%'}"></div>
			<div @mousedown="startResize($event)" class="loc loc-s" :style="{ 'margin-top': '-2.5px', 'margin-left': '-2.5px', left: '50%', top: '100%'}"></div>
			<div @mousedown="startResize($event)" class="loc loc-se" :style="{ 'margin-top': '-2.5px', 'margin-left': '-2.5px', left: '100%', top: '100%'}"></div>
		</div>
		<!-- <el-dialog title="设置" width="80%" top="100px" :visible="dialog.visiable" :before-close="() => dialog.visiable=false" @click="($event) => $event.stopPropagation()">
			<el-tabs>
				<el-tab-pane label="数据">
					
				</el-tab-pane>
				<el-tab-pane label="属性">
					<echartOption :option="option"></echartOption>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer" custom-class='m-dialog'>
				<el-button @click="() => dialog.visiable=false" type="warning" size="small" >取消</el-button>
				<el-button type="primary" size="small" >确定</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
	import echarts from 'echarts'
	import echartOption from './echart-option'
	export default {
		name: 'bar-chart',
		props: {
			element: {
				type: Object,
				default() {
					return {
						marginLeft: 10,
						marginTop: 5,
						width: 36,
						height: 28
					}
				}
			}
			
		},
		components:{ echartOption },
		data() {
			return {
				clientHeight: 0,
				clientWith: 0,
				position: {
					top: 10, left: 10, width: 110, height:90
				},
				isMove: false,
				isResize: false,
				dialog: {
					visiable: false
				},
				option: {
					type: Object,
					default: {}
				},
				data: {}
			}
		},
		created() { 
			if(this.element.setting){
				this.option = JSON.parse(this.element.setting)
			}
			this.data = this.element
		},
		mounted() {
			this.clientHeight = `${document.documentElement.clientHeight}` - 84
			this.clientWith = `${document.documentElement.clientWidth}`
			this.position.top = this.clientHeight * this.element.marginTop / 100
			this.position.left = this.clientWith * this.element.marginLeft / 100
			this.position.width = this.clientWith * this.element.width / 100
			this.position.height = this.clientHeight * this.element.height / 100
			document.addEventListener('mousemove', e => {this.move(e)})
			document.addEventListener('mouseup',(e) => { 
				this.isMove = false
				this.isResize = false
			})
			setTimeout(this.initChart,100)
			// this.initChart()
		},
		methods: {
			move(event) { 
				event.stopPropagation() 
				if(this.isResize){
					switch(this.className){
						case 'loc loc-nw':
						this.position.left += event.movementX
						this.position.top += event.movementY
						this.position.width -= event.movementX
						this.position.height -= event.movementY
						break;
						case 'loc loc-n':
						this.position.top += event.movementY
						this.position.height -= event.movementY
						break;
						case 'loc loc-ne':
						this.position.width += event.movementX
						this.position.top += event.movementY
						this.position.height -= event.movementY
						break;
						case 'loc loc-w':
						this.position.width -= event.movementX
						this.position.left += event.movementX
						break;
						case 'loc loc-e':
						this.position.width += event.movementX
						break;
						case 'loc loc-sw':
						this.position.left += event.movementX
						this.position.height += event.movementY
						this.position.width -= event.movementX
						break;
						
						case 'loc loc-s':
						this.position.height += event.movementY
						break;
						case 'loc loc-se':
						this.position.width += event.movementX
						this.position.height += event.movementY
						break;
					} 
				}

				if(!this.isMove) return
				this.position.left += event.movementX 
				this.position.top += event.movementY  
			},
			startResize(event){ 
				this.isResize = true
				this.isMove = false 
				this.className = event.target.className
				event.stopPropagation()
			},
			startMove(event){ 
				this.isResize = false
				this.isMove = true
				event.stopPropagation()
			},
			initChart() { 
				this.chart = echarts.init(this.$refs.echart)
				// 指定图表的配置项和数据
				
				this.chart.setOption(this.option)
				this.chart.resize()
				this.$on('resize', pos => this.chart.resize())
			},
			startSetting(e) { 
				this.$emit('setting',this.option)
				e.stopPropagation()
			},
			sendMsg() {
				if(this.isMove || this.isResize){
					this.$emit('positionChange',{
						...this.element,
						marginTop: this.position.top * 100 / this.clientHeight,
						marginLeft: this.position.left * 100 / this.clientWith,
						width: this.position.width * 100 / this.clientWith,
						height: this.position.height * 100 / this.clientHeight
					})
				}
			}
		},
		watch:{
			position:{
				handler(val, oldVal){
					this.element.x = this.position.marginLeft / this.clientWith * 100
					this.element.y = this.position.marginTop / this.clientHeight * 100
					this.element.width = this.position.width / this.clientWith * 100
					this.element.height = this.position.height / this.clientHeight * 100
					this.$emit('resize',this.position)
				},
				deep: true
			}
		}
	}
</script>

<style scoped="scoped">
	.control{
		position: absolute; 
	}
	.shape{ 
		border: #000000;
		width: 100%;
		height: 100%;  
	}
	.loc{
		position: absolute;
		width: 5px;
		height: 5px;
		background-color: #000000;
		visibility: hidden;
	}
	.control:hover .loc{
		visibility: visible;
	}
	.loc-nw{
		cursor: nw-resize;
	}
	.loc-n {
		cursor: n-resize;
	}
	.loc-ne {
		cursor: ne-resize;
	}
	.loc-e {
		cursor: e-resize;
	}
	.loc-se {
		cursor: se-resize;
	}
	.loc-s {
		cursor: s-resize;
	}
	.loc-sw {
		cursor: sw-resize;
	}
	.loc-w {
		cursor: w-resize;
	}
	.echart-container{
		width: 100%;
		height: 100%;
	}
	.x-menu-bar{
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 300;
	}
	.control:hover .x-menu-bar{
		display: block;
		text-align: right;
		flex-direction: column-reverse;
		background-color: rgba(134,123,123,0.2);
		padding: 5px;
	}
	.el-icon-setting{
		cursor: pointer;
	}
	.el-icon-setting:hover{
		color: #3399FF;
	}
	.m-dialog{
		z-index: 1000;
	}
</style>
