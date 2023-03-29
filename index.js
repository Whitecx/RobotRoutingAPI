import express from 'express';
import {getClosest} from './utils/getClosest.js';

const app = express();
app.use(express.json());
app.listen("5000");

console.log("Listening on port 5000..");

app.post("/api/robots/closest", async (req, res) => {
	//parse request
	//TODO: Validate
	const load = {
		loadId: req.body.loadId,
		x: req.body.x,
		y: req.body.y
	}

	//TODO: Err handling
	let closest = await getClosest(load);
	res.send(closest);

});
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.all("*", (req, res)=> {
	res.send("Make a post request to /api/robots/closest");
});
