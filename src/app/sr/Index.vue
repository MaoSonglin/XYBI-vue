<template>
	<div class="container">
		<split-pane slot="" split="vertical">
			<template slot="paneL">
				<div class="left-container">
					<div class="head">
						<h3>数据源列表</h3>
						<el-dropdown @command="showAddDataSourceDialog">
							<el-button>新建</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="jdbc">JDBC</el-dropdown-item>
								<el-dropdown-item command="Excel">Excel</el-dropdown-item>
								<el-dropdown-item command="SQL">SQL</el-dropdown-item>
								<el-dropdown-item command="CSV">CSV</el-dropdown-item>
								<el-dropdown-item command="Text">Text</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						
					</div>
					<el-tree :props="leftpaneldata.props" lazy accordion :load="loadNode" @node-click="showNodeData" >
						<!-- 自定义的节点模板 -->
					<!-- 	<span class="custom-tree-node" slot-scope="{ node, data }">
							<span>{{ node.label }}</span>
							<span>
							  <el-button
								type="text"
								size="mini"
								@click="() => append(data)">
								Append
							  </el-button>
							  <el-button
								type="text"
								size="mini"
								@click="() => remove(node, data)">
								Delete
							  </el-button>
							</span>
						</span> -->
					</el-tree>
					<pagination
						:total="leftpaneldata.pageInfo.total"
						:page.sync="leftpaneldata.page.page"
						:limit.sync="leftpaneldata.page.size" 
						@pagination="getList" />
				</div>
			</template>
			<template slot="paneR">
				<div class="right-container">
					<DataSourceForm v-if="rightpaneldata.level === 1" :ds="rightpaneldata.data" v-on:update="updateDataSouce" v-on:delete="deleteDataSource" v-on:readStructure="readStructure"></DataSourceForm>
					<TableInfoForm v-if="rightpaneldata.level === 2" :tableInfo="rightpaneldata.data"></TableInfoForm>
					<TableFieldInfo v-if="rightpaneldata.level === 3" :tableFieldInfo="rightpaneldata.data"></TableFieldInfo>
				</div>
			</template>
		</split-pane>
		<el-dialog :title="dialog.title" :visible="dialog.visible" width="60%" :before-close="handleClose">
			<JdbcForm :ds="dialog.data" ></JdbcForm>
			<span slot="footer" class="dialog-footer">
				<el-button @click="() => { dialog.visible = false}">取消</el-button>
				<el-button @click="confirm">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import splitPane from 'vue-splitpane'
import Pagination from '@/components/Pagination'
import DataSourceForm from './DataSourceForm.vue'
import TableInfoForm from './TableInfoForm.vue'
import TableFieldInfo from './TableFieldInfo.vue'
import JdbcForm from './JdbcFrom.vue'

export default {
    name: 'datasource',
    components: {splitPane, Pagination, DataSourceForm, TableInfoForm, TableFieldInfo, JdbcForm},
    data() {
        return {
			leftpaneldata: {
				page: {
				    page: 1,
				    size: 10,
					total: 0
				},
				pageInfo: { total: 0},
				props: {
					label: 'name',
					children: 'children',
					isLeaf: 'isLeaf'
				}
			}
            ,
			rightpaneldata: {
				level: -1,
				data: {}
			},
			dialog: {
				title: '添加数据源',
				visible: false,
				data: {}
			}
        }
    },
    created() {
        this.getList()
    },
	methods:{
		getList() {
			this.$http.post("/db/page",this.page).then(res=>{
			    this.leftpaneldata.pageInfo = res.data
			    this.leftpaneldata.pageInfo.data = res.data.list.map((item, index, arry) => {
			        return {
			            ...item,
			            label: item.name
			        }
			    })
			})
		},
		loadNode(node, resolve) {	// tree的加载事件
			if(node.level === 0){	// 加载数据源列表
				this.$http.post("/db/page",this.page).then(res => {
				    this.leftpaneldata.pageInfo = res.data
				    resolve(this.leftpaneldata.pageInfo.list)
				})
			}
			else if(node.level === 1){// 加载数据表
				this.$http.get("/db/tables",{ params: { id: node.data.id } }).then(res => {
					if(res.code === 20000){
						let data = res.data.map((item,index,array) => {
							return { ...item, name: item.tableName, isLeaf: false}
						})
						resolve(data)
					}else{
						resolve([])
					}
				})
			}
			else if(node.level === 2){ // 加载数据字段
				this.$http.get("/db/table/columns",{ params: { id: node.data.id }}).then(res => {
					if(res.code === 20000){
						resolve(res.data.map((item, index, array) => {
							return {name: item.fieldName, ...item, isLeaf: true}
						}))
					}else{
						resolve([])
						this.$message({
							type: 'error',
							message: res.message
						})
					}
				})
			}
		},
		showNodeData(data, node, element) { // 树节点的点击事件，显示节点详细信息
			this.rightpaneldata.level = node.level
			this.$set(this.rightpaneldata,'data',data)
		},
		updateDataSouce(pkg) {	// 更新数据源
			this.$http.post("/db/update",pkg.data).then(res => {
				this.$message({
					type: 'info',
					message: res.message
				})
				if(res.code === 20000){
					pkg.success()
				}else{
					pkg.fail()
				}
			}).catch(res => {
				pkg.fail()
			})
		},
		deleteDataSource(datasource) { // 删除数据源
			this.$confirm('您确定要删除该数据源吗？', '删除确认', {
				type: 'warning', 
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(() => {
				this.$http.delete("/db/delete",{params: {id: datasource.id}}).then(res=>{
					this.$message({
						message: res.message,
						type: 'info'
					})
					// TODO 删除节点
				}).catch(error => {
					
				})
				
			})
		},
		showAddDataSourceDialog(event){	//新建数据源
			this.dialog.title = '添加'+event+'数据源';
			this.dialog.visible = true
		},
		handleClose(done) { // 模态框关闭时间
			this.$confirm('确认关闭？')
			  .then(_ => {
				done();
				this.dialog.visible = false
			  }).catch(_ => {});
		},
		confirm() {			// 保存表单
			if(this.dialog.data.validate && this.dialog.data.validate()){
				this.$confirm('确定要提交吗？','保存').then(_ => {
					this.$http.post('/db/config',this.dialog.data).then(res => {
						if(res.code === 2000){
							this.$confirm("数据源添加完成，是否立即读取数据源结构？",'读取结构').then(_ => {
								this.readStructure(res.data)
							})
						}
						else{
							this.$message({ type: 'error', message: res.message, title: '添加数据源'})
						}
					})
				})
			}
		},
		readStructure(data) { // 读取数据源结构
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.5)'
			});
			this.$http.post("/db/read",data).then(res => {
				this.$message({
					type: res.code === 2000 ? 'success':'error',
					message: res.message
				})
				if(res.code === 20000){
					data.read = true
				}
				loading.close()
			}).catch(_ => loading.close())
		}
	}
}
</script>
<style scoped>
	.container{
		height: 80vh;
		margin: 5px;
	}
    .left-container { 
		height: 100%;
		overflow: auto;
    }
    .right-container{ 
		height: 100%;
		overflow: auto;
    }
	.head {
		display: flex;
		justify-content: space-between;
		align-items:baseline;
	}
</style>
