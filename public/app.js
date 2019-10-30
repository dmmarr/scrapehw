$.getJSON("/articles",function(data){
    for (i=0; i <data.length; i++){
        $("#articles").append("<p data/id = '" + data[i._id]+ "'>" + data[i.title.tweet]+ "</p>")
    }
})
$(document).on("click","p", function(){
    $("#notes").empty()
    var thisId = $(this.attr("data-id"));
    $.ajax({
        method : "GET",
        url : "/articles/" + thisId
    })
    .then(function(data){
        console.log(data)
        $("#notes").append("<h2" +data.tweet + "</h2>")
        $("#notes").append("<input id='tweetInput' name= 'tweet' >")
        $("#notes").append("<textarea id='bodyInput' name ='body' ></textarea>")
        $("#notes").append("<button data-id=' "+ data._id +"'id='savenote'> Save Note </button>")
        if (data.note){
            $("#titleInput").val(data.note.title)
            $("#bodyInput").val(data.note.body)
        }
    })

})

$(document).on("click","#savenote",function(){
    var thisId = $(this).attr("data-id")
    $.ajax({
        method : "POST",
        url: "/articles/"+ thisId,
        data: {
        title: $("titleInput").val(),
        body : $("#bodyInput").val()
    }
    })
    .then(function(data){
        console.log(data);
        $("#notes").empty();
    });
    $("#titleInput").val("");
    $("#bodyInput").val("")
})