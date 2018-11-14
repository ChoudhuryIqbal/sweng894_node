const express = require('express')
const fs = require('fs')
const app = express()
const port = 1443

var variantValues = new Array();

var parent1 = null;
var parent2 = null;

for(var q = 0; q < 10; q++)
{
  var mutant = {
    distanceValue : Math.random() * 100,
    ratingValue : Math.random() * 100,
    cuisineValue : Math.random() * 100
  };
  variantValues.push(mutant);
}

var nextGen = function()
{
  variantValues[0] = parent1;
  variantValues[1] = parent2;
  for (var q = 2; q < variantValues.length; q++)
  {
    mutate(variantValues[q]);
  }
};

var mutate = function(value)
{
  selectChromosomes(value);
  value.distanceValue += (Math.random() * 10) - 5;
  if(value.distanceValue < 0)
  {
    value.distanceValue = 0;
  }
  value.ratingValue += (Math.random() * 10) - 5;
  if(value.ratingValue < 0)
  {
    value.ratingValue = 0;
  }
  value.cuisineValue += (Math.random() * 10) - 5;
  if(value.cuisineValue < 0)
  {
    value.cuisineValue = 0;
  }
};

var selectChromosomes = function(value)
{
  if(Math.random() >= 0.5)
  {
    value.distanceValue = parent1.distanceValue;
  }
  else
  {
    value.distanceValue = parent2.distanceValue;
  }
  if(Math.random() >= 0.5)
  {
    value.ratingValue = parent1.ratingValue;
  }
  else
  {
    value.ratingValue = parent2.ratingValue;
  }
  if(Math.random() >= 0.5)
  {
    value.cuisineValue = parent1.cuisineValue;
  }
  else
  {
    value.cuisineValue = parent2.cuisineValue;
  }
};

app.get('/winners/:first/:second', function(req, res)
{
  parent1 = variantValues[Number.parseInt(req.params.first)];
  parent2 = variantValues[Number.parseInt(req.params.second)];
  nextGen();
  res.send(200, 'Okay!');
});

app.get('/reset', function(req, res)
{
  variantValues = new Array();
  for(var q = 0; q < 10; q++)
  {
    var mutant = {
      distanceValue : Math.random() * 100,
      ratingValue : Math.random() * 100,
      cuisineValue : Math.random() * 100
    };
    variantValues.push(mutant);
  }
  res.send(200, 'Okay!');
});

app.get('/currentValues', function(req, res)
{
  res.send(200, JSON.stringify(variantValues));
});

app.get('/:variation', (req, res) => res.send(getEventsAsHTML(req.params.variation)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var getEventsFromJSON = function ()
{
  return JSON.parse(fs.readFileSync('events.json'));
};

var getEventsAsHTML = function (varString)
{
  var variation = Number.parseInt(varString);
  var events = getRankedEvents(variation);
  // console.log(events);
  var htmlString = "<head><\/head><body>";
  for(var q = 0; q < events.length; q++)
  {
    htmlString += "<h1>" + ( q + 1) + ". " + events[q].name + "<\/h1>";
    htmlString += "<p>Cuisine: " + events[q].cuisine + " Rating: " + events[q].rating + "/10 Location: " + events[q].location + "<\/p>";
    htmlString += "__________________________________________________________";
  }
  htmlString += "<\/body>";
  return htmlString;
}

var getRankedEvents = function (variation)
{
  var events = getEventsFromJSON();

  console.log("Variation: " + variation);
  console.log("Variation type: " + typeof variation);
  var distanceValue = variantValues[variation].distanceValue;
  var ratingValue = variantValues[variation].ratingValue;
  var cuisineValue = variantValues[variation].cuisineValue;

  var user = {
    favoriteCuisine : "American",
    location : "Philadelphia"
  };

  for(var q = 0; q < events.length; q++)
  {
    event = events[q];
    event.score = (ratingValue * (event.rating - 5)) + (distanceValue * locationMatches(user, event.location)) + (cuisineValue * cuisineMatches(user, event.cuisine));
  }

  events.sort(function(a, b)
  {
    if(a.score < b.score) return 1;
    if(a.score > b.score) return -1;
    return 0;
  });

  console.log(distanceValue);
  console.log(ratingValue);
  console.log(cuisineValue);

  return events;
}

var cuisineMatches = function(user, cuisine)
{
  if(user.favoriteCuisine === cuisine)
  {
    return 5;
  }
  return 0;
};

var locationMatches = function(user, location)
{
  if(user.location === location)
  {
    return 5;
  }
  return 0;
};
