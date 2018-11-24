var locationRating = 45.825;
var reviewRating = 62.376;

module.exports.applyRatings = function(event, userCity)
{
	var reviewScore = (event.averageScore - 2.5) * reviewRating;
	var locationScore = null === userCity ? 0 : userCity === event.address ? locationRating : 0;
	event.relevancyScore = reviewScore + locationScore;
};