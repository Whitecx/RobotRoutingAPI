import got from 'got';
import { describe, it } from 'mocha';
import * as chai from 'chai';
const should = chai.should();
const url = 'http://localhost:5000/api/robots/closest'

describe("When hitting endpoint", function() {
	it("We get expected output", async()=> {
		const load = { };
		let result = await got.post(url, {json: {"loadId": 231, "x": 5, "y": 3 }});
		result = JSON.parse(result.body);
		result.robotId.should.exist;
		result.distanceToGoal.should.exist;
		result.batteryLevel.should.exist;
	});
});
