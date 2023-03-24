$(function()
{
    var bookTarget = window.location.href.slice(window.location.href.indexOf('?') + 7);

    $("#submit-button").click(function()
    {
        $.get("http://localhost:3000/api/books/add", { sessionID: GetCookie("sessionID"), owner: bookTarget, title: $("#form-title").val(), author: $("#form-author").val() }, function(data)
        {
            window.location.replace("http://localhost:3000");
        });
    });

    $("#cancel-button").click(function()
    {
        window.location.replace("http://localhost:3000");
    });
});