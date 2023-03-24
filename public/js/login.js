$(function()
{
    $("#login-submit-button").click(function()
    {
        $.get("http://localhost:3000/api/accounts/login", { username: $("#form-username").val(), password: $("#form-password").val() }, function(data)
        {
            SetCookie("sessionID", data.ID, 10000);
            window.location.replace("http://localhost:3000");
        });
    });
});