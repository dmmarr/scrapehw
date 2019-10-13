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
        url : "/articles/" + thisThing
    })
    .then(function(data){
        console.log(data)
        $("#notes").append("<h2" +data.tweet + "</h2>")
        $("#notes").append("<textarea id='bodyInput' name ='body' ></textarea>")
        if (data.note){
            $("#bodyInput").val(data.note.body)
        }
    })

})

$(document).on("click","#savenote",function(){
    var thisThing = $(this).attr("data-id")
    $.ajax({
        method : "POST",
        url: "/articles/"+ thisThing,
        data: {
         body : $("#bodyInput").val(),
        title: $("titleInput").val()
        
    }
    })
    .then(function(data){
        console.log(data);
        $("#notes").empty();
    });
    $("#titleInput").val("");
    $("#bodyInput").val("")
})