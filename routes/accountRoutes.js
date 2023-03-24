const express = require("express");
const router = express.Router();

const controller = require("../controllers/accountController.js");

router.get("/login", controller.Login);
router.get("/register", controller.RegisterAccount);
router.get("/get", controller.GetUsers);
router.get("/check", controller.CheckSession);

module.exports = router;