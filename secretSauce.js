var locationRating = 45.825;
var reviewRating = 62.376;

module.exports.applyRatings = function(event, userCity)
{
	var reviewScore = (event.averageScore - 2.5) * reviewRating;
	var locationScore = null == userCity || null == event.address ? 0 : event.address.toUpperCase().indexOf(userCity.toUpperCase()) !== -1 ? locationRating : 0;
	event.relevancyScore = reviewScore + locationScore;
};