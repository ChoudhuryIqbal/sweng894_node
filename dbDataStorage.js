var DataValidator = require ('./dataValidator.js');

var mongoose = require("mongoose");
mongoose.connect("mongodb://35.185.38.132:18555/trucks");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection succeeded.");
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
	username: String,
	password: String,
	menu:
	[
		{
			name: String,
			price: Number
		}
	]
});

var reviewSchema = new Schema({
	vendorUsername:String,
	comment: String,
	rating: Number
});

var eventSchema = new Schema({
	id:Number,
	vendorUsername:String,
	saleDescription:String,
	start:String,
	end:String,
	address:String
});

var vendorSchema = new Schema({
	username:String,
	name:String,
	foodType:String,
	description:String,
	menu:String
});

module.exports.handleCreateAccountPost = function(request)
{
	 var User = mongoose.model("user", userSchema);
	 
	 var thisUser = new User({
	     username: request.body.username,
	     password: request.body.password,
	     menu: request.body.menu
	 });
	 
	 thisUser.save(function(error) {
	     console.log("User has been saved!");
	 if (error) {
	     console.error(error);
	  }
	 });
};

module.exports.handleEventPost = function(request)
{
  	var Event = mongoose.model("event", eventSchema);
	 
	 var thisEvent = new Event({
	        id:request.body.id,
		vendorUsername:request.body.vendorUsername,
		saleDescription:request.body.saleDescription,
		start:request.body.start,
		end:request.body.end,
		address:request.body.address
	 });
	 
	 thisEvent.save(function(error) {
	     console.log("Event has been saved!");
	 if (error) {
	     console.error(error);
	  }
	 });
};

module.exports.handleReviewPost = function(request)
{
	var Review = mongoose.model("review", reviewSchema);
		 
	 var thisReview = new Review({
		vendorUsername: request.body.vendorUsername,
		comment: request.body.comment,
		rating: request.body.rating
	 });
	 
	 thisReview.save(function(error) {
	     console.log("Review has been saved!");
	 if (error) {
	     console.error(error);
	  }
	 });
};

module.exports.handleVendorPost = function(request)
{
	var Vendor = mongoose.model("vendor", vendorSchema);
		 
	 var thisVendor = new Vendor({
		username:request.body.username,
		name:request.body.name,
		foodType:request.body.foodType,
		description:request.body.description,
		menu:request.body.menu
	 });
	 
	 thisVendor.save(function(error) {
	     console.log("Vendor has been saved!");
	 if (error) {
	     console.error(error);
	  }
	 });
};

module.exports.handleGetReviews = function(fs, requestedUsername)
{
 	var Review = mongoose.model("review", reviewSchema);

	return Review.find({vendorUsername: requestedUsername});
}

module.exports.handleGet = function(fs, requestedUser)
{
  	var User = mongoose.model("user", userSchema);

	return User.find({username: requestedUser});
};

module.exports.handleGetEvents = function(fs)
{
  	var Event = mongoose.model("event", eventSchema);

	return Event.find({});
};

module.exports.handleGetEvent = function(fs, requestedID)
{
  	var Event = mongoose.model("event", eventSchema);

	return Event.find({id: requestedID});
}

module.exports.handleGetVendor = function(fs, vendorId)
{
  	var Vendor = mongoose.model("vendor", vendorSchema);

	return Vendor.find({username: vendorId});
}
