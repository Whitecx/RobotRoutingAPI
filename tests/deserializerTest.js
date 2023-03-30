import { deserializeLoad, Load } from '../utils/deserializer.js';
import { describe, it } from 'mocha';
import * as chai from 'chai';
const should = chai.should();

describe("Validate Input", function() {
	it("When fields are missing", ()=> {
		//sample payload with no data
		const load = { };
		let result = deserializeLoad(load);
		//error message should contain the following if correct
		result.message.should.include("loadId");	
		result.message.should.include("x");	
		result.message.should.include("y");	
	});
	it("When data is are invalid (too big or negative)", ()=> {
		//upper limit defined in deserializer.js
		const load = {"loadId": 100_000_000_000, "x": 200_000, "y": 200_000 };
		let result = deserializeLoad(load);
		//error message should contain b/w (between) and the other words bellow if correct
		result.message.should.include("loadId");	
		result.message.should.include("x");	
		result.message.should.include("y");	
		result.message.should.include("b/w");	

		
		//lower limit is 0 as defined in deserializer.js
		const load2 = {"loadId": -1, "x": -1, "y": -1 };
		result = deserializeLoad(load);
		result.message.should.include("loadId");	
		result.message.should.include("x");	
		result.message.should.include("y");	
		result.message.should.include("b/w");	
	});
	it("When data is correct", ()=> {
		const load = {"loadId": "1", "x": 25, "y": 25};
		let result = deserializeLoad(load);
		//a working payload should return an instance of the Load class
		result.should.be.instanceof(Load);
	});
});
