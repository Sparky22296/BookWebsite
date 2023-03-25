const express = require("express");
const router = express.Router();

const controller = require("../controllers/viewController");

router.get("/", controller.GetIndexPage);
router.get("/login", controller.GetLoginPage);
router.get("/register", controller.GetRegisterPage);
router.get("/view", controller.GetViewPage);

module.exports = router;