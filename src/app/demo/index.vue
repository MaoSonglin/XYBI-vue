<!-- 数据包主页 -->
<template>
	<div class="wrapper">
		<div class="top">
			<h3>数据包</h3>
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="add">新建</el-button>
				</el-form-item>
				<el-form-item>
					<el-input v-model="key" placeholder="搜索" @change="select">
						<template  slot="prepend"></template >
						<template  slot="append" class="el-icon-search"></template >
					</el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="content">
			<el-row :gutter="10">
				<!-- <el-col :xl="2" :xs="12" :sm="8" :md="6" :lg="4">
					<div class="pkg-demo">
						<img src="/static/images/add-wp-001.jpg" alt="图片" width="80%">
					</div>
				</el-col> -->
				<el-col v-for="(pkg,i) in list"  :xl="2" :xs="12" :sm="8" :md="6" :lg="4">
					<div class="pkg-demo" :key="i">
						<div class="tool-bar">
							<i class="el-icon el-icon-edit" title="重命名" @click="rename(pkg)"></i>
							<i class="el-icon el-icon-delete" title="删除" @click="drop(pkg)"></i>
						</div>
						<img src="/static/images/folder001.png" alt="图片" width="80%" @click="entryPkg(pkg)">
						<div class="pkg-bar">
							<span v-html="pkg.dataSetName"></span>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'data-demo',
		components:{}, 
		data() {
			return {
				page: { page: 1, size: 1000},
				list: []
			}
		},
		created() {
			this.select()
		},
		methods:{
			select(val,oldval) { // 搜索
				this.$http.post('/dataset/page',{...this.page}).then(res => {
					this.$set(this, 'list', res.data.list)
				})
			},
			add() { // 新建数据包
				this.$prompt('请输入数据包名称','新建数据包',{
					confiremButtonText: '确定',
					cancelButtonText: '取消'
				}).then(({value})=> { 
					this.$http.post("/dataset/add",{ dataSetName: value, accountId: this.$store.getters.account}).then(res => {
						if(res.code === 20000){
							list.push(res.data)
						}
						this.$message({
							type: res.code === 20000 ? 'info':'error',
							message: res.message
						})
					})
				})
			},
			rename(pkg) {// 重命名
				this.$prompt('请输入数据包名称','重命名',{
					confiremButtonText: '确定',
					cancelButtonText: '取消'
				}).then(({value}) => {
					this.$http.post("/dataset/update", {...pkg, dataSetName: value}).then(res => {
						this.$message({
							type: res.code === 20000 ? 'info' : 'error',
							message: res.message
						})
						if(res.code === 20000){
							pkg.dataSetName = value
						}
					}).catch(error => {
						this.$message({
							type: 'error',
							message: '网络异常'
						})
					})
				})
			},
			drop(pkg) {
				this.$confirm('您确定要删除数据包"'+pkg.dataSetName+'"吗？','删除').then(res => {
					this.$http.post("/dataset/delete",pkg).then(res => {
						this.$message({
							type: res.code === 20000 ? 'info' : 'error',
							message: res.message
						})
						if(res.code === 20000){
							this.list.splice(pkg,1)
						}
					}).catch(error => {
						this.$message({
							type: 'error',
							message: '网络异常'
						})
					})
				})
			},
			entryPkg(pkg) { // 进入数据包
				this.$router.push({
					path: '/demo/view',
					query: pkg
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.wrapper{
		margin: 10px;
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.pkg-demo{
		margin: 10px 0;
		text-align: center;
	}
	.tool-bar{
		visibility: hidden;
		text-align: right;
	}
	.pkg-demo:hover{
		transform: scale(1.2,1.2);
		cursor: pointer;
	}
	.pkg-demo:hover .tool-bar{
		visibility: visible;
	}
	.tool-bar .el-icon:hover{
		cursor: pointer;
		color: #3888FA;
	}
	.pkg-bar{
		text-align: center;
		font-size: 16px;
	}
	.el-form-item{
		margin-bottom: 0;
	}
</style>
