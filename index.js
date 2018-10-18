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
   if(err)
      res.send(400, err);
   results.forEach(function(result){
      res.send(200, result);
   });
  });
});

app.get('/api/getEvents', function(req, res)
{
  var query =  dataStorage.handleGetEvents(fs)
  query.exec(function(err,results){
	   if(err)
	      res.send(400, err);
	   res.send(200, results);
   });
});

app.get('/api/getEvent/:id', function(req, res)
{
  const id = req.params['id'];
  var query =  dataStorage.handleGetEvent(fs, id)
  query.exec(function(err,results){
   if(err)
      res.send(400, err);
   results.forEach(function(result){
      res.send(200, result);
   });
  });
});

app.get('/api/getVendor/:id', function(req, res)
{
  const id = req.params['id'];
  var query =  dataStorage.handleGet(fs, id)
  query.exec(function(err,results){
   if(err)
      res.send(400, err);
   results.forEach(function(result){
      res.send(200, result);
   });
  });
});

app.get('/api/getReviews/:vendorUsername', function(req, res)
{
   const requestedUsername = req.params['vendorUsername'];
  var query =  dataStorage.handleGetReviews(fs, requestedUsername)
  query.exec(function(err,results){
   if(err)
      res.send(400, err);
   res.send(200, results);
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
		res.send(400, "invalid request");
	}
});

app.post('/api/createReview', function(req, res)
{
	try
	{
		console.log("in create");
		res.send(201, dataStorage.handleReviewPost(req));
	}
	catch (err)
	{
		console.log(err);
		res.send(400, "invalid request");
	}
});

app.post('/api/createEvent', function(req, res)
{
	res.send(201, dataStorage.handleEventPost(req));
});

app.post('/api/createVendor', function(req, res)
{
	res.send(201, dataStorage.handleVendorPost(req));
});

app.listen(8080, function()
{
  console.log('Food truck vendor listening on port 8080!');
});
