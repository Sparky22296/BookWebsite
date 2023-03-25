$(function()
{
    $.get("http://192.168.0.223:3000/api/accounts/get", function(data)
    {
        for (let i = 0; i < data.length; ++i)
        {
            $.get("http://192.168.0.223:3000/api/books/count", { owner: data[i].username }, function(bookData)
            {
                $("#user-table").append(
                    "<div class=table-entry id=entry-" + i + ">" +
                        "<p class=username>" + data[i].username + "</p>" +
                        "<p class=info>" + bookData.count + " Books</p>" +
                    "</div>");

                $("#entry-" + i).click(function()
                {
                    window.location.replace("http://192.168.0.223:3000/view?user=" + data[i].username);
                });
            });
        }
    });

    $.get("http://192.168.0.223:3000/api/accounts/check", { sessionID: GetCookie("sessionID") }, function(data)
    {
        if (!data.username)
        {
            $("#login-button").click(function()
            {
                window.location.replace("http://192.168.0.223:3000/login");
            });
        }
        else
        {
            $("#login-button").text("Logged in as " + data.username);
            $("#login-button").click(function()
            {
                DeleteCookie("sessionID");
                location.reload();
            });
        }
    });

    // $.get("http://192.168.0.223:3000/api/register", { username: "e", password: "e"}, function(data)
    // {
    //     console.log("done");
    // });

    // $.get("http://192.168.0.223:3000/api/login/", { username: "e", password: "e"} , function(data)
    // {
    //     SetCookie("sessionID", data.ID, 10000);
    //     console.log(data);
    // });

    // $.get("http://192.168.0.223:3000/api/books/add", { sessionID: GetCookie("sessionID"), owner: "e", title: "Chungus Poems", author: "Big Chungus" }, function(data)
    // {
    //     console.log("book added 1");
    // });

    // $.get("http://192.168.0.223:3000/api/books/add", { sessionID: GetCookie("sessionID"), owner: "e", title: "Poo Poems", author: "Poo Chungus" }, function(data)
    // {
    //     console.log("book added 2");
    // });

    // $.get("http://192.168.0.223:3000/api/books/get", { owner: "e" }, function(data)
    // {
    //     console.log(data);
    // });

    // $.get("http://192.168.0.223:3000/api/books/get", { owner: "t" }, function(data)
    // {
    //     console.log(data);
    // });
});