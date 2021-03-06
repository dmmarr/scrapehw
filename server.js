var express = require("express");
var morgan = require("morgan");
var models = require ("./models");
var moongoose = require ("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


var app = express();
var PORT = process.env.PORT||3000;

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));



moongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nakedweb");

app.get("/wipe",function(req,res){
    // axios to talk to the website
    axios.get("https://twitter.com/dammariss_").then(function(response){
    var $ = cheerio.load(response.data)
    $("div").each(function(i,element){
        var info = {}
        info.tweet = $(this)
        .children("p").text()
    // console.log(info.tweet)
    models.Article.create(info).then(function(dbArticle){
        console.log(dbArticle)
    }).catch(function(err){
        console.log(err)
    })
    })
    res.send("ITS DONEEEEE BABY!!!")
})
})

app.get("/articles",function(req,res){
    models.Article.find({}).then(function(dbArticle){
        res.json(dbArticle)
    }).catch(function(err){
        res.json(err)
    })

});

app.get("/articles/:id",function(req,res){
    models.Article.findOne({_id:req.params.id}).populate("note")
    .then(function(dbArticle){
        res.json(dbArticle)
    }).catch(function(err){
        res.json(err)
    })

});

app.post("/articles/:id",function(req,res){
    models.note.create(req.body)
    .then(dbNote)
    return models.Article.findOneAndUpdate({_id:req.params.id},{note: dbNote._id},{new: true})
})
.then(function(dbArticle){
    res.json(dbArticle)
    .catch(function(err){
        res.json(err)
    })
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  