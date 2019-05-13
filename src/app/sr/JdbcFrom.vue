<!-- 添加jdbc数据源的表单 -->
<template>
	<div>
		<el-form label-position="right" label-suffix=":" label-width="100px" :model="ds" size="mini" style="with:70%">
			<el-form-item label="数据源名称">
				<el-input v-model="ds.name"></el-input>
			</el-form-item>
			<el-form-item label="数据源类型">
				<el-select v-model="ds.databaseType" clearable placeholder="请选择数据源类型" @change="select">
					<el-option
					  v-for="(item,index) in databaseTypes"
					  :key="index"
					  :label="item.name"
					  :value="item.name">
					</el-option>
				</el-select> 
			</el-form-item>
			<el-form-item label="URL" v-show="ds.databaseType != 'SQLite'">
				<el-input v-model="ds.url"></el-input>
			</el-form-item>
			<el-form-item label="用户名" >
				<el-input v-model="ds.uname"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" v-model="ds.upwd"></el-input>
			</el-form-item>
			<el-form-item label="驱动文件">
				<el-input v-model="driver.fileName" readonly="readonly">
					<el-upload slot="append" class="upload-demo" :show-file-list="false"
					 :action="uploadUrl" :on-success="driverUploadFinish" :with-credentials="true"
					 name="file"><el-button type="primary">点击上传</el-button></el-upload>
				</el-input>
			</el-form-item>
			<el-form-item label="数据文件" v-if="doc()">
				<el-input v-model="file.fileName" readonly="readonly">
					<el-upload slot="append" class="upload-demo" :show-file-list="false"
					 :action="uploadUrl" :on-success="fileUploadFinish" :with-credentials="true"
					 name="file"><el-button type="primary">点击上传</el-button></el-upload>
				</el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input type="textarea" v-model="ds.comment"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'jdbcfrom',
		props:{
			ds: {
				type: Object,
				default: {}
			},
			uploadUrl: {
				type: String,
				default: process.env.VUE_APP_BASE_API + "/file/upload"
			}
		},
		components:{},
		data() {
			return {
				datasource: {},
				driver: {},
				file: {},
				databaseTypes: [
					{
						'name': 'MySQL',
						'driverClassName': 'com.mysql.jdbc.Driver',
						'url': 'jdbc:mysql://192.168.0.1:3306/mysql',
						'username': 'root',
						'password': 'root'
					},
					{
						'name': 'SQL Server',
						'driverClassName': 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
						'url': 'jdbc:sqlserver://192.168.0.1:1433;databaseName=db',
						'username': 'sa',
						'password': 'sa'
					},
					{
						'name': 'Oracle',
						'driverClassName': 'oracle.jdbc.OracleDriver',
						'url': 'jdbc:oracle:thin:@localhost:1521:orcl',
						'username': 'scott',
						'password': 'scott'
					},
					{
						'name': 'SQLite',
						'driverClassName': 'org.sqlite.JDBC',
						'url': 'jdbc:sqlite:${contextPath}',
						'username': '',
						'password': ''
					},
				]
			}
		},
		created() {
			this.ds.validate = () => true
		},
		methods:{
			jdbc() { // 是否是jdbc数据库
				let ds = this.ds
				if(ds.databaseType === 'MySQL' || ds.databaseType === 'Oracle' || ds.databaseType === 'SQL Server'){
					return true
				}
				return false
			},
			doc() {// 文本型数据源
				let ds = this.ds
				if(ds.databaseType === 'SQLite' || ds.databaseType === 'Access'){
					return true
				}
				return false
			},
			select(value) {
				let d = this.databaseTypes.find(function(v){
					return value === v.name
				})
				this.ds.url = d.url
				this.ds.uname = d.username
				this.ds.upwd = d.password
				this.ds.driverClassName = d.driverClassName
			},
			fileUploadFinish(res, file, fileList) {
				this.$message({
					type: 'info',
					message: res.message
				})
				this.file = res.data
				this.ds.databaseFileId = res.data.id
			},
			driverUploadFinish(res, file, fileList){
				this.$message({
					type: 'info',
					message: res.message
				})
				this.driver = res.data
				if(res.code === 20000){
					this.ds.driverFileId = res.data.id
				}
			}
		}
	}
</script>

<style>
</style>
