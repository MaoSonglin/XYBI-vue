<template>
	<div class="report-warpper" ref='x' :style="{'height': clientHeight - 84 +'px'}">
		clientHeight: {{clientHeight}} , clientWith: {{clientWith}}
		
		<control v-for="(item,index) in list" :key="index"
		 :element="item" v-on:setting="setting($event,item)"
		  v-on:positionChange="positionChange($event,index)"></control>
		
		
		<el-dropdown @command="createNew">
			<el-button type="primary">
				新建<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command='bar'>条形图</el-dropdown-item>
				<el-dropdown-item command='line'>折线图</el-dropdown-item>
				<el-dropdown-item command='pie'>饼状图</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		
		<!-- 新建 -->
		<el-dialog :title="dialog.title" width="80%" top="100px" :visible="dialog.visiable" :before-close="() => dialog.visiable=false" @click="($event) => $event.stopPropagation()">
			<el-tabs>
				<el-tab-pane label="数据">
					<el-select v-model="transfer.tableId" @change="setOption" clearable="">
						<el-option :key="tab.id" :value="tab.id" v-for="tab in tables" :label="tab.viewName"></el-option>
					</el-select>
					<el-transfer v-model="transfer.value" :data="transfer.fields"
					 :props="transfer.props" filterable :titles="['添加字段', '移除字段']"
					 @change="modifyField"></el-transfer>
					<!-- <databind :series="dialog.option.series" :tables="tables" :control="dialog.control" v-on:serieChange="optionChange"></databind> -->
				</el-tab-pane>
				<el-tab-pane label="显示">
					<databind :control="dialog.control" :option="dialog.option"></databind>
				</el-tab-pane>
				<el-tab-pane label="属性">
					<echartOption :option="dialog.option" v-on:optionChange="optionChange"></echartOption>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer" custom-class='m-dialog'>
				<el-button @click="() => dialog.visiable=false" type="warning" size="small" >取消</el-button>
				<el-button type="primary" size="small" @click="confirm()" >确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import control from './control/bar-chart'
	import template from './template.js'
	import echartOption from './control/echart-option'
	import databind from './control/databind'
	import MyUtils from '../../utils/MyUtils.js'
	
	export default {
		name: 'design',
		components:{ control, echartOption, databind },
		data() {
			return {
				clientHeight: 0,
				clientWith: 0,
				list: [],
				dialog: {
					title: '新建',
					visiable: false,
					option: {},
					control: {}
				},
				tables: [],
				transfer: {
					tableId: null,
					fields: [],
					value: [],
					props: { key: 'id', label: 'fieldName'}
				}
			}
		},
		created() {
			this.reportId = this.$route.query.id
			this.getList() // 
			this.getTableViews() // 获取报表可用的数据视图和字段
		},
		mounted() {
			this.clientHeight = `${document.documentElement.clientHeight}`
			this.clientWith = `${document.documentElement.clientWidth}`
		},
		methods: {
			createNew(type) {
				// this.$message({ type: 'success', message: type})
				this.dialog.visiable = true
				this.dialog.option = template[type] 
				let item = { 
					name: '',
					marginLeft: 10,
					marginTop: 10,
					width: 50,
					height: 50,
					reportId: this.reportId,
					setting: JSON.stringify(this.dialog.option)
				}
				this.$http.post('/element/add',MyUtils.flatten(item)).then(res => {
					if(res.code === 20000){
						this.$message({ type: 'success', message: res.message })
						this.list.push(res.data)
						this.dialog.control = res.data
					}
				})
			},
			getList() { // 获取报表中的元素控件
				this.$http.get('/element/getByReport',{ params: { reportId: this.reportId }}).then(res => {
					this.$set(this, 'list', res.data)
				})
			},
			getTableViews() { 
				this.$http.get('/report/report/tables',{ params: { reprotId: this.reportId } }).then(res => {
					this.$set(this, 'tables', res.data)
				})
			},
			confirm() {
				if(this.dialog.title === '编辑'){
					this.dialog.control.setting = JSON.stringify(this.dialog.option)
					this.$http.post('/element/update', MyUtils.flatten(this.dialog.control)).then(res => {
						if(res.code === 20000){
							this.$message({ type: 'success', message: res.message})
						}
					})
				}
				
				this.dialog.visiable = false
			},
			setting(event, item) {
				this.dialog.option = event// JSON.parse(item.setting)
				this.dialog.visiable = true
				this.dialog.title = '编辑'
				this.dialog.control = item 
				this.transfer.value = item.fields.map( f => f.id)
			},
			positionChange(e,index) { // 元素的位置和大小发生变化
				this.$http.post('/element/update',MyUtils.flatten(e)).then( res => {
					if(res.code === 20000){
						this.$message({ type: 'success', message: res.message})
					}
				})
			},
			optionChange() {// 元素的echart配置发生变化 
				this.dialog.control.setting = JSON.stringify(this.dialog.option)
				this.$http.post('/element/update',MyUtils.flatten(this.dialog.control)).then(res => {
					console.log('修改')
				})
			},
			setOption(id) {
				let a = this.tables.filter(table => table.id === id)
				this.transfer.fields.splice(0,this.transfer.fields.length)
				for(let i in a[0].fields){
					this.transfer.fields.push(a[0].fields[i]) 
				}
			},
			modifyField(val, orient, x){ // 修改元素中的字段
				for(let i in x){
					this.$http.post(orient === 'right' ? '/element/add/data':'/element/remove/field',{ 
						elementId: this.dialog.control.id,
						viewFieldId: x[i]}).then( res => {
							console.log((res.message))
							if(orient === 'right'){
								// 添加的字段
								let array = this.transfer.fields.filter( d => d.id === x[i])
								// 将添加的字段加入到element的fields中
								for(let i in array){
									this.dialog.control.fields.push(array[i])
								}
							}else{
								// 移除element中的字段
								this.dialog.control.fields = this.dialog.control.fields.filter(d => d.id !== x[i])
							}
						})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.report-warpper{
		margin: 10;
		border: #000000 solid 1px;
		width: 100%;
		overflow: auto;
		position: relative;
	}
</style>
