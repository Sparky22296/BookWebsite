// Imports
const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));

// Routes
app.use("/", require("./routes/viewRoutes.js"));
app.use("/api/accounts", require("./routes/accountRoutes.js"));
app.use("/api/books", require("./routes/booksRoutes.js"));

// Initialisation
app.listen(3000, () => 
{
    console.log("Listening on Port 3000");
});