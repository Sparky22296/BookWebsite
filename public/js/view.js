var viewTarget;
var currentUser;
var loggedIn;

$(async function()
{
    // Setting Up Variables
    viewTarget = window.location.href.slice(window.location.href.indexOf('?') + 6);
    
    await $.get("http://192.168.0.223:3000/api/accounts/check", { sessionID: GetCookie("sessionID") }, function(data)
    {
        loggedIn = data.username != null ? true : false;

        if (loggedIn)
        {
            currentUser = data.username;
        }
    });

    // Initial Setup
    SetupLoginButton();

    if (loggedIn && viewTarget === currentUser)
    {
        EnableAdminControls();
    }

    $("#search-button").click(function()
    {
        UpdateList($("#searchbar").val());
    });

    $("#back-button").click(function()
    {
        window.location.replace("http://192.168.0.223:3000");
    });

    // Create-Overlay Setup
    $("#CO-submit-button").click(function()
    {
        $.get("http://192.168.0.223:3000/api/books/add", { sessionID: GetCookie("sessionID"), owner: viewTarget, title: $("#CO-form-title").val(), author: $("#CO-form-author").val() }, function(data)
        {
            $("#create-overlay").addClass("hidden");
            UpdateList("");
        });
    });

    $("#CO-cancel-button").click(function()
    {
        $("#create-overlay").addClass('hidden');
    });

    // View/Delete-Overlay Setup
    $("#EO-cancel-button").click(function()
    {
        $("#edit-overlay").addClass('hidden');
    });

    $("#title-text").text(viewTarget + "'s Books");
    UpdateList("");
});

function SetupLoginButton()
{
    if (loggedIn)
    {
        $("#login-button").text("Logged in as " + currentUser);
        $("#login-button").click(function()
        {
            DeleteCookie("sessionID");
            window.location.reload();
        });
    }
    else
    {
        $("#login-button").click(function()
        {
            window.location.replace("http://192.168.0.223:3000/login");
        });
    }
}

function UpdateList(queryStr)
{
    $.get("http://192.168.0.223:3000/api/books/get", { regex: queryStr, owner: viewTarget }, function(data)
    {
        $("#table").empty();

        for (let i = 0; i < data.length; ++i)
        {
            $("#table").append("<div class=table-entry id=table-entry-" + i + ">" +
                                   "<p class=book-title>" + data[i].book_title + "</p>" +
                                   "<p class=book-author>" + data[i].book_author + "</p>" +
                               "</div>");
        }

        if (loggedIn && currentUser == viewTarget)
        {
            for (let i = 0; i < data.length; ++i)
            {
                $("#table-entry-" + i).click(function()
                {
                    OpenViewDialog(data[i].book_title, data[i].book_author);
                });
            }
        }
    });
}

function OpenViewDialog(book_title, book_author)
{
    $("#edit-overlay").removeClass("hidden");
    $("#EO-title").text(book_title);
    $("#EO-author").text(book_author);

    $("#EO-delete-button").click(function()
    {
        $.get("http://192.168.0.223:3000/api/books/remove", { owner: viewTarget, title: book_title, author: book_author }, function()
        {
            $("#edit-overlay").addClass('hidden');
            UpdateList("");
        });
    });
}

function EnableAdminControls()
{
    $("#add-button").removeClass("hidden");
    $("#add-button").click(function()
    {
        $("#create-overlay").removeClass("hidden");
    });
}