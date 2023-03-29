import {getRobots} from './getRobots.js';

//Get distance between load and a robot
const getDist = (load, robot) => {
	let xDiff = load.x - robot.x;
	let yDiff = load.y - robot.y;
	let xDiffSquared = Math.pow(xDiff, 2);
	let yDiffSquared = Math.pow(yDiff, 2);
	return Math.sqrt(xDiffSquared + yDiffSquared);
}

//Return closest robot
const findClosest = (load, robots) => {
	//Start off assuming the first is the closest
		//index of closest known robot
	let closestIndex = robots.length > 0 ? 0 : null;
		//dist of closest known robot to load
	let closestDist = closestIndex == 0 ? getDist(load, robots[0]) : null;	

	//Compare closest dist and update if better found
	for(let i=1; i<robots.length; i++){
		let newDist = getDist(load, robots[i]);	
		if(newDist < closestDist) { 
			closestDist = newDist;
			closestIndex = i;
		}
	}

	return robots[closestIndex] || null;
}

//Main function
export const getClosest = async(load) => {
	//get robot data
	let robots = await getRobots();
	return findClosest(load, robots);
}

