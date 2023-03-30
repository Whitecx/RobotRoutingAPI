import { findClosest } from '../utils/getClosest.js';
import { describe, it } from 'mocha';
import * as chai from 'chai';
const should = chai.should();

describe("Get Closest Robot", function() {
	const robotData = [
		{ "robotId": "1", "batteryLevel": 15, "y": 51, "x": 31 },
		{ "robotId": "2", "batteryLevel": 99, "y": 55, "x": 30 },
		{ "robotId": "3", "batteryLevel": 99, "y": 92, "x": 48 },
		{ "robotId": "4", "batteryLevel": 99, "y": 2, "x": 5 }, ];
	it("Returns correct closest when dist > 10", async ()=> {
		const load = { "loadId": 231, "y": 5, "x": 3 };
		let result = await findClosest(load, robotData);
		result.robotId.should.equal("4");	
	});
	it("Returns correct closest when dist < 10", async ()=> {
		const load = { "loadId": 231, "y": 50, "x": 30 };
		let result = await findClosest(load, robotData);
		result.robotId.should.equal("2");	
	});
		
});
