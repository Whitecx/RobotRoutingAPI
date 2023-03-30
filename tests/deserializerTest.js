import { deserializeLoad, Load } from '../utils/deserializer.js';
import { describe, it } from 'mocha';
import * as chai from 'chai';
const should = chai.should();

describe("Validate Input", function() {
	it("When fields are missing", ()=> {
		const load = { };
		let result = deserializeLoad(load);
		result.message.should.include("loadId");	
		result.message.should.include("x");	
		result.message.should.include("y");	
	});
	it("When data is are invalidi (too big or negative)", ()=> {
		const load = {"loadId": 100_000_000_000, "x": 200_000, "y": 200_000 };
		let result = deserializeLoad(load);
		result.message.should.include("loadId");	
		result.message.should.include("x");	
		result.message.should.include("y");	
		result.message.should.include("b/w");	

		
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
		result.should.be.instanceof(Load);
	});
});
