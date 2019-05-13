<template>
	<el-cascader
		placeholder="搜索"
		:options="options"
		:props="props"
		filterable
		@active-item-change="handleItemChange"
		@change="selectTable"
		:show-all-levels="false"
		v-model="selects"
	></el-cascader>
</template>

<script>
	export default {
		name: 'table-selector',
		props:{
			tableId: {
				type: String,
				default: ""
			},
			dbId: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				options: [],
				props: {
					value: 'id',
					label: 'name',
					children: 'children'
				},
				selects: []
			}
		},
		created() {
			this.getDatabase()
			if(this.dbId)
			this.selects.push(this.dbId)
			if(this.tableId)
			this.selects.push(this.tableId)
		},
		methods:{
			getDatabase() { 
				if(! this.options || this.options.length === 0){ // 加载数据源
					this.$http.get('/db/page',{ params: { page: 1, size: 1000 }}).then(res => {
						if(res.code === 20000){
							let array = res.data.list
							for(let i in array){
								array[i].children = []
							}
							this.$set(this, 'options', array) 
						}
					})
				}
			},
			handleItemChange(id) {
				this.$http.get('/db/tables?id='+id).then(res => {
					if(res.code === 20000){
						let array = res.data
						for(let i in array){
							array[i].name = array[i].tableName
						}
						this.options.forEach(option => {
							if(option.id == id){
								this.$set(option, 'children', array)
							}
						})
					}
				})
			},
			selectTable(id) {
				if(id.length === 2){
					let tableId = id[1]
					this.options.forEach(option => {
						if(option.children && option.children.length){
							option.children.forEach(table => {
								if(table.id === tableId)
									this.$emit('select-table',table)
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
</style>
