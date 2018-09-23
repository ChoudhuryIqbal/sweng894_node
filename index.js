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

app.post('/api/createAccount', function(req, res)
{
  res.send(201, dataStorage.handlePost(req));
});

app.listen(8080, function()
{
  console.log('Food truck vendor listening on port 8080!');
});
