!/bin/bash

curl -X POST \
  http://localhost:5000/api/robots/closest \
  -H 'Content-Type: application/json' \
  -d '
  {
	  loadId: 231,
	  x: 5,
	  y: 3 
  }'


