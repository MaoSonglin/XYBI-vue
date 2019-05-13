<template>
	<div class="wrapper">
		<el-tabs type="border-card" @tab-click="getData">
			<el-tab-pane label="结构">
				<h3>数据表<mark>{{tableInfo.tableName}}</mark>详情</h3>
				<el-form label-position="right" :model="tableInfo" label-width="100px">
					<el-form-item label="表名称" >
						<el-input v-model="tableInfo.tableName" readonly="readonly"></el-input>
					</el-form-item>
					<el-form-item label="添加时间">
						<el-input v-model="tableInfo.addtime" readonly="readonly"></el-input>
					</el-form-item>
					<el-form-item label="说明">
						<el-input type="textarea" v-model="tableInfo.comment" readonly="readonly"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="数据">
				<h3>数据表<mark>{{tableInfo.tableName}}</mark>数据预览</h3>
				<el-table :data="tableData" max-height="300" style="width: 100%">
					<template v-if="tableData.length">
						<el-table-column v-for="(value,index) in tableData[0]" v-if="index !== 'rownum'"
						 :label="index" :prop="index" :key="index" :show-overflow-tooltip="true" min-width="50px">
						</el-table-column>
					</template>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'dataTableInfo',
		props: {
			tableInfo: {
				type: Object,
				default: {}
			},
		},
		components:{},
		data() {
			return {
				table: {},
				tableData: []
			}
		},
		created() {
			this.table = {...tableInfo}
		},
		methods:{
			getData(tab) { // 获取数据表中的数据
				if(tab.index == 1){
					this.$http.get("/db/table/data",{ params: { id: this.tableInfo.id }}).then(res => {
						if(res.code === 20000){
							this.tableData = res.data.filter(e => true)
							// this.$set(this,'tableData',res.data)
						}else{
							this.$message({
								type: 'info',
								message: res.message
							})
						}
					}).catch(res => { 
						this.$message({
							type: 'error',
							message: '服务器异常'
						})
					})
				}
			}
		},
		watch:{
			tableInfo: {
				handler(newVal, oldVal){
					
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.wrapper{
		padding: 10px;
	}
</style>
