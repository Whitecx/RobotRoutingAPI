import got from 'got';

const URL = 'https://60c8ed887dafc90017ffbd56.mockapi.io/robots';

export const getRobots = async () => {
	return JSON.parse((await got.get(URL)).body);
}
