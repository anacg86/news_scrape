//package that does web scraping/ selects what you want
var cheerio = require("cheerio");
//does the ajax calls, tells cheerios which website to read
var axios = require("axios");
//server
var express = require("express");
//frontend
var exphbs = require("express-handlebars");
//database
var mongoose = require("mongoose");


var app = express();
//connecting mongoose to local database
mongoose.connect('mongodb://localhost/newscraper');
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


            
// Making a request via axios for `nhl.com`'s homepage
axios.get("https://www.nytimes.com/").then(function(response) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(response.data);

  // Empty array to save our scraped data
  var results = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $(".css-1100km e1aa0s8g1 h2").each(function(i, element) {

    // Save the text of the h4-tag as "title"
    var newsTitle = $(element).text();

    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    var newsLink = $(element).parent().attr("href");

    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
      title: newsTitle,
      link: newsLink
    });
  });

  // esto debe imprimirse en el index.html, luego handlebar
  console.log(results);
});

//express handlebars
app.get('/', function (req, res) {
  res.render('home');
});

//later change to run on other comps
app.listen(3000);

//download packages
//first cheerio gets information
//insert info into database
//display results from database to website