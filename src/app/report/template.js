export default {
	line: {
			title: {
			text: '折线图堆叠'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['周一','周二','周三','周四','周五','周六','周日']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name:'邮件营销',
				type:'line',
				stack: '总量',
				data:[120, 132, 101, 134, 90, 230, 210],
				encode: {}
			},
			{
				name:'联盟广告',
				type:'line',
				stack: '总量',
				data:[220, 182, 191, 234, 290, 330, 310],
				encode: {}
			},
			{
				name:'视频广告',
				type:'line',
				stack: '总量',
				data:[150, 232, 201, 154, 190, 330, 410],
				encode: {}
			},
			{
				name:'直接访问',
				type:'line',
				stack: '总量',
				data:[320, 332, 301, 334, 390, 330, 320],
				encode: {}
			},
			{
				name:'搜索引擎',
				type:'line',
				stack: '总量',
				data:[820, 932, 901, 934, 1290, 1330, 1320],
				encode: {}
			}
		]
	},
	bar: {
		title: {
			text: '特性示例：渐变色 阴影 点击缩放',
			subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
		},
		xAxis: { 
			axisLabel: {
				inside: true,
				textStyle: {
					color: '#fff'
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			}
		},
		dataZoom: [
			{
				type: 'inside'
			}
		],
		series: [
			{ // For shadow
				type: 'bar',
				itemStyle: {
					normal: {color: 'rgba(0,0,0,0.05)'}
				},
				barGap:'-100%',
				barCategoryGap:'40%', 
				animation: false,
				encode: {
					x: [],
					y: []
				}
			},
			{
				type: 'bar',
				encode: {
					x: [],
					y: []
				}
			}
		]
	},
	pie:  {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
		},
		series: [
			{
				name:'访问来源',
				type:'pie',
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				encode: {
					value: 1,
					itemName: null
				}
			}
		]
	}
}