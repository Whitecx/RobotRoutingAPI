# RobotRoutingAPI

## Installation
1. git clone https://github.com/Whitecx/RobotRoutingAPI.git
2. npm install


## Usage
npm start -> Starts server on port 5000
npm run devStart -> Uses nodemon to auto-restart server after changes. Can attach debugger via chrome://inspect
npm run test -> Runs suite of tests in ./tests. Can attach debugger as well
npm run dryRun -> curl command w/ test payload (same as ./tests/endToEndTest.js)


Send a Post Request to localhost:5000/api/robots/closest w/ JSON data in this format:


{"loadId": 1, "x": 0, "y", 0}

##Feature Wishlist:

I considered that the way distance is computed may not accurately represent the distance a robot would actually
travel to get to the load. If there are obstacles/barriers that the robot has to manuever through, then true
distance would have to take into account the robot's planned path to get to the load. While all obstacles may
not be known, it's possible that the API is loaded with a general map of the facility including walls and other
fairly static obstructions. 

Given the fairly low number of robots this service would be expected to parse through, finding improvements in
determining the closest bot based on the criteria of this exercise likely wouldn't bring about any helpful
improvements to the customer's experience; however, let's say that our calculation for determining the best
bot to move a load used a heuristic based on the number of obstacles in the way, or a likely path the bot would
take to the load. Depending on the amount of data, these more informative calculations could cause a real
delay in response time (ex. if it's generating potential plans for each robot in the fleet). In this scenario,
there are some options to speed up the response time of this service that would translate into something meaningful 
in terms of customer experience and automation KPIs. With that in mind, here are a few possible improvements:

1. Caching - If we store a local copy of the data, we could perform more expensive calculations, and 
continually poll the /robots service for new data (or use a webhook). Then, we'd only update our calculations
when the position of a given robot in the fleet has changed. We could also leverage a data structure to keep 
the data organized in a way that would make retrieval faster (ex. including metadata about what quadrant/sector 
of a map the robot is in, and keeping robots sorted based on quadrant or coordinates).

2. Resolution Time - There are a number of metrics we could use to determine the ideal robot to take on a load.
This might include the distance formula in this exercise, potential path, and number of obstacles. But, we
might also find other data useful, such as battery life, estimated battery drain based on a predicted energy
expenditure to move the load, or even the track record of the bot. These metrics may be combined into a 
cumulative score to determine the bot's overall fitness for the job. Given the varying nature of this data,
it's availability, we might consider a resolution time target. If certain metrics in the score are too expensive
to calculate it, our algorithm might opt for a more general estimate based on the amount of time that elapses from
update to update as it polls /robots. This target resolution time would give flexibility to the quality of these
robot load assignments based on computaitonal capacity.

3. Orchestration - It might be useful to consider if this service were to be an orchestrator of sorts. 
It might receive requests in a queue, and determine which robots to send to which jobs by taking a full view 
of all jobs in a queue.  This could lend more adaptability to a wider range of job types. Say, certain loads 
require coordination between one or more robots. Or maybe, there's a higher concentration of loads in one 
space vs another. It could be that this system tracks trends, and directs idle bots to shift their rest 
positions based on predicted changes in load distribution throughout the landscape.  


Overall, there are many ways we might consider extending the functionality of this service - it would all depend
on what works best taking into account both goals in autiomation and customer experience, as well as cost or 
approach given the current architecture and planned approaches. 


