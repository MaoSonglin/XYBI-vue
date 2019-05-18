<template>
	<el-row class="this-row">
		<el-col :md="7">
			<el-form-item label="类型">
				<el-select v-model="serie.type" >
					<el-option value="line" label="折线图"></el-option>
					<el-option value="bar" label="条形图"></el-option>
					<el-option value="pie" label="饼状图"></el-option>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :md="7" v-if="serie.type !== 'pie'">
			<el-form-item label="X轴数据">
				<el-select v-model="serie.encode.x" multiple @change="change" @remove-tag="removeField">
					<el-option-group v-for="table in tables" :key="table.id"
						:label="table.viewZhChName ? table.viewZhChName:table.name"
						:value="table.id">
						<el-option v-for="(item,index) in table.fields"
						 :key="index" :label="item.fieldName ? item.fieldName:item.fieldZhChName" :value="item.id"></el-option>
					</el-option-group>
				</el-select>
			</el-form-item>
		</el-col>
		<el-col :md="7" v-if="serie.type !== 'pie'">
			<el-form-item label="Y轴数据" >
				<el-select v-model="serie.encode.y" multiple @change="change" @remove-tag="removeField">
					<el-option-group v-for="table in tables" :key="table.id"
						:label="table.viewZhChName ? table.viewZhChName:table.name"
						:value="table.id">
						<el-option v-for="(item,index) in table.fields"
						 :key="index" :label="item.fieldName ? item.fieldName:item.fieldZhChName" :value="item.id"></el-option>
					</el-option-group>
				</el-select>
			</el-form-item>
		</el-col>
		<template v-if="serie.type === 'pie'">
			<el-col :md="7" >
				<el-form-item label="数据" >
					<el-select v-model="serie.encode.value" multiple @change="change" @remove-tag="removeField">
						<el-option-group v-for="table in tables" :key="table.id"
							:label="table.viewZhChName ? table.viewZhChName:table.name"
							:value="table.id">
							<el-option v-for="(item,index) in table.fields"
							 :key="index" :label="item.fieldName ? item.fieldName:item.fieldZhChName" :value="item.id"></el-option>
						</el-option-group>
					</el-select>
				</el-form-item>
			</el-col>
			<!-- <el-col :md="7">
				<el-form-item label="内径">
					<el-slider max="100" min="0" v-model="serie.radius[0]" ></el-slider>
				</el-form-item>
			</el-col>
			<el-col :md="7">
				<el-form-item label="外径">
					<el-slider max="100" min="0" v-model="serie.radius[1]"></el-slider>
				</el-form-item>
			</el-col> -->
		</template>
		<el-col :md="3">
			<el-button size="mini" type="danger" @click="() => $emit('remove')">删除</el-button>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'serie',
		components:{ },
		props: {
			serie: {
				type: Object,
				default() {
					return {
						type: 'line',
						name: null,
						xAxisIndex: 0,
						yAxisIndex: 0,
						polarIndex: 0,
						encode: {
							x: [],
							y: [],
							value: []
						}
					}
				}
			},
			tables: {
				type: Array,
				default() {
					return [{ id: 1, name: '嘻嘻嘻'},{ id: 2, name: '哈哈哈'},{ id: 3, name: '嘿嘿嘿'}]
				}
			}
		},
		data() {
			return {
				data: {}
			}
		},
		created() { 
		},
		methods:{
			change(val) {
				for(let i in val){
					this.$emit('addField', val[i])
				}
			},
			removeField(id) {
				this.$emit('removeField',id)
			}
		},
		watch:{
			'serie.encode': {
				handler(val, oldVal){
					console.log(val,oldVal)
				},
				deep: true
			}
		}
	}
</script>

<style scoped="scoped">
	.this-row{
		padding: 5px;
	}
	.this-row:hover{
		background-color: rgba(156,189,209,0.2);
	}
	.el-form-item {
		margin-bottom: 0;
	}
</style>
