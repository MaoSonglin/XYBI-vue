<template>
	<div class="container">
		<el-button type="primary" size="small" @click="add()">添加</el-button>
		<el-button type="danger" size="small" v-if="cur" @click="remove()">删除</el-button>
		<el-form label-position="right" label-width="100px" label-suffix=":" size="small">
			<serie v-for="(serie, index) in option.series" :key="index" @encodeChange="optionChange"
			 :serie="serie" :fields="control.fields" v-on:remove="remove(index)"></serie> 
		</el-form>
	</div>
</template>

<script>
	import serie from './item/serie'
	import MyUtils from '../../../utils/MyUtils.js'
	export default {
		name: 'databind',
		components:{ serie },
		props: {
			option: {
				type: Object,
				required: true
			}, 
			control: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				cur: null
			}
		},
		created() {
			if(! this.option.series ){
				this.option.series = []
			}
		},
		methods:{
			add() {
				this.option.series.push({ encode:{ x: [], y: [], value: [] } }) 
				this.optionChange()
			},
			remove(index) {
				this.option.series.splice(index,1)
				this.cur = null
				this.optionChange()
			},
			optionChange(){
				this.control.setting = JSON.stringify(this.option)
				this.$http.post('/element/update', MyUtils.flatten(this.control)).then(res => {
					console.log(res.message)
				})
			}
		}
	}
</script>

<style>
</style>
