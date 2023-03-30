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

## Feature Wishlist:

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

2. Radial Seach (BFS) - To minimize the number of robots we evaluate paths for, we might maintain a 2d array map
of cooridnates for our robots. Using the position of the load, we can scan outward at an iteratively increasing
radius, checking array coordinates in each new circumfrence. The tradeoff for this approach is that cycling 
through ~100 robots and comparing coordinates is very fast. In comparison, it would only take a radius of 6 untis
to equal a similar number of operations (A(r) = πr^2; A(6)=~100). For the following example I use a few estimates,
but without running tests on hardware we won't get an exact sense of completion time.

For our worst case scenario, we can imagine a load on one end of a map, with the closest bot being the farthest 
possible point. In this case, the radius would span the length of the map. Let’s say for a square facility 
(1000x1000), with load and robot placed at opposite corners, we’d have a max distance of ~1400 units. This would 
also represent the max radius, giving the total unit spaces to check to be less than 6M (maybe around 1/4th of 
this given much of the potential radius would be outside of the bounds of the map). Even with a large number, if 
we represent this as a two dimensional array in which instances of our Robot fleet are placed, while we’d have a 
high memory usage to hold the map of a large space (even more so if maintaining a search frontier the size of the 
circumfrence being checked), iterating outward in the described way could still be faster when evaluating possible 
paths for each robot. For example, assuming it takes 1*10^-4 seconds to check each space, it would take ~25seconds 
to find the robot that’s the maximum distance away in our scenario. Although 25s is a long time, it may very well 
be faster than the time it might take process the best/reasonable paths for a fleet of robots. Even 1 second per 
robot would be 4x slower at 100s. Furthermore, it’s very unlikely that this scenario plays out. A more reasonable 
example might be that a load is within 500units, giving us an estimated max of ~3s to identify the first robot. 
Once the first robot is found, we might check outward 5 units from our radius. This would limit the number of 
robots we check to only a few bots. Let’s say it takes 1s to check the potential path of a bot, and imagine we run 
into 3 bots within a 5 unit radius. If we detect the first within about 500 units, we can estimate it taking at 
worst 6s, and at best less than 1s to find the best bot (in this case we find a bot quickly and there are none 
within the same radius to compare paths with). 

Comparing this approach with the original of using straight line distance, the savings in time for choosing a bot with the shortest “actual” path could be substantial! Just imagine perceived distance being 20 units, but the 
actual path distance being 35 units when accounting for obstacles. If a bot travels at 1 unit/s, then that 
would make for a 15s difference in the estimate. 


3. Resolution Time - There are a number of metrics we could use to determine the ideal robot to take on a load.
This might include the distance formula in this exercise, potential path, and number of obstacles. But, we
might also find other data useful, such as battery life, estimated battery drain based on a predicted energy
expenditure to move the load, or even the track record of the bot. These metrics may be combined into a 
cumulative score to determine the bot's overall fitness for the job. Given the varying nature of this data,
it's availability, we might consider a resolution time target. If certain metrics in the score are too expensive
to calculate it, our algorithm might opt for a more general estimate based on the amount of time that elapses from
update to update as it polls /robots. This target resolution time would give flexibility to the quality of these
robot load assignments based on computaitonal capacity.

4. Orchestration - It might be useful to consider if this service were to be an orchestrator of sorts. 
It might receive requests in a queue, and determine which robots to send to which jobs by taking a full view 
of all jobs in a queue.  This could lend more adaptability to a wider range of job types. Say, certain loads 
require coordination between one or more robots. Or maybe, there's a higher concentration of loads in one 
space vs another. It could be that this system tracks trends, and directs idle bots to shift their rest 
positions based on predicted changes in load distribution throughout the landscape.  



Overall, there are many ways we might consider extending the functionality of this service. There are even hybrid
approaches, wherein we choose the best approach based on capacity or perceived conditions. A solid design would 
depend on what works best taking into account both goals in autiomation and customer experience, as well as cost
or approach given the current architecture and planned approaches. 

## Other Questions to Inform Design

 1. How do robot's get recahrged - is there a discovery service in the connected api that determines which get 
returned?

2. What happens if there are a cluster of loads and multiple robots are needed?

3. Is there known data on how expected travel distance affects battery life?

4. How do we handle if there are no robots available?

5. How do we handle if the closest robots available have low battery? Should we choose a next closest even if it's farther?

6. Would it be helpful to have a visual w/ a highlight of what robot was chosen?

7. How would you know/handle if a robot is already on the move for another load?




