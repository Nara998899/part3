let serviceUrl = "https://jsonplaceholder.typicode.com";

$(function() {
    $("#submit").click(retrieveUserInfo);
});

function retrieveUserInfo() {
    if($("#user-id").val().length === 0) {
        alert("Enter user id!");
        return;
    }

    $("#display").val("");

    let userId = $("#user-id").val();

    let userInfoUrl = serviceUrl + "/users/" + userId;
    $.ajax(userInfoUrl, {
        "method" : "get",
    }).done(displayUserInfo)
    .fail(function() {
        $("#display").append("User not found!");
    });

    let postsUrl = serviceUrl + "/posts?userId=" + userId;
    $.ajax(postsUrl, {"method" : "get"}).done(displayPosts);
}

function displayUserInfo(data) {

    let paragraph = $("<p>");
    paragraph.append("<div><h5>User Info</h5></div");
    paragraph.append("<div>User name: " + data.username + "</div");
    paragraph.append("<div>Email: " + data.email + "</div");

    $("#display").html(paragraph);
}

function displayPosts(data) {
    let container = $("<div class='posts'>");

    let posts = data.map(post => "<div id='post-" + post.id + "' class='post'><div class='title'>" + post.title + "</div><div class='post-body'>" + post.body + "</div></div>").join("");
    container.append(posts);

    $("#display").append(container);
}