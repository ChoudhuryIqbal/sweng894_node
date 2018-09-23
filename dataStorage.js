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
  var jsonContent = readDataStore('events.json');
  for (entry in jsonContent) {
    var jsonVendorContent = readDataStore('vendor.json');
    for (vendor in jsonVendorContent) {
      if(jsonVendorContent[vendor].id == jsonContent[entry].vendorId) {
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
  for (entry in jsonContent) {
    if(jsonContent[entry].id == id) {
      foundEvent = jsonContent[entry];
      var jsonVendorContent = readDataStore('vendor.json');
      var foundVendor = {};
      for (entry in jsonVendorContent) {
        if(jsonVendorContent[entry].id == foundEvent.vendorId) {
          foundVendor = jsonVendorContent[entry];
          foundEvent.vendor = foundVendor;
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
