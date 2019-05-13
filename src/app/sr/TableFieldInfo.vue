<template>
	<div class="form">
		<h3>数据字段<mark>{{tableFieldInfo.fieldName}}</mark></h3>
		<el-form :model="tableFieldInfo" label-position="right" label-suffix=":" label-width="100px" class="">
			<el-form-item label="字段名称">
				<el-input v-model="tableFieldInfo.fieldName" readonly="readonly"></el-input>
			</el-form-item>
			<el-form-item label="中文名称">
				<el-input v-model="tableFieldInfo.fieldZhChName" readonly="readonly"></el-input>
			</el-form-item>
			<el-form-item label="数据类型">
				<el-input v-model="tableFieldInfo.jdbcType" readonly="readonly"></el-input>
			</el-form-item>
			<el-form-item label="字段长度">
				<el-input v-model="tableFieldInfo.length" readonly="readonly"></el-input>
			</el-form-item>
			<el-form-item label="主键">
				<el-checkbox v-model="tableFieldInfo.primaryKey" readonly="readonly"></el-checkbox>
			</el-form-item>
			<el-form-item label="外键">
				<el-checkbox v-model="tableFieldInfo.foreignKey" readonly="readonly"></el-checkbox>
			</el-form-item>
			<el-form-item label="字段描述">
				<el-input type="textarea" v-model="tableFieldInfo.comment" readonly="readonly"></el-input>
			</el-form-item>
			<el-form-item label="添加时间">
				<el-input type="text" v-model="tableFieldInfo.addTime" readonly="readonly"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'TableInfoForm',
		components:{},
		props: {
			tableFieldInfo: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				field: {}
			}
		},
		created() {
			this.field = {...this.tableFieldInfo}
		},
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	.form {
		padding: 10px;
	}
</style>
