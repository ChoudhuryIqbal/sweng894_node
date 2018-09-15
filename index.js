var express = require('express');
var dataStorage = require('./dataStorage.js');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');


app.use(bodyParser.json())

app.get('/api/getAccount/:user', function(req, res)
{
  const requestedUser = req.params['user'];
  res.send(dataStorage.handleGet(fs, requestedUser));
});

app.post('/api/createAccount', function(req, res)
{
  res.send(201, dataStorage.handlePost(req));
});

app.listen(3000, function()
{
  console.log('Example app listening on port 3000!');
});
