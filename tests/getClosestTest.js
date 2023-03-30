import { getClosest } from '../utils/getClosest.js';
import { describe, it } from 'mocha';
import * as chai from 'chai';
const should = chai.should();

describe("Get Closest Robot", function() {
	const load1 = { "loadId": 231, "x": 5, "y": 3 };
	it("Returns correct closest", async ()=> {
		let result = await getClosest(load1);
		result.robotId.should.equal("4");	
	});
});
