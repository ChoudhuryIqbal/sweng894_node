var events = [];

module.exports.handlePost = function(request)
{
  events.push(request.body);
  console.log(request.body);
  return 'OK';
};

module.exports.handleGet = function()
{
  return events;
}
