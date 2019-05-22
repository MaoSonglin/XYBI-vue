<template>
		
	<el-form label-position="right" label-suffix=":" label-width="100px" :model="data" size="mini" style="with:70%">
		<el-form-item label="数据源名称">
			<el-input v-model="data.name"></el-input>
		</el-form-item>
		<el-form-item label="数据文件" >
			<el-input v-model="file.fileName" readonly="readonly">
				<el-upload slot="append" class="upload-demo" :show-file-list="false"
				 :action="uploadUrl" :on-success="fileUploadFinish" :with-credentials="true"
				 name="file"><el-button type="primary">点击上传</el-button></el-upload>
			</el-input>
		</el-form-item>
		<el-form-item label="备注">
			<el-input type="textarea" v-model="data.comment"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'textfilesource',
		props: {
			data: {
				type: Object,
				default() {
					return {}
				}
			},
			uploadUrl: {
				type: String,
				default: process.env.VUE_APP_BASE_API + "/file/upload"
			},
			file: {
				type: Object,
				default() { return {} }
			}
		},
		created() {
			this.data.validate = () => true
		},
		methods: {
			fileUploadFinish(res, file, fileList) {
				this.$message({
					type: res.code === 20000 ? 'success':'error',
					message: res.message
				})
				this.file = res.data
				this.data.databaseFileId = res.data.id
				this.data.name = ''
			} 
		},
	}
</script>

<style>
</style>
