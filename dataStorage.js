var fs = require('fs');
var DataValidator = require ('./dataValidator.js');

module.exports.handlePost = function(request)
{
	var validator = new DataValidator();
	var sanitizedInput = validator.username(request.body.username).password(request.body.password).getResult();
  var jsonContent = readDataStore('users.json');
  jsonContent.push(sanitizedInput);
  fs.writeFile('users.json', JSON.stringify(jsonContent), (err) => {
    if (err){
			console.log(err);
			throw err;
		} 
    console.log('Data written to file');
  });
  return 'OK';
};

var validateUserBody = function(body)
{
	if(body.username == null || typeof body.username !== string
		|| body.password == null || typeof body.password !== string)
		{
			throw error;
		}
};

module.exports.handleEventPost = function(request)
{
  var jsonContent = readDataStore('events.json');
	console.log()
  jsonContent.push(request.body);
  fs.writeFile('events.json', JSON.stringify(jsonContent), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
  return 'OK';
};

module.exports.handleVendorPost = function(request)
{
	console.log(request.body);
	var jsonContent = readDataStore('vendor.json');
	jsonContent.push(request.body);
	fs.writeFile('vendor.json', JSON.stringify(jsonContent), (err) => {
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
  var jsonContent = readDataStore('events.json');
  for (entry in jsonContent) {
    var jsonVendorContent = readDataStore('vendor.json');
    for (vendor in jsonVendorContent) {
      if(jsonVendorContent[vendor].username == jsonContent[entry].vendorUsername) {
        jsonContent[entry].vendor = jsonVendorContent[vendor];
        break;
      }
    }
  }
  return jsonContent;
}

module.exports.handleGetEvent = function(fs, id)
{
  var jsonContent = readDataStore('events.json');
  var foundEvent = {};
  for (event in jsonContent) {
    if(jsonContent[event].id == id) {
      foundEvent = jsonContent[event];
      var jsonVendorContent = readDataStore('vendor.json');
      for (vendor in jsonVendorContent) {
        if(jsonVendorContent[vendor].username == foundEvent.vendorUsername) {
          foundEvent.vendor = jsonVendorContent[vendor];
          break;
        }
      }
      break;
    }
  }

  return foundEvent;
}

module.exports.handleGetVendor = function(fs, vendorId)
{
  var jsonContent = readDataStore('vendor.json');
  var foundUser = {};
  for (entry in jsonContent) {
    if(jsonContent[entry].id == vendorId) {
      foundUser = jsonContent[entry];
    }
  }

  return foundUser;
}

var readDataStore = function(fileName)
{
  var content = fs.readFileSync(fileName);
  return JSON.parse(content);
};
