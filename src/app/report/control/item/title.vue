<template>
	<el-row :gutter="10" >
		<el-col :md="8">
			<el-form-item label="标题">
				<el-input v-model="title.text" placeholder="title"></el-input>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="子标题">
				<el-input v-model="title.subText" placeholder="subtitle"></el-input>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="显示">
				<el-switch
				  v-model="title.show"
				  active-color="#13ce66"
				  inactive-color="#ff4949">
				</el-switch>
			</el-form-item>
		</el-col>
		
		<el-col :md="8">
			<el-form-item label="水平位置">
				<el-select v-model="title.left">
					<el-option value="auto" label="auto"></el-option>
					<el-option value="left" label="左对齐"></el-option>
					<el-option value="right" label="右对齐"></el-option>
					<el-option value="center" label="居中"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="垂直位置">
				<el-select v-model="title.top" placeholder="水平方向">
					<el-option value="auto" label="auto"></el-option>
					<el-option value="top" label="上"></el-option>
					<el-option value="middle" label="中"></el-option>
					<el-option value="bottom" label="底"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :md="8">
			<el-form-item label="标题颜色">
				<el-color-picker v-model="title.textStyle.color"></el-color-picker>
			</el-form-item>
		</el-col>
	</el-row>
</template>

<script>
	let x = {
		show: true,
		text: '',
		link: '',
		target: 'blank',
		subText: '',
		sublink: '',
		textAlign: 'auto',
		textVerticalAlign: 'auto',
		left: 'auto',
		top: 'auto',
		right: 'auto',
		botton: 'auto',
		textStyle: {
			color: '#333'
		}
	}
	export default {
		title: 'x-title',
		components:{},
		props: {
			title: {
				type: Object,
				default() { return x}
			},
		},
		created() {
			if(!this.title) this.title = x
			if(this.title && !this.title.textStyle){
				this.title.textStyle = { color: '#333'}
			} 
		},
		data() {
			return {
				data: {}
			}
		},
	}
</script>

<style>
</style>
