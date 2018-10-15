var express = require('express');
var dataStorage = require('./dataStorage.js');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(bodyParser.json());
app.get('/api/getAccount/:user', function(req, res)
{
  const requestedUser = req.params['user'];
  res.send(dataStorage.handleGet(fs, requestedUser));
});

app.get('/api/getEvents', function(req, res)
{
  res.send(dataStorage.handleGetEvents(fs));
});

app.get('/api/getEvent/:id', function(req, res)
{
  const id = req.params['id'];
  res.send(dataStorage.handleGetEvent(fs, id));
});

app.get('/api/getVendor/:id', function(req, res)
{
  const id = req.params['id'];
  res.send(dataStorage.handleGetVendor(fs, id));
});

app.get('/api/getReviews/:vendorUsername', function(req, res)
{
  const vendorUsername = req.params['vendorUsername'];
  res.send(dataStorage.handleGetReviews(fs, vendorUsername));
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
		res.send(201, dataStorage.handleReviewPost(req));
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
