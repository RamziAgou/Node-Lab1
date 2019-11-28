NodeTraining

Our project is the next step of your lectures.
We made a little project, we still use express over Typescript, but this time we wanted to storage some metrics.
These metrics is given by post request by the users and we store them using levelDB database.
Next we just display the metric that we stored, we can delete metrics too.

# Table of Contents

* [Prerequisites]
* [Installation]
* [Running]


## Prerequisites

Before you continue, ensure you meet the following requirements:

*You should have NodeJS(npm) installed on your PC.

## Installation

### Depedencies installation

You must do the 'npm install' command in the root of the directory project.
It will install all the node_modules used in the project.

## Running

If you want to run without building by using the last building. You can just 'npm run dev'. It will run the last builded script with nodemon.
If you want to build then to start the server you can use 'npm run start', it will first build the typescript into the javascript. Then start the server.
If you really want to run the projet via nodemon, you can first build it 'npm run build', then 'npm run dev'.

## How to use the routes

### Display metrics

You can display all the metrics whether if you go into the hello/name and click on the button bring the metrics.
Or you can go into the /metrics route that display all the metrics in the database.

### Delete one metric by it's key

To delete a metric using it's key, you need to go into the route /metrics/delete/key.
DO NOT write metrics/delete/metric:id:timestamp BUT metrics/delete/id:timestamp. Writing the metric: is useless and it will not find the metric.

### Delete all 

If you want to delete all your data, you don't need to delete the db file, you just have to go into the route /metrics/delete/all

## Author

Ramzi AGOUGILE 
