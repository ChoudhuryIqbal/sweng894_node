var dataStorage = require("../dataStorage");

describe("Truck server API", function() {

  it("accepts and stores a JSON request", function() {
    var jsonString = '{"name": "Bruce Wayne"}';
    var req = {};
    req.body = jsonString;
    dataStorage.handlePost(req)
    expect(dataStorage.handleGet()[0]).toBe(jsonString);
  });
});
