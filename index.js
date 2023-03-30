import express from 'express';
import {getClosest} from './utils/getClosest.js';
import { deserializeLoad } from './utils/deserializer.js';

const app = express();
app.use(express.json());
app.listen("5000");

console.log("Listening on port 5000..");

app.post("/api/robots/closest", async (req, res) => {
	try{
		//parse request
		const load = deserializeLoad(req.body);

		if(load instanceof Error){res.status(400).send(load.message); return;}
		let closest = await getClosest(load);
		res.send(closest);
	}catch(err){console.error(err); res.status(500).send("An error as occurred");};
});

app.all("*", (req, res)=> {
	res.send("Make a post request to /api/robots/closest");
});
