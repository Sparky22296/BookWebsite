const express = require("express");
const router = express.Router();

const controller = require("../controllers/booksController.js");

router.get("/get", controller.GetBooks);
router.get("/add", controller.AddBook);
router.get("/count", controller.GetCount);

module.exports = router;