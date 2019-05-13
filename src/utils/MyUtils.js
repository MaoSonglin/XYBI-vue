
function copy(source, target){
	for(let i in source){
		target[i] = source[i]
	}
}

function flatten(source,prefix) {
	var that = new Object()
	doObject(source, prefix ? prefix : '')
	function doObject(obj,attr){
		if(typeof(obj) == 'function'){
			
		}
		else if(typeof(obj) == 'string' || typeof(obj) == 'boolean' || typeof(obj) == 'number'){
			if(attr)
				that[attr] = obj
			else
				that = obj
		}else
			for(var index in obj){
				var val = obj[index]
				var x = attr
				if(isNaN(index)){
					x += x ? '.'+index : index
				}else{
					x += x ? '['+index+']' : index
				}
				doObject(val,x)
			}
	}
	
	
	return that
}

export default {
	copy,
	flatten
}