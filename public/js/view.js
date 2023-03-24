var viewTarget;

$(function()
{
    viewTarget = window.location.href.slice(window.location.href.indexOf('?') + 6);

    $.get("http://localhost:3000/api/accounts/check", { sessionID: GetCookie("sessionID") }, function(data)
    {
        if (!data.username)
        {
            $("#login-button").click(function()
            {
                window.location.replace("http://localhost:3000/login");
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

        if (data.username === viewTarget)
        {
            EnableAdminControls();
        }
    });

    $("#title-text").text(viewTarget + "'s Books");
    UpdateList("");
});

function UpdateList(queryStr)
{
    $.get("http://localhost:3000/api/books/get", { regex: queryStr, owner: viewTarget }, function(data)
    {
        $("#table").empty();

        for (let i = 0; i < data.length; ++i)
        {
            var obj = "<div class=table-entry><p class=book-title>" + data[i].book_title + "</p><p class=book-author>" + data[i].book_author + "</p></div>";
            $("#table").append(obj);
        }
    });
}

function EnableAdminControls()
{
    $("#add-button").removeClass("hidden");
    $("#add-button").click(function()
    {
        window.location.replace("http://localhost:3000/new-book?owner=" + viewTarget);
    });
}