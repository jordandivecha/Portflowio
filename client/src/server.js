var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mogulNotes";


var db = require("./models");

var PORT = process.env.PORT || 8080;


var app = express();


app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set ("view engine", "handlebars");

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI,{
  useMongoClient: true
});

app.get ("/", function (req, res){
  res.render("index");
});
app.get("/scrape", function(req, res) {

  axios.get("https://smallbiztrends.com/").then(function(response) {

    var $ = cheerio.load(response.data);


    $("h2").each(function(i, element) {

      var result = {};


      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");


      db.Article
        .create(result)
        .then(function(dbArticle) {

          res.send("Scrape Complete");
        })
        .catch(err => console.log(err));
    });
  });
});


app.get("/articles", function(req, res) {

  db.Article
    .find({})
    .then(function(dbArticle) {

      res.json(dbArticle);
    })
    .catch(function(err) {

      res.json(err);
    });
});


app.get("/articles/:id", function(req, res) {

  db.Article
    .findOne({ _id: req.params.id })

    .populate("note")
    .then(function(dbArticle) {

      res.json(dbArticle);
    })
    .catch(function(err) {

      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {

  db.Note
    .create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {

      res.json(dbArticle);
    })
    .catch(function(err) {

      res.json(err);
    });
});
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
