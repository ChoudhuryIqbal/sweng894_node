var events = [];

module.exports.handlePost = function(request)
{
  //events.push(request.body);
  var data = JSON.parse(request.body);
  fs.writeFile('data.json', data, (err) => {  
    if (err) throw err;
    console.log('Data written to file');
  });
  return 'OK';
};

module.exports.handleGet = function(fs, requestedUser)
{
  var content = fs.readFileSync("data.json");
  var jsonContent = JSON.parse(content);
  var foundUser = {};

  for (i in jsonContent){
    if(jsonContent[i].username.includes(requestedUser)){
        foundUser=jsonContent[i]
    }
  }
  return foundUser;
}
