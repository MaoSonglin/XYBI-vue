<template>
	<div class="wrapper">
		<div>
			<el-button @click="add">新建报表</el-button>
		</div>
		<el-table :data="list" border>
			<el-table-column prop="id" label="ID"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column label="数据包" prop="pkgName" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="addTime" label="添加时间" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column prop="description" label="描述" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="() => { $router.push({ path: '/report/design', query: scope.row}) }">设计</el-button>
					<el-button type="text" size="small" @click="() => { dialog.visible = true; dialog.report = scope.row; dialog.title='编辑报表';}">编辑</el-button>
					<el-button type="text" size="small" @click="drop(scope.row)">删除</el-button> 
				</template>
			</el-table-column>
		</el-table>
		<pagination
			:total="pageInfo.total"
			:page.sync="pageInfo.page"
			:limit.sync="pageInfo.size" 
			@pagination="getList" />
			
			
		<!-- create new report -->
		<el-dialog :visible="dialog.visible" :title="dialog.title" :before-close="() => dialog.visible=false">
			<el-form ref="form1" :model="dialog.report" label-position="right" label-width="100px">
				<el-form-item label="报表名称">
					<el-input type="text" v-model="dialog.report.name"></el-input>
				</el-form-item>
				<el-form-item label="数据包">
					<el-select v-model="dialog.report.dataSetId">
						<el-option v-for="pkg in datasets" :key="pkg.id" :value="pkg.id" :label="pkg.dataSetName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述">
					<el-input type="textarea" v-model="dialog.report.description"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="() => dialog.visible=false" type="warning" size="small">取消</el-button>
				<el-button type="primary" size="small" @click="update">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '@/components/Pagination'
	
	export default {
		name: 'report',
		components:{Pagination },
		data() {
			return {
				pageInfo: { page: 1, size: 10, total: 0 },
				list: [],
				dialog: {
					title: '新建报表',
					visible: false,
					report: {}
				},
				datasets: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.$http.post('/report/list',{ page: this.pageInfo.page, size: this.pageInfo.size}).then(res => {
					if(res.code === 20000){
						this.$set(this, 'list', res.data.list)
						this.pageInfo.page = res.data.pageNum
						this.pageInfo.size = res.data.pageSize
						this.pageInfo.total = res.data.total
						this.getPkgs()
					}
				})
			},
			getPkgs() {
				// 获取数据包
				this.$http.get('/dataset/page', { params: { page: 1, size: 1000 } }).then(res => {
					this.$set(this,'datasets', res.data.list)
					for(let i in this.datasets){
						let a = this.datasets[i]
						for(let j in this.list){
							if(this.list[j].dataSetId == a.id){
								this.$set(this.list[j], 'pkgName', a.dataSetName)
							}
						}
					}
				})
			},
			add() { // 新建报表
				/* this.$prompt('请输入报表名称','新建报表').then(({ value }) => {
					if(!value){
						this.$message({ type: 'error', message: '报表名称不能为空'})
						return
					}
					this.$http.post('/report/add',{ name: value }).then(res => {
						if(res.code === 20000){
							this.list.unshift(res.data)
							this.pageInfo.total++
							this.$message({ type: 'success', message: res.message, title: '新建报表'})
						}
					})
				}) */
				this.dialog.visible = true
				this.dialog.title = '新建报表'
				this.dialog.report = {}
			},
			update() { // 编辑报表
				if(this.dialog.title === '编辑报表'){
					this.$http.post('/report/update', this.dialog.report).then( res => {
						if(res.code === 20000){
							this.$message({ type: 'success', message: res.message })
						}
						this.getList()
					})
				}
				else if(this.dialog.title === '新建报表'){
					this.$http.post('/report/add',this.dialog.report).then(res => {
						if(res.code === 20000){
							this.list.unshift(res.data)
							this.pageInfo.total++
							this.$message({ type: 'success', message: res.message, title: '新建报表'})
						}
					})
				}
				this.dialog.visible = false
			},
			drop(report) {
				this.$confirm('您确定要删除此报表吗？', '删除').then(_ => {
					this.$http.get('/report/delete',{params: report}).then(res => {
						if(res.code === 20000){
							this.$message({ type: 'success', message: res.message })
							this.getList()
						}
					})
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.wrapper{
		margin: 10px;
	}
</style>
