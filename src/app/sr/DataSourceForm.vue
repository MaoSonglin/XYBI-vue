<template>
	<el-form :model="ds" label-width="100px" label-position="right" class="form">
		<el-form-item label="数据源名称">
			<el-input v-model="ds.name"></el-input>
		</el-form-item>
		<el-form-item label="数据源类型">
			<el-input v-model="ds.databaseType" readonly="readonly"></el-input>
		</el-form-item>
		<el-form-item label="URL" v-if="jdbc">
			<el-input v-model="ds.url"></el-input>
		</el-form-item>
		<el-form-item label="用户名" v-if="jdbc">
			<el-input v-model="ds.uname"></el-input>
		</el-form-item>
		<el-form-item label="密码" v-if="jdbc">
			<el-input type="password" v-model="ds.upwd"></el-input>
		</el-form-item>
		<el-form-item label="驱动文件" v-if="jdbc()">
			<el-input v-model="driver.name" readonly="readonly"></el-input>
		</el-form-item>
		<el-form-item label="数据文件" v-if="doc()">
			<el-input v-model="file.name" readonly="readonly"></el-input>
		</el-form-item>
		<el-form-item label="备注">
			<el-input type="textarea" v-model="ds.comment"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button v-if="showBtn" type="primary" @click="update">提交修改</el-button>
			<el-button v-if="showBtn" @click="cancel">取消</el-button>
			<el-button v-if="!showBtn" type="danger" @click="() => {$emit('delete',ds)}">删除数据源</el-button>
			<el-button v-if="!this.ds.read" type="warning" @click="() => {$emit('readStructure',ds)}">读取表结构</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import MyUtils from '@/utils/MyUtils.js'
	export default {
		name: 'DataSourceForm',
		props: {
			ds: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				"driver": {},
				"file": {},
				showBtn: false,
				needWatch: false,
				data: {}
			}
		},
		created() {
			this.data = {...this.ds}  
		},
		methods: {
			jdbc() { // 是否是jdbc数据库
				let ds = this.ds
				if(ds.databaseType === 'MySQL' || ds.databaseType === 'Oracle' || ds.databaseType === 'SQL Server' || ds.databaseType === 'SQLite'){
					return true
				}
				return false
			},
			doc() {// 文本型数据源
				let ds = this.ds
				if(ds.databaseType === 'SQLite' || ds.databaseType === 'Excel' || ds.databaseType === 'Text' || ds.databaseType === 'Csv'){
					return true
				}
				return false
			},
			update() {
				this.$emit("update",{ data: this.ds, fail: ()=> {MyUtils.copy(this.data,this.ds)}, success: () => {this.data = {...this.ds}}})
				this.showBtn = false
			},
			cancel() {  
				MyUtils.copy(this.data,this.ds)
				this.showBtn = false
			}
		},
		watch:{
			ds: {
				handler(newVal, oldVal){
					debugger
					this.showBtn = /* this.needWatch && */JSON.stringify(newVal) != JSON.stringify(this.data)
				},
				deep: true
			}
		}
	}
</script>

<style scoped="scoped">
	.form{
		padding: 10px;
	}
</style>
