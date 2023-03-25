const express = require("express");
const pool = require("../models/database");

async function GetBooks(req, res)
{
    var books;

    if (req.query.regex != null)
    {
        books = await pool.query(`SELECT book_title, book_author FROM owns WHERE owner = ? AND (book_title LIKE ? OR book_author LIKE ?) ORDER BY book_author`, [req.query.owner, "%" + req.query.regex + "%", "%" + req.query.regex + "%"]);
    }
    else
    {
        books = await pool.query(`SELECT book_title, book_author FROM owns WHERE owner = ? ORDER BY owner`, req.query.owner)
    }

    res.status(200).json(books);
}

async function AddBook(req, res)
{
    // Checking Permissions
    var session = await pool.query(`SELECT username FROM sessions WHERE ID = ?`, req.query.sessionID);
    if (session.length === 0 || session[0].username != req.query.owner)
    {
        res.sendStatus(403);
        return;
    }

    // Executing Insert
    var book = await pool.query(`SELECT 1 FROM owns WHERE owner = ? AND book_title = ? AND book_author = ?`, [req.query.owner, req.query.title, req.query.author]);
    if (book.length === 1)
    {
        res.sendStatus(400);
    }
    else
    {
        book = await pool.query(`SELECT 1 FROM books WHERE title = ? AND author = ?`, [req.query.title, req.query.author]);
        
        if (book.length === 0)
        {
            await pool.query(`INSERT INTO books VALUES (?, ?)`, [req.query.title, req.query.author]);
        }

        await pool.query(`INSERT INTO owns VALUES (?, ?, ?)`, [req.query.title, req.query.author, req.query.owner]);
        res.sendStatus(200);
    }
}

async function GetCount(req, res)
{
    var account = await pool.query(`SELECT 1 FROM accounts WHERE username = ?`, req.query.owner);
    if (account.length === 0)
    {
        res.sendStatus(400);
    }
    else
    {
        var count = await pool.query(`SELECT * FROM owns WHERE owner = ?`, req.query.owner);
        res.status(200).json({ "count" : count.length });
    }

    res.status(200)
}

async function RemoveBook(req, res)
{
    await pool.query(`DELETE FROM owns WHERE owner = ? AND book_title = ? AND book_author = ?`, [ req.query.owner, req.query.title, req.query.author ]);
    res.sendStatus(200);
}

module.exports = { GetBooks, AddBook, GetCount, RemoveBook }