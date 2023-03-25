const express = require("express");
const path = require("path");
const pool = require("../models/database");

async function Login(req, res)
{
    var account = await pool.query(`SELECT 1 FROM accounts WHERE username = ? AND password = ?`, [req.query.username, req.query.password]);
    if (account.length === 0)
    {
        res.sendStatus(400);
    }
    else
    {
        var session = await pool.query(`SELECT 1 FROM sessions WHERE username = ?`, req.query.username);
        if (session.length === 1)
        {
            await pool.query(`DELETE FROM sessions WHERE username = ?`, req.query.username);
        }

        await pool.query(`INSERT INTO sessions VALUES(UUID(), NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY), ?)`, req.query.username);
        var sessionID = await pool.query(`SELECT ID FROM sessions WHERE username = ?`, req.query.username);
        res.status(200).json(sessionID[0]);
    }
}

async function RegisterAccount(req, res)
{
    var account = await pool.query(`SELECT 1 FROM accounts WHERE username = ?`, req.query.username);
    if (account.length === 1)
    {
        res.sendStatus(400);
    }
    else
    {
        await pool.query(`INSERT INTO accounts VALUES(?, ?)`, [req.query.username, req.query.password]);
        res.sendStatus(200);
    }
}

async function GetUsers(req, res)
{
    res.status(200).json(await pool.query(`SELECT username FROM accounts ORDER BY username`));
}

async function CheckSession(req, res)
{
    var user = await pool.query(`SELECT username FROM sessions WHERE ID = ?`, req.query.sessionID);

    if (user.length === 0)
    {
        res.status(200).json({ "username": null });
    }
    else
    {
        res.status(200).json({ "username": user[0].username });
    }
}

module.exports = { RegisterAccount, Login, GetUsers, CheckSession };