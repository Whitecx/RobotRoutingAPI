export class Load {
	constructor(data){
		this.loadId = data.loadId;
		this.x = data.x;
		this.y = data.y;
	}
	validate(){
		let errors = "";
		let fields = Object.keys(this);
		const checkNum = (errors, fieldName, val, limit) => { 
			errors = isNaN(val) ? (errors + `Error: Missing field: ${fieldName}`) : errors;
			if(limit){ 
				if(Number(val) > limit || val < 0) {errors += `Error: ${fieldName} must be b/w 0 and ${limit}`;}
			}
			return errors; 
		}
		fields.forEach(field => {
			let val = this[field];
			switch(field){
				case "loadId":
					errors = checkNum(errors, field, val, 999_999_999);
					break;
				case "x":
					errors = checkNum(errors, field, val, 100_000);
					break;
				case "y":
					errors = checkNum(errors, field, val, 100_000);
					break;
			}
		});
		errors = errors == "" ? null : errors;
		return errors;
	}
}
export const deserializeLoad = (input) => {
	let load = new Load(input);
	let errors = load.validate();
	if(errors){return new Error(errors)}
	return load;
}
