function SetCookie(name, value, expiry)
{
    let d = new Date();
    d.setTime(expiry * 86400000 + d.getTime());
    let expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

function DeleteCookie(cname)
{
    let d = new Date();
    d.setTime(0);
    document.cookie = cname + '=;expires=' + d.toUTCString() + ';path=/';
}

function GetCookie(cname)
{
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; ++i)
    {
        let c = ca[i];

        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }

    return '';
}