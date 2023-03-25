const express = require("express");
const path = require("path");
const pool = require("../models/database");

function GetIndexPage(req, res)
{
    res.status(200).sendFile(path.resolve("./views/index.html"));
}

function GetLoginPage(req, res)
{
    res.status(200).sendFile(path.resolve("./views/login.html"));
}

function GetRegisterPage(req, res)
{
    res.status(200).sendFile(path.resolve("./views/register.html"));
}

function GetViewPage(req, res)
{
    res.status(200).sendFile(path.resolve("./views/view.html"));
}

module.exports = { GetIndexPage, GetLoginPage, GetRegisterPage, GetViewPage }