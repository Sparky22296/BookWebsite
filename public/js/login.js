$(function()
{
    $("#login-submit-button").click(function()
    {
        $.get("http://192.168.0.223:3000/api/accounts/login", { username: $("#form-username").val(), password: $("#form-password").val() }, function(data)
        {
            SetCookie("sessionID", data.ID, 10000);
            window.location.replace("http://192.168.0.223:3000");
        });
    });
});