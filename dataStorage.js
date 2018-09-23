var fs = require('fs');

module.exports.handlePost = function(request)
{
  var jsonContent = readDataStore('users.json');
  jsonContent.push(request.body);
  fs.writeFile('users.json', JSON.stringify(jsonContent), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
  return 'OK';
};

module.exports.handleGet = function(fs, requestedUser)
{
  var jsonContent = readDataStore('users.json');
  var foundUser = {};
  for (entry in jsonContent) {
    if(jsonContent[entry].username.includes(requestedUser)) {
      foundUser = jsonContent[entry];
    }
  }

  return foundUser;
}

module.exports.handleGetEvents = function(fs)
{
  return readDataStore('events.json');
}

var readDataStore = function(fileName)
{
  var content = fs.readFileSync(fileName);
  return JSON.parse(content);
};
