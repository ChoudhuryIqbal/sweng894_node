var fs = require('fs');

module.exports.handlePost = function(request)
{
  var jsonContent = readDataStore();
  jsonContent.push(request.body);
  fs.writeFile('data.json', JSON.stringify(jsonContent), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
  return 'OK';
};

module.exports.handleGet = function()
{
  var jsonContent = readDataStore();
  var foundUser = {};
  for (entry in jsonContent) {
    if(jsonContent[entry].username.includes(requestedUser)) {
      foundUser = jsonContent[entry];
    }
  }

  return foundUser;
}

var readDataStore = function()
{
  var content = fs.readFileSync('data.json');
  return JSON.parse(content);
};
