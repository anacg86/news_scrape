// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
    "Grabbing every thread name and link\n" +
    "from nytimes:" +
    "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
axios.get("https://www.nytimes.com/").then(function (response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $(".css-15zaaaz .css-1100km").each(function (i, element) {

        var title = $(element).children().find(".ghost h2")
        // Save the text of the h4-tag as "title"
        var description = $(element).text();

        // Find the h4 tag's parent a-tag, and save it's href value as "link"
        var link = $(element).parent("a").attr("href");

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
            title: title,
            description: description,
            link: link
        });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
});
