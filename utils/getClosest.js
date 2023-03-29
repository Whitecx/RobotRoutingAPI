import {getRobots} from './getRobots.js';

const findClosest = (load, robots) => {
	let closest = robots[0];
	//TODO: Implement
	return closest
}

export const getClosest = async(load) => {
	//get robot data
	let robots = await getRobots();
	return findClosest(load, robots);
}

await getClosest();
