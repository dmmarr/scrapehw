var mongoose = require("mongoose");
var Schema = mongoose.Schema 
var ArticleSchema = new Data ({
    tweet:{
        type: String, 
        require: true
    },
    tweet:{
        type: Schema.Types.ObjectId,
        ref : "Note"
    }
    
}) 
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;