var express = require('express');
var dataStorage = require('./dbDataStorage.js');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(bodyParser.json());
app.get('/api/getAccount/:user', function(req, res)
{
  const requestedUser = req.params['user'];
  var query =  dataStorage.handleGet(fs, requestedUser)
  query.exec(function(err,results){
   if(err){
       res.status(400).send(error);
   }else{
     console.log("result=" + results[0]);
        res.status(200).send(results[0]);
   }
  });
});

app.get('/api/getEvents', function(req, res)
{
  var query =  dataStorage.handleGetEvents(fs)
  query.exec(function(err,results){
    var newResults = [];
    if(err)
    {
      res.status(400).send(error);
    }else{
      var resultsProcessedSoFar = 0;
      results.forEach(function(result)
      {
        console.log("getEvents vendorUsername=" + result.vendorUsername)
        dataStorage.handleGetVendor(fs, result.vendorUsername).exec(function(error, vendors)
        {
          if(error)
          {
            res.status(400).send(error);
          }else{
            var mergedResult = JSON.parse(JSON.stringify(result));
            mergedResult.vendor = vendors[0];
            newResults.push(mergedResult);
            resultsProcessedSoFar++;
    
            if(resultsProcessedSoFar === results.length)
            {
              res.status(200).send(newResults)
            }
          }
        });
      });
    }

   });
});

app.get('/api/getUsers', function(req, res)
{
  var query =  dataStorage.handleGetUsers(fs)
  query.exec(function(err,results){
    if(err)
    {
      res.status(400).send(error);
    }
    res.status(200).send(results)
   });
});

app.get('/api/getVendors', function(req, res)
{
  var query =  dataStorage.handleGetVendors(fs)
  query.exec(function(err,results){
    if(err)
    {
      res.status(400).send(error);
    }
    res.status(200).send(results)
   });
});


app.get('/api/getEvent/:id', function(req, res)
{
  const id = req.params['id'];
  var query =  dataStorage.handleGetEvent(fs, id);
  query.exec(function(error, results)
  {
    if(error)
    {
      res.status(400).send(error);
    }
    res.status(200).send(results);
  });
});

app.get('/api/getVendor/:username', function(req, res)
{
  const username = req.params['username'];
  var query =  dataStorage.handleGetVendor(fs, username)
  query.exec(function(err,results){
   if(err)
   res.status(400).send(error);
   results.forEach(function(result){
    res.status(200).send(result);
   });
  });
});

app.get('/api/getReviews/:vendorUsername', function(req, res)
{
   const requestedUsername = req.params['vendorUsername'];
  var query =  dataStorage.handleGetReviews(fs, requestedUsername)
  query.exec(function(err,results){
   if(err)
    res.status(400).send(error);
   res.status(200).send(results);
  });
});

app.post('/api/createAccount', function(req, res)
{
	try
	{
		console.log("in create");
		res.send(201, dataStorage.handleCreateAccountPost(req));
	}
	catch (err)
	{
		console.log(err);
		res.status(400).send(error);
	}
});

app.post('/api/createReview', function(req, res)
{
	try
	{
		console.log("in create");
		res.status(201).send(dataStorage.handleReviewPost(req));
	}
	catch (err)
	{
		console.log(err);
		res.status(400).send(error);
	}
});

app.post('/api/createEvent', function(req, res)
{
	res.status(201).send(dataStorage.handleEventPost(req));
});

app.post('/api/createVendor', function(req, res)
{
	res.status(201).send(dataStorage.handleVendorPost(req));
});

app.delete('/api/deleteEvent/:id', function(req, res)
{
  const id = Number(req.params['id']);
	res.status(200).send(dataStorage.handleDeleteEvent(id));
});

app.listen(8080, function()
{
  console.log('Food truck vendor listening on port 8080!');
});
