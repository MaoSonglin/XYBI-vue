<template>
	<div class="dome-wrapper">
		<el-tabs type="border-card" tab-position="right" class="tab">
			<el-tab-pane label="表格">
				<div class="tab1-title">
					<h3>数据包{{pkg.name}}中的数据表</h3>
					<el-form :inline="true">
						<el-form-item>
							<el-button type="infor" @click="add"><i class="el-icon-plus" title="添加"></i></el-button>
						</el-form-item>
						<el-form-item>
							<el-input type="text" placeholder="搜索" @change="getViews" v-model="page.conditions[0].parameters[1]"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<el-row :gutter="10">
					<el-col v-for="(view,index) in views" :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
						<div :key="index" @click="show(view)">
							<svg-icon icon-class="table"></svg-icon>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="关联">这里展示数据表之间的关联</el-tab-pane>
		</el-tabs>
		
		<!-- dialog of create view -->
		<el-dialog :title="dialog.title" :visible="dialog.visible">
			<span class="demonstration">选择视图模板</span>
			<el-cascader
				placeholder="试试搜索：指南"
				:options="dialog.options"
				:props="dialog.props"
				filterable
				@active-item-change="handleItemChange"
				@change="tableId => { if(tableId.length === 2) dialog.createVo.dataTableIds = [tableId[1]]}"
				:show-all-levels="false"
			></el-cascader>
			<span slot="footer" class="dialog-footer">
				<el-button @click="() => { dialog.visible = false }">取消</el-button>
				<el-button @click="confirm">确定</el-button>
			</span>
		</el-dialog>
		<!-- end of create view -->
		
		<!-- dialog for show information of a view table-->
		<el-dialog :title="dialog2.title" :visible="dialog2.visible" top="40px">
			<div class="dialog-content" v-if="dialog2.view">
				<ViewManage :viewInfo="dialog2.view"></ViewManage>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="() => { dialog2.visible = false }" size="mini">取消</el-button>
				<el-button @click="" size="mini" type="primary">确定</el-button>
			</span>
		</el-dialog>
		<!-- end of show view table information -->
		
	</div>
</template>

<script>
	
	import MyUtils from '@/utils/MyUtils.js'
	import ViewManage from './ViewManage.vue'
	export default {
		name: 'view',
		components:{ ViewManage },
		data() {
			return {
				page: null,
				pkg: null,
				views: [{},{}],
				dialog: {	// 添加数据表
					title: '添加数据表',
					visible: false,
					options: [],
					props: {
						value: 'id',
						label: 'name',
						children: 'children'
					},
					createVo: {}
				},
				dialog2: {
					title: '',
					visible: false,
					
				}
			}
		},
		created() {
			this.pkg = this.$route.query
			this.page = { page: 1, size: 100 , total: 0, conditions: [ { propName: 'dataSetId', parameters: [ this.pkg.id ] }, { propName: 'name', parameters:[''] }]}
			this.getViews()
		},
		methods:{
			getViews() {	// 向服务器请求视图数据
				// let config = { params: MyUtils.flatten(this.page) }
				this.$http.post('/dataset/view/list',MyUtils.flatten(this.page)).then(res => {
					if(res.code === 20000){
						this.page.page = res.data.pageNum
						this.page.size = res.data.pageSize
						this.page.total = res.data.total
						this.$set(this,'views', res.data.list)
					}
				})
			},
			add() {	// 添加视图，显示添加视图的对话框
				// this.$http.post('/dataset/view/add',{ dataSetId: this.pkg.id, }) 
				if(! this.dialog.options || this.dialog.options.length === 0){ // 加载数据源
					this.$http.get('/db/page',{ params: { page: 1, size: 1000 }}).then(res => {
						if(res.code === 20000){
							let array = res.data.list
							for(let i in array){
								array[i].children = []
							}
							this.$set(this.dialog, 'options', array)
							this.dialog.visible = true
							this.dialog.createVo.dataSetId = this.pkg.id
						}
					})
				}else{
					this.dialog.visible = true
				}
			},
			confirm() {	// 添加视图，向后台发送数据
				this.dialog.visible = false
				this.$http.post('/dataset/view/add',MyUtils.flatten(this.dialog.createVo)).then(res => {
					if(res.code === 20000){
						this.$message({	type: 'success', message: res.message })
						res.data.forEach(item => this.view.push(item) )
					}
				})
			},
			handleItemChange(id) {
				this.$http.get('/db/tables?id='+id).then(res => {
					if(res.code === 20000){
						let array = res.data
						for(let i in array){
							array[i].name = array[i].tableName
						}
						this.dialog.options.forEach(option => {
							if(option.id == id){
								this.$set(option, 'children', array)
							}
						})
					}
				})
			},
			show(view) { // 显示视图详细信息
				this.dialog2.visible = true
				this.dialog2.view = view
				this.dialog2.title = view.viewName
			}
		}
	}
</script>

<style scoped="scoped">
	.dome-wrapper{
		margin: 10px;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.tab{
		flex-grow: 1;
	}
	.tab1-title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.el-form-item{
		margin-bottom: 0;
	}
</style>
