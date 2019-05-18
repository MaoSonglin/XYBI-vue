<template>
	<div class="container">
		<el-form label-position="right" label-width="100px" label-suffix=":" size="small">
			<serie v-for="(serie, index) in series" :key="index" :serie="serie"
				:tables="tables" v-on:remove="remove(index)" v-on:addField="addField($event)"
				 v-on:removeField="removeField($event)"></serie>
			<el-form-item>
				<el-button @click="add()">添加</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import serie from './item/serie'
	export default {
		name: 'databind',
		components:{ serie },
		props: {
			series: {
				type: Array,
				default() {
					return []
				}
			},
			tables: {
				type: Array,
				required: true
			},
			control: {
				type: Object,
				default:() => {}
			}
		},
		created() {
			
		},
		methods:{
			add() {
				this.series.push({ encode:{ x: [], y: [], value: [] } })
				this.$emit('serieChange')
			},
			remove(index) {
				let serie = this.series[index]
				this.series.splice(index,1)
				this.$emit('serieChange')
				let x = serie.encode.x
				for(let i in x){
					
				}
			},
			addField(id) {
				this.$http.post('/element/add/data',{ elementId: this.control.id, viewFieldId: id}).then(res => {
					console.log(res.message)
					if(res.code === 20000){
						this.$emit('serieChange')
					}
				})
			},
			removeField(id) {
				this.$http.post('/element/remove/field',{ elementId: this.control.id, viewFieldId: id}).then(res => {
					console.log(res.message)
					if(res.code === 20000){
						this.$emit('serieChange')
					}
				})
			}
		}
	}
</script>

<style>
</style>
