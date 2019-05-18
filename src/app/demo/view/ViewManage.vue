<template>
	<div>
		<el-tabs @tab-click="tabClick">
			<el-tab-pane label="视图属性">
				<el-form :model="viewInfo" :inline="true" label-suffix=":" size="mini">
					<el-form-item label="名称">
						<el-input v-model="viewInfo.viewName"></el-input>
					</el-form-item>
					<el-form-item label="中文名">
						<el-input v-model="viewInfo.viewZhChName"></el-input>
					</el-form-item>
					<el-button type="infor" size="mini">编辑字段</el-button>
				</el-form>
				
				<el-table :data="fields" height="200px" border row-key="id" :load="load" :lazy="true" size="mini" @cell-dblclick="modify" >
					<el-table-column prop="fieldName" label="字段名" fixed="left" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="fieldZhChName" label="中文名" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="dataType" label="数据类型"></el-table-column>
					<el-table-column prop="comment" label="说明"></el-table-column>
					<el-table-column label="关联"></el-table-column>
				</el-table>
				
				
				
				<el-form :model="viewInfo" label-suffix=":" size="mini">
					<el-form-item label="说明">
						<el-input v-model="viewInfo.comment" type="textarea"></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			
			<!-- add field from data table into view -->
			<el-tab-pane label="设计结构">
				<span class="documentation-container">选择数据表</span>
				<tableSelector :tableId="tab2.tableId" :dbId="tab2.dbId" v-on:select-table="changeTable"></tableSelector>
				<br />
				<el-transfer 
					filterable
					:filter-method="tab2.transfer.filterMethod"
					filter-placeholder="字段名称"
					v-model="tab2.transfer.value"
					:data="tab2.transfer.data"
					:props="tab2.transfer.props"
					@change="transferChange"
					:titles="['原始字段','视图字段']" :style="{'margin-top':'5px'}"
				></el-transfer>
				
			</el-tab-pane>
			<!-- end of add field -->
			
			<!-- create new field  -->
			<el-tab-pane label="新建字段">
				
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import tableSelector from './TableSelector.vue'
	export default {
		name: 'view-manage',
		components:{ tableSelector },
		props: {
			viewInfo: {
				type: Object,
				default: null
			},
			'view-id': {
				type: String,
				default: null
			}
		},
		data() {
			return {
				'fields': [],
				tab2: { // 标签页二中的内容
					tableId: null,
					dbId: null,
					transfer: {
						value: [],
						data: [{ 'id':'1', fieldName:'你好'}],
						props: {
							key: 'id',
							label: 'fieldName'
						},
						filterMethod(){ return true}
					}
				}
			}
		},
		created() {
			this.getFields()
			
		},
		methods: {
			getFields() {
				this.$http.get('/dataset/view/field/listByView/'+this.viewInfo.id).then(res => {
					if(res.code === 20000){
						this.$set(this, 'fields', res.data)
					}
				})
			},
			load(tree, treeNode, resolve) {
				
			},
			tabClick(tab) { 			// 标签页的点击事件，不同的标签页加载不同的数据
				if(tab.index == 0){		// 第一页，加载视图中的字段
					this.getFields()
				}
				if(tab.index == 1 ){	// 第二页，加载视图相关的其他数据
					this.$http.get('/dataset/view/info/'+this.viewInfo.id).then(res => {
						if(res.code === 20000){
							this.viewModel = res.data
						}
					})
				}
			},
			changeTable(table) {  // 级联选择了一个数据表，在此获取数据表中的字段
				this.$http.get('/db/table/columns?id='+table.id).then(res => {
					if(res.code === 20000){
						if(this.viewModel && this.viewModel.relatedFields){ 
							// 该视图可能已经添加了数据表table中的某些字段，在这里需要过滤掉，不能二次添加
							res.data = res.data.filter(d => {
								return ! this.viewModel.relatedFields.some(x => x.id === d.id)
							})
						}
						this.$set(this.tab2.transfer, 'data', res.data)
					}else{
						this.$message({ type: 'error', message: res.message })
					}
				})
			},
			transferChange(value, op, keys) {
				if(op === 'right'){// 从左边移动到了右边 
					this.$http.post('/dataset/table/add/fields',{ view: this.viewInfo.id, fields: this.tab2.transfer.value }).then(res => {
						if(res.code === 20000) {
							this.$message({ type: 'success', message: res.message })
						}
					})
				}
			},
			modify(row, column, cell, event) {	// 标签页1中的表格双击事件，修改单元格的内容
				debugger
				let value = row[column.property]
				this.$prompt('修改','修改',{
					inputValue: value,
				}).then( ({value} ) => {
					let tmp = { ...row }
					tmp[column.property] = value
					this.$http.post('/dataset/view/field/update', MyUtils.flatten(tmp)).then(res => {
						if(res.code === 20000){
							this.$message({ type: 'success', message: res.message })
							row = tmp
						}else{
							this.$message({ type: 'error', message: res.message})
						}
					})
				})
			}
		}
	}
</script>

<style>
</style>
