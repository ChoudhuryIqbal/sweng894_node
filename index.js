var express = require('express');
var dataStorage = require('dataStorage');
var app = express();

app.use(express.json());

app.get('/', function(req, res)
{
  res.send(dataStorage.handleGet());
});

app.post('/', function(req, res)
{
  res.send(dataStorage.handlePost(req));
});

app.listen(3000, function()
{
  console.log('Example app listening on port 3000!');
});
